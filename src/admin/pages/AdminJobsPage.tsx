import { useEffect, useState } from 'react'
import { deleteJob, fetchAllJobs, upsertJob } from '../../lib/content'
import { isSupabaseConfigured } from '../../lib/supabase'
import type { JobOpening } from '../../types/cms'
import { AdminField, adminInputClass, adminTextareaClass } from '../components/AdminField'
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

export function AdminJobsPage() {
  const [list, setList] = useState<JobOpening[]>([])
  const [editing, setEditing] = useState<
    Partial<JobOpening> & { title: string; slug: string; description: string }
  | null>(null)

  async function load() {
    setList(await fetchAllJobs())
  }

  useEffect(() => {
    void load()
  }, [])

  if (!isSupabaseConfigured) {
    return <AdminNotConfigured feature="Careers" />
  }

  return (
    <div className="space-y-8 pb-16">
      <AdminPageHeader
        eyebrow="Careers"
        title="Job"
        accent="openings."
        description="Only published jobs appear on the Careers page."
        action={
          <AdminPrimaryButton
            type="button"
            onClick={() =>
              setEditing({
                title: '',
                slug: '',
                description: '',
                location: 'Remote',
                employment_type: 'Contract',
                is_published: false,
              })
            }
          >
            Add opening
          </AdminPrimaryButton>
        }
      />

      {!list.length ? (
        <AdminEmptyState message="No job openings yet. Add roles you are hiring for." />
      ) : (
        <ul className="space-y-3">
          {list.map((j) => (
            <AdminListRow
              key={j.id}
              actions={
                <>
                  <AdminSecondaryButton type="button" className="px-4 py-1.5 text-xs" onClick={() => setEditing(j)}>
                    Edit
                  </AdminSecondaryButton>
                  <button
                    type="button"
                    className="text-xs font-medium text-red-300/90 hover:text-red-300"
                    onClick={() => confirm('Delete this opening?') && void deleteJob(j.id).then(load)}
                  >
                    Delete
                  </button>
                </>
              }
            >
              <p className="font-semibold text-white">{j.title}</p>
              <p className="mt-1 text-xs text-white/45">
                {j.location ?? 'Remote'} · {j.employment_type ?? 'Contract'}
              </p>
              <div className="mt-2">
                <AdminStatusBadge published={j.is_published} />
              </div>
            </AdminListRow>
          ))}
        </ul>
      )}

      {editing && (
        <AdminModal
          title={editing.id ? 'Edit opening' : 'New opening'}
          onClose={() => setEditing(null)}
          footer={
            <AdminPrimaryButton
              type="button"
              className="px-5 py-2 text-sm"
              onClick={() =>
                void upsertJob(editing).then(() => {
                  setEditing(null)
                  void load()
                })
              }
            >
              Save
            </AdminPrimaryButton>
          }
        >
          <AdminField label="Job title">
            <input
              className={adminInputClass}
              value={editing.title}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  title: e.target.value,
                  slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                })
              }
            />
          </AdminField>
          <AdminField label="Description">
            <textarea className={adminTextareaClass} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
          </AdminField>
          <AdminField label="Location">
            <input className={adminInputClass} value={editing.location ?? 'Remote'} onChange={(e) => setEditing({ ...editing, location: e.target.value })} />
          </AdminField>
          <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink/30 px-4 py-3 text-sm text-white/80">
            <input
              type="checkbox"
              className="accent-rose"
              checked={editing.is_published ?? false}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  is_published: e.target.checked,
                  published_at: e.target.checked ? new Date().toISOString() : null,
                })
              }
            />
            Published on Careers page
          </label>
        </AdminModal>
      )}
    </div>
  )
}
