/** Build a tel: href from a display number (e.g. 0939-319-7761 → +639393197761). */
export function phoneTelHref(display: string): string {
  const digits = display.replace(/\D/g, '')
  if (digits.startsWith('0') && digits.length >= 10) {
    return `tel:+63${digits.slice(1)}`
  }
  if (digits.startsWith('63')) {
    return `tel:+${digits}`
  }
  return `tel:${digits}`
}
