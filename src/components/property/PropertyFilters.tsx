'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function PropertyFilters() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateParam = (key: 'type' | 'location' | 'priceRange', value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {/* Type filter */}
      <select
        value={searchParams.get('type') ?? ''}
        onChange={(event) => updateParam('type', event.target.value)}
        className="px-4 py-2.5 border border-border-soft rounded-lg text-body-sm bg-white text-text-body focus:border-gold focus:outline-none"
      >
        <option value="">All Types</option>
        <option value="residential">Residential</option>
        <option value="commercial">Commercial</option>
        <option value="land">Land</option>
      </select>

      {/* Location filter */}
      <select
        value={searchParams.get('location') ?? ''}
        onChange={(event) => updateParam('location', event.target.value)}
        className="px-4 py-2.5 border border-border-soft rounded-lg text-body-sm bg-white text-text-body focus:border-gold focus:outline-none"
      >
        <option value="">All Locations</option>
        <option value="abuja">Abuja</option>
        <option value="lagos">Lagos</option>
        <option value="port-harcourt">Port Harcourt</option>
      </select>

      {/* Price filter */}
      <select
        value={searchParams.get('priceRange') ?? ''}
        onChange={(event) => updateParam('priceRange', event.target.value)}
        className="px-4 py-2.5 border border-border-soft rounded-lg text-body-sm bg-white text-text-body focus:border-gold focus:outline-none"
      >
        <option value="">Any Price</option>
        <option value="0-50m">Under ₦50M</option>
        <option value="50m-200m">₦50M – ₦200M</option>
        <option value="200m+">₦200M+</option>
      </select>
    </div>
  )
}
