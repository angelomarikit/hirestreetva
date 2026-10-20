import { useSiteContent } from '../../context/SiteContentContext'
import { defaultSettings } from '../../data/seed'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

export function BusinessCtaSection() {
  const { settings, t } = useSiteContent()

  const image =
    settings.image_business_cta ??
    defaultSettings.image_business_cta ??
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=2400&q=80'

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" aria-hidden />
      <div className="absolute inset-0 bg-ink/75" />
      <Container className="relative max-w-3xl">
        <h2 className="text-section font-medium">
          {t('cta.business.title1')}
          <span className="editorial-serif mt-2 block text-rose-soft">{t('cta.business.title2')}</span>
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-white/70">{t('cta.business.body')}</p>
        <div className="mt-10">
          <Button to="/hire">Find Your VA</Button>
        </div>
      </Container>
    </section>
  )
}
