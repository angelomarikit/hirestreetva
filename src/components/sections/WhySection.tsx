import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { Container } from '../ui/Container'
import { SectionLabel } from '../ui/SectionLabel'

const items = [
  {
    title: 'Business-Focused Support',
    copy: 'Support structured around operational priorities, communication standards, and your workflow.',
  },
  {
    title: 'Flexible Assistance',
    copy: 'Scale support as priorities shift — from focused task coverage to broader operational help.',
  },
  {
    title: 'Professional Collaboration',
    copy: 'Clear communication, dependable follow-through, and a premium service experience.',
  },
  {
    title: 'More Time for Priorities',
    copy: 'Free leadership capacity for strategy, client relationships, and growth initiatives.',
  },
  {
    title: 'Solutions Built Around Your Needs',
    copy: 'Service categories and responsibilities can be tailored as requirements are confirmed.',
  },
]

gsap.registerPlugin(ScrollTrigger)

export function WhySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const rows = section.querySelectorAll('[data-why-row]')
    const ctx = gsap.context(() => {
      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0.35, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 78%',
              end: 'top 45%',
              scrub: 0.4,
            },
          },
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-charcoal py-24 md:py-32">
      <Container>
        <SectionLabel>Why Hire Street VA</SectionLabel>
        <h2 className="text-section mt-5 max-w-3xl font-medium">
          Support That Moves
          <span className="editorial-serif mt-2 block text-rose-soft">Your Business Forward.</span>
        </h2>

        <div className="mt-16 space-y-0 border-t border-white/10">
          {items.map((item, index) => (
            <article
              key={item.title}
              data-why-row
              className="grid gap-4 border-b border-white/10 py-10 md:grid-cols-[120px_1fr] md:gap-10"
            >
              <p className="text-sm font-semibold tracking-[0.2em] text-rose">
                {String(index + 1).padStart(2, '0')}
              </p>
              <div>
                <h3 className="text-2xl font-medium md:text-3xl">{item.title}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
                  {item.copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
