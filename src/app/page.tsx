import { ArrowRight, Check, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/header';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-center border-b border-border/40 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
        <div className="flex w-full max-w-screen-xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
             <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 text-primary"
            >
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM11.2 12.15L9.05 14.3L7.65 12.9L11.2 9.35L14.75 12.9L13.35 14.3L11.2 12.15Z" />
            </svg>
            <span className="font-bold">AgileBridge</span>
          </Link>
          <nav className="hidden flex-1 items-center justify-center gap-6 text-sm font-medium md:flex">
            <Link
              href="#"
              className="text-foreground/70 transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-foreground/70 transition-colors hover:text-foreground"
            >
              How it Works
            </Link>
            <Link
              href="#"
              className="text-foreground/70 transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </nav>
          <div className="hidden items-center gap-4 md:flex">
             <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
                <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative py-20 md:py-32 lg:py-40">
           <div
            aria-hidden="true"
            className="absolute inset-0 top-0 -z-10 h-1/2 w-full bg-gradient-to-b from-primary/10 to-background"
          />
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Streamline Your Project <br />
                    <span className="text-primary">Workflow</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    AgileBridge is the ultimate project management tool for modern
                    teams. Track tasks, collaborate seamlessly, and ship
                    projects faster than ever before.
                  </p>
                </div>
                 <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <Image
                      src="https://i.pravatar.cc/150?u=a"
                      width={40}
                      height={40}
                      alt="User avatar"
                      className="h-10 w-10 rounded-full border-2 border-background"
                    />
                    <Image
                      src="https://i.pravatar.cc/150?u=b"
                      width={40}
                      height={40}
                      alt="User avatar"
                      className="h-10 w-10 rounded-full border-2 border-background"
                    />
                    <Image
                      src="https://i.pravatar.cc/150?u=c"
                      width={40}
                      height={40}
                      alt="User avatar"
                      className="h-10 w-10 rounded-full border-2 border-background"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-0.5">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <Star className="h-5 w-5 fill-muted stroke-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Loved by 10,000+ users worldwide
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/signup">
                      Get Started <ArrowRight className="ml-2" />
                    </Link>
                  </Button>
                   <Button asChild size="lg" variant="outline">
                    <Link href="#">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative isolate">
                <div className="absolute right-0 top-1/4 -z-10 mr-20">
                     <div
                        className="rounded-full bg-primary/20 p-3 shadow-lg"
                        >
                        <div className="flex items-center gap-2">
                        </div>
                    </div>
                </div>
                <div className="absolute -bottom-8 left-0 -z-10 ml-20">
                     <div
                        className="rounded-full bg-primary/20 p-3 shadow-lg"
                        >
                        <div className="flex items-center gap-2">
                        </div>
                    </div>
                </div>
                <Image
                  src="https://images.unsplash.com/photo-1549492423-400259a2e574?q=80&w=800&auto=format&fit=crop"
                  width={800}
                  height={533}
                  alt="Misty meadow"
                  data-ai-hint="misty meadow"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
