import { Skeleton } from "@/components/ui/skeleton"

const LoadingCard = () => {
  return (
    <div>

      <div className="p-8 border rounded-xl h-screen overflow-y-hidden ">
        <Skeleton className="h-[70%]  w-full rounded " />

        <Skeleton className="h-[5%]  w-full mt-10 rounded " />
        <Skeleton className="h-[5%]  w-full mt-4 rounded " />
        <Skeleton className="h-[5%]  w-full mt-4 rounded " />
        <Skeleton className="h-[5%]  w-full mt-4 rounded " />

      </div>

    </div>
  )
}
export default LoadingCard