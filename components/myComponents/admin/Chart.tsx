


// "use client"

// import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

// import {
//   ChartConfig,
//   ChartContainer,
//   ChartLegend,
//   ChartLegendContent,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"


// export type ChartPropsType = {
//   data: {
//     date: string
//     count: number
//   }[]
// }

// const Chart = ({ data }: ChartPropsType) => {




//   const chartConfig = {
//     count: {
//       label: "Mes",
//       color: "#eb8525",
//     }
//   } satisfies ChartConfig



//   return (
//     <div className="p-4 border rounded-md my-8 ">
//       <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
//         <BarChart accessibilityLayer data={data}>
//           <CartesianGrid vertical={false} />
//           <XAxis
//             dataKey="date"
//             tickLine={false}
//             tickMargin={10}
//             axisLine={false}
//             tickFormatter={(value) => value.slice(0, 3)}
//           />
//           <ChartTooltip content={<ChartTooltipContent />} />
//           <ChartLegend content={<ChartLegendContent />} />
//           <Bar dataKey="count" fill="var(--color-count)" radius={4} />

//         </BarChart>
//       </ChartContainer>
//     </div>
//   )

// }
// export default Chart




"use client"

import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { IoTrendingUp } from "react-icons/io5"


export type ChartPropsType = {
  data: {
    date: string
    count: number
  }[]
}

const Chart = ({ data }: ChartPropsType) => {


  const sopa = [
    { date: 'June 2024', count: 1 },
    { date: 'July 2024', count: 2 },
    { date: 'August 2024', count: 9 },
    { date: 'September 2024', count: 8 }
  ]



  const chartData = sopa 


  const chartData1 = [
    { date: "January", count: 186, mobile: 80 },
    { date: "February", count: 305, mobile: 200 },
    { date: "March", count: 237, mobile: 120 },
    { date: "April", count: 73, mobile: 190 },
    { date: "May", count: 209, mobile: 130 },
    { date: "June", count: 214, mobile: 140 },
  ]


  const chartConfig = {
    count: {
      label: "count",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig


  return (
    <div className="p-4 border rounded-md my-8 ">
      <Card>
        <CardHeader>
          <CardTitle>Area Chart - Stacked</CardTitle>
          <CardDescription>
            Showing total visitors for the last 6 dates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={true}
                axisLine={true}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="mobile"
                type="natural"
                fill="var(--color-mobile)"
                fillOpacity={0.4}
                stroke="var(--color-mobile)"
                stackId="a"
              />
              <Area
                dataKey="count"
                type="natural"
                fill="var(--color-count)"
                fillOpacity={0.4}
                stroke="var(--color-count)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this date <IoTrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                January - June 2024
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )

}
export default Chart