import { useEffect, useState } from 'react'
import {
  deleteOfficeGalleryItem,
  fetchAllOfficeGallery,
  fetchSiteSettings,
  saveSiteSettings,
  upsertOfficeGalleryItem,
} from '../../lib/content'
import { officeGalleryLayoutOptions } from '../../lib/officeGalleryGrid'
import { isSupabaseConfigured } from '../../lib/supabase'
import type { OfficeGalleryGridLayout, OfficeGalleryItem, SiteSettings } from '../../types/cms'
import { defaultSettings } from '../../data/seed'
import { AdminField, adminInputClass } from '../components/AdminField'
import { MediaUploadField } from '../components/MediaUploadField'
import { SaveToast } from '../components/SaveToast'
import {
  AdminEmptyState,
  AdminListRow,
  AdminModal,
  AdminNotConfigured,
  AdminPageHeader,
  AdminPanel,
  AdminPrimaryButton,
  AdminSecondaryButton,
  AdminStatusBadge,
} from '../components/AdminUi'

type EditItem = Partial<OfficeGalleryItem> & {
  media_type: 'image' | 'video'
  public_url: string
}

const emptyItem = (): EditItem => ({
  media_type: 'image',
  public_url: '',
  storage_path: null,
  caption: '',
  grid_layout: 'standard',
  sort_order: 0,
  is_published: true,
})

export function AdminOfficeGalleryPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [list, setList] = useState<OfficeGalleryItem[]>([])
  const [editing, setEditing] = useState<EditItem | null>(null)
  const [toast, setToast] = useState('')
  const [savingVideo, setSavingVideo] = useState(false)

  async function load() {
    const [s, items] = await Promise.all([fetchSiteSettings(), fetchAllOfficeGallery()])
    setSettings(s)
    setList(items)
  }

  useEffect(() => {
    void load()
  }, [])

  async function saveFeaturedVideo() {
    setSavingVideo(true)
    try {
      await saveSiteSettings(settings)
      setToast('Featured video saved')
      setTimeout(() => setToast(''), 2500)
    } catch {
      setToast('Could not save video')
    } finally {
      setSavingVideo(false)
    }
  }

  async function saveItem() {
    if (!editing?.public_url) return
    await upsertOfficeGalleryItem(editing)
    setEditing(null)
    setToast('Gallery item saved')
    void load()
    setTimeout(() => setToast(''), 2500)
  }

  if (!isSupabaseConfigured) {
    return <AdminNotConfigured feature="Office gallery" />
  }

  return (
    <div className="space-y-8 pb-16">
      <AdminPageHeader
        eyebrow="Homepage"
        title="Office"
        accent="gallery."
        description='Manage the “Where support meets professional presence” section — featured video plus image/video tiles. Edit headlines in Page content → Office gallery.'
      />

      <AdminPanel
        title="Featured video"
        description="Optional video shown below the section intro (MP4, WebM, or MOV — max 50MB)."
        className="space-y-4"
      >
        <MediaUploadField
          label="Section video"
          mode="video"
          folder="office"
          value={settings.office_featured_video_url ?? ''}
          onChange={(url) => setSettings((s) => ({ ...s, office_featured_video_url: url || null }))}
        />
        <AdminPrimaryButton type="button" disabled={savingVideo} onClick={() => void saveFeaturedVideo()}>
          {savingVideo ? 'Saving…' : 'Save featured video'}
        </AdminPrimaryButton>
      </AdminPanel>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-lg font-semibold text-white">Gallery tiles</h2>
        <AdminPrimaryButton type="button" onClick={() => setEditing({ ...emptyItem(), sort_order: list.length + 1 })}>
          Add tile
        </AdminPrimaryButton>
      </div>

      {!list.length ? (
        <AdminEmptyState message="No gallery items yet. Add photos or short clips of your office." />
      ) : (
        <ul className="space-y-3">
          {list.map((item) => (
            <AdminListRow
              key={item.id}
              actions={
                <>
                  <AdminSecondaryButton type="button" className="px-4 py-1.5 text-xs" onClick={() => setEditing(item)}>
                    Edit
                  </AdminSecondaryButton>
                  <button
                    type="button"
                    className="text-xs font-medium text-red-300/90 hover:text-red-300"
                    onClick={() => {
                      if (confirm('Remove this gallery item?')) void deleteOfficeGalleryItem(item).then(load)
                    }}
                  >
                    Delete
                  </button>
                </>
              }
            >
              <div className="flex items-center gap-4">
                {item.media_type === 'video' ? (
                  <div className="flex h-14 w-20 items-center justify-center rounded-lg border border-white/10 bg-black text-[10px] text-white/50 uppercase">
                    Video
                  </div>
                ) : (
                  <img src={item.public_url} alt="" className="h-14 w-20 rounded-lg border border-white/10 object-cover" />
                )}
                <div>
                  <p className="font-semibold text-white">{item.caption || 'Untitled'}</p>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/45">
                    {item.media_type} · {item.grid_layout} · order {item.sort_order}
                    <AdminStatusBadge published={item.is_published} />
                  </p>
                </div>
              </div>
            </AdminListRow>
          ))}
        </ul>
      )}

      {editing && (
        <AdminModal
          title={editing.id ? 'Edit gallery tile' : 'New gallery tile'}
          onClose={() => setEditing(null)}
          footer={
            <AdminPrimaryButton type="button" className="px-5 py-2 text-sm" onClick={() => void saveItem()}>
              Save tile
            </AdminPrimaryButton>
          }
        >
          <AdminField label="Media type">
            <select
              className={adminInputClass}
              value={editing.media_type}
              onChange={(e) => setEditing({ ...editing, media_type: e.target.value as 'image' | 'video' })}
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </AdminField>

          <MediaUploadField
            label={editing.media_type === 'video' ? 'Video file' : 'Image file'}
            mode={editing.media_type}
            folder="office"
            value={editing.public_url}
            onChange={(url, storagePath) =>
              setEditing({ ...editing, public_url: url, storage_path: storagePath ?? editing.storage_path ?? null })
            }
          />

          <AdminField label="Caption">
            <input
              className={adminInputClass}
              value={editing.caption ?? ''}
              onChange={(e) => setEditing({ ...editing, caption: e.target.value })}
            />
          </AdminField>

          <AdminField label="Tile size (desktop grid)">
            <select
              className={adminInputClass}
              value={editing.grid_layout ?? 'standard'}
              onChange={(e) =>
                setEditing({ ...editing, grid_layout: e.target.value as OfficeGalleryGridLayout })
              }
            >
              {officeGalleryLayoutOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </AdminField>

          <AdminField label="Sort order">
            <input
              type="number"
              className={adminInputClass}
              value={editing.sort_order ?? 0}
              onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })}
            />
          </AdminField>

          <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink/30 px-4 py-3 text-sm text-white/80">
            <input
              type="checkbox"
              className="accent-rose"
              checked={editing.is_published ?? true}
              onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })}
            />
            Published on homepage
          </label>
        </AdminModal>
      )}

      <SaveToast message={toast} />
    </div>
  )
}
