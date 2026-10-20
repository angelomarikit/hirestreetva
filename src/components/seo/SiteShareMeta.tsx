import { useEffect } from 'react'
import { useSiteContent } from '../../context/SiteContentContext'
import { applyShareImageMeta } from '../../lib/siteUrl'

/** Keeps og:image / Twitter card image in sync with CMS settings on all public pages. */
export function SiteShareMeta() {
  const { settings } = useSiteContent()

  useEffect(() => {
    applyShareImageMeta(settings.og_image_url)
  }, [settings.og_image_url])

  return null
}
