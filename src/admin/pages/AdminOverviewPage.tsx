import {
  Briefcase,
  Building2,
  FileText,
  HelpCircle,
  ImageIcon,
  Inbox,
  MessageSquareQuote,
  Settings,
  Sparkles,
} from 'lucide-react'
import { isSupabaseConfigured } from '../../lib/supabase'
import { AdminAlert, AdminOverviewCard, AdminPageHeader } from '../components/AdminUi'

const cards = [
  { title: 'Website settings', description: 'Hero, photos, contact, address, SEO', to: '/admin/settings', icon: Settings },
  { title: 'Page content', description: 'Headlines and paragraphs', to: '/admin/content', icon: FileText },
  { title: 'Media library', description: 'All uploaded images', to: '/admin/media', icon: ImageIcon },
  { title: 'Office gallery', description: 'Office photos, videos, featured clip', to: '/admin/office', icon: Building2 },
  { title: 'Services', description: 'Homepage service list', to: '/admin/services', icon: Sparkles },
  { title: 'FAQ', description: 'Questions & answers', to: '/admin/faqs', icon: HelpCircle },
  { title: 'Careers', description: 'Job openings', to: '/admin/jobs', icon: Briefcase },
  { title: 'Testimonials', description: 'Client quotes', to: '/admin/testimonials', icon: MessageSquareQuote },
  { title: 'Inquiries', description: 'Form submissions', to: '/admin/inquiries', icon: Inbox },
]

export function AdminOverviewPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Overview"
        title="Welcome to your"
        accent="dashboard."
        description="Update text, photos, services, and contact details without touching code. Changes appear on the live site after you save."
      />

      {!isSupabaseConfigured && (
        <AdminAlert tone="warn">
          Add <code className="text-rose-soft">VITE_SUPABASE_URL</code> and{' '}
          <code className="text-rose-soft">VITE_SUPABASE_ANON_KEY</code> to your <code>.env</code> file, then run
          both SQL migrations in the Supabase SQL editor.
        </AdminAlert>
      )}

      <div className={`grid gap-4 md:grid-cols-2 ${!isSupabaseConfigured ? 'mt-8' : ''}`}>
        {cards.map((card) => (
          <AdminOverviewCard key={card.to} {...card} />
        ))}
      </div>
    </div>
  )
}
