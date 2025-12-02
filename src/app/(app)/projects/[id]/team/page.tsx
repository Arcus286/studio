
'use client';
import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import type { User, ProjectMember } from '@/lib/types';
import { useSharedState } from '@/hooks/use-shared-state';

function AddMemberDialog({ project, children }: { project: any, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedUserId, setSelectedUserId] = React.useState<string>('');
    const { allUsers } = useAuth();
    const { updateProject } = useSharedState();
    const { toast } = useToast();

    const availableUsers = allUsers.filter(u => 
        u.status === 'active' && 
        u.userType !== 'Admin' && 
        !project.members.some((m: any) => m.id === u.id)
    );

    const handleAddMember = () => {
        if (!selectedUserId) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please select a user to add.' });
            return;
        }

        const newMembers: ProjectMember[] = [...project.members, { id: selectedUserId, role: 'User' }];
        updateProject(project.id, { members: newMembers });

        toast({ title: 'Member Added', description: 'The new member has been added to the project.' });
        setSelectedUserId('');
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Member to {project.name}</DialogTitle>
                    <DialogDescription>Select a user to add to this project.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Select onValueChange={setSelectedUserId} value={selectedUserId}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a user..." />
                        </SelectTrigger>
                        <SelectContent>
                            {availableUsers.map(user => (
                                <SelectItem key={user.id} value={user.id}>{user.username} ({user.role})</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddMember}>Add Member</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default function ProjectTeamPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const { projects, updateProject } = useSharedState();
    const { user: currentUser, allUsers } = useAuth();
    const { toast } = useToast();
    const project = projects.find(p => p.id === id);

    const projectMember = project?.members.find(m => m.id === currentUser?.id);
    const isProjectManager = projectMember?.role === 'Manager';
    const isAdmin = currentUser?.userType === 'Admin';
    const isManagerOrAdmin = isProjectManager || isAdmin;

    if (!project) {
        return <div>Loading project...</div>;
    }
    
    const teamMembers = allUsers
        .map(user => {
            const memberInfo = project.members.find(m => m.id === user.id);
            return memberInfo ? { ...user, projectRole: memberInfo.role } : null;
        })
        .filter((user): user is User & { projectRole: 'Manager' | 'User' } => user !== null);

    const handleRemoveMember = (userId: string) => {
        const memberToRemove = teamMembers.find(u => u.id === userId);
        if (memberToRemove?.projectRole === 'Manager') {
            const managerCount = teamMembers.filter(m => m.projectRole === 'Manager').length;
            if (managerCount <= 1) {
                toast({
                    variant: 'destructive',
                    title: 'Cannot Remove Manager',
                    description: 'A project must have at least one manager.',
                });
                return;
            }
        }

        const newMembers = project.members.filter(m => m.id !== userId);
        updateProject(project.id, { members: newMembers });
        toast({
            title: 'Member Removed',
            description: 'The member has been removed from the project.',
        });
    };

    const handleRoleChange = (userId: string, newRole: 'Manager' | 'User') => {
        const newMembers = project.members.map(m => m.id === userId ? { ...m, role: newRole } : m);
        updateProject(project.id, { members: newMembers });
    }

    return (
        <div className="space-y-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/projects">Projects</Link>
                    </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>{project.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Team</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Team Members for {project.name}</h2>
                    {isManagerOrAdmin && (
                        <AddMemberDialog project={project}>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Member
                            </Button>
                        </AddMemberDialog>
                    )}
                </div>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Project Role</TableHead>
                        {isManagerOrAdmin && <TableHead className="text-right">Actions</TableHead>}
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {teamMembers.map((user) => (
                        <TableRow key={user.id}>
                        <TableCell className="font-medium">
                            {user.username}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                            {isManagerOrAdmin ? (
                                <Select value={user.projectRole} onValueChange={(value: 'Manager' | 'User') => handleRoleChange(user.id, value)}>
                                    <SelectTrigger className="w-[120px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Manager">Manager</SelectItem>
                                        <SelectItem value="User">User</SelectItem>
                                    </SelectContent>
                                </Select>
                            ) : (
                                user.projectRole
                            )}
                        </TableCell>
                        {isManagerOrAdmin && (
                            <TableCell className="text-right">
                                {user.userType !== 'Admin' && (
                                     <Button variant="ghost" size="icon" onClick={() => handleRemoveMember(user.id)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                )}
                            </TableCell>
                        )}
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}
