import { useEffect, useState } from 'react'
import { ContactFormLayout } from '../components/forms/ContactFormLayout'
import { InquiryForm } from '../components/forms/InquiryForm'
import { PageMeta } from '../components/seo/PageMeta'
import { Container } from '../components/ui/Container'
import { useSiteContent } from '../context/SiteContentContext'
import { defaultSettings } from '../data/seed'
import { fetchPublishedJobs } from '../lib/content'
import type { JobOpening } from '../types/cms'

export function CareersPage() {
  const { settings, t } = useSiteContent()
  const [jobs, setJobs] = useState<JobOpening[]>([])

  useEffect(() => {
    void fetchPublishedJobs().then(setJobs)
  }, [])

  return (
    <>
      <PageMeta
        title="Careers | Hire Street VA"
        description="Apply to join Hire Street VA as a virtual assistant."
      />
      <section className="bg-ivory pt-28 pb-16 text-ink md:pt-32">
        <Container>
          <p className="text-xs font-semibold tracking-[0.28em] text-rose uppercase">Careers</p>
          <h1 className="text-section mt-5 font-medium">
            Your Skills.
            <span className="editorial-serif mt-2 block text-rose">New Opportunities.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/70">
            Interested in becoming part of Hire Street VA? Explore published openings or send a
            general application below.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          {jobs.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-charcoal/50 p-10 text-center">
              <p className="text-lg font-medium">No published openings at the moment</p>
              <p className="mt-3 text-sm text-white/60">
                You can still share your details below and our team will reach out when opportunities
                align.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {jobs.map((job) => (
                <article
                  key={job.id}
                  className="rounded-2xl border border-white/10 bg-charcoal/40 p-6 md:p-8"
                >
                  <h2 className="text-2xl font-medium">{job.title}</h2>
                  <p className="mt-2 text-sm text-white/55">
                    {job.location} · {job.employment_type}
                  </p>
                  <p className="mt-4 max-w-3xl text-white/70">{job.description}</p>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="border-t border-white/10 py-16 md:py-24">
        <Container>
          <ContactFormLayout
            line1={t('contact.panel.line1')}
            line2={t('careers.panel.line2')}
            formHeading="General Application"
            panelImage={settings.image_careers_panel ?? defaultSettings.image_careers_panel ?? undefined}
            panelImageAlt="Professional team strategy meeting in a modern executive boardroom"
          >
            <InquiryForm defaultService="Virtual Assistant Application" />
          </ContactFormLayout>
        </Container>
      </section>
    </>
  )
}
