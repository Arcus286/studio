
import { DashboardAnalytics } from '@/components/dashboard/dashboard-analytics';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { TASKS } from '@/lib/data';
import { KanbanBoard } from '@/components/kanban/kanban-board';

export default function DashboardPage() {
  const tasks = TASKS; // In a real app, this would be fetched

  return (
    <div className="space-y-6">
        <DashboardAnalytics tasks={tasks} />
        <div>
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <RecentActivity tasks={tasks.slice(0,5)} />
        </div>
    </div>
  );
}
