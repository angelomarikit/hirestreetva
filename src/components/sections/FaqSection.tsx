import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import type { Faq } from '../../types/cms'
import { Container } from '../ui/Container'

type Props = {
  faqs: Faq[]
}

export function FaqSection({ faqs }: Props) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null)

  if (!faqs.length) return null

  return (
    <section className="bg-charcoal py-24 md:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-semibold tracking-[0.28em] text-rose uppercase">FAQ</p>
          <h2 className="text-section mt-5 font-medium">Questions, answered with clarity.</h2>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((faq) => {
            const open = openId === faq.id
            return (
              <div key={faq.id}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpenId(open ? null : faq.id)}
                  aria-expanded={open}
                >
                  <span className="text-base font-medium md:text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`shrink-0 transition-transform ${open ? 'rotate-180 text-rose' : 'text-white/40'}`}
                    size={18}
                  />
                </button>
                {open && (
                  <p className="pb-5 text-sm leading-relaxed text-white/60 md:text-base">
                    {faq.answer}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
