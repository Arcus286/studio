import { KanbanBoard } from '@/components/kanban/kanban-board';
import { TASKS } from '@/lib/data';
import { DashboardAnalytics } from '@/components/dashboard/dashboard-analytics';

export default function BoardPage() {
  const tasks = TASKS; // In a real app, this would be fetched

  return (
    <div className="space-y-6">
        <DashboardAnalytics tasks={tasks} />
        <KanbanBoard initialTasks={tasks} />
    </div>
  );
}
