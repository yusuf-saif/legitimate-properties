'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrolled } from '@/lib/hooks/useScrolled'
import { cn } from '@/lib/utils/cn'

const NAV = [
  { label: 'Properties', href: '/properties' },
  { label: 'Services',   href: '/services' },
  { label: 'Investors',  href: '/investors' },
  { label: 'News',       href: '/news' },
  { label: 'About',      href: '/about' },
  { label: 'Contact',    href: '/contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(80)
  const pathname = usePathname()

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color] duration-300',
        scrolled
          ? 'bg-espresso/90 backdrop-blur-lg border-b border-cream/10'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="container-lp flex items-center justify-between h-18">
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="Legitimate Properties home">
          <Image src="/logo.png" width={140} height={36} alt="Legitimate Properties"
            className="h-[36px] w-auto object-contain" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-body-sm transition-colors duration-200',
                pathname.startsWith(item.href)
                  ? 'text-gold font-semibold'
                  : 'text-cream/70 hover:text-cream'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden text-cream p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden bg-espresso border-t border-cream/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="container-lp py-6 space-y-4">
              {NAV.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block text-body-md transition-colors duration-200',
                    pathname.startsWith(item.href)
                      ? 'text-gold font-semibold'
                      : 'text-cream/70 hover:text-cream'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
