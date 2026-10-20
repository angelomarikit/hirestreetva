import { phoneTelHref } from '../../lib/phone'

type Props = {
  primary: string | null | undefined
  secondary?: string | null | undefined
  className?: string
  linkClassName?: string
}

export function SitePhoneList({ primary, secondary, className = '', linkClassName = '' }: Props) {
  const numbers = [primary, secondary].filter(Boolean) as string[]
  if (!numbers.length) return null

  return (
    <div className={`space-y-1 ${className}`}>
      {numbers.map((num) => (
        <a key={num} href={phoneTelHref(num)} className={`block hover:text-rose-soft ${linkClassName}`}>
          {num}
        </a>
      ))}
    </div>
  )
}
