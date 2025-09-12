import { TASKS, PROJECTS } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { ProjectBoard } from '@/components/projects/project-board';

export default function ProjectBoardPage({ params }: { params: { id: string } }) {
  const project = PROJECTS.find(p => p.id === params.id);

  if (!project) {
    notFound();
  }

  const projectTasks = TASKS.filter(t => t.projectId === project.id);

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
        <ProjectBoard project={project} initialTasks={projectTasks} />
    </div>
  );
}
