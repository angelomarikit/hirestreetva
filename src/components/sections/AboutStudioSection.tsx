import { Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { Container } from '../ui/Container'
import { DotGridBackground } from '../ui/DotGridBackground'
import { SectionPill } from '../ui/SectionPill'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { label: 'Support Categories', value: 8, suffix: '+' },
  { label: 'Audience Pathways', value: 2, suffix: '' },
  { label: 'Remote-First Delivery', value: 100, suffix: '%' },
]

function StatBlock({ label, value, suffix }: (typeof stats)[0]) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = `${value}${suffix}`
      return
    }

    const obj = { val: 0 }
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: value,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.val)}${suffix}`
        },
      })
    })

    return () => ctx.revert()
  }, [value, suffix])

  return (
    <div className="text-center">
      <p className="text-xs tracking-wide text-white/45 uppercase">{label}</p>
      <div className="mx-auto mt-4 h-px w-full max-w-[120px] bg-white/10" />
      <p
        ref={ref}
        className="mt-4 bg-gradient-to-b from-white to-white/45 bg-clip-text text-5xl font-semibold tracking-tight text-transparent md:text-6xl"
      >
        0{suffix}
      </p>
    </div>
  )
}

export function AboutStudioSection() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-charcoal py-24 md:py-32">
      <DotGridBackground />

      <Container className="relative">
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <SectionPill icon={Sparkles} label="About Us" />
          </motion.div>

          <p
            className="pointer-events-none absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 select-none text-[clamp(4rem,18vw,11rem)] leading-none font-medium text-white/[0.04] blur-[2px]"
            aria-hidden
          >
            Hire Street
          </p>

          <motion.p
            className="relative mt-10 text-lg leading-relaxed md:text-xl"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="text-white/90">
              We help ambitious businesses access virtual support that keeps operations steady and
              leaders focused on growth.
            </span>{' '}
            <span className="text-white/40">
              Hire Street VA is built around clear communication, flexible assistance, and a premium
              service experience for business owners and virtual professionals alike.
            </span>
          </motion.p>
        </div>

        <motion.div
          className="mt-20 grid gap-12 md:grid-cols-3 md:gap-8"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {stats.map((stat) => (
            <StatBlock key={stat.label} {...stat} />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
