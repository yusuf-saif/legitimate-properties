import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import '@/styles/globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Legitimate Properties',
    default: 'Legitimate Properties — Premium Real Estate in Nigeria',
  },
  description: 'Legitimate Properties offers premium residential and commercial real estate across Nigeria. Discover homes built for quality living.',
  keywords: ['real estate Nigeria', 'property listings Abuja', 'Nigeria property investment', 'luxury homes Nigeria'],
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    siteName: 'Legitimate Properties',
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
