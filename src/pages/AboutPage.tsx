import { motion, useReducedMotion } from 'motion/react'
import { Button } from '../components/ui/Button'
import { PageMeta } from '../components/seo/PageMeta'
import { Container } from '../components/ui/Container'
import { useSiteContent } from '../context/SiteContentContext'
import { defaultSettings } from '../data/seed'

export function AboutPage() {
  const reduce = useReducedMotion()
  const { settings, t } = useSiteContent()

  const image =
    settings.image_about_page ?? defaultSettings.image_about_page ?? '/images/about-executive.jpg'

  return (
    <>
      <PageMeta
        title="About | Hire Street VA"
        description="Learn about Hire Street VA — premium virtual assistance for business owners and career pathways for virtual professionals."
      />

      <section className="pt-28 pb-16 md:pt-32 md:pb-20">
        <Container className="max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.28em] text-rose uppercase">About Us</p>
          <h1 className="text-section mt-5 font-medium">
            About {settings.site_name.split(' ').slice(0, 2).join(' ')}
            <span className="editorial-serif mt-2 block text-rose-soft">VA</span>
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-white/70 md:text-xl">{t('about.intro.body')}</p>
        </Container>
      </section>

      <section className="bg-ivory py-20 text-ink md:py-28">
        <Container className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            className="lg:col-span-5"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={image}
                alt="Executive professional working in a premium office setting"
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-y-8 -right-8 w-px bg-rose/40" aria-hidden />
            </div>
          </motion.div>

          <div className="space-y-8 lg:col-span-7">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{t('about.who.title')}</h2>
              <p className="mt-4 text-base leading-relaxed text-ink/70 md:text-lg">{t('about.who.body')}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{t('about.believe.title')}</h2>
              <p className="mt-4 text-base leading-relaxed text-ink/70 md:text-lg">{t('about.believe.body')}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-semibold md:text-3xl">{t('about.owners.title')}</h2>
          <p className="mt-5 text-base leading-relaxed text-white/65 md:text-lg">{t('about.owners.body')}</p>
          <div className="mt-10">
            <Button to="/hire">Hire a Virtual Assistant</Button>
          </div>
        </Container>
      </section>

      <section className="border-t border-white/10 bg-charcoal/40 py-20 md:py-28">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-semibold md:text-3xl">{t('about.va.title')}</h2>
          <p className="mt-5 text-base leading-relaxed text-white/65 md:text-lg">{t('about.va.body')}</p>
          <div className="mt-10">
            <Button to="/careers" variant="secondary">
              View Careers
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container className="max-w-3xl text-center">
          <h2 className="text-section font-medium">
            Ready to start
            <span className="editorial-serif mt-2 block text-rose-soft">the conversation?</span>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button to="/contact">Contact Us</Button>
            <Button to="/services" variant="secondary">
              Explore Services
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
