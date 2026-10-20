import { useEffect, useState } from 'react'
import { InteractiveServices } from '../components/sections/InteractiveServices'
import { PageMeta } from '../components/seo/PageMeta'
import { Container } from '../components/ui/Container'
import { fetchPublishedServices } from '../lib/content'
import type { Service } from '../types/cms'

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    void fetchPublishedServices().then(setServices)
  }, [])

  return (
    <>
      <PageMeta
        title="Services | Hire Street VA"
        description="Explore virtual assistance services from Hire Street VA."
      />
      <section className="pt-28 pb-8 md:pt-32">
        <Container>
          <h1 className="text-section font-medium">Services</h1>
          <p className="mt-4 max-w-2xl text-white/65">
            Proposed service categories — editable by your administrator until confirmed.
          </p>
        </Container>
      </section>
      <InteractiveServices services={services} />
    </>
  )
}
