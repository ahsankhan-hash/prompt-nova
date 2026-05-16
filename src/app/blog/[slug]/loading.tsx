import { Skeleton } from "@/components/ui/skeleton"

export default function BlogPostLoading() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-8">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-3 w-3" />
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-3 w-3" />
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          {/* Main Content Skeleton */}
          <div>
            {/* Article Header Skeleton */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-10 w-3/4 mb-6" />
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>
              </div>
            </div>

            <Skeleton className="h-px w-full mb-8" />

            {/* Article Content Skeleton */}
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" style={{ width: `${85 + Math.random() * 15}%` }} />
              ))}
              <Skeleton className="h-6 w-1/2 mt-6" />
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" style={{ width: `${80 + Math.random() * 20}%` }} />
              ))}
              <Skeleton className="h-6 w-1/3 mt-6" />
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" style={{ width: `${75 + Math.random() * 25}%` }} />
              ))}
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border bg-card p-5">
                <Skeleton className="h-5 w-32 mb-3" />
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" style={{ width: `${60 + Math.random() * 40}%` }} />
                  ))}
                </div>
              </div>
              <div className="rounded-xl border bg-card p-5">
                <Skeleton className="h-5 w-16 mb-3" />
                <div className="flex gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="size-9 rounded-lg" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
