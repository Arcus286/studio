import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Workflow } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Workflow className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">TaskFlow</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="#" className="text-foreground/70 transition-colors hover:text-foreground">Features</Link>
          <Link href="#" className="text-foreground/70 transition-colors hover:text-foreground">Pricing</Link>
          <Link href="#" className="text-foreground/70 transition-colors hover:text-foreground">About</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                    Manage Projects, <span className="text-primary">Not Chaos</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    TaskFlow is the ultimate project management tool for modern teams. Track tasks, collaborate seamlessly, and ship projects faster with our intuitive Kanban board and AI-powered insights.
                  </p>
                </div>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/signup">
                      Get Started <ArrowRight className="ml-2" />
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>AI-Powered Suggestions</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>Drag & Drop Board</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>Role-Based Access</span>
                    </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="https://picsum.photos/seed/board/600/400"
                  width={600}
                  height={400}
                  alt="Kanban board illustration"
                  data-ai-hint="kanban board interface"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
