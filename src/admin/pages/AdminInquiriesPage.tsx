import { Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../../lib/supabase'
import { AdminEmptyState, AdminNotConfigured, AdminPageHeader, AdminPanel } from '../components/AdminUi'

type Inquiry = {
  id: string
  full_name: string
  email: string
  company_name: string | null
  service_needed: string | null
  created_at: string
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))
  } catch {
    return iso
  }
}

export function AdminInquiriesPage() {
  const [rows, setRows] = useState<Inquiry[]>([])

  useEffect(() => {
    void (async () => {
      if (!isSupabaseConfigured || !supabase) return
      const { data } = await supabase
        .from('business_inquiries')
        .select('id, full_name, email, company_name, service_needed, created_at')
        .order('created_at', { ascending: false })
      setRows((data as Inquiry[]) ?? [])
    })()
  }, [])

  if (!isSupabaseConfigured) {
    return <AdminNotConfigured feature="Inquiries" />
  }

  return (
    <div className="space-y-8 pb-16">
      <AdminPageHeader
        eyebrow="Leads"
        title="Business"
        accent="inquiries."
        description="Submissions from the contact and hire forms on your live site."
      />

      {!rows.length ? (
        <AdminEmptyState message="No inquiries yet. New form submissions will appear here." />
      ) : (
        <ul className="space-y-4">
          {rows.map((row) => (
            <li key={row.id}>
              <AdminPanel className="!p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-white">{row.full_name}</p>
                    <p className="mt-1 text-xs tracking-wide text-white/40 uppercase">{formatDate(row.created_at)}</p>
                  </div>
                  <a
                    href={`mailto:${row.email}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-rose-soft transition hover:border-rose/40"
                  >
                    <Mail size={14} />
                    Reply
                  </a>
                </div>
                <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-white/40 uppercase">Email</dt>
                    <dd className="mt-1 text-white/75">{row.email}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold tracking-wide text-white/40 uppercase">Company</dt>
                    <dd className="mt-1 text-white/75">{row.company_name ?? '—'}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-semibold tracking-wide text-white/40 uppercase">Service needed</dt>
                    <dd className="mt-1 text-white/75">{row.service_needed ?? 'General inquiry'}</dd>
                  </div>
                </dl>
              </AdminPanel>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
