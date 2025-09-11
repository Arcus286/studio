import { ArrowRight, Check } from 'lucide-react';
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
            <span className="font-bold">TaskFlow</span>
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
        <section className="py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Streamline Your Project <br />
                    <span className="text-primary">Workflow</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    TaskFlow is the ultimate project management tool for modern
                    teams. Track tasks, collaborate seamlessly, and ship
                    projects faster than ever before.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/signup">
                      Get Started <ArrowRight className="ml-2" />
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center gap-4 pt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>AI-Powered Suggestions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Drag & Drop Board</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Team Collaboration</span>
                  </div>
                </div>
              </div>

              <div className="relative isolate">
                <Image
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop"
                  width={600}
                  height={400}
                  alt="Team collaborating around a desk"
                  data-ai-hint="collaboration team meeting"
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
