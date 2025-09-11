import { Header } from '@/components/layout/header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
       <header className="flex h-16 items-center gap-2 border-b bg-card px-4 lg:px-6">
        <Header />
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-background">
        {children}
      </main>
    </div>
  );
}
