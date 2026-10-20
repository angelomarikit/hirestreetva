import { useEffect, useState } from 'react'
import { deleteFaq, fetchAllFaqs, upsertFaq } from '../../lib/content'
import { isSupabaseConfigured } from '../../lib/supabase'
import type { Faq } from '../../types/cms'
import { AdminField, adminInputClass, adminTextareaClass } from '../components/AdminField'
import { SaveToast } from '../components/SaveToast'
import {
  AdminEmptyState,
  AdminListRow,
  AdminModal,
  AdminNotConfigured,
  AdminPageHeader,
  AdminPrimaryButton,
  AdminSecondaryButton,
  AdminStatusBadge,
} from '../components/AdminUi'

export function AdminFaqsPage() {
  const [list, setList] = useState<Faq[]>([])
  const [editing, setEditing] = useState<Partial<Faq> & { question: string; answer: string } | null>(null)
  const [toast, setToast] = useState('')

  async function load() {
    setList(await fetchAllFaqs())
  }

  useEffect(() => {
    void load()
  }, [])

  if (!isSupabaseConfigured) {
    return <AdminNotConfigured feature="FAQ" />
  }

  return (
    <div className="space-y-8 pb-16">
      <AdminPageHeader
        eyebrow="Homepage"
        title="FAQ"
        description="Questions and answers shown in the homepage FAQ section."
        action={
          <AdminPrimaryButton
            type="button"
            onClick={() => setEditing({ question: '', answer: '', sort_order: list.length + 1, is_published: true })}
          >
            Add question
          </AdminPrimaryButton>
        }
      />

      {!list.length ? (
        <AdminEmptyState message="No FAQs yet. Add common questions your clients ask." />
      ) : (
        <ul className="space-y-3">
          {list.map((f) => (
            <AdminListRow
              key={f.id}
              actions={
                <>
                  <AdminSecondaryButton type="button" className="px-4 py-1.5 text-xs" onClick={() => setEditing(f)}>
                    Edit
                  </AdminSecondaryButton>
                  <button
                    type="button"
                    className="text-xs font-medium text-red-300/90 hover:text-red-300"
                    onClick={() => {
                      if (window.confirm('Delete this FAQ?')) void deleteFaq(f.id).then(load)
                    }}
                  >
                    Delete
                  </button>
                </>
              }
            >
              <p className="font-semibold text-white">{f.question}</p>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/50">{f.answer}</p>
              <div className="mt-2">
                <AdminStatusBadge published={f.is_published} />
              </div>
            </AdminListRow>
          ))}
        </ul>
      )}

      {editing && (
        <AdminModal
          title={editing.id ? 'Edit FAQ' : 'New FAQ'}
          onClose={() => setEditing(null)}
          footer={
            <AdminPrimaryButton
              type="button"
              className="px-5 py-2 text-sm"
              onClick={() =>
                void upsertFaq(editing).then(() => {
                  setEditing(null)
                  setToast('Saved')
                  void load()
                  setTimeout(() => setToast(''), 2500)
                })
              }
            >
              Save
            </AdminPrimaryButton>
          }
        >
          <AdminField label="Question">
            <input className={adminInputClass} value={editing.question} onChange={(e) => setEditing({ ...editing, question: e.target.value })} />
          </AdminField>
          <AdminField label="Answer">
            <textarea className={adminTextareaClass} value={editing.answer} onChange={(e) => setEditing({ ...editing, answer: e.target.value })} />
          </AdminField>
          <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink/30 px-4 py-3 text-sm text-white/80">
            <input type="checkbox" className="accent-rose" checked={editing.is_published ?? true} onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })} />
            Published
          </label>
        </AdminModal>
      )}
      <SaveToast message={toast} />
    </div>
  )
}
