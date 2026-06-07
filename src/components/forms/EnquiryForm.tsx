'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'

const schema = z.object({
  name:    z.string().min(2, 'Please enter your full name'),
  email:   z.string().email('Please enter a valid email'),
  phone:   z.string().min(10, 'Please enter a valid phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

interface Props { propertySlug?: string; propertyTitle?: string }

export function EnquiryForm({ propertySlug, propertyTitle }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, propertySlug, propertyTitle }),
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="p-8 bg-cream rounded-card border border-border-soft text-center">
        <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto mb-4 text-xl">✓</div>
        <h3 className="heading-h3 text-espresso mb-2">Enquiry Sent!</h3>
        <p className="text-text-muted text-body-sm">Our team will be in touch within 24 hours.</p>
      </div>
    )
  }

  return (
    <div className="p-6 bg-white rounded-card shadow-card border border-border-soft">
      <h3 className="heading-h3 text-espresso mb-1">Enquire About This Property</h3>
      {propertyTitle && <p className="text-text-muted text-body-sm mb-6">{propertyTitle}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {[
          { id: 'name',  label: 'Full Name',     type: 'text',  placeholder: 'Your full name' },
          { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
          { id: 'phone', label: 'Phone Number',  type: 'tel',   placeholder: '+234 800 000 0000' },
        ].map(({ id, label, type, placeholder }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-espresso font-semibold text-body-sm mb-1.5">{label}</label>
            <input
              id={id} type={type} placeholder={placeholder}
              {...register(id as keyof FormData)}
              className={cn(
                'w-full h-12 px-4 rounded-lg border text-body-md text-text-body bg-white',
                'placeholder:text-text-muted focus:outline-none transition-colors duration-200',
                errors[id as keyof FormData]
                  ? 'border-terracotta focus:border-terracotta'
                  : 'border-border-soft focus:border-gold'
              )}
            />
            {errors[id as keyof FormData] && (
              <p className="text-terracotta text-body-sm mt-1">{errors[id as keyof FormData]?.message}</p>
            )}
          </div>
        ))}

        <div>
          <label htmlFor="message" className="block text-espresso font-semibold text-body-sm mb-1.5">Message</label>
          <textarea
            id="message" rows={4} placeholder="Tell us what you're looking for..."
            {...register('message')}
            className={cn(
              'w-full px-4 py-3 rounded-lg border text-body-md text-text-body bg-white resize-none',
              'placeholder:text-text-muted focus:outline-none transition-colors duration-200',
              errors.message ? 'border-terracotta' : 'border-border-soft focus:border-gold'
            )}
          />
          {errors.message && <p className="text-terracotta text-body-sm mt-1">{errors.message.message}</p>}
        </div>

        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send Enquiry'}
        </Button>
      </form>
    </div>
  )
}
