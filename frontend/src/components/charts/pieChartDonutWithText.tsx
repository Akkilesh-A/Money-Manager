"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui"

export const description = "A donut chart with text"

export function PieChartDonutWithText({chartData,chartConfig}:{chartData:{ tagName: string, spendings: number, fill: string }[],chartConfig:ChartConfig}) {
  const totalSpendings = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.spendings, 0)
  }, [])

  const [highestSpent,setHighestSpent] = React.useState(0)
  const [highestSpentTag,setHighestSpentTag] = React.useState("")

  React.useEffect(()=>{
    let max=chartData[0].spendings
    let index=0
    setHighestSpent(max)
    for(let i=0;i<chartData.length;i++){
      if(chartData[i].spendings>max){
        max=chartData[i].spendings
        index=i
      }
    }
    setHighestSpent(max)
    setHighestSpentTag(chartData[index].tagName)
  },[chartData])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Number of spendings per tag</CardTitle>
        <CardDescription>{}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="spendings"
              nameKey="tagName"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalSpendings.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Spendings
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Highest spent this month on <span className="font-bold">{highestSpentTag} - {highestSpent}</span>  <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total spendings for this month
        </div>
      </CardFooter> */}
    </Card>
  )
}
