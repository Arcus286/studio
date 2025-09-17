
import { notFound } from 'next/navigation';
import { PROJECTS } from '@/lib/data';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { SprintList } from '@/components/sprints/sprint-list';
import { NewSprintDialog } from '@/components/sprints/new-sprint-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AuthProvider, useAuth } from '@/hooks/use-auth';


function SprintsPageContent({ project }: { project: (typeof PROJECTS)[0] }) {
  const { user } = useAuth();
  const isManager = user?.userType === 'Manager' || user?.userType === 'Admin';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/projects">Projects</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{project.name}</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Sprints</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {isManager && (
          <NewSprintDialog projectId={project.id}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Sprint
            </Button>
          </NewSprintDialog>
        )}
      </div>
      <SprintList projectId={project.id} />
    </div>
  )
}

export default function ProjectSprintsPage({ params: { id } }: { params: { id: string } }) {
  const project = PROJECTS.find(p => p.id === id);

  if (!project) {
    notFound();
  }

  return <SprintsPageContent project={project} />;
}
