import type { LucideIcon } from 'lucide-react'

type Props = {
  icon: LucideIcon
  label: string
}

export function SectionPill({ icon: Icon, label }: Props) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-sm">
      <Icon size={14} className="text-white/60" strokeWidth={1.75} />
      {label}
    </span>
  )
}
