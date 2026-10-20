import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { HalftonePanel } from './HalftonePanel'

type Props = {
  line1?: string
  line2?: string
  formHeading?: string
  panelImage?: string
  panelImageAlt?: string
  children: ReactNode
}

export function ContactFormLayout({
  line1 = "Let's Talk",
  line2 = 'Your Next Move Forward',
  formHeading = 'Fill This Form Below',
  panelImage,
  panelImageAlt = 'Business professionals collaborating at a laptop in a modern office',
  children,
}: Props) {
  const reduce = useReducedMotion()

  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
      <motion.div
        className="relative flex min-h-[420px] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-charcoal md:min-h-[560px]"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <HalftonePanel />

        {panelImage && (
          <div className="relative mx-6 mt-6 min-h-[200px] flex-1 overflow-hidden rounded-2xl md:mx-8 md:mt-8 md:min-h-[260px]">
            <img
              src={panelImage}
              alt={panelImageAlt}
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="lazy"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/25 to-black/10"
              aria-hidden
            />
            <div
              className="absolute inset-0 opacity-60 mix-blend-overlay"
              style={{
                backgroundImage: `radial-gradient(circle, rgb(255 255 255 / 0.35) 1px, transparent 1px)`,
                backgroundSize: '8px 8px',
              }}
              aria-hidden
            />
          </div>
        )}

        <div className="relative z-10 p-6 pt-5 md:p-8 md:pt-6 lg:p-10 lg:pt-8">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {line1}
          </h2>
          <p className="editorial-serif mt-1 text-3xl text-white/95 md:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {line2}
          </p>
        </div>
      </motion.div>

      <motion.div
        className="flex min-h-[420px] flex-col rounded-[1.75rem] border border-white/10 bg-charcoal p-6 md:min-h-[560px] md:p-8 lg:p-10"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-sm font-medium text-white/55 md:text-base">{formHeading}</p>
        <div className="mt-6 flex flex-1 flex-col md:mt-8">{children}</div>
      </motion.div>
    </div>
  )
}
