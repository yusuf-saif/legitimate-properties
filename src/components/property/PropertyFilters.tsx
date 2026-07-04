'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { RotateCcw } from 'lucide-react'

export function PropertyFilters() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const hasFilters = searchParams.toString().length > 0

  const updateParam = (key: 'type' | 'location' | 'priceRange', value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  const clearFilters = () => router.push(pathname)

  const selectClass =
    'px-4 py-2.5 border border-border-soft rounded-lg text-body-sm bg-white text-text-body focus:border-gold focus:outline-none appearance-none cursor-pointer'

  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">
      <select
        value={searchParams.get('type') ?? ''}
        onChange={e => updateParam('type', e.target.value)}
        className={selectClass}
      >
        <option value="">All Types</option>
        <option value="residential">Residential</option>
        <option value="commercial">Commercial</option>
        <option value="land">Land</option>
        <option value="mixed-use">Mixed Use</option>
      </select>

      <select
        value={searchParams.get('location') ?? ''}
        onChange={e => updateParam('location', e.target.value)}
        className={selectClass}
      >
        <option value="">All Locations</option>
        <option value="abuja">Abuja</option>
        <option value="lagos">Lagos</option>
        <option value="port-harcourt">Port Harcourt</option>
      </select>

      <select
        value={searchParams.get('priceRange') ?? ''}
        onChange={e => updateParam('priceRange', e.target.value)}
        className={selectClass}
      >
        <option value="">Any Price</option>
        <option value="0-50m">Under ₦50M</option>
        <option value="50m-200m">₦50M – ₦200M</option>
        <option value="200m+">₦200M+</option>
      </select>

      {hasFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="flex items-center gap-1.5 px-3 py-2.5 text-body-sm text-text-muted hover:text-terracotta transition-colors"
        >
          <RotateCcw size={14} />
          Clear
        </button>
      )}
    </div>
  )
}
