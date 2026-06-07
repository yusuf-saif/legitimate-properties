/** Format a price in NGN */
export function formatPrice(amount: number, compact = false): string {
  if (compact) {
    if (amount >= 1_000_000_000) return `₦${(amount / 1_000_000_000).toFixed(1)}B`
    if (amount >= 1_000_000)     return `₦${(amount / 1_000_000).toFixed(1)}M`
  }
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount)
}

/** Format a date for display */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-NG', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

/** Slugify a string */
export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
}
