import { fetchChartData } from "@/utils/actions"
import Chart from "./Chart"

const ChartsContainer = async () => {
  const chartData = await fetchChartData()



  return (
    <Chart data={chartData} />)
}
export default ChartsContainer