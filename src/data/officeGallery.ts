export type OfficeGalleryItem = {
  src: string
  alt: string
  /** Tailwind grid placement on md+ */
  gridClass: string
}

export const officeGalleryItems: OfficeGalleryItem[] = [
  {
    src: '/images/office/office-01.png',
    alt: 'Hire Street VA office — reception lounge with warm wood and modern seating',
    gridClass: 'md:col-span-2 md:row-span-2',
  },
  {
    src: '/images/office/office-02.png',
    alt: 'Collaborative workspace with curved arch and city views',
    gridClass: 'md:col-span-1',
  },
  {
    src: '/images/office/office-03.png',
    alt: 'Office pantry and bar area overlooking the skyline',
    gridClass: 'md:col-span-1',
  },
  {
    src: '/images/office/office-04.png',
    alt: 'Executive meeting room with marble table',
    gridClass: 'md:col-span-1',
  },
  {
    src: '/images/office/office-05.png',
    alt: 'Premium reception desk and welcome area',
    gridClass: 'md:col-span-1',
  },
  {
    src: '/images/office/office-06.png',
    alt: 'Lounge with arched shelving and presentation screen',
    gridClass: 'md:col-span-1',
  },
  {
    src: '/images/office/office-07.png',
    alt: 'Alveo Park Triangle Tower — Bonifacio Global City',
    gridClass: 'md:col-span-3',
  },
]
