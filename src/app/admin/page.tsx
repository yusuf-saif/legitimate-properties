import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { ArrowUpRight, Building2, Newspaper, Users } from 'lucide-react'

export default async function AdminDashboard() {
  const [propertyCount, newsCount, teamCount, recentProperties, recentNews] = await Promise.all([
    prisma.property.count(),
    prisma.newsPost.count(),
    prisma.teamMember.count(),
    prisma.property.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
    prisma.newsPost.findMany({ take: 5, orderBy: { publishedAt: 'desc' } }),
  ])

  return (
    <div>
      <h1 className="heading-h2 text-espresso mb-8">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="rounded-card bg-white p-6 shadow-card border border-border-soft">
          <div className="flex items-center justify-between mb-4">
            <Building2 size={24} className="text-terracotta" />
            <span className="label-caps text-text-muted">Total</span>
          </div>
          <p className="heading-h1 text-espresso">{propertyCount}</p>
          <p className="text-body-sm text-text-muted mt-1">Properties</p>
        </div>
        <div className="rounded-card bg-white p-6 shadow-card border border-border-soft">
          <div className="flex items-center justify-between mb-4">
            <Newspaper size={24} className="text-terracotta" />
            <span className="label-caps text-text-muted">Total</span>
          </div>
          <p className="heading-h1 text-espresso">{newsCount}</p>
          <p className="text-body-sm text-text-muted mt-1">News Articles</p>
        </div>
        <div className="rounded-card bg-white p-6 shadow-card border border-border-soft">
          <div className="flex items-center justify-between mb-4">
            <Users size={24} className="text-terracotta" />
            <span className="label-caps text-text-muted">Total</span>
          </div>
          <p className="heading-h1 text-espresso">{teamCount}</p>
          <p className="text-body-sm text-text-muted mt-1">Team Members</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-card bg-white p-6 shadow-card border border-border-soft">
          <div className="flex items-center justify-between mb-4">
            <h2 className="heading-h4 text-espresso">Recent Properties</h2>
            <Link href="/admin/properties" className="text-terracotta text-body-sm hover:underline flex items-center gap-1">
              View all <ArrowUpRight size={14} />
            </Link>
          </div>
          {recentProperties.length === 0 ? (
            <p className="text-body-sm text-text-muted">No properties yet.</p>
          ) : (
            <ul className="space-y-2">
              {recentProperties.map(p => (
                <li key={p.id} className="flex items-center justify-between py-1.5 border-b border-border-soft last:border-0">
                  <span className="text-body-sm text-text-body truncate">{p.title}</span>
                  <span className="label-caps text-text-muted shrink-0 ml-4">{p.type}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-card bg-white p-6 shadow-card border border-border-soft">
          <div className="flex items-center justify-between mb-4">
            <h2 className="heading-h4 text-espresso">Recent News</h2>
            <Link href="/admin/news" className="text-terracotta text-body-sm hover:underline flex items-center gap-1">
              View all <ArrowUpRight size={14} />
            </Link>
          </div>
          {recentNews.length === 0 ? (
            <p className="text-body-sm text-text-muted">No news yet.</p>
          ) : (
            <ul className="space-y-2">
              {recentNews.map(n => (
                <li key={n.id} className="flex items-center justify-between py-1.5 border-b border-border-soft last:border-0">
                  <span className="text-body-sm text-text-body truncate">{n.title}</span>
                  <span className="label-caps text-text-muted shrink-0 ml-4">{n.category}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
