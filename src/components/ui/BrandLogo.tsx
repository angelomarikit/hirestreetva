import { Link } from 'react-router-dom'

type Props = {
  className?: string
  /** Tailwind height utility — width follows aspect ratio via w-auto */
  heightClass?: string
  linked?: boolean
}

export function BrandLogo({
  className = '',
  heightClass = 'h-16 sm:h-[4.5rem] md:h-20 lg:h-[5.25rem]',
  linked = true,
}: Props) {
  const image = (
    <img
      src="/logo.png"
      alt="Hire Street VA — Executive Business Support Services"
      className={`${heightClass} w-auto max-w-none object-contain object-left ${className}`}
      decoding="async"
      fetchPriority="high"
    />
  )

  if (!linked) return image

  return (
    <Link
      to="/"
      className="inline-flex shrink-0 items-center py-1 transition-opacity hover:opacity-90"
      aria-label="Hire Street VA home"
    >
      {image}
    </Link>
  )
}
