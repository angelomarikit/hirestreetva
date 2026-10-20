import { useEffect } from 'react'
import { applyShareImageMeta } from '../../lib/siteUrl'

type Props = {
  title: string
  description: string
  /** When set, overrides the CMS share image for this page. */
  image?: string | null
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

export function PageMeta({ title, description, image }: Props) {
  useEffect(() => {
    document.title = title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description)
    setMetaProperty('og:title', title)
    setMetaProperty('og:description', description)
    setMetaProperty('og:type', 'website')
    setMetaName('twitter:title', title)
    setMetaName('twitter:description', description)
    if (image !== undefined) {
      applyShareImageMeta(image)
    }
  }, [title, description, image])

  return null
}
