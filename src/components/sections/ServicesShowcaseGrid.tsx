import { Layers, Layout, LineChart, Sparkles } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { Service } from '../../types/cms'
import { Container } from '../ui/Container'
import { SectionPill } from '../ui/SectionPill'
import { useSpotlight } from '../../hooks/useSpotlight'

const icons = [Layers, Layout, Sparkles, LineChart]

type Props = {
  services: Service[]
}

function ServiceGlassIcon({ index }: { index: number }) {
  const Icon = icons[index % icons.length]
  return (
    <div className="relative mx-auto flex h-36 w-full max-w-[200px] items-end justify-center pb-2 md:h-44">
      <div className="absolute inset-x-6 bottom-0 h-24 rounded-t-[100%] bg-white/[0.04]" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-white/15 to-white/[0.02] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.25)] backdrop-blur-md transition-transform duration-500 group-hover:scale-105 group-hover:border-rose/30">
        <Icon className="text-white/85" size={28} strokeWidth={1.5} />
      </div>
    </div>
  )
}

function ServiceGridCell({
  service,
  index,
}: {
  service: Service
  index: number
}) {
  const { onMove, onLeave, spotlightStyle } = useSpotlight<HTMLDivElement>()
  const number = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative min-h-[320px] border-b border-white/10 p-6 md:min-h-[380px] md:border-b-0 md:border-r md:p-8 last:md:border-r-0"
    >
      <div
        className="absolute inset-0 rounded-none opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={spotlightStyle}
        aria-hidden
      />
      <div
        className="relative flex h-full flex-col"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <ServiceGlassIcon index={index} />
        <p className="mt-4 text-sm text-white/45">/{number}</p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-white md:text-xl">
          {service.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">{service.description}</p>
      </div>
    </motion.div>
  )
}

export function ServicesShowcaseGrid({ services }: Props) {
  const reduce = useReducedMotion()
  const featured = services.slice(0, 4)

  if (featured.length === 0) return null

  return (
    <section className="relative overflow-hidden bg-ink py-20 md:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-12">
          <div>
            <SectionPill icon={Sparkles} label="Our Services" />
            <h2 className="mt-8 text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight">
              <span className="editorial-serif font-normal text-white">What </span>
              <span className="font-medium text-white">We Do</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/55 lg:ml-auto lg:text-right md:text-base">
            We help businesses access virtual support that keeps operations moving — blending
            responsiveness, professionalism, and flexible assistance built around your goals.
          </p>
        </div>

        <motion.div
          className="mt-12 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.02] md:mt-16"
          initial={reduce ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            {featured.map((service, index) => (
              <ServiceGridCell key={service.id} service={service} index={index} />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
