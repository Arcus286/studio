'use client';

import { KanbanBoard } from '@/components/kanban/kanban-board';
import { TASKS } from '@/lib/data';
import { DashboardAnalytics } from '@/components/dashboard/dashboard-analytics';
import { useState } from 'react';
import type { TaskStatus } from '@/lib/types';

export default function BoardPage() {
  const tasks = TASKS; // In a real app, this would be fetched
  const [highlightedStatus, setHighlightedStatus] = useState<TaskStatus | 'all' | null>(null);

  const handleAnalyticsClick = (status: TaskStatus | 'all') => {
    setHighlightedStatus(status);
    setTimeout(() => {
      setHighlightedStatus(null);
    }, 1500);
  };

  return (
    <div className="space-y-6">
        <DashboardAnalytics tasks={tasks} onCardClick={handleAnalyticsClick} />
        <KanbanBoard initialTasks={tasks} highlightedStatus={highlightedStatus} />
    </div>
  );
}
