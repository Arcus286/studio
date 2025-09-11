
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const features = [
  {
    title: 'AI-Powered Suggestions',
    description: 'Leverage artificial intelligence to generate user stories, suggest task breakdowns, and identify potential risks in your project.',
  },
  {
    title: 'Interactive Kanban Board',
    description: 'Visualize your workflow with a drag-and-drop Kanban board. Easily move tasks between columns to track progress from "To Do" to "Done".',
  },
  {
    title: 'Real-Time Collaboration',
    description: 'Work seamlessly with your team. Get instant notifications on task updates, assignments, and comments.',
  },
  {
    title: 'Project & Role Management',
    description: 'Organize your work into projects, assign roles to team members, and manage permissions with a powerful admin dashboard.',
  },
  {
    title: 'Detailed Analytics',
    description: 'Gain insights into your team\'s performance with charts and metrics on task completion, time tracking, and workload distribution.',
  },
  {
    title: 'Customizable Profiles',
    description: 'Personalize your user profile with your designation, university, bio, and more to share your role and expertise with the team.',
  },
];

export default function FeaturesPage() {
  return (
    <section className="py-20 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                    Features of <span className="text-primary">AgileBridge</span>
                </h1>
                <p className="text-muted-foreground md:text-xl">
                    Everything you need to manage your projects, collaborate with your team, and ship faster.
                </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <Card key={index} className="hover:shadow-primary/20 hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                    <CheckCircle className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle>{feature.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </section>
  );
}
