import { getTasks } from '@/lib/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Calendar,
  Clock,
  Users,
  Box,
  CheckCircle,
  Circle,
  AlertCircle,
} from 'lucide-react';

export default async function DashboardPage() {
  const tasks = await getTasks();
  const totalIssues = tasks.length;
  const completedIssues = tasks.filter((task) => task.status === 'Done').length;
  const inProgressIssues = tasks.filter((task) => task.status === 'In Progress').length;
  const todoIssues = tasks.filter((task) => task.status === 'To Do').length;
  const completionRate = totalIssues > 0 ? Math.round((completedIssues / totalIssues) * 100) : 0;
  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(today);


  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Welcome back, Student!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your projects today.
          </p>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-5 w-5" />
          <span>{formattedDate}</span>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
            <Box className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIssues}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedIssues}</div>
            <p className="text-xs text-muted-foreground">
              {completionRate}% completion rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressIssues}</div>
            <p className="text-xs text-muted-foreground">Active work</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">To Do</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todoIssues}</div>
            <p className="text-xs text-muted-foreground">Ready to start</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Your Projects</h2>
            <Card>
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                    <CardTitle>AgileBridge</CardTitle>
                    <CardDescription>
                        A simple and powerful project management tool.
                    </CardDescription>
                    </div>
                    <Badge className="ml-auto">active</Badge>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div>
                        <div className="flex justify-between text-sm text-muted-foreground mb-2">
                            <span>Progress</span>
                            <span>{completionRate}%</span>
                        </div>
                        <Progress value={completionRate} />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Circle className="h-3 w-3 fill-gray-400 text-gray-400" />
                            {todoIssues}
                        </div>
                         <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 fill-blue-400 text-blue-400" />
                            {inProgressIssues}
                        </div>
                         <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 fill-green-400 text-green-400" />
                            {completedIssues}
                        </div>
                        <span className="ml-auto">{totalIssues} issues</span>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div>
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
             <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Clock /> Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="bg-card text-card-foreground p-3 rounded-lg">
                        <div className="flex items-center gap-3">
                             <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-primary font-semibold">S</span>
                             <div className="text-sm">
                                <span className="font-medium">develop</span>
                                <Badge variant="outline" className="ml-2">epic</Badge>
                             </div>
                             <p className="text-xs text-muted-foreground ml-auto">about 6 hours ago</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <h2 className="text-2xl font-bold my-4">Team Members</h2>
             <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Users /> Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="bg-card text-card-foreground p-3 rounded-lg flex items-center gap-3">
                         <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-primary font-semibold">S</span>
                         <p className="text-sm font-medium">Student User</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
