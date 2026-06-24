import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const posts = await prisma.newsPost.findMany({ orderBy: { publishedAt: 'desc' } })
  return NextResponse.json(posts)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const post = await prisma.newsPost.create({
      data: {
        slug: body.slug,
        title: body.title,
        excerpt: body.excerpt ?? '',
        category: body.category,
        author: body.author,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
        body: body.body ?? '',
        featuredImageUrl: body.featuredImageUrl ?? null,
        featuredImageAlt: body.featuredImageAlt ?? null,
      },
    })
    return NextResponse.json(post)
  } catch (error) {
    console.error('Create news post error:', error)
    return NextResponse.json({ error: 'Failed to create news post' }, { status: 500 })
  }
}
