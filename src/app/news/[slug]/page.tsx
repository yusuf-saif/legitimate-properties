import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { sanityClient } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { NEWS_BY_SLUG_QUERY, NEWS_QUERY } from '@/lib/sanity/queries'
import { formatDate } from '@/lib/utils/format'
import type { NewsPost } from '@/types'

export const revalidate = 3600

interface Props {
  params: { slug: string }
}

function NewsCard({ post }: { post: NewsPost }) {
  return (
    <Link
      href={`/news/${post.slug}`}
      className="group overflow-hidden rounded-card bg-white shadow-card hover:shadow-card-hover transition-shadow duration-300"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-cream">
        {post.featuredImage ? (
          <Image
            src={urlFor(post.featuredImage).width(600).height(400).url()}
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = sanityClient
    ? await sanityClient.fetch<NewsPost>(NEWS_BY_SLUG_QUERY, { slug: params.slug })
    : null

  if (!post) {
    return { title: 'Article Not Found' }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function NewsDetailPage({ params }: Props) {
  const post = sanityClient
    ? await sanityClient.fetch<NewsPost>(NEWS_BY_SLUG_QUERY, { slug: params.slug })
    : null

  if (!post) notFound()

  const relatedPosts = sanityClient
    ? (await sanityClient.fetch<NewsPost[]>(NEWS_QUERY)).filter(item => item.slug !== params.slug).slice(0, 3)
    : []
  const body = post.body as PortableTextBlock[]

  return (
    <div>
      <section className="relative bg-espresso">
        <div className="relative aspect-[21/9] overflow-hidden">
          {post.featuredImage ? (
            <Image
              src={urlFor(post.featuredImage).width(1800).height(771).url()}
              alt={post.featuredImage.alt ?? post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          ) : (
            <div className="h-full w-full bg-cream" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="container-lp pb-10">
              <h1 className="heading-h1 max-w-3xl text-cream">{post.title}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-lp max-w-text mx-auto">
          <p className="label-caps text-terracotta mb-3">
            {post.category.replace('-', ' ')} · {formatDate(post.publishedAt)}
          </p>
          <h2 className="heading-h1 text-espresso mb-4">{post.title}</h2>
          <p className="text-body-lg text-text-muted mb-10">By {post.author}</p>

          <div className="prose text-text-body [&_h2]:heading-h2 [&_h2]:text-espresso [&_h2]:mb-4 [&_h2]:mt-10 [&_p]:text-body-md [&_p]:mb-4 [&_p]:text-text-body">
            <PortableText value={body} />
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="section-padding bg-cream">
          <div className="container-lp">
            <div className="mb-10">
              <p className="label-caps text-terracotta mb-3">Related Reading</p>
              <h2 className="heading-h2 text-espresso">More from Our Desk</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map(relatedPost => <NewsCard key={relatedPost._id} post={relatedPost} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
