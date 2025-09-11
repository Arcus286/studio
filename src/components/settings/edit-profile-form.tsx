'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { YEARS_OF_STUDY } from '@/lib/data';
import { Edit } from 'lucide-react';

const profileSchema = z.object({
  designation: z.string().optional(),
  phoneNumber: z.string().optional(),
  university: z.string().optional(),
  yearOfStudy: z.string().optional(),
  major: z.string().optional(),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function EditProfileForm() {
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      designation: user?.designation || '',
      phoneNumber: user?.phoneNumber || '',
      university: user?.university || '',
      yearOfStudy: user?.yearOfStudy || '',
      major: user?.major || '',
      bio: user?.bio || '',
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    // In a real app, you would call a server action to update the user
    console.log('Updated profile data:', data);
    toast({
      title: 'Profile Updated',
      description: 'Your personal details have been saved successfully.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5 text-primary" />
            Edit Personal Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designation / Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Professor, Student" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. +1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                    control={form.control}
                    name="university"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>University / School</FormLabel>
                        <FormControl>
                        <Input placeholder="e.g. State University" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="yearOfStudy"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Year of Study</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select year of study" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {YEARS_OF_STUDY.map((year) => (
                                <SelectItem key={year} value={year}>{year}</SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
             <FormField
                control={form.control}
                name="major"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Major / Field of Study</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g. Computer Science" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio / Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a bit about yourself, your interests, or your academic goals..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
