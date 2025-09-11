import { getTasks } from '@/lib/actions';
import { TaskList } from '@/components/task-list';
import { CreateTaskDialog } from '@/components/create-task-dialog';
import Link from 'next/link';

export default async function DashboardPage() {
  const tasks = await getTasks();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold md:text-base text-primary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3z"/></svg>
          <span className="font-bold">TaskFlow</span>
        </Link>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <div className="ml-auto flex-1 sm:flex-initial">
              <CreateTaskDialog />
            </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4">
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <TaskList tasks={tasks} />
        </div>
      </main>
    </div>
  );
}
