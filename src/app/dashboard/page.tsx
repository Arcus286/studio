import { KanbanBoard } from '@/components/kanban/kanban-board';
import { DashboardAnalytics } from '@/components/dashboard/dashboard-analytics';
import { TASKS } from '@/lib/data';

export default function DashboardPage() {
  const tasks = TASKS; // In a real app, this would be fetched

  return (
    <>
      <DashboardAnalytics tasks={tasks} />
      <KanbanBoard initialTasks={tasks} />
    </>
  );
}