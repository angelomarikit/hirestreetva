type Props = {
  label: string
  hint?: string
  children: React.ReactNode
}

export function AdminField({ label, hint, children }: Props) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-white">{label}</span>
      {hint && <span className="mt-1 block text-xs leading-relaxed text-white/45">{hint}</span>}
      <div className="mt-2.5">{children}</div>
    </label>
  )
}

export const adminInputClass =
  'w-full rounded-xl border border-white/10 bg-ink/50 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-rose/50 focus:ring-1 focus:ring-rose/20'

export const adminTextareaClass = `${adminInputClass} min-h-[120px] resize-y leading-relaxed`
