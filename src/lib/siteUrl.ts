/** Public path for the default social share image (1200×630-style banner). */
export const DEFAULT_OG_IMAGE_PATH = '/images/og-share.jpg'

const siteOrigin = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '')

/** Turn a site path or full URL into an absolute URL for Open Graph / Twitter cards. */
export function absoluteSiteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  if (siteOrigin) return `${siteOrigin}${path}`
  if (typeof window !== 'undefined') return `${window.location.origin}${path}`
  return path
}

function setMetaProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setMetaName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function applyShareImageMeta(imagePathOrUrl: string | null | undefined) {
  const image = absoluteSiteUrl(imagePathOrUrl?.trim() || DEFAULT_OG_IMAGE_PATH)
  setMetaProperty('og:image', image)
  setMetaProperty('og:image:alt', 'Hire Street VA — Premium Virtual Assistance Agency')
  setMetaName('twitter:card', 'summary_large_image')
  setMetaName('twitter:image', image)
}
