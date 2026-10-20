import { Code2, Lightbulb, PencilRuler, Rocket, Waves } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { Container } from '../ui/Container'
import { DotGridBackground } from '../ui/DotGridBackground'
import { SectionPill } from '../ui/SectionPill'
import { useSpotlight } from '../../hooks/useSpotlight'

const steps: {
  title: string
  description: string
  icon: LucideIcon
}[] = [
  {
    title: 'Discover',
    description:
      'Share your requirements, priorities, and workflow so we understand the support your business needs.',
    icon: Lightbulb,
  },
  {
    title: 'Design',
    description:
      'Explore suitable virtual assistance options aligned with your operations, tools, and communication style.',
    icon: PencilRuler,
  },
  {
    title: 'Develop',
    description:
      'Connect with our team, clarify expectations, and prepare a collaboration path that fits your business.',
    icon: Code2,
  },
  {
    title: 'Launch & Grow',
    description:
      'Start your VA journey with structured support so you can focus on leadership, growth, and priorities.',
    icon: Rocket,
  },
]

function ProcessCard({
  step,
  index,
}: {
  step: (typeof steps)[0]
  index: number
}) {
  const { onMove, onLeave, spotlightStyle } = useSpotlight<HTMLDivElement>()
  const Icon = step.icon
  const number = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex min-h-[340px] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 md:min-h-[380px] md:p-8"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={spotlightStyle}
        aria-hidden
      />
      <div className="relative flex flex-1 flex-col">
        <p className="text-sm text-white/40">/{number}</p>
        <h3 className="mt-3 text-xl font-semibold text-white">{step.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/55">{step.description}</p>
      </div>

      <div className="relative mt-8 flex justify-center pb-2">
        <div className="absolute bottom-0 h-16 w-32 rounded-t-full bg-white/[0.05]" aria-hidden />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-ink shadow-lg transition-transform duration-500 group-hover:scale-110">
          <Icon size={22} strokeWidth={1.75} />
        </div>
      </div>
    </motion.article>
  )
}

export function ProcessStudioSection() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-32">
      <DotGridBackground />

      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-12">
          <div>
            <SectionPill icon={Waves} label="Our Process" />
            <h2 className="mt-8 max-w-xl text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.08] tracking-tight">
              <span className="editorial-serif block text-white/95">The Journey</span>
              <span className="block bg-gradient-to-r from-white via-white/90 to-white/50 bg-clip-text font-medium text-transparent">
                to Successful Support
              </span>
            </h2>
          </div>
          <motion.p
            className="max-w-md text-sm leading-relaxed text-white/55 lg:pt-14 md:text-base"
            initial={reduce ? false : { opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            We keep things lean and collaborative — so your requirements move from conversation to
            virtual assistance without unnecessary friction.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <ProcessCard key={step.title} step={step} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
