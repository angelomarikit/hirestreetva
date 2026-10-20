import { ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSiteContent } from '../../context/SiteContentContext'
import { Container } from '../ui/Container'

const footerLinks = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
]

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function SiteFooter() {
  const { settings } = useSiteContent()

  const addressLines = [
    settings.address_line1,
    settings.address_line2,
    settings.address_line3,
  ].filter(Boolean) as string[]

  const socials = [
    settings.whatsapp_url ? { label: 'WhatsApp', href: settings.whatsapp_url } : null,
    settings.messenger_url ? { label: 'Messenger', href: settings.messenger_url } : null,
    settings.instagram_url ? { label: 'Instagram', href: settings.instagram_url } : null,
    settings.linkedin_url ? { label: 'LinkedIn', href: settings.linkedin_url } : null,
  ].filter(Boolean) as { label: string; href: string }[]

  return (
    <footer className="overflow-hidden bg-ink pt-16 pb-8 md:pt-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-16">
          <div className="space-y-8">
            <div>
              <p className="text-xs text-white/45">Location</p>
              <address className="mt-3 space-y-0.5 text-sm leading-relaxed text-white/90 not-italic md:text-base">
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
            <div>
              <p className="text-xs text-white/45">Contact</p>
              <div className="mt-3 space-y-1 text-sm text-white/90 md:text-base">
                {settings.contact_email ? (
                  <a href={`mailto:${settings.contact_email}`} className="block hover:text-rose-soft">
                    {settings.contact_email}
                  </a>
                ) : (
                  <Link to="/contact" className="block hover:text-rose-soft">
                    Send an inquiry
                  </Link>
                )}
                {settings.phone && <p>{settings.phone}</p>}
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs text-white/45">Links</p>
            <nav className="mt-4 flex flex-col gap-1">
              {footerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-2xl font-medium tracking-tight text-white transition hover:text-rose-soft md:text-3xl lg:text-4xl"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs text-white/45">Socials</p>
            {socials.length > 0 ? (
              <nav className="mt-4 flex flex-col gap-1">
                {socials.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl font-medium tracking-tight text-white transition hover:text-rose-soft md:text-3xl lg:text-4xl"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            ) : (
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/40">
                Add social links in Admin → Website settings.
              </p>
            )}
          </div>
        </div>

        <div className="pointer-events-none mt-10 select-none md:mt-14" aria-hidden>
          <p
            className="editorial-serif text-[clamp(4.5rem,16vw,13rem)] leading-[0.85] tracking-tight text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(to bottom, rgb(255 255 255 / 0.55) 0%, rgb(255 255 255 / 0.12) 45%, rgb(11 11 13 / 0) 85%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            Hire Street
          </p>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {settings.site_name}. All Rights Reserved.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-3 text-xs text-white/45 transition hover:text-white"
          >
            Back to Top
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] transition group-hover:border-rose/40 group-hover:bg-rose/10">
              <ArrowUp size={16} className="text-white/80" />
            </span>
          </button>
        </div>
      </Container>
    </footer>
  )
}
