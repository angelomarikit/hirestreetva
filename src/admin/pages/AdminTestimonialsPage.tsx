import { useEffect, useState } from 'react'
import { deleteTestimonial, fetchAllTestimonials, upsertTestimonial } from '../../lib/content'
import { isSupabaseConfigured } from '../../lib/supabase'
import type { Testimonial } from '../../types/cms'
import { AdminField, adminInputClass, adminTextareaClass } from '../components/AdminField'
import { ImageUploadField } from '../components/ImageUploadField'
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

export function AdminTestimonialsPage() {
  const [list, setList] = useState<Testimonial[]>([])
  const [editing, setEditing] = useState<Partial<Testimonial> & { quote: string; author_name: string } | null>(null)

  async function load() {
    setList(await fetchAllTestimonials())
  }

  useEffect(() => {
    void load()
  }, [])

  if (!isSupabaseConfigured) {
    return <AdminNotConfigured feature="Testimonials" />
  }

  return (
    <div className="space-y-8 pb-16">
      <AdminPageHeader
        eyebrow="Social proof"
        title="Client"
        accent="testimonials."
        description="Only publish approved client quotes."
        action={
          <AdminPrimaryButton
            type="button"
            onClick={() => setEditing({ quote: '', author_name: '', author_role: '', sort_order: 0, is_published: false })}
          >
            Add testimonial
          </AdminPrimaryButton>
        }
      />

      {!list.length ? (
        <AdminEmptyState message="No testimonials yet. Add quotes from happy clients when you have them." />
      ) : (
        <ul className="space-y-3">
          {list.map((t) => (
            <AdminListRow
              key={t.id}
              actions={
                <AdminSecondaryButton type="button" className="px-4 py-1.5 text-xs" onClick={() => setEditing(t)}>
                  Edit
                </AdminSecondaryButton>
              }
            >
              <p className="editorial-serif text-lg leading-relaxed text-white/85">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-3 text-sm text-white/50">
                — {t.author_name}
                {t.author_role ? `, ${t.author_role}` : ''}
              </p>
              <div className="mt-2">
                <AdminStatusBadge published={t.is_published} />
              </div>
            </AdminListRow>
          ))}
        </ul>
      )}

      {editing && (
        <AdminModal
          title={editing.id ? 'Edit testimonial' : 'New testimonial'}
          onClose={() => setEditing(null)}
          footer={
            <>
              <AdminPrimaryButton
                type="button"
                className="px-5 py-2 text-sm"
                onClick={() =>
                  void upsertTestimonial(editing).then(() => {
                    setEditing(null)
                    void load()
                  })
                }
              >
                Save
              </AdminPrimaryButton>
              {editing.id && (
                <button
                  type="button"
                  className="text-sm font-medium text-red-300/90 hover:text-red-300"
                  onClick={() => void deleteTestimonial(editing.id!).then(() => { setEditing(null); void load() })}
                >
                  Delete
                </button>
              )}
            </>
          }
        >
          <AdminField label="Quote">
            <textarea className={adminTextareaClass} value={editing.quote} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} />
          </AdminField>
          <AdminField label="Name">
            <input className={adminInputClass} value={editing.author_name} onChange={(e) => setEditing({ ...editing, author_name: e.target.value })} />
          </AdminField>
          <AdminField label="Role / company">
            <input className={adminInputClass} value={editing.author_role ?? ''} onChange={(e) => setEditing({ ...editing, author_role: e.target.value })} />
          </AdminField>
          <ImageUploadField label="Photo (optional)" folder="testimonials" value={editing.author_image_url ?? ''} onChange={(v) => setEditing({ ...editing, author_image_url: v })} />
          <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink/30 px-4 py-3 text-sm text-white/80">
            <input type="checkbox" className="accent-rose" checked={editing.is_published ?? false} onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })} />
            Published on website
          </label>
        </AdminModal>
      )}
    </div>
  )
}
