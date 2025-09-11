
'use client';

import type { Task } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { GitCommit, GitPullRequest, CircleDot } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

type RecentActivityProps = {
  tasks: Task[];
};

const getTaskType = (title: string): 'Epic' | 'Story' | 'Task' => {
    if (title.toLowerCase().includes('design')) return 'Story';
    if (title.toLowerCase().includes('develop') || title.toLowerCase().includes('build')) return 'Task';
    return 'Epic';
}

const TaskTypeIcon = ({ type }: { type: 'Epic' | 'Story' | 'Task' }) => {
    switch (type) {
        case 'Epic':
            return <GitCommit className="h-4 w-4 text-purple-400" />;
        case 'Story':
            return <GitPullRequest className="h-4 w-4 text-orange-400" />;
        case 'Task':
            return <CircleDot className="h-4 w-4 text-blue-400" />;
    }
}


export function RecentActivity({ tasks }: RecentActivityProps) {
  const { user } = useAuth();

  const recentTasks = useMemo(() => {
    const filtered =
      user?.role === 'Admin'
        ? tasks
        : tasks.filter((task) => task.assignedRole === user?.role);
    
    return filtered
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 10);
  }, [tasks, user]);

  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <ScrollArea className="h-[300px]">
            <div className="space-y-6">
            {recentTasks.map((task) => {
                const taskType = getTaskType(task.title);
                return (
                <div key={task.id} className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted mt-1">
                        <TaskTypeIcon type={taskType} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium">{task.title}</p>
                        <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(task.updatedAt), { addSuffix: true })}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                             <Badge variant="outline">{task.assignedRole}</Badge>
                             <Badge variant="secondary">{task.status}</Badge>
                        </div>
                    </div>
                </div>
                );
            })}
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
