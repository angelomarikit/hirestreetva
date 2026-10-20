import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function AdminPageHeader({
  eyebrow = 'Dashboard',
  title,
  accent,
  description,
  action,
}: {
  eyebrow?: string
  title: string
  accent?: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.28em] text-rose uppercase">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {title}
          {accent && (
            <span className="editorial-serif mt-1 block text-2xl font-normal text-rose-soft md:text-3xl">
              {accent}
            </span>
          )}
        </h1>
        {description && <p className="mt-4 text-sm leading-relaxed text-white/55 md:text-base">{description}</p>}
      </div>
      {action}
    </div>
  )
}

export function AdminPanel({
  children,
  title,
  description,
  className = '',
}: {
  children: ReactNode
  title?: string
  description?: string
  className?: string
}) {
  return (
    <section
      className={`overflow-hidden rounded-[1.25rem] border border-white/10 bg-charcoal/80 p-6 md:p-8 ${className}`}
    >
      {(title || description) && (
        <div className="mb-6 border-b border-white/10 pb-5">
          {title && <h2 className="text-lg font-semibold text-white">{title}</h2>}
          {description && <p className="mt-1 text-sm text-white/45">{description}</p>}
        </div>
      )}
      {children}
    </section>
  )
}

export function AdminPrimaryButton({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-full bg-ivory px-6 py-2.5 text-sm font-semibold text-ink transition hover:bg-white disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function AdminSecondaryButton({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white/80 transition hover:border-rose/40 hover:text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function AdminOverviewCard({
  to,
  icon: Icon,
  title,
  description,
}: {
  to: string
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <Link
      to={to}
      className="group block rounded-[1.25rem] border border-white/10 bg-charcoal/60 p-6 transition hover:border-rose/35 hover:bg-charcoal"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-rose-soft transition group-hover:border-rose/30">
        <Icon size={18} strokeWidth={1.75} />
      </span>
      <p className="mt-5 font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-white/45">{description}</p>
      <span className="mt-4 inline-block text-xs font-medium tracking-wide text-rose/80 uppercase opacity-0 transition group-hover:opacity-100">
        Open →
      </span>
    </Link>
  )
}

export function AdminStatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${
        published ? 'bg-emerald-500/15 text-emerald-300' : 'bg-white/10 text-white/45'
      }`}
    >
      {published ? 'Published' : 'Draft'}
    </span>
  )
}

export function AdminListRow({
  children,
  actions,
}: {
  children: ReactNode
  actions?: ReactNode
}) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-ink/40 p-4 transition hover:border-white/15">
      <div className="min-w-0 flex-1">{children}</div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div>}
    </li>
  )
}

export function AdminNotConfigured({ feature }: { feature: string }) {
  return (
    <div>
      <AdminPageHeader title={feature} description="Connect Supabase to use this section." />
      <AdminAlert tone="warn">
        Add <code className="text-rose-soft">VITE_SUPABASE_URL</code> and{' '}
        <code className="text-rose-soft">VITE_SUPABASE_ANON_KEY</code> to your <code>.env</code> file, then run
        the SQL migrations in the Supabase SQL editor.
      </AdminAlert>
    </div>
  )
}

export function AdminEmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-12 text-center text-sm text-white/45">
      {message}
    </div>
  )
}

export function AdminModal({
  title,
  children,
  onClose,
  footer,
}: {
  title: string
  children: ReactNode
  onClose: () => void
  footer?: ReactNode
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[1.25rem] border border-white/10 bg-charcoal shadow-2xl">
        <div className="border-b border-white/10 px-6 py-5">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
        </div>
        <div className="space-y-4 p-6">{children}</div>
        <div className="flex flex-wrap items-center gap-3 border-t border-white/10 px-6 py-4">
          {footer}
          <AdminSecondaryButton type="button" onClick={onClose} className="ml-auto">
            Cancel
          </AdminSecondaryButton>
        </div>
      </div>
    </div>
  )
}

export function AdminAlert({ tone, children }: { tone: 'warn' | 'info'; children: ReactNode }) {
  const styles =
    tone === 'warn'
      ? 'border-amber-500/30 bg-amber-500/10 text-amber-100'
      : 'border-rose/25 bg-rose/10 text-rose-soft'
  return <div className={`rounded-xl border px-4 py-3 text-sm ${styles}`}>{children}</div>
}
