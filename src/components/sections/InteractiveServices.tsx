import { ArrowUpRight } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useCallback, useId, useState } from 'react'
import type { Service } from '../../types/cms'
import { Container } from '../ui/Container'
import { SectionLabel } from '../ui/SectionLabel'

type Props = {
  services: Service[]
}

export function InteractiveServices({ services }: Props) {
  const [activeId, setActiveId] = useState(services[0]?.id ?? '')
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(null)
  const reduce = useReducedMotion()
  const listId = useId()

  const active = services.find((s) => s.id === activeId) ?? services[0]

  const onActivate = useCallback((id: string) => {
    setActiveId(id)
  }, [])

  if (!services.length) return null

  return (
    <section id="services" className="relative bg-ink py-24 md:py-32">
      <Container>
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionLabel>WHAT WE DO</SectionLabel>
            <h2 className="text-section mt-5 font-medium">
              The Right Talent.
              <span className="editorial-serif mt-2 block text-rose-soft">For Every Ambition.</span>
            </h2>
          </div>
          <p className="max-w-xl self-end text-base leading-relaxed text-white/65 md:text-lg">
            From daily operations to specialized business support, explore flexible virtual
            assistance solutions designed around your needs.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
          <ul id={listId} className="divide-y divide-white/10" role="list">
            {services.map((service, index) => {
              const isActive = service.id === activeId
              const isMobileOpen = mobileOpenId === service.id
              const number = String(index + 1).padStart(2, '0')

              return (
                <li key={service.id}>
                  <button
                    type="button"
                    className="group relative w-full py-6 text-left md:py-8"
                    onMouseEnter={() => onActivate(service.id)}
                    onFocus={() => onActivate(service.id)}
                    onClick={() =>
                      setMobileOpenId((prev) => (prev === service.id ? null : service.id))
                    }
                    aria-expanded={isMobileOpen}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-xs font-semibold tracking-[0.2em] transition-colors ${isActive ? 'text-rose' : 'text-white/35'}`}
                        >
                          {number}
                        </p>
                        <h3
                          className={`text-service mt-2 font-medium transition-all duration-500 ${isActive ? 'text-white' : 'text-white/35 group-hover:text-white/70'}`}
                        >
                          {service.title}
                        </h3>

                        <AnimatePresence initial={false}>
                          {isMobileOpen && (
                            <motion.p
                              key={`${service.id}-desc`}
                              initial={reduce ? false : { opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 max-w-xl overflow-hidden text-sm leading-relaxed text-white/60 lg:hidden"
                            >
                              {service.description}
                            </motion.p>
                          )}
                        </AnimatePresence>

                        {isMobileOpen && (
                          <div className="mt-5 overflow-hidden rounded-xl lg:hidden">
                            <img
                              src={service.image_url}
                              alt=""
                              className="aspect-[4/3] w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        )}
                      </div>

                      <ArrowUpRight
                        className={`mt-2 shrink-0 transition-all duration-500 ${isActive ? 'translate-x-0 translate-y-0 text-rose' : 'text-white/25 group-hover:text-white/50'}`}
                        size={28}
                        aria-hidden
                      />
                    </div>

                    {isActive && (
                      <motion.span
                        layoutId="service-active-line"
                        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-rose/80 via-rose/30 to-transparent"
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="relative hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-charcoal">
                <AnimatePresence mode="wait">
                  {active && (
                    <motion.img
                      key={active.id}
                      src={active.image_url}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      loading="lazy"
                    />
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                {active && (
                  <motion.div
                    key={`${active.id}-caption`}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-x-0 bottom-0 p-8"
                  >
                    <p className="text-sm leading-relaxed text-white/75">{active.description}</p>
                    <a
                      href={active.cta_href}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-rose-soft hover:text-white"
                    >
                      Explore service <ArrowUpRight size={16} />
                    </a>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
