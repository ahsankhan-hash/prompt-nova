import { Skeleton } from "@/components/ui/skeleton"

export default function ToolDetailLoading() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-1.5 mb-8">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-3 w-3" />
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-3 w-3" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Tool Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-10 w-2/3 mb-3" />
          <Skeleton className="h-5 w-full max-w-2xl" />
          <Skeleton className="h-5 w-3/4 max-w-xl mt-2" />
        </div>

        {/* Tool Interface Skeleton */}
        <div className="glass rounded-xl p-6 sm:p-8 mb-16">
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-32 w-full" />
            <div className="flex gap-3">
              <Skeleton className="h-10 w-28 rounded-lg" />
              <Skeleton className="h-10 w-28 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Related Tools Skeleton */}
        <div>
          <Skeleton className="h-8 w-36 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass rounded-xl p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-10 rounded-lg" />
                  <Skeleton className="h-5 w-2/3" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
