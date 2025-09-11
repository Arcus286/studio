'use client';

import type { Task } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ListChecks, Loader, ClipboardList } from 'lucide-react';
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

  const tasksByRole = tasks.reduce((acc, task) => {
    acc[task.assignedRole] = (acc[task.assignedRole] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(tasksByRole).map(([role, count]) => ({
    role,
    tasks: count,
  }));

  const chartConfig = {
    tasks: {
      label: 'Tasks',
      color: 'hsl(var(--primary))',
    },
  };

  return (
    <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          <ClipboardList className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTasks}</div>
          <p className="text-xs text-muted-foreground">
            Tasks assigned to your role
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
          <ListChecks className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{doneTasks}</div>
          <p className="text-xs text-muted-foreground">
            Tasks that have been finished
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          <Loader className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inProgressTasks}</div>
          <p className="text-xs text-muted-foreground">
            Tasks currently being worked on
          </p>
        </CardContent>
      </Card>
      {user?.role === 'Admin' && (
        <Card className="sm:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg">Task Distribution</CardTitle>
            <CardDescription>Tasks per role across the project</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[120px] w-full">
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{ left: 20, top: 0, right: 20, bottom: 0 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="role"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  className="text-xs"
                  interval={0}
                />
                <YAxis dataKey="tasks" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="tasks" fill="var(--color-tasks)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
