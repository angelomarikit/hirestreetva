import type { BusinessInquiryInput, JobApplicationInput } from '../types/cms'
import { isSupabaseConfigured, supabase } from './supabase'

export async function submitBusinessInquiry(input: BusinessInquiryInput) {
  if (input.honeypot) {
    return { ok: true as const }
  }
  if (!input.consent) {
    return { ok: false as const, message: 'Please confirm consent to continue.' }
  }

  if (!isSupabaseConfigured || !supabase) {
    console.info('[demo] business inquiry', input)
    return { ok: true as const, demo: true as const }
  }

  const { error } = await supabase.from('business_inquiries').insert({
    full_name: input.full_name,
    email: input.email,
    company_name: input.company_name,
    contact_number: input.contact_number,
    service_needed: input.service_needed,
    message: input.message,
    consent: input.consent,
  })

  if (error) return { ok: false as const, message: error.message }
  return { ok: true as const }
}

export async function submitJobApplication(input: JobApplicationInput) {
  if (input.honeypot) return { ok: true as const }
  if (!input.consent) {
    return { ok: false as const, message: 'Please confirm consent to continue.' }
  }

  if (!isSupabaseConfigured || !supabase) {
    console.info('[demo] job application', input)
    return { ok: true as const, demo: true as const }
  }

  const { error } = await supabase.from('job_applications').insert({
    job_opening_id: input.job_opening_id,
    full_name: input.full_name,
    email: input.email,
    phone: input.phone,
    cover_letter: input.cover_letter,
    resume_path: input.resume_path ?? null,
    consent: input.consent,
  })

  if (error) return { ok: false as const, message: error.message }
  return { ok: true as const }
}
