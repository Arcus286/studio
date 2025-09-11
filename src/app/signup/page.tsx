'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Workflow, Eye, EyeOff } from 'lucide-react';
import { PasswordStrength } from '@/components/password-strength';
import { useToast } from '@/hooks/use-toast';
import { USERS } from '@/lib/data';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const passwordChecks = useMemo(() => {
        const checks = [
            { label: 'At least 8 characters', valid: password.length >= 8 },
            { label: 'One uppercase letter', valid: /[A-Z]/.test(password) },
            { label: 'One lowercase letter', valid: /[a-z]/.test(password) },
            { label: 'One number', valid: /[0-9]/.test(password) },
            { label: 'One special character', valid: /[^A-Za-z0-9]/.test(password) },
        ];
        return checks;
    }, [password]);

    const allChecksValid = passwordChecks.every(c => c.valid);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast({ variant: 'destructive', title: 'Error', description: 'Passwords do not match.' });
            return;
        }

        if (!allChecksValid) {
            toast({ variant: 'destructive', title: 'Error', description: 'Password does not meet the requirements.' });
            return;
        }

        if (USERS.some(user => user.email === email)) {
            toast({ variant: 'destructive', title: 'Error', description: 'An account with this email already exists.' });
            return;
        }

        toast({ title: 'Success!', description: 'Account created successfully. Redirecting to login...' });
        router.push('/login');
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-background px-4 py-8">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center">
                    <div className="mb-4 inline-block">
                        <Workflow className="h-10 w-10 text-primary mx-auto" />
                    </div>
                    <CardTitle className="text-2xl">Create your account</CardTitle>
                    <CardDescription>Join TaskFlow and start managing your projects.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </Button>
                            </div>
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        </div>

                        <div className="mt-2">
                            <PasswordStrength checks={passwordChecks} />
                        </div>
                        
                        <Button type="submit" className="w-full mt-2">Create account</Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-primary hover:underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
