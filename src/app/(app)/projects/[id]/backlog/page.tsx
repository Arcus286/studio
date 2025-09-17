
'use client';

import { notFound } from 'next/navigation';
import { useProjectStore } from '@/lib/project-store';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { Backlog } from '@/components/sprints/backlog';

export default function ProjectBacklogPage({ params: { id } }: { params: { id: string } }) {
  const { projects } = useProjectStore();
  const project = projects.find(p => p.id === id);

  if (!project) {
    // We could show a loading state or a "not found" message.
    // For now, returning null or a loading spinner might be best
    // while the store hydrates on the client.
    // notFound() should be used carefully on client components.
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
            <BreadcrumbPage>Backlog</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Backlog project={project} />
    </div>
  );
}
