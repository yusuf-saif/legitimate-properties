'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ImageUploader } from '@/components/admin/ImageUploader'
import { RichTextEditor } from '@/components/admin/RichTextEditor'

interface Props {
  initial?: {
    id: string
    slug: string
    title: string
    excerpt: string
    category: string
    author: string
    publishedAt: string
    body: string
    featuredImageUrl: string | null
    featuredImageAlt: string | null
  }
}

export function NewsForm({ initial }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    slug: initial?.slug ?? '',
    title: initial?.title ?? '',
    excerpt: initial?.excerpt ?? '',
    category: initial?.category ?? 'market-insight',
    author: initial?.author ?? '',
    publishedAt: initial?.publishedAt?.split('T')[0] ?? new Date().toISOString().split('T')[0],
    body: initial?.body ?? '',
    featuredImageUrl: initial?.featuredImageUrl ?? '',
    featuredImageAlt: initial?.featuredImageAlt ?? '',
  })

  function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  function handleTitleChange(title: string) {
    if (!initial || !form.slug) {
      setForm(f => ({ ...f, title, slug: generateSlug(title) }))
    } else {
      setForm(f => ({ ...f, title }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const url = initial ? `/api/admin/news/${initial.id}` : '/api/admin/news'
      const method = initial ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          featuredImageUrl: form.featuredImageUrl || null,
          featuredImageAlt: form.featuredImageAlt || null,
        }),
      })
      if (res.ok) router.push('/admin/news')
      else alert('Failed to save')
    } catch {
      alert('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="heading-h3 text-espresso">{initial ? 'Edit Article' : 'New Article'}</h1>
        <button type="submit" disabled={saving}
          className="px-6 py-2.5 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors text-body-sm font-semibold disabled:opacity-50">
          {saving ? 'Saving...' : initial ? 'Update Article' : 'Create Article'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-body-sm font-semibold text-espresso mb-1">Title</label>
          <input type="text" value={form.title} onChange={e => handleTitleChange(e.target.value)} required
            className="w-full px-3 py-2 border border-border-soft rounded-lg text-body-sm focus:outline-none focus:border-terracotta transition-colors" />
        </div>
        <div className="col-span-2">
          <label className="block text-body-sm font-semibold text-espresso mb-1">Slug</label>
          <input type="text" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} required
            className="w-full px-3 py-2 border border-border-soft rounded-lg text-body-sm focus:outline-none focus:border-terracotta transition-colors" />
        </div>
        <div>
          <label className="block text-body-sm font-semibold text-espresso mb-1">Category</label>
          <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            className="w-full px-3 py-2 border border-border-soft rounded-lg text-body-sm focus:outline-none focus:border-terracotta transition-colors">
            <option value="market-insight">Market Insight</option>
            <option value="company-news">Company News</option>
            <option value="development-update">Development Update</option>
            <option value="investment">Investment</option>
          </select>
        </div>
        <div>
          <label className="block text-body-sm font-semibold text-espresso mb-1">Author</label>
          <input type="text" value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} required
            className="w-full px-3 py-2 border border-border-soft rounded-lg text-body-sm focus:outline-none focus:border-terracotta transition-colors" />
        </div>
        <div>
          <label className="block text-body-sm font-semibold text-espresso mb-1">Published Date</label>
          <input type="date" value={form.publishedAt} onChange={e => setForm(f => ({ ...f, publishedAt: e.target.value }))}
            className="w-full px-3 py-2 border border-border-soft rounded-lg text-body-sm focus:outline-none focus:border-terracotta transition-colors" />
        </div>
      </div>

      <div className="col-span-2">
        <label className="block text-body-sm font-semibold text-espresso mb-1">Excerpt</label>
        <textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} rows={3}
          className="w-full px-3 py-2 border border-border-soft rounded-lg text-body-sm focus:outline-none focus:border-terracotta transition-colors" />
      </div>

      <div>
        <label className="block text-body-sm font-semibold text-espresso mb-1">Body</label>
        <RichTextEditor value={form.body} onChange={html => setForm(f => ({ ...f, body: html }))} />
      </div>

      <div>
        <label className="block text-body-sm font-semibold text-espresso mb-2">Featured Image</label>
        <div className="max-w-xs">
          <ImageUploader
            value={form.featuredImageUrl ? { url: form.featuredImageUrl, alt: form.featuredImageAlt } : null}
            onChange={img => setForm(f => ({ ...f, featuredImageUrl: img?.url ?? '', featuredImageAlt: img?.alt ?? '' }))}
          />
        </div>
      </div>
    </form>
  )
}
