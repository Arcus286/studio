
'use client';

import type { Task } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';

type DashboardAnalyticsProps = {
  tasks: Task[];
};

export function DashboardAnalytics({ tasks }: DashboardAnalyticsProps) {
  const { user } = useAuth();

  const filteredTasks =
    user?.role === 'Admin'
      ? tasks
      : tasks.filter((task) => task.assignedRole === user?.role);

  const totalTasks = filteredTasks.length;
  const doneTasks = filteredTasks.filter((t) => t.status === 'Done').length;
  const inProgressTasks = filteredTasks.filter(
    (t) => t.status === 'In Progress'
  ).length;
  const todoTasks = filteredTasks.filter((t) => t.status === 'To Do').length;
  
  const completionRate = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-card-purple border-purple-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Issues</CardTitle>
          <div className="h-4 w-4 rounded-sm bg-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{totalTasks}</div>
          <Badge variant="outline" className="mt-2 text-xs font-normal">+12% from last week</Badge>
        </CardContent>
      </Card>
      <Card className="bg-card-green border-green-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          <div className="h-4 w-4 rounded-sm bg-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{doneTasks}</div>
          <Badge variant="outline" className="mt-2 text-xs font-normal">{completionRate}% completion rate</Badge>
        </CardContent>
      </Card>
      <Card className="bg-card-blue border-blue-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
          <div className="h-4 w-4 rounded-sm bg-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{inProgressTasks}</div>
          <Badge variant="outline" className="mt-2 text-xs font-normal">Active work</Badge>
        </CardContent>
      </Card>
       <Card className="bg-card-orange border-orange-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">To Do</CardTitle>
          <div className="h-4 w-4 rounded-sm bg-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{todoTasks}</div>
          <Badge variant="outline" className="mt-2 text-xs font-normal">Ready to start</Badge>
        </CardContent>
      </Card>
    </div>
  );
}
