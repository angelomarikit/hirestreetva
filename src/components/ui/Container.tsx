import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'header' | 'footer'
}

export function Container({ children, className = '', as: Tag = 'div' }: Props) {
  return (
    <Tag className={`mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-14 ${className}`}>
      {children}
    </Tag>
  )
}
