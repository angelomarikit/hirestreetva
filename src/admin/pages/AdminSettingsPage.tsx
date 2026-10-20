import { useEffect, useState } from 'react'
import { defaultSettings } from '../../data/seed'
import { fetchSiteSettings, saveSiteSettings } from '../../lib/content'
import { isSupabaseConfigured } from '../../lib/supabase'
import type { SiteSettings } from '../../types/cms'
import { AdminField, adminInputClass, adminTextareaClass } from '../components/AdminField'
import { ImageUploadField } from '../components/ImageUploadField'
import { SaveToast } from '../components/SaveToast'
import { AdminNotConfigured, AdminPageHeader, AdminPanel, AdminPrimaryButton } from '../components/AdminUi'

export function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [toast, setToast] = useState('')
  const [toastTone, setToastTone] = useState<'success' | 'error'>('success')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    void fetchSiteSettings().then(setSettings)
  }, [])

  async function save() {
    setSaving(true)
    try {
      await saveSiteSettings(settings)
      setToastTone('success')
      setToast('Settings saved successfully')
      setTimeout(() => setToast(''), 3000)
    } catch {
      setToastTone('error')
      setToast('Could not save settings')
    } finally {
      setSaving(false)
    }
  }

  function set<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setSettings((s) => ({ ...s, [key]: value }))
  }

  if (!isSupabaseConfigured) {
    return <AdminNotConfigured feature="Website settings" />
  }

  return (
    <div className="space-y-8 pb-24">
      <AdminPageHeader
        eyebrow="Site"
        title="Website"
        accent="settings."
        description="Update your homepage hero, contact details, footer address, SEO, and main photos — no code required."
        action={
          <AdminPrimaryButton disabled={saving} onClick={() => void save()}>
            {saving ? 'Saving…' : 'Save all'}
          </AdminPrimaryButton>
        }
      />

      <AdminPanel title="General" className="space-y-4">
        <AdminField label="Site name">
          <input className={adminInputClass} value={settings.site_name} onChange={(e) => set('site_name', e.target.value)} />
        </AdminField>
        <AdminField label="Tagline">
          <input className={adminInputClass} value={settings.tagline} onChange={(e) => set('tagline', e.target.value)} />
        </AdminField>
      </AdminPanel>

      <AdminPanel title="Homepage hero" className="space-y-4">
        <AdminField label="Eyebrow label">
          <input className={adminInputClass} value={settings.hero_eyebrow} onChange={(e) => set('hero_eyebrow', e.target.value)} />
        </AdminField>
        <AdminField label="Headline line 1">
          <input className={adminInputClass} value={settings.hero_title_line1} onChange={(e) => set('hero_title_line1', e.target.value)} />
        </AdminField>
        <AdminField label="Headline line 2">
          <input className={adminInputClass} value={settings.hero_title_line2} onChange={(e) => set('hero_title_line2', e.target.value)} />
        </AdminField>
        <AdminField label="Description">
          <textarea className={adminTextareaClass} value={settings.hero_description} onChange={(e) => set('hero_description', e.target.value)} />
        </AdminField>
        <ImageUploadField label="Hero background image" folder="hero" value={settings.hero_image_url} onChange={(v) => set('hero_image_url', v)} />
        <div className="grid gap-4 md:grid-cols-2">
          <AdminField label="Primary button label">
            <input className={adminInputClass} value={settings.primary_cta_label} onChange={(e) => set('primary_cta_label', e.target.value)} />
          </AdminField>
          <AdminField label="Primary button link">
            <input className={adminInputClass} value={settings.primary_cta_href} onChange={(e) => set('primary_cta_href', e.target.value)} />
          </AdminField>
          <AdminField label="Secondary button label">
            <input className={adminInputClass} value={settings.secondary_cta_label} onChange={(e) => set('secondary_cta_label', e.target.value)} />
          </AdminField>
          <AdminField label="Secondary button link">
            <input className={adminInputClass} value={settings.secondary_cta_href} onChange={(e) => set('secondary_cta_href', e.target.value)} />
          </AdminField>
        </div>
      </AdminPanel>

      <AdminPanel
        title="Page photos"
        description="These images appear on the homepage, about page, forms, and call-to-action sections."
        className="space-y-4"
      >
        <ImageUploadField label="Homepage — about section" folder="home" value={settings.image_home_about ?? ''} onChange={(v) => set('image_home_about', v)} />
        <ImageUploadField label="About page" folder="about" value={settings.image_about_page ?? ''} onChange={(v) => set('image_about_page', v)} />
        <ImageUploadField label="Contact & hire forms" folder="forms" value={settings.image_contact_panel ?? ''} onChange={(v) => set('image_contact_panel', v)} />
        <ImageUploadField label="Careers form" folder="careers" value={settings.image_careers_panel ?? ''} onChange={(v) => set('image_careers_panel', v)} />
        <ImageUploadField label="Business CTA banner" folder="cta" value={settings.image_business_cta ?? ''} onChange={(v) => set('image_business_cta', v)} />
      </AdminPanel>

      <AdminPanel title="Contact & footer" className="space-y-4">
        <AdminField label="Email">
          <input className={adminInputClass} value={settings.contact_email ?? ''} onChange={(e) => set('contact_email', e.target.value || null)} />
        </AdminField>
        <AdminField label="Phone (primary)">
          <input className={adminInputClass} value={settings.phone ?? ''} onChange={(e) => set('phone', e.target.value || null)} />
        </AdminField>
        <AdminField label="Phone (secondary)">
          <input
            className={adminInputClass}
            value={settings.phone_secondary ?? ''}
            onChange={(e) => set('phone_secondary', e.target.value || null)}
          />
        </AdminField>
        <AdminField label="Address line 1">
          <input className={adminInputClass} value={settings.address_line1 ?? ''} onChange={(e) => set('address_line1', e.target.value || null)} />
        </AdminField>
        <AdminField label="Address line 2">
          <input className={adminInputClass} value={settings.address_line2 ?? ''} onChange={(e) => set('address_line2', e.target.value || null)} />
        </AdminField>
        <AdminField label="Address line 3">
          <input className={adminInputClass} value={settings.address_line3 ?? ''} onChange={(e) => set('address_line3', e.target.value || null)} />
        </AdminField>
        <AdminField label="WhatsApp link" hint="Full URL including https://">
          <input className={adminInputClass} value={settings.whatsapp_url ?? ''} onChange={(e) => set('whatsapp_url', e.target.value || null)} />
        </AdminField>
        <AdminField label="Messenger link">
          <input className={adminInputClass} value={settings.messenger_url ?? ''} onChange={(e) => set('messenger_url', e.target.value || null)} />
        </AdminField>
        <AdminField label="Instagram link">
          <input className={adminInputClass} value={settings.instagram_url ?? ''} onChange={(e) => set('instagram_url', e.target.value || null)} />
        </AdminField>
        <AdminField label="LinkedIn link">
          <input className={adminInputClass} value={settings.linkedin_url ?? ''} onChange={(e) => set('linkedin_url', e.target.value || null)} />
        </AdminField>
      </AdminPanel>

      <AdminPanel title="SEO & sharing" className="space-y-4">
        <AdminField label="Page title (browser tab)">
          <input className={adminInputClass} value={settings.meta_title} onChange={(e) => set('meta_title', e.target.value)} />
        </AdminField>
        <AdminField label="Meta description">
          <textarea className={adminTextareaClass} value={settings.meta_description} onChange={(e) => set('meta_description', e.target.value)} />
        </AdminField>
        <ImageUploadField label="Social share image" folder="seo" value={settings.og_image_url ?? ''} onChange={(v) => set('og_image_url', v)} />
      </AdminPanel>

      <SaveToast message={toast} tone={toastTone} />
    </div>
  )
}
