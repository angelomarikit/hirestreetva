import { motion, useReducedMotion } from 'motion/react'
import { useSiteContent } from '../../context/SiteContentContext'
import { defaultSettings } from '../../data/seed'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

/** Homepage teaser — full story lives on /about */
export function AboutSection() {
  const reduce = useReducedMotion()
  const { settings, t } = useSiteContent()

  const image =
    settings.image_home_about ?? defaultSettings.image_home_about ?? '/images/home-brand-collage.jpg'

  return (
    <section className="bg-ivory py-24 text-ink md:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div
          className="lg:col-span-5"
          initial={reduce ? false : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={image}
              alt="Hire Street VA team collaboration in professional office settings"
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-y-8 -right-8 w-px bg-rose/50" aria-hidden />
          </div>
        </motion.div>

        <div className="lg:col-span-7">
          <p className="text-xs font-semibold tracking-[0.28em] text-rose uppercase">About</p>
          <h2 className="text-section mt-5 font-medium">
            {t('home.about.title.line1')}
            <span className="editorial-serif mt-2 block text-rose">{t('home.about.title.line2')}</span>
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/70">{t('home.about.body')}</p>
          <div className="mt-10">
            <Button to="/about" variant="ghost">
              Get to Know Us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
