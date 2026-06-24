'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid'
import { formatDate } from '@/lib/utils/format'
import type { NewsPost } from '@/types'

export function LatestNews({ posts }: { posts: NewsPost[] }) {
  if (!posts?.length) return null
  return (
    <Reveal as="section" className="section-padding bg-cream">
      <div className="container-lp">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="label-caps text-terracotta mb-3">Insights & News</p>
            <h2 className="heading-h2 text-espresso">From Our Desk</h2>
          </div>
          <Link href="/news" className="hidden sm:inline text-terracotta font-semibold text-body-sm hover:underline underline-offset-4">
            All Articles →
          </Link>
        </div>
        <StaggerGrid className="grid md:grid-cols-3 gap-6">
          {posts.map(post => (
            <StaggerItem key={post.id}>
              <Link href={`/news/${post.slug}`}
                className="group bg-white rounded-card shadow-card hover:shadow-card-hover overflow-hidden transition-shadow duration-300 block">
                <div className="relative aspect-[3/2] overflow-hidden">
                  {post.featuredImage && (
                    <Image src={post.featuredImage.url} alt={post.featuredImage.alt ?? post.title}
                      fill className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw" />
                  )}
                  <span className="absolute top-3 left-3 bg-terracotta text-white label-caps px-2.5 py-1 rounded">
                    {post.category.replace('-', ' ')}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-text-muted text-body-sm mb-2">{formatDate(post.publishedAt)}</p>
                  <h3 className="heading-h4 text-espresso group-hover:text-terracotta transition-colors line-clamp-2 mb-2">{post.title}</h3>
                  <p className="text-text-muted text-body-sm line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </Reveal>
  )
}
