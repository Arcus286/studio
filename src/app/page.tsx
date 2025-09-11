import { ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-center border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="#" className="text-foreground/70 transition-colors hover:text-foreground">Features</Link>
          <Link href="#" className="text-foreground/70 transition-colors hover:text-foreground">Pricing</Link>
          <Link href="#" className="text-foreground/70 transition-colors hover:text-foreground">Testimonials</Link>
          <Link href="#" className="text-foreground/70 transition-colors hover:text-foreground">Contact</Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                    Collaborate, Innovate, and Succeed with AgileBridge
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    AgileBridge is the ultimate platform for modern software teams to build, ship, and maintain products.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/signup">
                      Get Started <ArrowRight className="ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                </div>
              </div>

              <div className="relative isolate">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                  <div
                    style={{
                      clipPath:
                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                  />
                </div>
                <Image
                  src="https://picsum.photos/seed/dashboard/600/400"
                  width={600}
                  height={400}
                  alt="Dashboard"
                  data-ai-hint="dashboard application screenshot"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center shadow-2xl"
                />
                 <div className="relative mt-8">
                  <div className="absolute -bottom-4 -right-4 bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 shadow-lg animate-fade-in-up">
                    <div className="text-sm font-medium text-white">Projects Completed</div>
                    <div className="text-3xl font-bold text-white">20</div>
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 shadow-lg animate-fade-in-up delay-200">
                    <div className="text-sm font-medium text-white">Active Users</div>
                    <div className="text-3xl font-bold text-white">218</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}