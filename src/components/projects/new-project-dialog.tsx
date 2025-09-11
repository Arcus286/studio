
'use client';

import * as React from 'react';
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Users, Palette, Plus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ROLES, USERS } from '@/lib/data';

const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  key: z.string().min(2, 'Key must be 2-4 chars').max(4, 'Key must be 2-4 chars').regex(/^[A-Z]*$/, 'Key must be uppercase letters'),
  color: z.string(),
  description: z.string().optional(),
  members: z.array(z.object({
    email: z.string().email('Invalid email address'),
    role: z.string().min(1, 'Role is required'),
  })).min(1, 'At least one team member is required'),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const colorThemes = [
  'hsl(var(--primary))',
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];


export function NewProjectDialog({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      key: '',
      color: colorThemes[0],
      description: '',
      members: [{ email: '', role: '' }],
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "members"
  });

  const watchName = form.watch('name');
  
  React.useEffect(() => {
    const key = watchName.substring(0, 4).toUpperCase().replace(/[^A-Z]/g, '');
    form.setValue('key', key);
  }, [watchName, form]);

  const onSubmit = (data: ProjectFormValues) => {
    console.log('New project data:', data);
    toast({
      title: 'Project Created!',
      description: `"${data.name}" has been successfully created.`,
    });
    form.reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Fill in the details below to start a new project.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter project name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                 <div>
                    <FormField
                    control={form.control}
                    name="key"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Project Key</FormLabel>
                        <FormControl>
                            <Input placeholder="PROJ" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
            </div>
            
             <div>
                <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="flex items-center gap-2"><Palette className="h-4 w-4" /> Color Theme</FormLabel>
                        <FormControl>
                             <div className="flex gap-2">
                                {colorThemes.map(color => (
                                    <Button
                                        key={color}
                                        type="button"
                                        className={`h-8 w-8 rounded-full ${field.value === color ? 'ring-2 ring-offset-2 ring-ring' : ''}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => field.onChange(color)}
                                    />
                                ))}
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your project..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
                <FormLabel className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4" /> Team Members
                </FormLabel>
                <div className="space-y-3">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-end">
                         <FormField
                            control={form.control}
                            name={`members.${index}.email`}
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                <FormControl>
                                    <Input placeholder="Enter team member's email" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name={`members.${index}.role`}
                            render={({ field }) => (
                                <FormItem className="w-[150px]">
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Team Member" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {ROLES.filter(r => r !== 'Admin').map(role => (
                                        <SelectItem key={role} value={role}>{role}</SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} disabled={fields.length <= 1}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
                 <Button type="button" variant="outline" size="sm" onClick={() => append({ email: '', role: '' })}>
                    <Plus className="mr-2 h-4 w-4" /> Add Member
                </Button>
                </div>
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Project</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
