import { useEffect, useMemo, useState } from 'react'
import { fetchContentEntries, saveContentEntries } from '../../lib/content'
import { isSupabaseConfigured } from '../../lib/supabase'
import type { ContentEntry } from '../../types/cms'
import { adminInputClass, adminTextareaClass } from '../components/AdminField'
import { SaveToast } from '../components/SaveToast'
import { AdminNotConfigured, AdminPageHeader, AdminPanel, AdminPrimaryButton } from '../components/AdminUi'

export function AdminContentPage() {
  const [entries, setEntries] = useState<ContentEntry[]>([])
  const [draft, setDraft] = useState<Record<string, string>>({})
  const [toast, setToast] = useState('')
  const [toastTone, setToastTone] = useState<'success' | 'error'>('success')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    void fetchContentEntries().then((rows) => {
      setEntries(rows)
      const map: Record<string, string> = {}
      rows.forEach((r) => {
        map[r.key] = r.value
      })
      setDraft(map)
    })
  }, [])

  const groups = useMemo(() => {
    const g = new Map<string, ContentEntry[]>()
    for (const e of entries) {
      const list = g.get(e.group_label) ?? []
      list.push(e)
      g.set(e.group_label, list)
    }
    return [...g.entries()]
  }, [entries])

  async function save() {
    setSaving(true)
    try {
      await saveContentEntries(draft)
      setToastTone('success')
      setToast('Page content saved')
      setTimeout(() => setToast(''), 3000)
    } catch {
      setToastTone('error')
      setToast('Save failed — check your connection')
    } finally {
      setSaving(false)
    }
  }

  if (!isSupabaseConfigured) {
    return <AdminNotConfigured feature="Page content" />
  }

  if (!entries.length) {
    return (
      <div>
        <AdminPageHeader
          eyebrow="Content"
          title="Page"
          accent="content."
          description="Run the latest Supabase migration to create content fields, then refresh this page."
        />
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-24">
      <AdminPageHeader
        eyebrow="Content"
        title="Page"
        accent="content."
        description="Edit headlines and paragraphs for the home page, about page, forms, and banners."
        action={
          <AdminPrimaryButton disabled={saving} onClick={() => void save()}>
            {saving ? 'Saving…' : 'Save content'}
          </AdminPrimaryButton>
        }
      />

      {groups.map(([group, items]) => (
        <AdminPanel key={group} title={group} className="space-y-5">
          {items.map((entry) => (
            <label key={entry.key} className="block">
              <span className="text-sm font-semibold text-white">{entry.field_label}</span>
              {entry.field_type === 'textarea' ? (
                <textarea
                  className={`${adminTextareaClass} mt-2.5`}
                  value={draft[entry.key] ?? ''}
                  onChange={(e) => setDraft((d) => ({ ...d, [entry.key]: e.target.value }))}
                />
              ) : (
                <input
                  className={`${adminInputClass} mt-2.5`}
                  value={draft[entry.key] ?? ''}
                  onChange={(e) => setDraft((d) => ({ ...d, [entry.key]: e.target.value }))}
                />
              )}
            </label>
          ))}
        </AdminPanel>
      ))}

      <SaveToast message={toast} tone={toastTone} />
    </div>
  )
}
