
'use client';
import { notFound } from 'next/navigation';
import { useProjectStore } from '@/lib/project-store';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { SprintList } from '@/components/sprints/sprint-list';
import { NewSprintDialog } from '@/components/sprints/new-sprint-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import type { Project } from '@/lib/types';


function SprintsPageContent({ project }: { project: Project }) {
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


export default function ProjectSprintsPage({ params }: { params: { id: string } }) {
  const { projects } = useProjectStore();
  const project = projects.find(p => p.id === params.id);

  if (!project) {
    return <div>Loading project...</div>;
  }

  return <SprintsPageContent project={project} />;
}
