import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"


  const LoadingReviewCards = () => {
    return (
      <section className='grid md:grid-cols-2 gap-8 mt-4 '>
        <ReviewLoadingCard />
        <ReviewLoadingCard />
      </section>
    )
  }
  
  
  const ReviewLoadingCard = () => {
    return (
      <Card>
        <CardHeader>
          <div className='flex items-center'>
            <Skeleton className='w-12 h-12 rounded-full' />
            <div className='ml-4'>
            <Skeleton className='w-[150px] h-4 mb-2' />
              <Skeleton className='w-[150px] h-4 mb-2' />
            </div>
          </div>
        </CardHeader>
  
        <CardContent>
          <Skeleton className=' h-4 mb-2' />
          <Skeleton className=' h-4 mb-2' />
          <Skeleton className='w-[100px] h-4 mb-2' />
        </CardContent>
  
      </Card>
    )
  }
  
  
  export default LoadingReviewCards
  
  