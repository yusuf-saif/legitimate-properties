import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const contactEmail = process.env.CONTACT_EMAIL

export async function POST(request: Request) {
  const data = await request.json()

  // TODO: Resend is now wired, but requires RESEND_API_KEY and CONTACT_EMAIL in .env.local
  // TODO: Also save submission to Sanity as a backup record

  if (resend && contactEmail) {
    await resend.emails.send({
      from: 'Legitimate Properties <onboarding@resend.dev>',
      to: contactEmail,
      subject: `New contact enquiry from ${data.name}`,
      html: `
        <h1>New Contact Enquiry</h1>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Consent:</strong> ${data.consent ? 'Yes' : 'No'}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    })
  } else {
    console.log('New contact enquiry:', data)
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
