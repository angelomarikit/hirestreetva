import { defaultContentMap } from '../data/contentDefaults'
import {
  defaultFaqs,
  defaultJobs,
  defaultServices,
  defaultSettings,
  defaultTestimonials,
} from '../data/seed'
import { defaultOfficeGalleryItems } from '../data/officeGallery'
import type {
  ContentEntry,
  Faq,
  JobOpening,
  MediaAsset,
  OfficeGalleryItem,
  Service,
  SiteSettings,
  Testimonial,
} from '../types/cms'
import { isSupabaseConfigured, supabase } from './supabase'

export async function fetchSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured || !supabase) return defaultSettings
  const { data, error } = await supabase.from('site_settings').select('*').eq('id', 1).maybeSingle()
  if (error || !data) return defaultSettings
  return { ...defaultSettings, ...data }
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured')
  const { error } = await supabase
    .from('site_settings')
    .upsert({ ...settings, id: 1, updated_at: new Date().toISOString() })
  if (error) throw error
}

export async function fetchContentEntries(): Promise<ContentEntry[]> {
  if (!isSupabaseConfigured || !supabase) return []
  const { data, error } = await supabase
    .from('content_entries')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error || !data) return []
  return data as ContentEntry[]
}

export async function fetchContentMap(): Promise<Record<string, string>> {
  const entries = await fetchContentEntries()
  const map = { ...defaultContentMap }
  for (const e of entries) {
    if (e.value) map[e.key] = e.value
  }
  return map
}

export async function saveContentEntry(key: string, value: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured')
  const { error } = await supabase
    .from('content_entries')
    .update({ value, updated_at: new Date().toISOString() })
    .eq('key', key)
  if (error) throw error
}

export async function saveContentEntries(updates: Record<string, string>): Promise<void> {
  for (const [key, value] of Object.entries(updates)) {
    await saveContentEntry(key, value)
  }
}

export function contentOr(map: Record<string, string>, key: string, fallback = ''): string {
  return map[key]?.trim() || defaultContentMap[key] || fallback
}

export async function fetchPublishedServices(): Promise<Service[]> {
  if (!isSupabaseConfigured || !supabase) {
    return defaultServices.filter((s) => s.is_published)
  }
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
  if (error || !data?.length) return defaultServices.filter((s) => s.is_published)
  return data as Service[]
}

export async function fetchAllServices(): Promise<Service[]> {
  if (!isSupabaseConfigured || !supabase) return defaultServices
  const { data, error } = await supabase.from('services').select('*').order('sort_order')
  if (error || !data) return defaultServices
  return data as Service[]
}

export async function upsertService(service: Partial<Service> & { title: string }): Promise<void> {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured')
  const payload = {
    ...service,
    updated_at: new Date().toISOString(),
  }
  if (service.id) {
    const { error } = await supabase.from('services').update(payload).eq('id', service.id)
    if (error) throw error
  } else {
    const { error } = await supabase.from('services').insert(payload)
    if (error) throw error
  }
}

export async function deleteService(id: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured')
  const { error } = await supabase.from('services').delete().eq('id', id)
  if (error) throw error
}

export async function fetchPublishedFaqs(): Promise<Faq[]> {
  if (!isSupabaseConfigured || !supabase) return defaultFaqs.filter((f) => f.is_published)
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
  if (error || !data?.length) return defaultFaqs.filter((f) => f.is_published)
  return data as Faq[]
}

export async function fetchAllFaqs(): Promise<Faq[]> {
  if (!isSupabaseConfigured || !supabase) return defaultFaqs
  const { data, error } = await supabase.from('faqs').select('*').order('sort_order')
  if (error || !data) return defaultFaqs
  return data as Faq[]
}

export async function upsertFaq(faq: Partial<Faq> & { question: string; answer: string }): Promise<void> {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured')
  if (faq.id) {
    const { error } = await supabase.from('faqs').update(faq).eq('id', faq.id)
    if (error) throw error
  } else {
    const { error } = await supabase.from('faqs').insert(faq)
    if (error) throw error
  }
}

export async function deleteFaq(id: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured')
  const { error } = await supabase.from('faqs').delete().eq('id', id)
  if (error) throw error
}

export async function fetchPublishedTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured || !supabase) return defaultTestimonials
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
  if (error || !data) return []
  return data as Testimonial[]
}

export async function fetchAllTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured || !supabase) return []
  const { data, error } = await supabase.from('testimonials').select('*').order('sort_order')
  if (error || !data) return []
  return data as Testimonial[]
}

export async function upsertTestimonial(
  item: Partial<Testimonial> & { quote: string; author_name: string },
): Promise<void> {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured')
  if (item.id) {
    const { error } = await supabase.from('testimonials').update(item).eq('id', item.id)
    if (error) throw error
  } else {
    const { error } = await supabase.from('testimonials').insert(item)
    if (error) throw error
  }
}

export async function deleteTestimonial(id: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured')
  const { error } = await supabase.from('testimonials').delete().eq('id', id)
  if (error) throw error
}

export async function fetchPublishedJobs(): Promise<JobOpening[]> {
  if (!isSupabaseConfigured || !supabase) return defaultJobs
  const { data, error } = await supabase
    .from('job_openings')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
  if (error || !data) return []
  return data as JobOpening[]
}

export async function fetchAllJobs(): Promise<JobOpening[]> {
  if (!isSupabaseConfigured || !supabase) return []
  const { data, error } = await supabase.from('job_openings').select('*').order('created_at', {
    ascending: false,
  })
  if (error || !data) return []
  return data as JobOpening[]
}

export async function upsertJob(
  job: Partial<JobOpening> & { title: string; slug: string; description: string },
): Promise<void> {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured')
  if (job.id) {
    const { error } = await supabase.from('job_openings').update(job).eq('id', job.id)
    if (error) throw error
  } else {
    const { error } = await supabase.from('job_openings').insert(job)
    if (error) throw error
  }
}

export async function deleteJob(id: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured')
  const { error } = await supabase.from('job_openings').delete().eq('id', id)
  if (error) throw error
}

function fallbackOfficeGallery(): OfficeGalleryItem[] {
  return defaultOfficeGalleryItems.map((item, i) => ({
    ...item,
    id: `fallback-${i}`,
  }))
}

export async function fetchPublishedOfficeGallery(): Promise<OfficeGalleryItem[]> {
  if (!isSupabaseConfigured || !supabase) return fallbackOfficeGallery()
  const { data, error } = await supabase
    .from('office_gallery_items')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
  if (error || !data?.length) return fallbackOfficeGallery()
  return data as OfficeGalleryItem[]
}

export async function fetchAllOfficeGallery(): Promise<OfficeGalleryItem[]> {
  if (!isSupabaseConfigured || !supabase) return fallbackOfficeGallery()
  const { data, error } = await supabase
    .from('office_gallery_items')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error || !data) return []
  return data as OfficeGalleryItem[]
}

export async function upsertOfficeGalleryItem(
  item: Partial<OfficeGalleryItem> & {
    media_type: 'image' | 'video'
    public_url: string
  },
): Promise<void> {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured')
  const payload = {
    media_type: item.media_type,
    public_url: item.public_url,
    storage_path: item.storage_path ?? null,
    caption: item.caption ?? '',
    grid_layout: item.grid_layout ?? 'standard',
    sort_order: item.sort_order ?? 0,
    is_published: item.is_published ?? true,
  }
  if (item.id && !item.id.startsWith('fallback-')) {
    const { error } = await supabase.from('office_gallery_items').update(payload).eq('id', item.id)
    if (error) throw error
  } else {
    const { error } = await supabase.from('office_gallery_items').insert(payload)
    if (error) throw error
  }
}

export async function deleteOfficeGalleryItem(item: OfficeGalleryItem): Promise<void> {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured')
  if (item.storage_path) {
    await supabase.storage.from('website-media').remove([item.storage_path])
  }
  if (!item.id.startsWith('fallback-')) {
    const { error } = await supabase.from('office_gallery_items').delete().eq('id', item.id)
    if (error) throw error
  }
}

export type { MediaAsset }
