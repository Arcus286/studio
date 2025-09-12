'use client';

import { KanbanBoard } from '@/components/kanban/kanban-board';
import { DashboardAnalytics } from '@/components/dashboard/dashboard-analytics';
import { useState } from 'react';
import type { Task, TaskStatus, Project } from '@/lib/types';

interface ProjectBoardProps {
    project: Project;
    initialTasks: Task[];
}

export function ProjectBoard({ project, initialTasks }: ProjectBoardProps) {
  const [highlightedStatus, setHighlightedStatus] = useState<TaskStatus | 'all' | null>(null);

  const handleAnalyticsClick = (status: TaskStatus | 'all') => {
    setHighlightedStatus(status);
    setTimeout(() => {
      setHighlightedStatus(null);
    }, 1500);
  };

  return (
    <>
        <DashboardAnalytics tasks={initialTasks} onCardClick={handleAnalyticsClick} />
        <KanbanBoard initialTasks={initialTasks} highlightedStatus={highlightedStatus} />
    </>
  );
}
