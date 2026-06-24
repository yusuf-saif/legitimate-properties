export default function Loading() {
  return (
    <div className="pt-24 min-h-screen bg-cream">
      <div className="section-padding-sm bg-espresso animate-pulse" />
      <div className="section-padding">
        <div className="container-lp">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="rounded-card bg-white shadow-card overflow-hidden">
                <div className="aspect-[16/10] bg-cream animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-cream rounded w-3/4 animate-pulse" />
                  <div className="h-3 bg-cream rounded w-1/2 animate-pulse" />
                  <div className="h-3 bg-cream rounded w-full animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
