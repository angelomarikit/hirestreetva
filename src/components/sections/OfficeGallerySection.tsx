import { Building2 } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { officeGalleryItems } from '../../data/officeGallery'
import { useSiteContent } from '../../context/SiteContentContext'
import { Container } from '../ui/Container'
import { DotGridBackground } from '../ui/DotGridBackground'
import { SectionPill } from '../ui/SectionPill'

export function OfficeGallerySection() {
  const reduce = useReducedMotion()
  const { t } = useSiteContent()

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-ink py-24 md:py-32">
      <DotGridBackground className="opacity-40" />

      <Container className="relative">
        <div className="max-w-3xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionPill icon={Building2} label={t('home.office.eyebrow', 'Our Office')} />
          </motion.div>

          <motion.h2
            className="text-section mt-8 font-medium"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
          >
            {t('home.office.title.line1', 'Where support meets')}
            <span className="editorial-serif mt-2 block text-rose-soft">
              {t('home.office.title.line2', 'professional presence.')}
            </span>
          </motion.h2>

          <motion.p
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {t(
              'home.office.body',
              'Visit us at Alveo Park Triangle Tower in Bonifacio Global City — a space designed for focused work, client meetings, and the team behind Hire Street VA.',
            )}
          </motion.p>
        </div>

        <motion.div
          className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 md:auto-rows-[minmax(160px,1fr)] md:gap-4"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.12 }}
        >
          {officeGalleryItems.map((item, index) => (
            <motion.figure
              key={item.src}
              className={`group relative min-h-[220px] overflow-hidden rounded-2xl border border-white/10 bg-charcoal/50 md:min-h-0 ${item.gridClass}`}
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading={index < 2 ? 'eager' : 'lazy'}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-80 transition group-hover:opacity-90"
                aria-hidden
              />
              <figcaption className="absolute right-0 bottom-0 left-0 p-4 text-[11px] leading-snug text-white/70 opacity-0 transition group-hover:opacity-100 md:text-xs">
                {item.alt.split(' — ')[1] ?? item.alt}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
