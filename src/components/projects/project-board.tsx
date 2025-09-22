
'use client';

import { KanbanBoard } from '@/components/kanban/kanban-board';
import { DashboardAnalytics } from '@/components/dashboard/dashboard-analytics';
import { useState, useMemo } from 'react';
import type { Task, TaskStatus, Project, Sprint } from '@/lib/types';
import { Input } from '../ui/input';
import { Search, Flame } from 'lucide-react';
import { USERS } from '@/lib/data';
import { useStore } from '@/lib/store';
import { useSprintStore } from '@/lib/sprint-store';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '../ui/tooltip';

interface ProjectBoardProps {
    project: Project;
}

export function ProjectBoard({ project }: ProjectBoardProps) {
  const [highlightedStatus, setHighlightedStatus] = useState<TaskStatus | 'all' | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const allTasks = useStore((state) => state.tasks);
  const { sprints } = useSprintStore();
  
  const activeSprint = useMemo(() => {
    return sprints.find(s => s.projectId === project.id && s.status === 'active');
  }, [sprints, project.id]);
  
  const sprintTasks = useMemo(() => {
    if (!activeSprint) return [];
    return allTasks.filter(t => t.sprintId === activeSprint.id)
  }, [allTasks, activeSprint]);
    
  const projectMembers = useMemo(() => {
      return USERS.filter(user => project.members.some(m => m.id === user.id));
  }, [project]);

  const handleAnalyticsClick = (status: TaskStatus | 'all') => {
    setHighlightedStatus(status);
    setTimeout(() => {
      setHighlightedStatus(null);
    }, 1500);
  };
  
  const filteredTasks = sprintTasks.filter(task => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const user = USERS.find(u => u.role === task.assignedRole);

    return task.id.toLowerCase().includes(term) ||
           task.title.toLowerCase().includes(term) ||
           task.assignedRole.toLowerCase().includes(term) ||
           (user && user.username.toLowerCase().includes(term));
  });

  return (
    <>
        <DashboardAnalytics tasks={sprintTasks} onCardClick={handleAnalyticsClick} />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 my-6">
            <div className="flex items-center gap-2">
                <TooltipProvider>
                    {projectMembers.map(member => (
                        <Tooltip key={member.id}>
                            <TooltipTrigger>
                                <Avatar>
                                    <AvatarFallback>{member.username.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{member.username}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </TooltipProvider>
            </div>
            <div className="relative w-full sm:w-auto sm:min-w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder={`Search tasks...`}
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
        <KanbanBoard tasks={filteredTasks} highlightedStatus={highlightedStatus} />
    </>
  );
}
