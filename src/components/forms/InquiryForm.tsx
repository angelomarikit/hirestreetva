import { useState, type FormEvent } from 'react'
import { submitBusinessInquiry } from '../../lib/forms'

type Props = {
  defaultService?: string
}

export function InquiryForm({ defaultService = '' }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const fd = new FormData(e.currentTarget)

    const result = await submitBusinessInquiry({
      full_name: String(fd.get('full_name') ?? ''),
      email: String(fd.get('email') ?? ''),
      company_name: String(fd.get('company_name') ?? ''),
      contact_number: String(fd.get('contact_number') ?? ''),
      service_needed: String(fd.get('service_needed') ?? ''),
      message: String(fd.get('message') ?? ''),
      consent: fd.get('consent') === 'on',
      honeypot: String(fd.get('company_website') ?? ''),
    })

    if (!result.ok) {
      setStatus('error')
      setMessage(result.message ?? 'Something went wrong. Please try again.')
      return
    }

    setStatus('success')
    setMessage('Thank you — your message has been received. Our team will follow up shortly.')
    e.currentTarget.reset()
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-1 flex-col">
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="space-y-8">
        <UnderlineField
          label="Your Name"
          name="full_name"
          placeholder="Enter your full name"
          required
        />
        <UnderlineField
          label="Your Email"
          name="email"
          type="email"
          placeholder="Enter the e-mail"
          required
        />
        <UnderlineField
          label="Company Name"
          name="company_name"
          placeholder="Enter your company (optional)"
        />
        <UnderlineField
          label="Contact Number"
          name="contact_number"
          type="tel"
          placeholder="Enter your phone number"
        />
        <UnderlineField
          label="Service Needed"
          name="service_needed"
          placeholder="Which support do you need?"
          defaultValue={defaultService}
        />
        <UnderlineTextarea
          label="More About Your Needs"
          name="message"
          placeholder="Tell us about your business and the support you're looking for"
          required
        />
      </div>

      <label className="mt-8 flex items-start gap-3 text-xs leading-relaxed text-white/45">
        <input
          name="consent"
          type="checkbox"
          className="mt-0.5 accent-rose"
          required
        />
        <span>
          I agree to be contacted about my inquiry and understand my information will be handled
          securely.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-8 w-full rounded-full bg-ivory py-4 text-sm font-semibold text-ink transition hover:bg-white disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>

      {status === 'success' && <p className="mt-4 text-sm text-rose-soft">{message}</p>}
      {status === 'error' && <p className="mt-4 text-sm text-red-300">{message}</p>}
    </form>
  )
}

const inputClass =
  'w-full border-0 border-b border-white/20 bg-transparent py-2.5 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-rose/60 focus:placeholder:text-white/25'

function UnderlineField({
  label,
  name,
  type = 'text',
  placeholder,
  required,
  defaultValue,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  defaultValue?: string
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-white">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`mt-3 ${inputClass}`}
      />
    </label>
  )
}

function UnderlineTextarea({
  label,
  name,
  placeholder,
  required,
}: {
  label: string
  name: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-white">{label}</span>
      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        rows={4}
        className={`mt-3 resize-none ${inputClass}`}
      />
    </label>
  )
}
