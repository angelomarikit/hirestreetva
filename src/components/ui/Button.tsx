import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost'

const styles: Record<Variant, string> = {
  primary: 'bg-rose text-white hover:bg-copper border border-transparent',
  secondary:
    'bg-transparent text-white border border-white/25 hover:border-rose/60 hover:text-rose-soft',
  ghost: 'bg-transparent text-ink hover:text-rose border border-ink/10',
}

type BaseProps = {
  variant?: Variant
  className?: string
}

type LinkProps = BaseProps &
  Omit<ComponentProps<typeof Link>, 'className'> & {
    to: string
  }

type ButtonElProps = BaseProps & ComponentProps<'button'>

export function Button(props: LinkProps | ButtonElProps) {
  const variant = props.variant ?? 'primary'
  const className = `inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] ${styles[variant]} ${props.className ?? ''}`

  if ('to' in props && props.to) {
    const { to, variant: _v, className: _c, ...rest } = props
    return <Link to={to} className={className} {...rest} />
  }

  const { variant: _v, className: _c, ...rest } = props as ButtonElProps
  return <button className={className} {...rest} />
}
