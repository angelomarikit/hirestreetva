import { ContactFormLayout } from '../components/forms/ContactFormLayout'
import { InquiryForm } from '../components/forms/InquiryForm'
import { PageMeta } from '../components/seo/PageMeta'
import { Container } from '../components/ui/Container'
import { useSiteContent } from '../context/SiteContentContext'
import { defaultSettings } from '../data/seed'
import { phoneTelHref } from '../lib/phone'

export function ContactPage() {
  const { settings, t } = useSiteContent()

  return (
    <>
      <PageMeta
        title="Contact | Hire Street VA"
        description="Submit a business inquiry to Hire Street VA."
      />
      <section className="pt-28 pb-24 md:pt-32 md:pb-28">
        <Container>
          {settings.phone && (
            <p className="mb-8 text-center text-sm text-white/55">
              Prefer to call?{' '}
              <a href={phoneTelHref(settings.phone)} className="font-medium text-rose-soft hover:text-white">
                {settings.phone}
              </a>
            </p>
          )}
          <ContactFormLayout
            line1={t('contact.panel.line1')}
            line2={t('contact.panel.line2')}
            panelImage={settings.image_contact_panel ?? defaultSettings.image_contact_panel ?? undefined}
          >
            <InquiryForm />
          </ContactFormLayout>
        </Container>
      </section>
    </>
  )
}
