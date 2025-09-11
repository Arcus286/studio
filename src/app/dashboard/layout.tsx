import Link from 'next/link';
import {
  Bell,
  PanelLeft,
  Search,
  LayoutGrid,
  ClipboardList,
  Settings,
  User,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1V14c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h1.8c.4 0 .8.2 1.1.5.3.3.5.7.5 1.1V22c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h1.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7-.5-1.1V17c0-.4-.2-.8-.5-1.1-.3-.3-.7-.5-1.1-.5h-1.8c-.4 0-.8-.2-1.1-.5-.3-.3-.5-.7-.5-1.1V3.5c0-.4.2-.8.5-1.1.3-.3.7-.5 1.1-.5h6.9c.4 0 .8.2 1.1.5.3.3.5.7.5 1.1v6.9c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h1.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V3.5c0-.4-.2-.8-.5-1.1-.3-.3-.7-.5-1.1-.5h-6.9z"></path>
              </svg>
              <span className="">StudenTira</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <LayoutGrid className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <ClipboardList className="h-4 w-4" />
                Board
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Settings className="h-4 w-4" />
                Projects
              </Link>
            </nav>
            <div className="px-2 lg:px-4 mt-4">
                <p className="px-3 py-2 text-xs font-semibold text-muted-foreground">QUICK ACTIONS</p>
                <Button className="w-full justify-start mt-2 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Create Issue
                </Button>
            </div>
          </div>
          <div className="mt-auto p-4">
            <Card>
              <CardHeader className="p-2 pt-0 md:p-4">
                <Avatar className="h-12 w-12 border">
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
                <CardTitle className="text-base">Student User</CardTitle>
                <CardDescription>
                  Free Plan
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                     <path d="M15.5 2H8.6c-.4 0-.8.2-1.1.5-.3.3-.5.7-.5 1.1V14c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h1.8c.4 0 .8.2 1.1.5.3.3.5.7.5 1.1V22c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h1.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7-.5-1.1V17c0-.4-.2-.8-.5-1.1-.3-.3-.7-.5-1.1-.5h-1.8c-.4 0-.8-.2-1.1-.5-.3-.3-.5-.7-.5-1.1V3.5c0-.4.2-.8.5-1.1.3-.3.7-.5 1.1-.5h6.9c.4 0 .8.2 1.1.5.3.3.5.7.5 1.1v6.9c0 .4.2.8.5 1.1.3.3.7.5 1.1.5h1.8c.4 0 .8-.2 1.1-.5.3-.3.5-.7.5-1.1V3.5c0-.4-.2-.8-.5-1.1-.3-.3-.7-.5-1.1-.5h-6.9z"></path>
                  </svg>
                  <span className="sr-only">StudenTira</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <LayoutGrid className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <ClipboardList className="h-5 w-5" />
                  Board
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Settings className="h-5 w-5" />
                  Projects
                </Link>
              </nav>
              <div className="mt-auto">
                 <Button className="w-full justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Create Issue
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search issues, projects..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <Bell className="h-5 w-5" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
