import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const post = await prisma.newsPost.findUnique({ where: { id: params.slug } })
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const body = await req.json()
    const post = await prisma.newsPost.update({
      where: { id: params.slug },
      data: {
        slug: body.slug,
        title: body.title,
        excerpt: body.excerpt ?? '',
        category: body.category,
        author: body.author,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined,
        body: body.body ?? '',
        featuredImageUrl: body.featuredImageUrl ?? null,
        featuredImageAlt: body.featuredImageAlt ?? null,
      },
    })
    return NextResponse.json(post)
  } catch (error) {
    console.error('Update news post error:', error)
    return NextResponse.json({ error: 'Failed to update news post' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await prisma.newsPost.delete({ where: { id: params.slug } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
