'use client'
import { MessageCircle } from 'lucide-react'

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || '2348000000000'
const WA_MESSAGE = 'Hello, I would like to enquire about a property.'

export function WhatsAppButton() {
  const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white
                 flex items-center justify-center shadow-card-hover
                 hover:scale-110 transition-transform duration-200">
      <MessageCircle size={26} fill="white" />
    </a>
  )
}
