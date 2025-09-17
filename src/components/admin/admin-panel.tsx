
'use client';
import { useState } from 'react';
import type { User, UserType, KanbanColumnData, Role } from '@/lib/types';
import { USER_TYPES, ROLES, KANBAN_COLUMNS } from '@/lib/data';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SuggestStoriesDialog } from './suggest-stories-dialog';
import { Settings, Trash2, UserCheck, UserX, Users } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { useAuth } from '@/hooks/use-auth';
import { Badge } from '../ui/badge';

const defaultBuckets: KanbanColumnData[] = [
    { id: 'under-development', title: 'Under Development', color: 'border-cyan-500' },
    { id: 'blocked', title: 'Blocked', color: 'border-red-500' },
    { id: 'under-testing', title: 'Under Testing', color: 'border-orange-500' },
    { id: 'ready-for-deployment', title: 'Ready for Deployment', color: 'border-green-500' },
    { id: 'closed', title: 'Closed', color: 'border-gray-500' },
];

export function AdminPanel() {
  const { allUsers, approveUser, rejectUser, updateUserType, updateUserRole } = useAuth();
  const [columns, setColumns] = useState<KanbanColumnData[]>(KANBAN_COLUMNS);
  const [selectedBuckets, setSelectedBuckets] = useState<string[]>([]);
  
  const pendingUsers = allUsers.filter(u => u.status === 'pending');
  const activeUsers = allUsers.filter(u => u.status !== 'pending');

  const handleUserTypeChange = (userId: string, newUserType: UserType) => {
    updateUserType(userId, newUserType);
  };
  
  const handleRoleChange = (userId: string, newRole: Role) => {
    updateUserRole(userId, newRole);
  };

  const handleAddSelectedColumns = () => {
    const bucketsToAdd = defaultBuckets.filter(bucket => selectedBuckets.includes(bucket.id));
    setColumns([...columns, ...bucketsToAdd]);
    setSelectedBuckets([]);
  };

  const handleRemoveColumn = (columnId: string) => {
    setColumns(columns.filter(c => c.id !== columnId));
  };

  const handleBucketSelection = (bucketId: string, isSelected: boolean) => {
    if (isSelected) {
        setSelectedBuckets([...selectedBuckets, bucketId]);
    } else {
        setSelectedBuckets(selectedBuckets.filter(id => id !== bucketId));
    }
  }


  return (
    <div className="space-y-8">
        {pendingUsers.length > 0 && (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <UserCheck className="h-5 w-5 text-primary"/>
                        Pending Approvals
                        <Badge variant="outline">{pendingUsers.length}</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pendingUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500" onClick={() => approveUser(user.id)}>
                                            <UserCheck className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => rejectUser(user.id)}>
                                            <UserX className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        )}
        <Card>
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    User Management
                </h2>
                <SuggestStoriesDialog />
            </div>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[180px]">User Type</TableHead>
                    <TableHead className="w-[180px]">Role</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {activeUsers.map((user) => (
                    <TableRow key={user.id}>
                    <TableCell className="font-medium">
                        {user.username}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>{user.status}</Badge>
                    </TableCell>
                    <TableCell>
                        <Select 
                        value={user.userType}
                        onValueChange={(newUserType) => handleUserTypeChange(user.id, newUserType as UserType)}
                        disabled={user.userType === 'Admin'}
                        >
                        <SelectTrigger>
                            <SelectValue placeholder="Select user type" />
                        </SelectTrigger>
                        <SelectContent>
                            {USER_TYPES.map((userType) => (
                            <SelectItem key={userType} value={userType} disabled={userType === 'Admin' && user.userType === 'Admin'}>
                                {userType}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    </TableCell>
                    <TableCell>
                         <Select 
                            value={user.role}
                            onValueChange={(newRole) => handleRoleChange(user.id, newRole as Role)}
                         >
                            <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                {ROLES.map((role) => (
                                <SelectItem key={role} value={role}>
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
                    <p className="text-sm text-muted-foreground mb-4">Select the buckets you want to add to your board.</p>
                    <div className="space-y-2">
                        {defaultBuckets.filter(b => !columns.some(c => c.id === b.id)).map(bucket => (
                            <div key={bucket.id} className="flex items-center space-x-2">
                                <Checkbox 
                                    id={bucket.id} 
                                    onCheckedChange={(checked) => handleBucketSelection(bucket.id, !!checked)}
                                    checked={selectedBuckets.includes(bucket.id)}
                                />
                                <Label htmlFor={bucket.id} className="font-normal">{bucket.title}</Label>
                            </div>
                        ))}
                    </div>
                    {selectedBuckets.length > 0 && (
                        <Button onClick={handleAddSelectedColumns} className="mt-4">
                            Add Selected Buckets ({selectedBuckets.length})
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
