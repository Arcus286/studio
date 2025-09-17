'use client';
import { useState } from 'react';
import type { User, Role, KanbanColumnData } from '@/lib/types';
import { USERS, ROLES, KANBAN_COLUMNS } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SuggestStoriesDialog } from './suggest-stories-dialog';
import { Label } from '../ui/label';
import { Settings, Trash2 } from 'lucide-react';
import { Separator } from '../ui/separator';

const defaultBuckets: KanbanColumnData[] = [
    { id: 'under-development', title: 'Under Development', color: 'border-cyan-500' },
    { id: 'blocked', title: 'Blocked', color: 'border-red-500' },
    { id: 'under-testing', title: 'Under Testing', color: 'border-orange-500' },
    { id: 'ready-for-deployment', title: 'Ready for Deployment', color: 'border-green-500' },
    { id: 'closed', title: 'Closed', color: 'border-gray-500' },
];

export function AdminPanel() {
  const [users, setUsers] = useState<User[]>(USERS);
  const [columns, setColumns] = useState<KanbanColumnData[]>(KANBAN_COLUMNS);
  const [newColumnName, setNewColumnName] = useState('');

  const handleRoleChange = (userId: string, newRole: Role) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };
  
  const handleAddColumn = (column: KanbanColumnData) => {
    if (column.title && !columns.find(c => c.id === column.id)) {
      setColumns([...columns, column]);
    }
  };

  const handleRemoveColumn = (columnId: string) => {
    setColumns(columns.filter(c => c.id !== columnId));
  };


  return (
    <div className="space-y-6">
        <Card>
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">User Management</h2>
                <SuggestStoriesDialog />
            </div>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="w-[200px]">Role</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                        {user.username}
                        </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                        <Select 
                        value={user.role}
                        onValueChange={(newRole) => handleRoleChange(user.id, newRole as Role)}
                        disabled={user.role === 'Admin'}
                        >
                        <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                            {ROLES.map((role) => (
                            <SelectItem key={role} value={role} disabled={role === 'Admin'}>
                                {role}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </Card>

        <Card>
            <div className="p-4 border-b">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    Board Settings
                </h2>
                <p className="text-sm text-muted-foreground mt-1">Customize the columns for the project Kanban boards.</p>
            </div>
            <CardContent className="p-6 space-y-6">
                <div>
                    <h3 className="text-lg font-medium mb-2">Current Columns</h3>
                    <div className="space-y-2">
                        {columns.map(col => (
                             <div key={col.id} className="flex items-center justify-between p-2 rounded-md border bg-muted/50">
                                <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full border-2 ${col.color}`} />
                                    <span>{col.title}</span>
                                </div>
                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleRemoveColumn(col.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator />
                
                <div>
                    <h3 className="text-lg font-medium mb-2">Add New Buckets</h3>
                    <p className="text-sm text-muted-foreground mb-4">Click to add predefined buckets to your board.</p>
                    <div className="flex flex-wrap gap-2">
                        {defaultBuckets.filter(b => !columns.some(c => c.id === b.id)).map(bucket => (
                            <Button key={bucket.id} variant="outline" onClick={() => handleAddColumn(bucket)}>
                                Add "{bucket.title}"
                            </Button>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
