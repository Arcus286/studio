
'use client';

import Link from 'next/link';
import { Bell, Search, Users, Plus, KanbanSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import { Notifications } from './notifications';
import { ThemeToggle } from './theme-toggle';
import { NewTaskDialog } from '../tasks/new-task-dialog';
import { AdminDialog } from '../admin/admin-dialog';
import { useState, useEffect, useMemo } from 'react';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { useRouter } from 'next/navigation';
import { useSharedState } from '@/hooks/use-shared-state';

type HeaderProps = {
  showSearch?: boolean;
};

export function Header({ showSearch = true }: HeaderProps) {
  const { user, logout } = useAuth();
  const isAdmin = user?.userType === 'Admin';
  const isManager = isAdmin || user?.userType === 'Manager';
  const [open, setOpen] = useState(false);
  const { tasks: allTasks } = useSharedState();
  const router = useRouter();
  
  const tasks = useMemo(() => {
    if (!user) return [];
    if (isManager) {
      return allTasks;
    }
    return allTasks.filter(task => task.assignedUserId === user.id);
  }, [allTasks, user, isManager]);
  
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        router.push(`/projects/${task.projectId}/board?openTask=${task.id}`);
        setOpen(false);
    }
  }


  return (
    <>
      <div className="w-full flex-1">
        {showSearch && (
         <Button
            variant="outline"
            className="relative w-full justify-start text-sm text-muted-foreground md:w-2/3 lg:w-1/3"
            onClick={() => setOpen(true)}
          >
            <span>Search tasks...</span>
          </Button>
        )}
      </div>

       <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Tasks">
              {tasks.map(task => (
                <CommandItem
                  key={task.id}
                  value={`${task.id} ${task.title}`}
                  onSelect={() => handleSelect(task.id)}
                  className="flex justify-between"
                >
                  <div className='flex items-center gap-2'>
                    <KanbanSquare className="h-4 w-4" />
                    <span>{task.title}</span>
                  </div>
                  <span className='text-xs text-muted-foreground'>{task.id}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>

       {isManager && (
        <NewTaskDialog>
            <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Task
            </Button>
        </NewTaskDialog>
       )}
      <Notifications />
      <ThemeToggle />

      {isManager && (
        <AdminDialog>
            <Button variant="ghost" size="icon">
                <Users className="h-5 w-5" />
                <span className="sr-only">Admin Panel</span>
            </Button>
        </AdminDialog>
      )}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
             <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                 {user?.username?.charAt(0).toUpperCase()}
             </div>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {isManager && (
            <AdminDialog>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Admin Panel
              </DropdownMenuItem>
            </AdminDialog>
          )}
          <DropdownMenuItem asChild>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
