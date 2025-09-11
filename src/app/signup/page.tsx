import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Mail, Lock } from 'lucide-react'

export default function SignupPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-950 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 sm:p-8">
            <Link href="/login" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 mb-6">
                <ArrowLeft className="h-4 w-4" />
                Back to sign in
            </Link>
          <div className="space-y-2 mb-6">
            <h1 className="text-3xl font-bold">Create your account</h1>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
               <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="pl-10"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
               <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input id="password" type="password" required placeholder="Min. 8 characters" className="pl-10" />
              </div>
            </div>
             <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input id="confirm-password" type="password" required placeholder="Re-enter password" className="pl-10" />
              </div>
            </div>
            <Button type="submit" className="w-full h-11" asChild>
              <Link href="/dashboard">Create account</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
