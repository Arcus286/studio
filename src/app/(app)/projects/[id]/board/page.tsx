
'use client';

import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { ProjectBoard } from '@/components/projects/project-board';
import { useSearchParams } from 'next/navigation';
import { useSharedState } from '@/hooks/use-shared-state';

export default function ProjectBoardPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { projects } = useSharedState();
  const project = projects.find((p) => p.id === id);
  const searchParams = useSearchParams();
  const highlightedTaskId = searchParams.get('highlight');
  const openTaskId = searchParams.get('openTask');

  if (!project) {
    // This can happen on initial load while the store is hydrating
    return <div>Loading project...</div>;
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
            <BreadcrumbPage>Board</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ProjectBoard 
        project={project} 
        highlightedTaskId={highlightedTaskId}
        openTaskId={openTaskId} 
      />
    </div>
  );
}
