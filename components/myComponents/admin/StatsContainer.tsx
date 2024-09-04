import { fetchStats } from "@/utils/actions"
import StatsCard from "./StatsCard"

const StatsContainer = async () => {

  const data = await fetchStats()

  return (
    <div className=" mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatsCard  title="users" value={data.usersCount || 0} />  
      <StatsCard  title="productos" value={data.productsCount || 0} />  
      <StatsCard  title="ordenes" value={data.ordersCount || 0} />  
    </div>
  )
}
export default StatsContainer