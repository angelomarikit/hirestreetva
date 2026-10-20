import { ChevronDown } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { SiteSettings } from '../../types/cms'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { SectionLabel } from '../ui/SectionLabel'

type Props = {
  settings: SiteSettings
}

export function HeroSection({ settings }: Props) {
  const reduce = useReducedMotion()

  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-24 md:pt-28">
      <div className="absolute inset-0">
        <motion.img
          src={settings.hero_image_url}
          alt=""
          className="h-full w-full object-cover"
          initial={reduce ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/55 to-ink" />
      </div>

      <Container className="relative flex min-h-[calc(100svh-5rem)] flex-col justify-end pb-16 md:pb-24">
        <div className="mb-10 max-w-5xl border border-white/10 bg-ink/20 p-8 backdrop-blur-sm md:p-12">
          <SectionLabel>{settings.hero_eyebrow}</SectionLabel>

          <h1 className="mt-6 text-display font-medium text-white">
            <motion.span
              className="block overflow-hidden"
              initial={reduce ? false : { y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {settings.hero_title_line1}
            </motion.span>
            <motion.span
              className="editorial-serif mt-1 block text-rose-soft"
              initial={reduce ? false : { y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {settings.hero_title_line2}
            </motion.span>
          </h1>

          <motion.div
            className="mt-6 h-px w-24 bg-gradient-to-r from-rose to-transparent"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ transformOrigin: 'left' }}
          />

          <motion.p
            className="mt-8 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            {settings.hero_description}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <Button to={settings.primary_cta_href}>{settings.primary_cta_label}</Button>
            <Button to={settings.secondary_cta_href} variant="secondary">
              {settings.secondary_cta_label}
            </Button>
          </motion.div>
        </div>

        <a
          href="#services"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-white/50 uppercase transition hover:text-rose-soft"
        >
          Scroll
          <ChevronDown size={16} className="animate-bounce" />
        </a>
      </Container>
    </section>
  )
}
