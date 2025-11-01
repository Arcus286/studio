
'use client';

import type { Task, TaskStatus } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import { differenceInDays, isPast } from 'date-fns';
import { useProjectStore } from '@/lib/project-store';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

type DashboardAnalyticsProps = {
  tasks: Task[];
  onCardClick?: (status: TaskStatus | 'all') => void;
};

export function DashboardAnalytics({ tasks, onCardClick = () => {} }: DashboardAnalyticsProps) {
  const { user } = useAuth();
  const { projects } = useProjectStore();

  const userFilteredTasks =
    user?.userType === 'Admin' || user?.userType === 'Manager'
      ? tasks
      : tasks.filter((task) => task.assignedRole === user?.role);

  const notOverdueTasks = userFilteredTasks.filter(task => {
    if (!task.deadline) return true; // Keep tasks without deadlines
    return !isPast(new Date(task.deadline));
  });

  const totalTasks = notOverdueTasks.length;
  const doneTasks = notOverdueTasks.filter((t) => t.status === 'done').length;
  const inProgressTasks = notOverdueTasks.filter(
    (t) => t.status === 'in-progress'
  ).length;
  const todoTasks = notOverdueTasks.filter((t) => t.status === 'to-do').length;
  
  const completionRate = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const tasksAddedLastWeek = notOverdueTasks.filter(
    (task) => differenceInDays(new Date(), new Date(task.createdAt)) <= 7
  ).length;

  const issuesByProject = notOverdueTasks.reduce((acc, task) => {
    const project = projects.find(p => p.id === task.projectId);
    const projectName = project?.name || 'Unknown Project';
    acc[projectName] = (acc[projectName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
             <Card className="bg-card-purple border-purple-500/20 cursor-pointer rounded-xl" onClick={() => onCardClick('all')}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Issues</CardTitle>
                <div className="h-4 w-4 rounded-sm bg-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{totalTasks}</div>
                <Badge variant="outline" className="mt-2 text-xs font-normal">
                  +{tasksAddedLastWeek} created this week
                </Badge>
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent>
            <div className="p-2">
              <h4 className="font-semibold mb-2 text-center">Issues per Project</h4>
              <ul className="space-y-1 text-sm">
                {Object.entries(issuesByProject).map(([projectName, count]) => (
                  <li key={projectName} className="flex justify-between">
                    <span>{projectName}:</span>
                    <span className="font-bold ml-4">{count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Card className="bg-card-orange border-orange-500/20 cursor-pointer rounded-xl" onClick={() => onCardClick('to-do')}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">To Do</CardTitle>
          <div className="h-4 w-4 rounded-sm bg-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{todoTasks}</div>
          <Badge variant="outline" className="mt-2 text-xs font-normal">Ready to start</Badge>
        </CardContent>
      </Card>
      <Card className="bg-card-blue border-blue-500/20 cursor-pointer rounded-xl" onClick={() => onCardClick('in-progress')}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
          <div className="h-4 w-4 rounded-sm bg-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{inProgressTasks}</div>
          <Badge variant="outline" className="mt-2 text-xs font-normal">Active work</Badge>
        </CardContent>
      </Card>
       <Card className="bg-card-green border-green-500/20 cursor-pointer rounded-xl" onClick={() => onCardClick('done')}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          <div className="h-4 w-4 rounded-sm bg-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{doneTasks}</div>
          <Badge variant="outline" className="mt-2 text-xs font-normal">{completionRate}% completion rate</Badge>
        </CardContent>
      </Card>
    </div>
  );
}
