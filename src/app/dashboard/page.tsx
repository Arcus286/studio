import { KanbanBoard } from '@/components/kanban/kanban-board';
import { TASKS } from '@/lib/data';

export default function DashboardPage() {
  const tasks = TASKS; // In a real app, this would be fetched

  return (
    <KanbanBoard initialTasks={tasks} />
  );
}
