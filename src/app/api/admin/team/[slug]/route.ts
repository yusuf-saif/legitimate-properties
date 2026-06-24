import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const member = await prisma.teamMember.findUnique({ where: { id: params.slug } })
  if (!member) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(member)
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const body = await req.json()
    const member = await prisma.teamMember.update({
      where: { id: params.slug },
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
    console.error('Update team member error:', error)
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await prisma.teamMember.delete({ where: { id: params.slug } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
