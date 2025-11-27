
'use client';

import type { Task, TaskTypeLabel } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';
import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow, isWithinInterval, subDays } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Bug, CircleDot } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useStore } from '@/lib/store';
import { USERS } from '@/lib/data';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type RecentActivityProps = {
  tasks: Task[];
};

type FilterType = 'today' | 'week' | 'all';

const TaskTypeIcon = ({ type }: { type: TaskTypeLabel }) => {
    switch (type) {
        case 'Bug':
            return <Bug className="h-4 w-4 text-red-500" />;
        case 'Task':
            return <CircleDot className="h-4 w-4 text-blue-400" />;
    }
}


export function RecentActivity({ tasks }: RecentActivityProps) {
  const { user, allUsers } = useAuth();
  const { columns } = useStore();
  const [filter, setFilter] = useState<FilterType>('all');

  const recentTasks = useMemo(() => {
    let userFilteredTasks =
      user?.userType === 'Admin' || user?.userType === 'Manager'
        ? tasks
        : tasks.filter((task) => task.assignedUserId === user?.id);

    const now = new Date();
    if (filter === 'today') {
      userFilteredTasks = userFilteredTasks.filter(task => isWithinInterval(new Date(task.updatedAt), { start: subDays(now, 1), end: now }));
    } else if (filter === 'week') {
      userFilteredTasks = userFilteredTasks.filter(task => isWithinInterval(new Date(task.updatedAt), { start: subDays(now, 7), end: now }));
    }
    
    return userFilteredTasks
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 10);
  }, [tasks, user, filter]);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle>Recent Activity</CardTitle>
        <div className="flex items-center gap-1 rounded-md bg-secondary p-1">
            <Button size="sm" onClick={() => setFilter('today')} variant={filter === 'today' ? 'default' : 'ghost'} className="h-7 px-3">Today</Button>
            <Button size="sm" onClick={() => setFilter('week')} variant={filter === 'week' ? 'default' : 'ghost'} className="h-7 px-3">Week</Button>
            <Button size="sm" onClick={() => setFilter('all')} variant={filter === 'all' ? 'default' : 'ghost'} className="h-7 px-3">All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
            <div className="space-y-6">
            {recentTasks.map((task) => {
                const statusLabel = columns.find(c => c.id === task.status)?.title || task.status;
                const assignedUser = allUsers.find(u => u.id === task.assignedUserId);
                return (
                <div key={task.id} className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted mt-1">
                        <TaskTypeIcon type={task.type} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium">{task.title}</p>
                        <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(task.updatedAt), { addSuffix: true })}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                             <Badge variant="outline">{assignedUser?.username || 'Unassigned'}</Badge>
                             <Badge variant="secondary">{statusLabel}</Badge>
                        </div>
                    </div>
                </div>
                );
            })}
             {recentTasks.length === 0 && (
                <div className="flex items-center justify-center h-full pt-16">
                    <p className="text-muted-foreground">No activity for this period.</p>
                </div>
             )}
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
