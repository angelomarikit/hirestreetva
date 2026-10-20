type Props = {
  className?: string
}

export function DotGridBackground({ className = '' }: Props) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 opacity-[0.35] ${className}`}
      aria-hidden
      style={{
        backgroundImage:
          'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.12) 1px, transparent 0)',
        backgroundSize: '22px 22px',
        maskImage: 'linear-gradient(to bottom, black 20%, transparent 95%)',
      }}
    />
  )
}
