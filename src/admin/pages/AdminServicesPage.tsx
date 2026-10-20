import { useEffect, useState } from 'react'
import { deleteService, fetchAllServices, upsertService } from '../../lib/content'
import { isSupabaseConfigured } from '../../lib/supabase'
import type { Service } from '../../types/cms'
import { AdminField, adminInputClass, adminTextareaClass } from '../components/AdminField'
import { ImageUploadField } from '../components/ImageUploadField'
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

const empty = (): Partial<Service> & { title: string } => ({
  title: '',
  slug: '',
  description: '',
  image_url: '',
  sort_order: 0,
  is_published: false,
  cta_href: '/hire',
})

export function AdminServicesPage() {
  const [list, setList] = useState<Service[]>([])
  const [editing, setEditing] = useState<(Partial<Service> & { title: string }) | null>(null)
  const [toast, setToast] = useState('')

  async function load() {
    setList(await fetchAllServices())
  }

  useEffect(() => {
    void load()
  }, [])

  async function save() {
    if (!editing?.title) return
    const slug =
      editing.slug ||
      editing.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    await upsertService({ ...editing, slug })
    setEditing(null)
    setToast('Service saved')
    void load()
    setTimeout(() => setToast(''), 2500)
  }

  if (!isSupabaseConfigured) {
    return <AdminNotConfigured feature="Services" />
  }

  return (
    <div className="space-y-8 pb-16">
      <AdminPageHeader
        eyebrow="Homepage"
        title="Services"
        description="Services appear on the homepage grid and interactive list when published."
        action={
          <AdminPrimaryButton type="button" onClick={() => setEditing(empty())}>
            Add service
          </AdminPrimaryButton>
        }
      />

      {!list.length ? (
        <AdminEmptyState message="No services yet. Add your first service to populate the homepage." />
      ) : (
        <ul className="space-y-3">
          {list.map((s) => (
            <AdminListRow
              key={s.id}
              actions={
                <>
                  <AdminSecondaryButton type="button" className="px-4 py-1.5 text-xs" onClick={() => setEditing(s)}>
                    Edit
                  </AdminSecondaryButton>
                  <button
                    type="button"
                    className="text-xs font-medium text-red-300/90 hover:text-red-300"
                    onClick={() => {
                      if (confirm('Delete this service?')) void deleteService(s.id).then(load)
                    }}
                  >
                    Delete
                  </button>
                </>
              }
            >
              <div className="flex items-center gap-4">
                {s.image_url ? (
                  <img src={s.image_url} alt="" className="h-14 w-20 rounded-lg border border-white/10 object-cover" />
                ) : (
                  <div className="flex h-14 w-20 items-center justify-center rounded-lg border border-dashed border-white/15 text-[10px] text-white/35">
                    No img
                  </div>
                )}
                <div>
                  <p className="font-semibold text-white">{s.title}</p>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/45">
                    Order {s.sort_order}
                    <AdminStatusBadge published={s.is_published} />
                  </p>
                </div>
              </div>
            </AdminListRow>
          ))}
        </ul>
      )}

      {editing && (
        <AdminModal
          title={editing.id ? 'Edit service' : 'New service'}
          onClose={() => setEditing(null)}
          footer={
            <AdminPrimaryButton type="button" className="px-5 py-2 text-sm" onClick={() => void save()}>
              Save service
            </AdminPrimaryButton>
          }
        >
          <AdminField label="Title">
            <input className={adminInputClass} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
          </AdminField>
          <AdminField label="Description">
            <textarea className={adminTextareaClass} value={editing.description ?? ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
          </AdminField>
          <ImageUploadField label="Service image" folder="services" value={editing.image_url ?? ''} onChange={(v) => setEditing({ ...editing, image_url: v })} />
          <AdminField label="Sort order">
            <input type="number" className={adminInputClass} value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} />
          </AdminField>
          <AdminField label="Button link">
            <input className={adminInputClass} value={editing.cta_href ?? '/hire'} onChange={(e) => setEditing({ ...editing, cta_href: e.target.value })} />
          </AdminField>
          <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink/30 px-4 py-3 text-sm text-white/80">
            <input type="checkbox" className="accent-rose" checked={editing.is_published ?? false} onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })} />
            Published on website
          </label>
        </AdminModal>
      )}

      <SaveToast message={toast} />
    </div>
  )
}
