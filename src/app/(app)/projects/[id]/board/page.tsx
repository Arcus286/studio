'use client';

import { KanbanBoard } from '@/components/kanban/kanban-board';
import { TASKS, PROJECTS } from '@/lib/data';
import { DashboardAnalytics } from '@/components/dashboard/dashboard-analytics';
import { useState } from 'react';
import type { TaskStatus } from '@/lib/types';
import { notFound } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';

export default function ProjectBoardPage({ params }: { params: { id: string } }) {
  const project = PROJECTS.find(p => p.id === params.id);

  if (!project) {
    notFound();
  }

  const projectTasks = TASKS.filter(t => t.projectId === project.id);
  const [highlightedStatus, setHighlightedStatus] = useState<TaskStatus | 'all' | null>(null);

  const handleAnalyticsClick = (status: TaskStatus | 'all') => {
    setHighlightedStatus(status);
    setTimeout(() => {
      setHighlightedStatus(null);
    }, 1500);
  };

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
        <DashboardAnalytics tasks={projectTasks} onCardClick={handleAnalyticsClick} />
        <KanbanBoard initialTasks={projectTasks} highlightedStatus={highlightedStatus} />
    </div>
  );
}
