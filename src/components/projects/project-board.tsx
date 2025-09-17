
'use client';

import { KanbanBoard } from '@/components/kanban/kanban-board';
import { DashboardAnalytics } from '@/components/dashboard/dashboard-analytics';
import { useState, useMemo } from 'react';
import type { Task, TaskStatus, Project, Sprint } from '@/lib/types';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { USERS } from '@/lib/data';
import { useStore } from '@/lib/store';

interface ProjectBoardProps {
    project: Project;
    sprint: Sprint;
}

export function ProjectBoard({ project, sprint }: ProjectBoardProps) {
  const [highlightedStatus, setHighlightedStatus] = useState<TaskStatus | 'all' | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'title' | 'role' | 'user'>('title');
  const allTasks = useStore((state) => state.tasks);
  
  const sprintTasks = useMemo(() => allTasks.filter(t => t.sprintId === sprint.id), [allTasks, sprint.id]);

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
