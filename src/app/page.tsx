import { ArrowRight, Check, Bot } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-center border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
        <div className="flex items-center justify-between w-full max-w-screen-xl">
           <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-primary">
                    <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM11 15.5V11H13V15.5H11ZM11 9V6H13V9H11Z" />
                </svg>
                <span className="font-bold">AgileBridge</span>
            </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#" className="text-foreground/70 transition-colors hover:text-foreground">Features</Link>
            <Link href="#" className="text-foreground/70 transition-colors hover:text-foreground">How it Works</Link>
            <Link href="#" className="text-foreground/70 transition-colors hover:text-foreground">Pricing</Link>
            <Link href="#" className="text-foreground/70 transition-colors hover:text-foreground">Contact</Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
             {/* Placeholder for potential future buttons */}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Streamline Your Project <br/>
                    <span className="text-primary">Workflow</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    AgileBridge is the ultimate project management tool for modern teams. Track tasks, collaborate seamlessly, and ship projects faster than ever before.
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
                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4">
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
                  src="https://picsum.photos/seed/meadow/600/400"
                  width={600}
                  height={400}
                  alt="Misty meadow"
                  data-ai-hint="misty meadow landscape"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center shadow-2xl"
                />
                 <div className="absolute -bottom-10 -left-4 md:-bottom-12 md:-left-8 z-10">
                    <Badge variant="secondary" className="p-3 shadow-lg border-border/50 bg-background/80 backdrop-blur-sm">
                      <span className="mr-2 h-2 w-2 rounded-full bg-green-400"></span>
                      <span className="font-medium text-foreground">Projects Completed</span>
                      <span className="ml-2 font-bold text-lg">20</span>
                    </Badge>
                </div>
                 <div className="absolute -top-10 -right-8 md:-top-12 md:-right-12 z-10">
                    <Badge variant="secondary" className="p-3 shadow-lg border-border/50 bg-background/80 backdrop-blur-sm">
                      <span className="mr-2 h-2 w-2 rounded-full bg-purple-400"></span>
                      <span className="font-medium text-foreground">Active Users</span>
                       <span className="ml-2 font-bold text-lg">218</span>
                    </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Button variant="ghost" size="icon" className="fixed bottom-8 right-8 rounded-full h-12 w-12 bg-primary text-primary-foreground hover:bg-primary/90">
        <Bot className="h-6 w-6"/>
      </Button>
    </div>
  );
}
