import { useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { BrandLogo } from '../../components/ui/BrandLogo'
import { HalftonePanel } from '../../components/forms/HalftonePanel'
import { supabase } from '../../lib/supabase'
import { useAdminSession } from '../useAdminSession'

const fieldClass =
  'mt-3 w-full border-0 border-b border-white/20 bg-transparent py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-rose/60'

export function AdminLoginPage() {
  const { session, loading } = useAdminSession()
  const configured = Boolean(supabase)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && session) return <Navigate to="/admin" replace />

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!configured || !supabase) {
      setError('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
      return
    }
    setSubmitting(true)
    setError('')
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) setError(authError.message)
    setSubmitting(false)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-6 py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.08) 1px, transparent 0)',
          backgroundSize: '22px 22px',
        }}
      />
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-[50vh] w-[80vw] -translate-x-1/2 opacity-40"
        aria-hidden
        style={{
          background: 'radial-gradient(ellipse at center top, rgb(184 121 112 / 0.15), transparent 70%)',
        }}
      />

      <Link to="/" className="relative mb-10">
        <BrandLogo heightClass="h-14 md:h-16" linked={false} />
      </Link>

      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-md overflow-hidden rounded-[1.75rem] border border-white/10 bg-charcoal p-8 md:p-10"
      >
        <HalftonePanel />

        <div className="relative">
          <p className="text-xs font-semibold tracking-[0.28em] text-rose uppercase">Admin portal</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Welcome
            <span className="editorial-serif mt-1 block text-2xl text-rose-soft md:text-3xl">back.</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/50">
            Authorized administrators only. Sign in to manage website content, images, and inquiries.
          </p>

          <div className="mt-8 h-px w-16 bg-gradient-to-r from-rose/80 to-transparent" />

          <label className="mt-8 block">
            <span className="text-sm font-semibold text-white">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className={fieldClass}
            />
          </label>
          <label className="mt-8 block">
            <span className="text-sm font-semibold text-white">Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              className={fieldClass}
            />
          </label>

          {error && (
            <p className="mt-5 rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-8 w-full rounded-full bg-ivory py-4 text-sm font-semibold text-ink transition hover:bg-white disabled:opacity-60"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </div>
      </form>

      <Link
        to="/"
        className="relative mt-8 text-sm text-white/45 transition hover:text-rose-soft"
      >
        ← Back to website
      </Link>
    </div>
  )
}
