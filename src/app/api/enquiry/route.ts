import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await request.json()

  // TODO: Replace with your email provider (Resend, Nodemailer, SendGrid etc.)
  // TODO: Also save submission to Sanity as a backup record

  console.log('New enquiry:', data)

  // Placeholder — always returns success in dev
  return NextResponse.json({ success: true }, { status: 200 })
}
