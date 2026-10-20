import { ImagePlus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { listMediaAssets, deleteMediaAsset, uploadWebsiteImage } from '../../lib/storage'
import { isSupabaseConfigured } from '../../lib/supabase'
import type { MediaAsset } from '../../types/cms'
import { SaveToast } from '../components/SaveToast'
import { AdminEmptyState, AdminNotConfigured, AdminPageHeader } from '../components/AdminUi'

export function AdminMediaPage() {
  const [assets, setAssets] = useState<MediaAsset[]>([])
  const [toast, setToast] = useState('')

  async function load() {
    setAssets(await listMediaAssets())
  }

  useEffect(() => {
    void load()
  }, [])

  if (!isSupabaseConfigured) {
    return <AdminNotConfigured feature="Media library" />
  }

  return (
    <div className="space-y-8 pb-16">
      <AdminPageHeader
        eyebrow="Assets"
        title="Media"
        accent="library."
        description="Every photo you upload here is stored in Supabase. Use Settings or Services to assign images to pages."
        action={
          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white/80 transition hover:border-rose/40 hover:text-white">
            <ImagePlus size={16} />
            Upload image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (!f) return
                void uploadWebsiteImage(f, 'library').then(() => {
                  setToast('Image uploaded')
                  void load()
                  setTimeout(() => setToast(''), 2500)
                })
              }}
            />
          </label>
        }
      />

      {!assets.length ? (
        <AdminEmptyState message="No uploads yet. Use Upload image to add your first file." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {assets.map((asset) => (
            <article
              key={asset.id}
              className="group overflow-hidden rounded-[1.25rem] border border-white/10 bg-charcoal/60 transition hover:border-rose/25"
            >
              <img src={asset.public_url} alt="" className="aspect-video w-full object-cover" />
              <div className="flex items-center justify-between gap-2 border-t border-white/10 p-3">
                <p className="truncate text-xs font-medium text-white/75">{asset.file_name}</p>
                <button
                  type="button"
                  className="rounded-lg p-1.5 text-white/40 transition hover:bg-red-500/10 hover:text-red-300"
                  aria-label="Delete"
                  onClick={() => {
                    if (!confirm('Delete this image from storage?')) return
                    void deleteMediaAsset(asset).then(load)
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="px-3 pb-3 text-[10px] leading-relaxed break-all text-white/30">{asset.public_url}</p>
            </article>
          ))}
        </div>
      )}

      <SaveToast message={toast} />
    </div>
  )
}
