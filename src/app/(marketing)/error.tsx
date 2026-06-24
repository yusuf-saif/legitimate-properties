'use client'

export default function MarketingError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="pt-24 min-h-screen bg-cream flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <p className="heading-display-lg text-terracotta mb-4">Oops</p>
        <h1 className="heading-h2 text-espresso mb-4">Something went wrong</h1>
        <p className="text-body-md text-text-muted mb-8">Please try refreshing the page or come back later.</p>
        <button onClick={reset}
          className="px-8 py-3 bg-terracotta text-white font-semibold rounded-lg hover:bg-terracotta/90 transition-colors">
          Try Again
        </button>
      </div>
    </div>
  )
}
