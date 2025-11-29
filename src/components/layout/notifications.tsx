

'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Bell, AlertTriangle, UserPlus } from 'lucide-react';
import { Badge } from '../ui/badge';
import { useStore } from '@/lib/store';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { TaskDetailDialog } from '../kanban/task-detail-dialog';
import type { Task, Notification } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';
import { AdminDialog } from '../admin/admin-dialog';

const getIcon = (notification: Notification) => {
  if (notification.userId) {
    return <UserPlus className="h-5 w-5 text-blue-500 mt-0.5" />;
  }
  if (notification.taskId) {
    return <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />;
  }
  return <Bell className="h-5 w-5 text-muted-foreground mt-0.5" />;
};

export function Notifications() {
  const { user } = useAuth();
  const { notifications, tasks, markNotificationAsRead, markAllNotificationsAsRead } = useStore();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  const isAdmin = user?.userType === 'Admin';
  
  // Admins see all notifications, other users only see task-related ones.
  const visibleNotifications = isAdmin ? notifications : notifications.filter(n => n.taskId);
  const unreadCount = visibleNotifications.filter((n) => !n.read).length;


  const handleNotificationClick = (notification: Notification) => {
    markNotificationAsRead(notification.id);
    if (notification.taskId) {
        const task = tasks.find(t => t.id === notification.taskId);
        if (task) {
            setSelectedTask(task);
        }
    }
    if (notification.userId && isAdmin) {
        setIsAdminPanelOpen(true);
    }
  }

  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex justify-between items-center">
            <span>Notifications</span>
            {unreadCount > 0 && 
                <Button variant="link" size="sm" className="h-auto p-0" onClick={markAllNotificationsAsRead}>
                    {unreadCount} new
                </Button>
            }
        </DropdownMenuLabel>
        <Separator className="my-1" />
        {visibleNotifications.length === 0 && (
          <p className="p-4 text-center text-sm text-muted-foreground">
            No new notifications
          </p>
        )}
        {visibleNotifications.map((notification) => (
          <DropdownMenuItem
            key={notification.id}
            className={cn('flex items-start gap-3 p-3 cursor-pointer', !notification.read && 'bg-accent/50')}
            onClick={() => handleNotificationClick(notification)}
          >
            {getIcon(notification)}
            <div className="flex-1 space-y-1">
              <p className="font-semibold text-sm">{notification.title}</p>
              <p className="text-xs text-muted-foreground">
                {notification.message}
              </p>
              <p className="text-xs text-muted-foreground/70">
                {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
              </p>
            </div>
            {!notification.read && (
              <div className="h-2 w-2 rounded-full bg-primary mt-1" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
    {selectedTask && (
        <TaskDetailDialog 
            isOpen={!!selectedTask}
            onOpenChange={(isOpen) => !isOpen && setSelectedTask(null)}
            task={selectedTask}
        />
    )}
     {isAdmin && (
        <Dialog open={isAdminPanelOpen} onOpenChange={setIsAdminPanelOpen}>
            <AdminDialog>
                <div/>
            </AdminDialog>
        </Dialog>
     )}
    </>
  );
}

// Dummy AdminDialog to avoid breaking the component, assuming it exists elsewhere
const Dialog = ({ open, onOpenChange, children }: { open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
        {React.Children.map(children, child =>
        React.isValidElement(child) ? React.cloneElement(child, { onSaveChanges: () => onOpenChange(false) } as any) : child
        )}
    </div>
  );
};
