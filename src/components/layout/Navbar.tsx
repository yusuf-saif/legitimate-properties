'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useScrolled } from '@/lib/hooks/useScrolled'
import { cn } from '@/lib/utils/cn'

const NAV_LINKS = [
  { label: 'Properties', href: '/properties' },
  { label: 'About',      href: '/about' },
  { label: 'Services',   href: '/services' },
  { label: 'Investors',  href: '/investors' },
  { label: 'News',       href: '/news' },
]

export function Navbar() {
  const scrolled = useScrolled(80)
  const [open, setOpen] = useState(false)

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-espresso shadow-nav' : 'bg-transparent'
    )}>
      <nav className="container-lp h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-display text-xl font-semibold text-cream tracking-wide">
          Legitimate<span className="text-gold">.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <Link href={link.href}
                className="text-cream/80 hover:text-gold text-body-sm font-medium transition-colors duration-200 label-caps">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link href="/contact"
          className="hidden lg:inline-flex items-center px-5 py-2.5 bg-terracotta text-white text-body-sm font-semibold rounded-lg hover:bg-terracotta/90 transition-colors duration-200">
          Get In Touch
        </Link>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(true)} className="lg:hidden text-cream p-2" aria-label="Open menu">
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 bg-cream z-50 flex flex-col">
          <div className="container-lp h-20 flex items-center justify-between">
            <Link href="/" className="font-display text-xl font-semibold text-espresso">
              Legitimate<span className="text-gold">.</span>
            </Link>
            <button onClick={() => setOpen(false)} className="text-espresso p-2" aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 container-lp flex flex-col justify-center gap-6">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                className="font-display text-h2 text-espresso hover:text-terracotta transition-colors">
                {link.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)}
              className="mt-4 inline-flex w-fit items-center px-6 py-3 bg-terracotta text-white font-semibold rounded-lg">
              Get In Touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
