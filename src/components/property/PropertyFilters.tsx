'use client'
// TODO: Wire up filter state to URL search params via useRouter + useSearchParams
// Filter values update the GROQ query in the parent server component via URL

export function PropertyFilters() {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {/* Type filter */}
      <select className="px-4 py-2.5 border border-border-soft rounded-lg text-body-sm bg-white text-text-body focus:border-gold focus:outline-none">
        <option value="">All Types</option>
        <option value="residential">Residential</option>
        <option value="commercial">Commercial</option>
        <option value="land">Land</option>
      </select>

      {/* Location filter */}
      <select className="px-4 py-2.5 border border-border-soft rounded-lg text-body-sm bg-white text-text-body focus:border-gold focus:outline-none">
        <option value="">All Locations</option>
        <option value="abuja">Abuja</option>
        <option value="lagos">Lagos</option>
        <option value="port-harcourt">Port Harcourt</option>
      </select>

      {/* Price filter */}
      <select className="px-4 py-2.5 border border-border-soft rounded-lg text-body-sm bg-white text-text-body focus:border-gold focus:outline-none">
        <option value="">Any Price</option>
        <option value="0-50m">Under ₦50M</option>
        <option value="50m-200m">₦50M – ₦200M</option>
        <option value="200m+">₦200M+</option>
      </select>
    </div>
  )
}
