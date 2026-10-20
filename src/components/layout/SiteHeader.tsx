import { Menu, X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BrandLogo } from '../ui/BrandLogo'
import { Container } from '../ui/Container'

const links = [
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/hire', label: 'Hire a VA' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/70 backdrop-blur-xl">
      <Container className="flex h-[5.5rem] items-center justify-between md:h-24">
        <BrandLogo />

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-rose-soft' : 'text-white/70 hover:text-white'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/hire"
            className="rounded-full border border-rose/40 px-5 py-2 text-sm font-semibold text-rose-soft transition hover:bg-rose/10"
          >
            Get Started
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex rounded-full border border-white/15 p-2 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      {open && (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-white/10 bg-charcoal lg:hidden"
        >
          <Container className="flex flex-col gap-4 py-6">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="text-lg font-medium text-white/85"
              >
                {link.label}
              </NavLink>
            ))}
          </Container>
        </motion.div>
      )}
    </header>
  )
}
