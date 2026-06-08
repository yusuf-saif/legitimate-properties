import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pt-24">
        <div className="container-lp flex min-h-[calc(100vh-6rem)] items-center justify-center py-16">
          <div className="text-center">
            <p className="heading-display-xl text-terracotta mb-4">404</p>
            <h1 className="heading-h2 text-espresso mb-4">Page not found</h1>
            <p className="mx-auto mb-8 max-w-xl text-body-md text-text-muted">
              The page you are looking for is not available. You can return home or continue browsing our current property listings.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/properties">Browse Properties</Button>
              <Button href="/" variant="secondary">Go Home</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
