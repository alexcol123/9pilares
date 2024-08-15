import { Skeleton } from "@/components/ui/skeleton"


const LoadingCards = () => {

    // <section className='mt-4 gap-8 grid grid-cols-1  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4'

  return (
    <div className="mt-4 gap-8   grid grid-cols-1  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4" >
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div>
   
      <div className="p-4 border  rounded-xl">

      <Skeleton className='h-[275px] rounded-md' />
        <Skeleton className='h-4 mt-4 w-3/4' />
        <Skeleton className='h-4 mt-2 w-1/2' />
        <Skeleton className='h-4 mt-2 w-full' />
        <Skeleton className='h-4 mt-2 w-1/2' />

        <Skeleton className='h-8 mt-4 w-full' />
        </div>
    </div>
  )
}

export default LoadingCards