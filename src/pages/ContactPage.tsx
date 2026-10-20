import { ContactFormLayout } from '../components/forms/ContactFormLayout'
import { InquiryForm } from '../components/forms/InquiryForm'
import { PageMeta } from '../components/seo/PageMeta'
import { Container } from '../components/ui/Container'
import { useSiteContent } from '../context/SiteContentContext'
import { defaultSettings } from '../data/seed'

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
