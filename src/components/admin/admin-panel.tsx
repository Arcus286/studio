'use client';
import { useState } from 'react';
import type { User, Role } from '@/lib/types';
import { USERS, ROLES } from '@/lib/data';
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
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { SuggestStoriesDialog } from './suggest-stories-dialog';

export function AdminPanel() {
  const [users, setUsers] = useState<User[]>(USERS);

  const handleRoleChange = (userId: string, newRole: Role) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  return (
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
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                  </Avatar>
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
  );
}
