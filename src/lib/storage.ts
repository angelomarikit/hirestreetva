import type { MediaAsset } from '../types/cms'
import { isSupabaseConfigured, supabase } from './supabase'

const BUCKET = 'website-media'

function defaultContentType(file: File): string {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  if (file.type) return file.type
  if (ext === 'mp4') return 'video/mp4'
  if (ext === 'webm') return 'video/webm'
  if (ext === 'mov') return 'video/quicktime'
  return `image/${ext || 'jpeg'}`
}

export async function uploadWebsiteFile(
  file: File,
  folder = 'general',
): Promise<{ publicUrl: string; storagePath: string; asset: MediaAsset | null }> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-')
  const path = `${folder}/${Date.now()}-${safeName}`

  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: defaultContentType(file),
  })

  if (uploadError) throw uploadError

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path)
  const publicUrl = urlData.publicUrl

  const { data: asset, error: dbError } = await supabase
    .from('media_assets')
    .insert({
      file_name: file.name,
      storage_path: path,
      public_url: publicUrl,
      folder,
    })
    .select('*')
    .single()

  if (dbError) throw dbError

  return { publicUrl, storagePath: path, asset: asset as MediaAsset }
}

export async function uploadWebsiteImage(
  file: File,
  folder = 'general',
): Promise<{ publicUrl: string; asset: MediaAsset | null }> {
  const { publicUrl, asset } = await uploadWebsiteFile(file, folder)
  return { publicUrl, asset }
}

export async function listMediaAssets(): Promise<MediaAsset[]> {
  if (!isSupabaseConfigured || !supabase) return []
  const { data, error } = await supabase
    .from('media_assets')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data as MediaAsset[]) ?? []
}

export async function deleteMediaAsset(asset: MediaAsset): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return
  await supabase.storage.from(BUCKET).remove([asset.storage_path])
  await supabase.from('media_assets').delete().eq('id', asset.id)
}
