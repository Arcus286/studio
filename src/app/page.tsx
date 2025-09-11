import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const StatCard = ({
  icon,
  label,
  value,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}) => (
  <div
    className={cn(
      'inline-flex items-center rounded-full border p-3 shadow-lg border-border/50 bg-background/80 backdrop-blur-sm',
      className
    )}
  >
    <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
      {icon}
    </div>
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  </div>
);

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-center border-b border-border/40 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
        <div className="flex w-full max-w-screen-xl items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M12 3L4 9V17H20V9L12 3Z" />
              <path d="M8 21V15H16V21" />
              <path d="M10 11H14" />
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
              Pricing
            </Link>
            <Link
              href="#"
              className="text-foreground/70 transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </nav>
          <div className="hidden md:flex w-[115px] justify-end">
            <Button variant="ghost" className="absolute bottom-4 right-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
              </svg>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative py-20 md:py-32 lg:py-40">
          <div
            aria-hidden="true"
            className="absolute inset-0 top-0 -z-10 h-full w-full bg-gradient-to-b from-primary/10 to-background"
          />
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Streamline Your Project <br />
                    <span className="text-primary">Workflow</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    AgileBridge is the ultimate project management tool for
                    modern teams. Track tasks, collaborate seamlessly, and ship
                    projects faster than ever before.
                  </p>
                </div>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/signup">
                      Get Started <ArrowRight className="ml-2" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="ghost">
                    <Link href="/login">Sign In</Link>
                  </Button>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
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

              <div className="relative isolate flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1549492423-400259a2e574?q=80&w=800&auto=format&fit=crop"
                  width={800}
                  height={533}
                  alt="Misty meadow"
                  data-ai-hint="misty meadow"
                  className="mx-auto aspect-video max-w-full overflow-hidden rounded-xl object-cover object-center shadow-2xl"
                />

                <div className="absolute top-4 right-0 transform translate-x-1/4 -translate-y-1/2">
                   <div className="inline-flex items-center rounded-lg border text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2  p-3 shadow-lg border-border/50 bg-background/80 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                        Active Users
                        <span className="ml-4 text-xl font-bold">218</span>
                    </div>
                </div>

                <div className="absolute bottom-8 left-0 transform -translate-x-1/4 translate-y-1/2">
                   <div className="inline-flex items-center rounded-lg border text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 p-3 shadow-lg border-border/50 bg-background/80 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                        Projects Completed
                        <span className="ml-4 text-xl font-bold">20</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center py-6 px-4 md:px-6 border-t border-border/40">
        <div className="container flex items-center justify-between">
            <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold">N</div>
            </div>
             <Button variant="ghost" className="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-primary-foreground shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12.0007 10.5867L16.9504 5.63696L18.3646 7.05118L13.4149 12.0009L18.3646 16.9506L16.9504 18.3648L12.0007 13.4151L7.05093 18.3648L5.63672 16.9506L10.5865 12.0009L5.63672 7.05118L7.05093 5.63696L12.0007 10.5867Z"></path></svg>
             </Button>
        </div>
      </footer>
    </div>
  );
}
