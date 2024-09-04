import ChartsContainer from "@/components/myComponents/admin/ChartsContainer"
import { ChartsLoadingContainer, StatsLoadingContainer } from "@/components/myComponents/admin/Loading"
import StatsContainer from "@/components/myComponents/admin/StatsContainer"
import { Suspense } from "react"

const AdminPage = () => {
  return (
    <div>
      <Suspense fallback={< StatsLoadingContainer />}>
        <StatsContainer />
      </Suspense>

      <Suspense fallback={< ChartsLoadingContainer />}>
        <ChartsContainer />
      </Suspense>
    </div>
  )
}
export default AdminPage