import type { TaskStatus } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Circle, CircleDashed, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatusBadgeProps = {
  status: TaskStatus;
  className?: string;
};

const statusConfig = {
  'To Do': {
    icon: <Circle className="mr-2 h-3 w-3" />,
    className: 'bg-muted text-muted-foreground border-gray-300',
  },
  'In Progress': {
    icon: <CircleDashed className="mr-2 h-3 w-3 animate-spin" />,
    className: 'bg-blue-100 text-primary border-blue-300',
  },
  'Done': {
    icon: <CheckCircle2 className="mr-2 h-3 w-3" />,
    className: 'bg-green-100 text-green-800 border-green-300',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={cn('font-normal', config.className, className)}>
      {config.icon}
      {status}
    </Badge>
  );
}
