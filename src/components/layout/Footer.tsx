import Link from 'next/link'
import { Instagram, Linkedin, Facebook } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-espresso text-cream">
      <div className="container-lp py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <p className="font-display text-xl font-semibold mb-3">
            Legitimate<span className="text-gold">.</span>
          </p>
          <p className="text-cream/60 text-body-sm leading-relaxed max-w-xs">
            Premium real estate across Nigeria. Where homes tell stories.
          </p>
          <div className="flex gap-4 mt-6">
            {[
              { icon: Instagram, href: '#', label: 'Instagram' },
              { icon: Linkedin,  href: '#', label: 'LinkedIn' },
              { icon: Facebook,  href: '#', label: 'Facebook' },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} aria-label={label}
                className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center text-cream/70 hover:bg-gold hover:text-espresso transition-all duration-200">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <p className="label-caps text-gold mb-5">Quick Links</p>
          <ul className="space-y-3">
            {[['Home','/'],['About','/about'],['Services','/services'],['News','/news']].map(([l,h]) => (
              <li key={h}><Link href={h} className="text-cream/60 hover:text-cream text-body-sm transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        {/* Properties */}
        <div>
          <p className="label-caps text-gold mb-5">Properties</p>
          <ul className="space-y-3">
            {[['All Listings','/properties'],['Residential','/properties?type=residential'],['Commercial','/properties?type=commercial'],['Investment','/investors']].map(([l,h]) => (
              <li key={h}><Link href={h} className="text-cream/60 hover:text-cream text-body-sm transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="label-caps text-gold mb-5">Contact</p>
          <address className="not-italic space-y-3 text-cream/60 text-body-sm">
            <p>Abuja, Federal Capital Territory, Nigeria</p>
            <a href="tel:+2341234567890" className="block hover:text-cream transition-colors">+234 123 456 7890</a>
            <a href="mailto:hello@legitimateproperties.ng" className="block hover:text-cream transition-colors">hello@legitimateproperties.ng</a>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="container-lp py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-cream/40 text-body-sm">
          <p>© {new Date().getFullYear()} Legitimate Properties. All rights reserved.</p>
          <Link href="/privacy" className="hover:text-cream transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}
