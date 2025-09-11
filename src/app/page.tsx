import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3z"></path></svg>
          <span className="font-bold text-lg">TaskFlow</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link href="#" className="text-foreground/70 transition-colors hover:text-foreground">Features</Link>
            <Link href="#" className="text-foreground/70 transition-colors hover:text-foreground">How it Works</Link>
            <Link href="#" className="text-foreground/70 transition-colors hover:text-foreground">Pricing</Link>
            <Link href="#" className="text-foreground/70 transition-colors hover:text-foreground">Contact</Link>
          </nav>
          <div className="flex items-center gap-2">
             <Button variant="ghost" asChild>
                <Link href="/dashboard">Sign In</Link>
            </Button>
            <Button asChild>
                <Link href="/dashboard">Get Started Free</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                    Streamline Your
                    <span className="text-primary"> Workflow</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    TaskFlow is the ultimate project management tool designed to boost productivity. Track tasks, collaborate with your team, and deliver projects on time.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/dashboard">
                      Get Started Free
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="#">
                      <PlayCircle className="mr-2" />
                      Watch Demo
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>✓ Free forever</span>
                    <span>✓ No credit card required</span>
                    <span>✓ Team collaboration</span>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="https://picsum.photos/seed/laptop/600/400"
                  width={600}
                  height={400}
                  alt="Man working on laptop"
                  data-ai-hint="man laptop"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                />
                 <Card className="absolute -bottom-4 -left-4 w-48 shadow-lg">
                    <CardContent className="p-3">
                        <p className="text-sm font-medium">Projects</p>
                        <p className="text-3xl font-bold text-green-500">342</p>
                    </CardContent>
                </Card>
                <Card className="absolute -top-4 -right-4 w-48 shadow-lg">
                    <CardContent className="p-3">
                        <p className="text-sm font-medium">Active Users</p>
                        <p className="text-3xl font-bold text-primary">12.5k</p>
                    </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
