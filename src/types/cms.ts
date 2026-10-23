export type Service = {
  id: string
  title: string
  slug: string
  description: string
  image_url: string
  sort_order: number
  is_published: boolean
  cta_href: string
}

export type Testimonial = {
  id: string
  quote: string
  author_name: string
  author_role: string
  author_image_url: string | null
  sort_order: number
  is_published: boolean
}

export type Faq = {
  id: string
  question: string
  answer: string
  sort_order: number
  is_published: boolean
}

export type JobOpening = {
  id: string
  title: string
  slug: string
  location: string
  employment_type: string
  description: string
  is_published: boolean
  published_at: string | null
}

export type SiteSettings = {
  site_name: string
  tagline: string
  hero_eyebrow: string
  hero_title_line1: string
  hero_title_line2: string
  hero_description: string
  hero_image_url: string
  primary_cta_label: string
  primary_cta_href: string
  secondary_cta_label: string
  secondary_cta_href: string
  contact_email: string | null
  phone: string | null
  phone_secondary: string | null
  whatsapp_url: string | null
  messenger_url: string | null
  instagram_url: string | null
  linkedin_url: string | null
  address_line1: string | null
  address_line2: string | null
  address_line3: string | null
  meta_title: string
  meta_description: string
  og_image_url: string | null
  image_home_about: string | null
  image_about_page: string | null
  image_contact_panel: string | null
  image_careers_panel: string | null
  image_business_cta: string | null
  office_featured_video_url: string | null
}

export type OfficeGalleryGridLayout = 'large' | 'standard' | 'wide'

export type OfficeGalleryItem = {
  id: string
  media_type: 'image' | 'video'
  public_url: string
  storage_path: string | null
  caption: string
  grid_layout: OfficeGalleryGridLayout
  sort_order: number
  is_published: boolean
  created_at?: string
}

export type ContentEntry = {
  key: string
  group_label: string
  field_label: string
  field_type: 'text' | 'textarea' | 'image' | 'url'
  value: string
  sort_order: number
}

export type MediaAsset = {
  id: string
  file_name: string
  storage_path: string
  public_url: string
  alt_text: string | null
  folder: string
  created_at: string
}

export type BusinessInquiryInput = {
  full_name: string
  email: string
  company_name: string
  contact_number: string
  service_needed: string
  message: string
  consent: boolean
  honeypot?: string
}

export type JobApplicationInput = {
  job_opening_id: string | null
  full_name: string
  email: string
  phone: string
  cover_letter: string
  resume_path?: string
  consent: boolean
  honeypot?: string
}
