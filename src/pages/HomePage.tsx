import { useEffect, useState } from 'react'
import { AboutSection } from '../components/sections/AboutSection'
import { AboutStudioSection } from '../components/sections/AboutStudioSection'
import { BusinessCtaSection } from '../components/sections/BusinessCtaSection'
import { FaqSection } from '../components/sections/FaqSection'
import { HeroSection } from '../components/sections/HeroSection'
import { InteractiveServices } from '../components/sections/InteractiveServices'
import { ProcessStudioSection } from '../components/sections/ProcessStudioSection'
import { ServicesShowcaseGrid } from '../components/sections/ServicesShowcaseGrid'
import { WhySection } from '../components/sections/WhySection'
import { PageMeta } from '../components/seo/PageMeta'
import { useSiteContent } from '../context/SiteContentContext'
import { fetchPublishedFaqs, fetchPublishedServices } from '../lib/content'
import type { Faq, Service } from '../types/cms'

export function HomePage() {
  const { settings, loading: settingsLoading } = useSiteContent()
  const [services, setServices] = useState<Service[]>([])
  const [faqs, setFaqs] = useState<Faq[]>([])

  useEffect(() => {
    void (async () => {
      const [svc, f] = await Promise.all([fetchPublishedServices(), fetchPublishedFaqs()])
      setServices(svc)
      setFaqs(f)
    })()
  }, [])

  if (settingsLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center pt-24 text-white/60">
        Loading experience…
      </div>
    )
  }

  return (
    <>
      <PageMeta title={settings.meta_title} description={settings.meta_description} />
      <HeroSection settings={settings} />
      <ServicesShowcaseGrid services={services} />
      <InteractiveServices services={services} />
      <AboutStudioSection />
      <AboutSection />
      <WhySection />
      <ProcessStudioSection />
      <BusinessCtaSection />
      <FaqSection faqs={faqs} />
    </>
  )
}
