import type { Faq, JobOpening, Service, SiteSettings, Testimonial } from '../types/cms'

export const defaultSettings: SiteSettings = {
  site_name: 'Hire Street VA',
  tagline: 'Executive-Level Virtual Talent for Ambitious Businesses.',
  hero_eyebrow: 'EXECUTIVE BUSINESS SUPPORT SERVICES',
  hero_title_line1: 'Exceptional Support.',
  hero_title_line2: 'Limitless Possibilities.',
  hero_description:
    'Build a stronger, more efficient business with virtual professionals who help you focus on what matters most.',
  hero_image_url:
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80',
  primary_cta_label: 'Hire a Virtual Assistant',
  primary_cta_href: '/hire',
  secondary_cta_label: 'Explore Our Services',
  secondary_cta_href: '/services',
  contact_email: null,
  phone: '(0939) 319-7761',
  phone_secondary: '(0949) 124 2491',
  whatsapp_url: null,
  messenger_url: null,
  instagram_url: null,
  linkedin_url: null,
  address_line1: '32nd street Corner 11th avenue',
  address_line2: 'Bonifacio Global City',
  address_line3: 'Alveo Park triangle Tower',
  meta_title: 'Hire Street VA | Executive Business Support Services',
  meta_description:
    'Hire Street VA connects ambitious businesses with executive-level virtual assistants for operations, support, and growth.',
  og_image_url: '/images/og-share.jpg',
  image_home_about: '/images/home-brand-collage.jpg',
  image_about_page: '/images/about-executive.jpg',
  image_contact_panel: '/images/about-collaboration.jpg',
  image_careers_panel: '/images/careers-strategy.jpg',
  image_business_cta:
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=2400&q=80',
}

export const defaultServices: Service[] = [
  {
    id: 'svc-1',
    title: 'Executive Assistance',
    slug: 'executive-assistance',
    description:
      'High-trust calendar, inbox, and executive coordination support for leaders who need discretion and precision.',
    image_url:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    sort_order: 1,
    is_published: true,
    cta_href: '/hire',
  },
  {
    id: 'svc-2',
    title: 'Administrative Support',
    slug: 'administrative-support',
    description:
      'Reliable document handling, data organization, and day-to-day operational support that keeps your business moving.',
    image_url:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
    sort_order: 2,
    is_published: true,
    cta_href: '/hire',
  },
  {
    id: 'svc-3',
    title: 'Customer Support',
    slug: 'customer-support',
    description:
      'Professional client communication and service workflows designed to protect your brand experience.',
    image_url:
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80',
    sort_order: 3,
    is_published: true,
    cta_href: '/hire',
  },
  {
    id: 'svc-4',
    title: 'Social Media Management',
    slug: 'social-media-management',
    description:
      'Editorial planning, publishing support, and community engagement aligned with your brand voice.',
    image_url:
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1200&q=80',
    sort_order: 4,
    is_published: true,
    cta_href: '/hire',
  },
  {
    id: 'svc-5',
    title: 'E-commerce Assistance',
    slug: 'ecommerce-assistance',
    description:
      'Product listings, order support, and storefront operations for growing online businesses.',
    image_url:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
    sort_order: 5,
    is_published: true,
    cta_href: '/hire',
  },
  {
    id: 'svc-6',
    title: 'Lead Generation',
    slug: 'lead-generation',
    description:
      'Research, outreach preparation, and pipeline support to help your team focus on closing.',
    image_url:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    sort_order: 6,
    is_published: true,
    cta_href: '/hire',
  },
  {
    id: 'svc-7',
    title: 'Scheduling & Coordination',
    slug: 'scheduling-coordination',
    description:
      'Appointment management, travel coordination, and stakeholder scheduling with meticulous follow-through.',
    image_url:
      'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=1200&q=80',
    sort_order: 7,
    is_published: true,
    cta_href: '/hire',
  },
  {
    id: 'svc-8',
    title: 'Data Entry & Research',
    slug: 'data-entry-research',
    description:
      'Accurate data processing and structured research support for informed business decisions.',
    image_url:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    sort_order: 8,
    is_published: true,
    cta_href: '/hire',
  },
]

export const defaultFaqs: Faq[] = [
  {
    id: 'faq-1',
    question: 'What does Hire Street VA do?',
    answer:
      'Hire Street VA connects businesses with virtual assistants who support daily operations, executive workflows, and specialized business tasks.',
    sort_order: 1,
    is_published: true,
  },
  {
    id: 'faq-2',
    question: 'How can I hire a virtual assistant?',
    answer:
      'Submit an inquiry through our contact or hire page. Our team will review your requirements and follow up with next steps.',
    sort_order: 2,
    is_published: true,
  },
  {
    id: 'faq-3',
    question: 'What services can a virtual assistant provide?',
    answer:
      'Services may include administrative support, customer service, social media, e-commerce, scheduling, research, and more depending on your needs.',
    sort_order: 3,
    is_published: true,
  },
  {
    id: 'faq-4',
    question: 'Can I request specific skills?',
    answer:
      'Yes. Share your preferred tools, industries, and responsibilities in your inquiry so we can align support with your workflow.',
    sort_order: 4,
    is_published: true,
  },
  {
    id: 'faq-5',
    question: 'How do I submit an inquiry?',
    answer:
      'Use the contact form with your name, company, service needed, and message. We will respond using the contact details you provide.',
    sort_order: 5,
    is_published: true,
  },
  {
    id: 'faq-6',
    question: 'How can I apply as a VA?',
    answer:
      'Visit the Careers page to view published openings and submit an application with your resume and cover letter.',
    sort_order: 6,
    is_published: true,
  },
  {
    id: 'faq-7',
    question: 'How can I contact Hire Street VA?',
    answer:
      'Use the contact form on our website. Additional channels will appear here once configured by the administrator.',
    sort_order: 7,
    is_published: true,
  },
]

export const defaultTestimonials: Testimonial[] = []

export const defaultJobs: JobOpening[] = []
