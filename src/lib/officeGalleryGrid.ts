import type { OfficeGalleryGridLayout } from '../types/cms'

export function officeGalleryGridClass(layout: OfficeGalleryGridLayout): string {
  switch (layout) {
    case 'large':
      return 'md:col-span-2 md:row-span-2'
    case 'wide':
      return 'md:col-span-3'
    default:
      return 'md:col-span-1'
  }
}

export const officeGalleryLayoutOptions: { value: OfficeGalleryGridLayout; label: string }[] = [
  { value: 'large', label: 'Large (hero tile)' },
  { value: 'standard', label: 'Standard' },
  { value: 'wide', label: 'Wide (full row segment)' },
]
