
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, LogIn, Pencil, Users, Home } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    icon: <LogIn className="h-8 w-8 text-primary" />,
    title: '1. Sign Up & Create Your Profile',
    description: 'Join AgileBridge by creating an account. Fill out your profile to let your team know who you are and what your role is.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: '2. Create or Join a Project',
    description: 'Start a new project or get invited to an existing one. Admins can easily manage team members and their roles.',
  },
  {
    icon: <Pencil className="h-8 w-8 text-primary" />,
    title: '3. Add and Assign Tasks',
    description: 'Break down your project into tasks. Add details, set priorities, and assign them to the appropriate team members.',
  },
  {
    icon: <ArrowRight className="h-8 w-8 text-primary" />,
    title: '4. Track Progress on the Board',
    description: 'Use the Kanban board to visualize your workflow. Drag and drop tasks to update their status and keep everyone in the loop.',
  },
];


export default function HowItWorksPage() {
  return (
    <section className="py-20 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                    How <span className="text-primary">AgileBridge</span> Works
                </h1>
                <p className="text-muted-foreground md:text-xl">
                    A simple and intuitive process to get your projects moving from idea to launch.
                </p>
            </div>

            <div className="mt-16 max-w-4xl mx-auto space-y-8">
                {steps.map((step, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                                    {step.icon}
                                </div>
                                <div>
                                    <CardTitle className="text-xl">{step.title}</CardTitle>
                                    <p className="text-muted-foreground mt-1">{step.description}</p>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>

            <div className="mt-20 text-center">
                <Button asChild variant="outline">
                    <Link href="/">
                        <Home className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>
            </div>
        </div>
    </section>
  );
}
