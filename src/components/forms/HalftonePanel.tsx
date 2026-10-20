type Props = {
  className?: string
}

/** Radial halftone fade — matches Framer contact panel decoration */
export function HalftonePanel({ className = '' }: Props) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden rounded-[1.75rem] ${className}`}
      aria-hidden
    >
      <div
        className="absolute -top-8 left-1/2 h-[70%] w-[120%] -translate-x-1/2 opacity-90"
        style={{
          backgroundImage: `radial-gradient(circle, rgb(255 255 255 / 0.55) 1px, transparent 1px)`,
          backgroundSize: '10px 10px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 0%, black 0%, transparent 72%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 0%, black 0%, transparent 72%)',
        }}
      />
    </div>
  )
}
