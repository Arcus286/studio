
'use client';

import { KanbanBoard } from '@/components/kanban/kanban-board';
import { DashboardAnalytics } from '@/components/dashboard/dashboard-analytics';
import { useState, useMemo } from 'react';
import type { Task, TaskStatus, Project, Sprint } from '@/lib/types';
import { Input } from '../ui/input';
import { Search, Flame } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { USERS } from '@/lib/data';
import { useStore } from '@/lib/store';
import { useSprintStore } from '@/lib/sprint-store';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ProjectBoardProps {
    project: Project;
}

export function ProjectBoard({ project }: ProjectBoardProps) {
  const [highlightedStatus, setHighlightedStatus] = useState<TaskStatus | 'all' | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'title' | 'role' | 'user'>('title');
  const allTasks = useStore((state) => state.tasks);
  const { sprints } = useSprintStore();
  
  const activeSprint = useMemo(() => {
    return sprints.find(s => s.projectId === project.id && s.status === 'active');
  }, [sprints, project.id]);
  
  const sprintTasks = useMemo(() => {
    if (!activeSprint) return [];
    return allTasks.filter(t => t.sprintId === activeSprint.id)
  }, [allTasks, activeSprint]);

  const handleAnalyticsClick = (status: TaskStatus | 'all') => {
    setHighlightedStatus(status);
    setTimeout(() => {
      setHighlightedStatus(null);
    }, 1500);
  };
  
  const filteredTasks = sprintTasks.filter(task => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();

    if (task.id.toLowerCase().includes(term)) {
        return true;
    }

    switch (filterCategory) {
      case 'title':
        return task.title.toLowerCase().includes(term);
      case 'role':
        return task.assignedRole.toLowerCase().includes(term);
      case 'user':
        const user = USERS.find(u => u.role === task.assignedRole);
        return user?.username.toLowerCase().includes(term) ?? false;
      default:
        return true;
    }
  });


  if (!activeSprint) {
    return (
        <Alert>
            <Flame className="h-4 w-4" />
            <AlertTitle>No Active Sprint</AlertTitle>
            <AlertDescription>
              There is no active sprint for this project. Go to the sprints page to start one.
            </AlertDescription>
             <Button asChild className='mt-4'>
                <Link href={`/projects/${project.id}/sprints`}>
                    Go to Sprints
                </Link>
            </Button>
        </Alert>
    )
  }

  return (
    <>
        <DashboardAnalytics tasks={sprintTasks} onCardClick={handleAnalyticsClick} />
        <div className="flex flex-col sm:flex-row gap-4 my-6">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder={`Search by ${filterCategory}, or task ID...`}
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Select value={filterCategory} onValueChange={(value) => setFilterCategory(value as any)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="title">Task Title</SelectItem>
                    <SelectItem value="role">Assigned Role</SelectItem>
                    <SelectItem value="user">Assigned User</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <KanbanBoard tasks={filteredTasks} highlightedStatus={highlightedStatus} />
    </>
  );
}
