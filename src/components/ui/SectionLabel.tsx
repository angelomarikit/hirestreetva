type Props = {
  children: string
  tone?: 'dark' | 'light'
}

export function SectionLabel({ children, tone = 'dark' }: Props) {
  const colors =
    tone === 'dark'
      ? 'text-rose tracking-[0.28em] text-rose-soft/90'
      : 'text-rose tracking-[0.28em]'

  return (
    <p className={`text-xs font-semibold uppercase ${colors}`}>{children}</p>
  )
}
