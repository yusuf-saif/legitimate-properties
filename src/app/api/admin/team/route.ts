import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const members = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(members)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const member = await prisma.teamMember.create({
      data: {
        name: body.name,
        title: body.title,
        bio: body.bio ?? null,
        photoUrl: body.photoUrl ?? null,
        photoAlt: body.photoAlt ?? null,
        order: body.order ?? 99,
      },
    })
    return NextResponse.json(member)
  } catch (error) {
    console.error('Create team member error:', error)
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 })
  }
}
