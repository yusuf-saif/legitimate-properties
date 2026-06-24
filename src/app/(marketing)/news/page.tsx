import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { mapNewsPost } from '@/lib/mappers'
import { PageTransition } from '@/components/ui/PageTransition'
import { formatDate } from '@/lib/utils/format'
import type { NewsPost } from '@/types'

function NewsCard({ post }: { post: NewsPost }) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="group overflow-hidden rounded-card bg-white shadow-card hover:shadow-card-hover transition-shadow duration-300"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-cream">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt ?? post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-cream text-body-sm text-text-muted">No image</div>
        )}
        <span className="absolute top-3 left-3 rounded bg-terracotta px-2.5 py-1 text-white label-caps">
          {post.category.replace('-', ' ')}
        </span>
      </div>
      <div className="p-5">
        <p className="text-body-sm text-text-muted mb-2">{formatDate(post.publishedAt)}</p>
        <h3 className="heading-h4 text-espresso group-hover:text-terracotta transition-colors mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-body-sm text-text-muted mb-4 line-clamp-3">{post.excerpt}</p>
        <span className="text-body-sm font-semibold text-terracotta">Read More →</span>
      </div>
    </Link>
  )
}

export default async function NewsPage() {
  const raw = await prisma.newsPost.findMany({
    orderBy: { publishedAt: 'desc' },
  })
  const posts = raw.map(mapNewsPost)

  return (
    <PageTransition>
      <div className="pt-24">
        <section className="section-padding-sm bg-espresso text-cream">
          <div className="container-lp">
            <p className="label-caps text-gold mb-4">News & Insights</p>
            <h1 className="heading-h1 max-w-2xl">From Our Desk</h1>
          </div>
        </section>

        <section className="section-padding bg-cream">
          <div className="container-lp">
            {posts.length === 0 ? (
              <p className="py-16 text-center text-body-md text-text-muted">No articles yet.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map(post => <NewsCard key={post.id} post={post} />)}
              </div>
            )}
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
