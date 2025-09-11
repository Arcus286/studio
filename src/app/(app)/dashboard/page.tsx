import { DashboardAnalytics } from '@/components/dashboard/dashboard-analytics';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { TASKS } from '@/lib/data';

export default function DashboardPage() {
  const tasks = TASKS; // In a real app, this would be fetched

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       <div className="lg:col-span-2">
            <DashboardAnalytics tasks={tasks} />
       </div>
        <div className="lg:col-span-1">
            <RecentActivity tasks={tasks} />
        </div>
    </div>
  );
}
