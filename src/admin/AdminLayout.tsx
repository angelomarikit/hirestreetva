import {
  Briefcase,
  FileText,
  HelpCircle,
  ImageIcon,
  Inbox,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  Settings,
  Sparkles,
} from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { BrandLogo } from '../components/ui/BrandLogo'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

const nav = [
  { to: '/admin', label: 'Overview', end: true, icon: LayoutDashboard },
  { to: '/admin/settings', label: 'Website settings', icon: Settings },
  { to: '/admin/content', label: 'Page content', icon: FileText },
  { to: '/admin/media', label: 'Media library', icon: ImageIcon },
  { to: '/admin/services', label: 'Services', icon: Sparkles },
  { to: '/admin/faqs', label: 'FAQ', icon: HelpCircle },
  { to: '/admin/jobs', label: 'Careers', icon: Briefcase },
  { to: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { to: '/admin/inquiries', label: 'Inquiries', icon: Inbox },
]

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-ink text-white">
      <div className="lg:flex">
        <aside className="border-b border-white/10 bg-charcoal/90 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[292px] lg:shrink-0 lg:flex-col lg:border-r lg:border-b-0">
          <div className="border-b border-white/10 px-6 py-6 lg:border-b-0">
            <BrandLogo heightClass="h-11" />
            <p className="mt-4 text-xs font-semibold tracking-[0.22em] text-rose uppercase">Admin portal</p>
            <p className="mt-1 text-xs text-white/40">Manage your website content</p>
          </div>

          <nav className="flex gap-1 overflow-x-auto px-3 py-4 lg:flex-1 lg:flex-col lg:overflow-visible lg:px-4">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition lg:px-4 lg:py-3 ${
                    isActive
                      ? 'border border-rose/25 bg-rose/10 text-rose-soft'
                      : 'border border-transparent text-white/65 hover:bg-white/[0.04] hover:text-white'
                  }`
                }
              >
                <item.icon size={17} strokeWidth={1.75} className="opacity-80" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-white/10 px-6 py-5">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-white/50 transition hover:text-rose-soft"
            >
              ← View website
            </Link>
            {isSupabaseConfigured && supabase ? (
              <button
                type="button"
                className="mt-3 flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
                onClick={() => void supabase!.auth.signOut()}
              >
                <LogOut size={15} />
                Sign out
              </button>
            ) : null}
          </div>
        </aside>

        <main className="relative min-w-0 flex-1">
          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            aria-hidden
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.07) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="relative mx-auto max-w-5xl px-6 py-8 md:px-10 md:py-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
