
'use client';
import { PROJECTS } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { ProjectBoard } from '@/components/projects/project-board';
import { useSprintStore } from '@/lib/sprint-store';
import { useMemo } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProjectBoardPage({ params }: { params: { id: string } }) {
  const project = PROJECTS.find(p => p.id === params.id);
  const { sprints } = useSprintStore();
  
  const activeSprint = useMemo(() => {
    return sprints.find(s => s.projectId === params.id && s.status === 'active');
  }, [sprints, params.id]);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
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
              <BreadcrumbPage>Active Sprint</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {activeSprint ? (
          <ProjectBoard project={project} sprint={activeSprint} />
        ) : (
          <Alert>
            <Flame className="h-4 w-4" />
            <AlertTitle>No Active Sprint</AlertTitle>
            <AlertDescription>
              There is no active sprint for this project. Go to the sprints page to start one.
            </AlertDescription>
             <Button asChild className='mt-4'>
                <Link href={`/projects/${project.id}/sprints`}>
                    Go to Sprints
                </Link>
            </Button>
          </Alert>
        )}
    </div>
  );
}
