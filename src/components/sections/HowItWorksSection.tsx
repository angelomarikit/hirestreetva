import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
import { useEffect, useRef } from 'react'
import { Container } from '../ui/Container'

const steps = [
  'Share Your Requirements',
  'Explore Suitable Support',
  'Connect With Our Team',
  'Start Your VA Journey',
]

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const progress = progressRef.current
    if (!section || !progress) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progress,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'bottom 30%',
            scrub: true,
          },
        },
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-ink py-24 md:py-32">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-xs font-semibold tracking-[0.28em] text-rose uppercase">Process</p>
          <h2 className="text-section mt-5 font-medium">
            Your Next Step
            <span className="editorial-serif mt-2 block text-rose-soft">Starts Here.</span>
          </h2>
        </div>

        <div className="relative pl-8">
          <div className="absolute top-0 left-3 h-full w-px bg-white/10" aria-hidden />
          <div
            ref={progressRef}
            className="absolute top-0 left-3 h-full w-px origin-top bg-gradient-to-b from-rose via-copper to-transparent"
            aria-hidden
          />

          <ol className="space-y-10">
            {steps.map((step, index) => (
              <li key={step} className="relative">
                <span className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-rose/50 bg-ink text-[10px] font-semibold text-rose">
                  {index + 1}
                </span>
                <h3 className="text-xl font-medium md:text-2xl">{step}</h3>
                <p className="mt-2 max-w-md text-sm text-white/55">
                  Provisional step — final process language to be confirmed with the client.
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
