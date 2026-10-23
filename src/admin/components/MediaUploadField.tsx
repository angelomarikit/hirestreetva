import { Film, ImagePlus, Loader2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { uploadWebsiteFile } from '../../lib/storage'
import { adminInputClass } from './AdminField'

type Props = {
  label: string
  hint?: string
  value: string
  storagePath?: string | null
  onChange: (url: string, storagePath?: string | null) => void
  folder?: string
  mode?: 'image' | 'video' | 'any'
}

export function MediaUploadField({
  label,
  hint,
  value,
  onChange,
  folder = 'general',
  mode = 'image',
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const accept =
    mode === 'video'
      ? 'video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov'
      : mode === 'any'
        ? 'image/*,video/mp4,video/webm,video/quicktime'
        : 'image/*'

  const isVideo = (url: string) => /\.(mp4|webm|mov)(\?|$)/i.test(url) || url.includes('video')

  async function onFile(file: File) {
    setUploading(true)
    setError('')
    try {
      const { publicUrl, storagePath } = await uploadWebsiteFile(file, folder)
      onChange(publicUrl, storagePath)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="rounded-xl border border-white/10 bg-ink/30 p-5">
      <p className="text-sm font-semibold text-white">{label}</p>
      {hint && <p className="mt-1 text-xs text-white/45">{hint}</p>}

      {value ? (
        isVideo(value) ? (
          <video
            src={value}
            controls
            className="mt-4 max-h-52 w-full rounded-lg border border-white/10 bg-black object-contain"
          />
        ) : (
          <img
            src={value}
            alt=""
            className="mt-4 max-h-44 w-full rounded-lg border border-white/10 object-cover"
          />
        )
      ) : (
        <div className="mt-4 flex h-32 items-center justify-center rounded-lg border border-dashed border-white/15 text-xs text-white/35">
          No file selected
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold tracking-wide text-white/80 uppercase transition hover:border-rose/40"
        >
          {uploading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : mode === 'video' ? (
            <Film size={14} />
          ) : (
            <ImagePlus size={14} />
          )}
          Upload
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) void onFile(f)
          }}
        />
      </div>

      <input
        className={`${adminInputClass} mt-3`}
        value={value}
        onChange={(e) => onChange(e.target.value, null)}
        placeholder={mode === 'video' ? 'Or paste video URL' : 'Or paste file URL'}
      />
      {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
    </div>
  )
}
