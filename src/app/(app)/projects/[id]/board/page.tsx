
'use client';

import { useProjectStore } from '@/lib/project-store';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { ProjectBoard } from '@/components/projects/project-board';
import type { Project } from '@/lib/types';

function ProjectBoardPageContent({ project }: { project: Project }) {
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
        
        <ProjectBoard project={project} />
    </div>
  );
}


export default function ProjectBoardPage({ params }: { params: { id: string } }) {
  const { projects } = useProjectStore();
  const project = projects.find(p => p.id === params.id);

  if (!project) {
    return <div>Loading project...</div>;
  }

  return <ProjectBoardPageContent project={project} />
}
