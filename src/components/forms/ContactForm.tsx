'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'

const SUBJECT_OPTIONS = [
  { value: 'general', label: 'General' },
  { value: 'property-enquiry', label: 'Property Enquiry' },
  { value: 'investment', label: 'Investment' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'other', label: 'Other' },
] as const

const schema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  subject: z.enum(['general', 'property-enquiry', 'investment', 'partnership', 'other']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  consent: z.boolean().refine(value => value, {
    message: 'You must agree before we can respond to your enquiry',
  }),
})

type FormData = z.infer<typeof schema>

function SuccessState() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      data-mounted={mounted}
      className="rounded-card border border-border-soft bg-cream p-8 text-center opacity-0 shadow-card transition-opacity duration-300 ease-out data-[mounted=true]:opacity-100"
    >
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl text-green-700">✓</div>
      <h3 className="heading-h3 text-espresso mb-2">Message Sent!</h3>
      <p className="text-body-sm text-text-muted">Our team will review your enquiry and respond shortly.</p>
    </div>
  )
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      subject: 'general',
      consent: false,
    },
  })

  const onSubmit = async (data: FormData) => {
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      setSubmitted(true)
    } catch {
      setErrorMessage('We could not send your message right now. Please try again.')
    }
  }

  if (submitted) {
    return <SuccessState />
  }

  return (
    <div className="rounded-card border border-border-soft bg-white p-6 shadow-card">
      <p className="label-caps text-terracotta mb-3">Enquiry Form</p>
      <h2 className="heading-h3 text-espresso mb-1">Tell us how we can help.</h2>
      <p className="mb-6 text-body-sm text-text-muted">Share a few details and our team will get back to you.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {[
          { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
          { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
          { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+234 800 000 0000' },
        ].map(({ id, label, type, placeholder }) => (
          <div key={id}>
            <label htmlFor={id} className="mb-1.5 block text-body-sm font-semibold text-espresso">{label}</label>
            <input
              id={id}
              type={type}
              placeholder={placeholder}
              {...register(id as 'name' | 'email' | 'phone')}
              className={cn(
                'w-full h-12 px-4 rounded-lg border text-body-md text-text-body bg-white',
                'placeholder:text-text-muted focus:outline-none transition-colors duration-200',
                errors[id as 'name' | 'email' | 'phone']
                  ? 'border-terracotta focus:border-terracotta'
                  : 'border-border-soft focus:border-gold'
              )}
            />
            {errors[id as 'name' | 'email' | 'phone'] && (
              <p className="mt-1 text-body-sm text-terracotta">{errors[id as 'name' | 'email' | 'phone']?.message}</p>
            )}
          </div>
        ))}

        <div>
          <label htmlFor="subject" className="mb-1.5 block text-body-sm font-semibold text-espresso">Subject</label>
          <select
            id="subject"
            {...register('subject')}
            className={cn(
              'w-full h-12 px-4 rounded-lg border text-body-md text-text-body bg-white',
              'focus:outline-none transition-colors duration-200',
              errors.subject ? 'border-terracotta focus:border-terracotta' : 'border-border-soft focus:border-gold'
            )}
          >
            {SUBJECT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {errors.subject && <p className="mt-1 text-body-sm text-terracotta">{errors.subject.message}</p>}
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-body-sm font-semibold text-espresso">Message</label>
          <textarea
            id="message"
            rows={4}
            placeholder="Tell us what you're looking for..."
            {...register('message')}
            className={cn(
              'w-full px-4 py-3 rounded-lg border text-body-md text-text-body bg-white resize-none',
              'placeholder:text-text-muted focus:outline-none transition-colors duration-200',
              errors.message ? 'border-terracotta' : 'border-border-soft focus:border-gold'
            )}
          />
          {errors.message && <p className="mt-1 text-body-sm text-terracotta">{errors.message.message}</p>}
        </div>

        <div>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              {...register('consent')}
              className="mt-1 h-4 w-4 rounded border-border-soft text-terracotta focus:ring-gold"
            />
            <span className="text-body-sm text-text-body">
              I agree to my data being used to respond to this enquiry
            </span>
          </label>
          {errors.consent && <p className="mt-1 text-body-sm text-terracotta">{errors.consent.message}</p>}
        </div>

        {errorMessage && <p className="text-body-sm text-terracotta">{errorMessage}</p>}

        <Button
          type="submit"
          fullWidth
          disabled={isSubmitting}
          className="active:scale-[0.97] transition-transform duration-[160ms] ease-out"
        >
          {isSubmitting ? 'Sending…' : 'Send Message'}
        </Button>
      </form>
    </div>
  )
}
