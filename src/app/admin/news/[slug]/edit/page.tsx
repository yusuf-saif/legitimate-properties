import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { NewsForm } from '../../NewsForm'

export default async function EditNewsPage({ params }: { params: { slug: string } }) {
  const post = await prisma.newsPost.findUnique({ where: { id: params.slug } })
  if (!post) notFound()

  return (
    <NewsForm initial={{
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      author: post.author,
      publishedAt: post.publishedAt.toISOString(),
      body: post.body,
      featuredImageUrl: post.featuredImageUrl,
      featuredImageAlt: post.featuredImageAlt,
    }} />
  )
}
