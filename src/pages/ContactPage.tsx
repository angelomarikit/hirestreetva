import { ContactFormLayout } from '../components/forms/ContactFormLayout'
import { InquiryForm } from '../components/forms/InquiryForm'
import { PageMeta } from '../components/seo/PageMeta'
import { Container } from '../components/ui/Container'
import { useSiteContent } from '../context/SiteContentContext'
import { defaultSettings } from '../data/seed'
import { SitePhoneList } from '../components/ui/SitePhoneList'

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
          {(settings.phone || settings.phone_secondary) && (
            <div className="mb-8 text-center text-sm text-white/55">
              <p>Prefer to call?</p>
              <SitePhoneList
                primary={settings.phone}
                secondary={settings.phone_secondary}
                className="mt-2 flex flex-col items-center gap-1 sm:flex-row sm:justify-center sm:gap-6"
                linkClassName="font-medium text-rose-soft hover:text-white"
              />
            </div>
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
