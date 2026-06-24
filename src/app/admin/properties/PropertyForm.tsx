'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ImageUploader } from '@/components/admin/ImageUploader'
import { RichTextEditor } from '@/components/admin/RichTextEditor'

interface ImageField { url: string; alt?: string; caption?: string }

interface Props {
  initial?: {
    id: string
    slug: string
    title: string
    type: string
    status: string
    locationArea: string
    locationCity: string
    locationState: string
    price: number | null
    priceOnRequest: boolean
    specsBedrooms: number | null
    specsBathrooms: number | null
    specsSqm: number | null
    specsParking: number | null
    description: string
    highlights: string
    featured: boolean
    images: ImageField[]
  }
}

export function PropertyForm({ initial }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    slug: initial?.slug ?? '',
    title: initial?.title ?? '',
    type: initial?.type ?? 'residential',
    status: initial?.status ?? 'available',
    locationArea: initial?.locationArea ?? '',
    locationCity: initial?.locationCity ?? '',
    locationState: initial?.locationState ?? '',
    price: initial?.price?.toString() ?? '',
    priceOnRequest: initial?.priceOnRequest ?? false,
    specsBedrooms: initial?.specsBedrooms?.toString() ?? '',
    specsBathrooms: initial?.specsBathrooms?.toString() ?? '',
    specsSqm: initial?.specsSqm?.toString() ?? '',
    specsParking: initial?.specsParking?.toString() ?? '',
    description: initial?.description ?? '',
    highlights: initial?.highlights ? JSON.parse(initial.highlights) : [] as string[],
    featured: initial?.featured ?? false,
    images: initial?.images ?? [] as ImageField[],
    newHighlight: '',
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

  function addHighlight() {
    if (form.newHighlight.trim()) {
      setForm(f => ({ ...f, highlights: [...f.highlights, f.newHighlight.trim()], newHighlight: '' }))
    }
  }

  function removeHighlight(i: number) {
    setForm(f => ({ ...f, highlights: f.highlights.filter((_: string, idx: number) => idx !== i) }))
  }

  function addImage(img: ImageField | null) {
    if (img) setForm(f => ({ ...f, images: [...f.images, img] }))
  }

  function removeImage(i: number) {
    setForm(f => ({ ...f, images: f.images.filter((_: ImageField, idx: number) => idx !== i) }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const url = initial ? `/api/admin/properties/${initial.id}` : '/api/admin/properties'
      const method = initial ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          highlights: JSON.stringify(form.highlights),
        }),
      })
      if (res.ok) router.push('/admin/properties')
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
        <h1 className="heading-h3 text-espresso">{initial ? 'Edit Property' : 'New Property'}</h1>
        <button type="submit" disabled={saving}
          className="px-6 py-2.5 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors text-body-sm font-semibold disabled:opacity-50">
          {saving ? 'Saving...' : initial ? 'Update Property' : 'Create Property'}
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
          <label className="block text-body-sm font-semibold text-espresso mb-1">Type</label>
          <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
            className="w-full px-3 py-2 border border-border-soft rounded-lg text-body-sm focus:outline-none focus:border-terracotta transition-colors">
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="land">Land</option>
            <option value="mixed-use">Mixed Use</option>
          </select>
        </div>
        <div>
          <label className="block text-body-sm font-semibold text-espresso mb-1">Status</label>
          <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
            className="w-full px-3 py-2 border border-border-soft rounded-lg text-body-sm focus:outline-none focus:border-terracotta transition-colors">
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="reserved">Reserved</option>
            <option value="off-plan">Off Plan</option>
          </select>
        </div>
        <div>
          <label className="block text-body-sm font-semibold text-espresso mb-1">Area</label>
          <input type="text" value={form.locationArea} onChange={e => setForm(f => ({ ...f, locationArea: e.target.value }))}
            className="w-full px-3 py-2 border border-border-soft rounded-lg text-body-sm focus:outline-none focus:border-terracotta transition-colors" />
        </div>
        <div>
          <label className="block text-body-sm font-semibold text-espresso mb-1">City</label>
          <input type="text" value={form.locationCity} onChange={e => setForm(f => ({ ...f, locationCity: e.target.value }))}
            className="w-full px-3 py-2 border border-border-soft rounded-lg text-body-sm focus:outline-none focus:border-terracotta transition-colors" />
        </div>
        <div>
          <label className="block text-body-sm font-semibold text-espresso mb-1">State</label>
          <input type="text" value={form.locationState} onChange={e => setForm(f => ({ ...f, locationState: e.target.value }))}
            className="w-full px-3 py-2 border border-border-soft rounded-lg text-body-sm focus:outline-none focus:border-terracotta transition-colors" />
        </div>
        <div>
          <label className="block text-body-sm font-semibold text-espresso mb-1">Price (₦)</label>
          <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
            className="w-full px-3 py-2 border border-border-soft rounded-lg text-body-sm focus:outline-none focus:border-terracotta transition-colors" />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input type="checkbox" id="priceOnRequest" checked={form.priceOnRequest}
            onChange={e => setForm(f => ({ ...f, priceOnRequest: e.target.checked }))} />
          <label htmlFor="priceOnRequest" className="text-body-sm text-text-muted">Price on Request</label>
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input type="checkbox" id="featured" checked={form.featured}
            onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} />
          <label htmlFor="featured" className="text-body-sm text-text-muted">Featured</label>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-body-sm font-semibold text-espresso mb-1">Bedrooms</label>
          <input type="number" value={form.specsBedrooms} onChange={e => setForm(f => ({ ...f, specsBedrooms: e.target.value }))}
            className="w-full px-3 py-2 border border-border-soft rounded-lg text-body-sm focus:outline-none focus:border-terracotta transition-colors" />
        </div>
        <div>
          <label className="block text-body-sm font-semibold text-espresso mb-1">Bathrooms</label>
          <input type="number" value={form.specsBathrooms} onChange={e => setForm(f => ({ ...f, specsBathrooms: e.target.value }))}
            className="w-full px-3 py-2 border border-border-soft rounded-lg text-body-sm focus:outline-none focus:border-terracotta transition-colors" />
        </div>
        <div>
          <label className="block text-body-sm font-semibold text-espresso mb-1">Sqm</label>
          <input type="number" value={form.specsSqm} onChange={e => setForm(f => ({ ...f, specsSqm: e.target.value }))}
            className="w-full px-3 py-2 border border-border-soft rounded-lg text-body-sm focus:outline-none focus:border-terracotta transition-colors" />
        </div>
        <div>
          <label className="block text-body-sm font-semibold text-espresso mb-1">Parking</label>
          <input type="number" value={form.specsParking} onChange={e => setForm(f => ({ ...f, specsParking: e.target.value }))}
            className="w-full px-3 py-2 border border-border-soft rounded-lg text-body-sm focus:outline-none focus:border-terracotta transition-colors" />
        </div>
      </div>

      <div>
        <label className="block text-body-sm font-semibold text-espresso mb-1">Description</label>
        <RichTextEditor value={form.description} onChange={html => setForm(f => ({ ...f, description: html }))} />
      </div>

      <div>
        <label className="block text-body-sm font-semibold text-espresso mb-1">Highlights</label>
        <div className="flex gap-2 mb-2">
          <input type="text" value={form.newHighlight} onChange={e => setForm(f => ({ ...f, newHighlight: e.target.value }))}
            placeholder="Add a highlight..." onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
            className="flex-1 px-3 py-2 border border-border-soft rounded-lg text-body-sm focus:outline-none focus:border-terracotta transition-colors" />
          <button type="button" onClick={addHighlight}
            className="px-3 py-2 bg-espresso text-cream rounded-lg text-body-sm hover:bg-espresso/90 transition-colors">Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form.highlights.map((h: string, i: number) => (
            <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-cream border border-border-soft rounded-full text-body-sm text-text-muted">
              {h}
              <button type="button" onClick={() => removeHighlight(i)} className="text-text-muted hover:text-red-500">&times;</button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-body-sm font-semibold text-espresso mb-2">Gallery Images</label>
        <div className="grid grid-cols-4 gap-3">
          {form.images.map((img: ImageField, i: number) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-border-soft bg-cream">
              <Image src={img.url} alt={img.alt ?? ''} width={200} height={200} className="w-full h-full object-cover" />
              <button type="button" onClick={() => removeImage(i)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full text-xs hover:bg-red-600">&times;</button>
            </div>
          ))}
          <ImageUploader value={null} onChange={(img) => addImage(img)} showAlt={false} showCaption={false} />
        </div>
      </div>
    </form>
  )
}
