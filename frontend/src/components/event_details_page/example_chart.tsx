"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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


export function ChartExampleVertical_stacked() {
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



        <Bar dataKey="desktop" stackId="a" fill="var(--color-desktop)" radius={[4, 0, 0, 4]} />
        <Bar dataKey="mobile" stackId="a" fill="var(--color-mobile)" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ChartContainer>
  )
}


export function ChartExampleVertical_side_by_side() {
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


