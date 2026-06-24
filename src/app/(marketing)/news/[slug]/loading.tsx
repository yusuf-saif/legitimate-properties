export default function Loading() {
  return (
    <div className="pt-24 min-h-screen bg-cream">
      <div className="aspect-[21/9] bg-espresso/50 animate-pulse" />
      <div className="section-padding">
        <div className="container-lp max-w-text mx-auto space-y-4">
          <div className="h-4 bg-cream rounded w-1/4 animate-pulse" />
          <div className="h-8 bg-cream rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-cream rounded w-1/3 animate-pulse" />
          <div className="space-y-3 mt-10">
            <div className="h-3 bg-cream rounded w-full animate-pulse" />
            <div className="h-3 bg-cream rounded w-full animate-pulse" />
            <div className="h-3 bg-cream rounded w-5/6 animate-pulse" />
            <div className="h-3 bg-cream rounded w-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
