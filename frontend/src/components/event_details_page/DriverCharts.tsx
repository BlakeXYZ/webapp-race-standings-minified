"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList } from "recharts"

import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

import { Driver } from '@/types/event'

export function DriverChartVertical_stacked({ 
  drivers,
  totalRuns 
}: { 
  drivers: Driver[]
  totalRuns: number 
}) {
  
  // Transform drivers into chart data format
  const chartData = drivers.map((driver) => {
    const dataPoint: any = {
      driver: driver.driver,
    }
    
    // Add each run as a separate property
    driver.run_details?.forEach((run, index) => {
      dataPoint[`run${index + 1}`] = parseFloat(run.time) || 0
    })
    
    return dataPoint
  })

  // Create dynamic chart config
  const chartConfig: ChartConfig = {}
  const colors = ['#2563eb', '#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa']
  
  for (let i = 1; i <= totalRuns; i++) {
    chartConfig[`run${i}`] = {
      label: `Run ${i}`,
      color: colors[(i - 1) % colors.length],
    }
  }

  const maxTime = Math.ceil(Math.max(...chartData.map(d => {
    let total = 0
    for (let i = 1; i <= totalRuns; i++) {
      total += d[`run${i}`] || 0
    }
    return total
  })) / 50) * 50



  return (
    <ChartContainer 
      config={chartConfig} 
      className="min-h-[200px] w-full mb-10 mt-10"
      style={{ minHeight: `${drivers.length * 35}px` }}
    >
      <BarChart 
        accessibilityLayer 
        data={chartData} 
        layout="vertical" 
        margin={{ left: -20 }}
        barCategoryGap="20%" 
      >
        <CartesianGrid horizontal={false} />
        <XAxis type="number" hide={false} domain={[0, maxTime * 1]} />
        <YAxis 
            dataKey="driver" 
            type="category" 
            hide={false}
            interval={0}  // ← Show ALL labels (0 = no skipping)
            width={100}
            tick={{ fontSize: 11 }}
            tickMargin={0}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value.length > 10 ? value.substring(0, 10) + '...' : value}
        />
        <ChartTooltip content={<ChartTooltipContent />} />

        {/* Dynamically create bars for each run */}
        {Array.from({ length: totalRuns }, (_, i) => i + 1).map((runNumber, index, array) => (
          <Bar 
            key={`run${runNumber}`}
            dataKey={`run${runNumber}`} 
            stackId="a" 
            fill={`var(--color-run${runNumber})`}
            radius={
              index === 0 ? [4, 0, 0, 4] :           // First run: round left
              index === array.length - 1 ? [0, 4, 4, 0] :  // Last run: round right
              [0, 0, 0, 0]                            // Middle runs: no rounding
            }
          >
          </Bar>
        ))}
      </BarChart>
    </ChartContainer>
  )
}

export function DriverChartVertical_side_by_side() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full mb-10">
      <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ left: -20 }}>
        <CartesianGrid vertical={false} />
        <XAxis type="number" dataKey="desktop" hide />
        <YAxis
        dataKey="month"
        type="category"
        tickLine={false}
        tickMargin={10}
        axisLine={false}
        tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />



        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}


