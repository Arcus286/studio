import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-sm" />
            <Skeleton className="h-6 w-24" />
        </div>
        <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-32" />
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                        <Skeleton className="h-12 w-3/4" />
                        <Skeleton className="h-12 w-1/2" />
                        <Skeleton className="h-6 w-full mt-4" />
                        <Skeleton className="h-6 w-4/5" />
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <Skeleton className="h-12 w-40" />
                        <Skeleton className="h-12 w-40" />
                    </div>
                </div>
                <div>
                    <Skeleton className="w-full aspect-video rounded-xl" />
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
