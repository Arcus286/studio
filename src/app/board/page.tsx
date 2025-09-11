import { KanbanBoard } from '@/components/kanban/kanban-board';
import { TASKS } from '@/lib/data';

export default function BoardPage() {
  const tasks = TASKS; // In a real app, this would be fetched

  return (
    <div>
        <h1 className="text-3xl font-bold mb-6">Kanban Board</h1>
        <KanbanBoard initialTasks={tasks} />
    </div>
  );
}
