import { Button } from "@/components/ui/button"
import { TuiContainer } from "@/components/ui/tui-container"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { AreaChart, Area, BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  RiPulseLine,
  RiCpuLine,
  RiHistoryLine,
} from "@remixicon/react"

const chartConfig = {
  cpu: {
    label: "CPU Load (%)",
    color: "var(--chart-1)",
  },
  ram: {
    label: "RAM Load (%)",
    color: "var(--chart-2)",
  },
  network: {
    label: "Network Traffic (Mb/s)",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

const weeklyData = [
  { day: "MON", workload: 65, activeNodes: 4 },
  { day: "TUE", workload: 78, activeNodes: 5 },
  { day: "WED", workload: 45, activeNodes: 3 },
  { day: "THU", workload: 92, activeNodes: 6 },
  { day: "FRI", workload: 88, activeNodes: 5 },
  { day: "SAT", workload: 30, activeNodes: 2 },
  { day: "SUN", workload: 40, activeNodes: 2 },
]

const latencyData = [
  { time: "10s", ping: 14 },
  { time: "9s", ping: 18 },
  { time: "8s", ping: 12 },
  { time: "7s", ping: 15 },
  { time: "6s", ping: 28 },
  { time: "5s", ping: 14 },
  { time: "4s", ping: 16 },
  { time: "3s", ping: 14 },
  { time: "2s", ping: 95 },
  { time: "1s", ping: 18 },
  { time: "0s", ping: 14 },
]

interface TelemetrySectionProps {
  currentTelemetryData: {
    time: string
    cpu: number
    ram: number
    network: number
  }[]
  handleSimulateSpike: () => void
  handleSimulateNetworkBurst: () => void
  handleResetTelemetry: () => void
}

export function TelemetrySection({
  currentTelemetryData,
  handleSimulateSpike,
  handleSimulateNetworkBurst,
  handleResetTelemetry,
}: TelemetrySectionProps) {
  return (
    <div className="space-y-4 outline-none">
      
      {/* PANEL 08: WORKLOAD LIVE */}
      <TuiContainer 
        label="08_WORKLOAD_LIVE" 
        badge={<RiPulseLine className="size-3 text-primary animate-pulse" />}
      >
        <div className="text-xs text-muted-foreground mb-4">
          Real-Time Telemetry Graph &mdash; Custom area charts tracking active server workload metrics and network loads.
        </div>
        
        <div className="pt-2 pb-2">
          <ChartContainer config={chartConfig} className="w-full h-[240px] aspect-auto">
            <AreaChart data={currentTelemetryData} margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
              <XAxis
                dataKey="time"
                stroke="var(--color-muted-foreground)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="var(--color-muted-foreground)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
              <Area
                type="monotone"
                dataKey="cpu"
                stroke="var(--color-chart-1)"
                fill="var(--color-chart-1)"
                fillOpacity={0.08}
                strokeWidth={1.5}
                name="cpu"
              />
              <Area
                type="monotone"
                dataKey="network"
                stroke="var(--color-chart-3)"
                fill="var(--color-chart-3)"
                fillOpacity={0.05}
                strokeWidth={1.5}
                name="network"
              />
            </AreaChart>
          </ChartContainer>
        </div>
        
        <div className="py-2 justify-between items-center text-[10px] text-muted-foreground bg-muted/10 border-t border-border/80 flex px-2 -mx-4 -mb-4">
          <span className="flex items-center gap-1.5">
            <span className="inline-block size-2 bg-[var(--chart-1)]"></span> CPU WORKLOAD
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block size-2 bg-[var(--chart-3)]"></span> NETWORK TRAFFIC
          </span>
        </div>
      </TuiContainer>

      {/* HISTORICAL WORKLOADS & DELAY TIMELINES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* WEEKLY PEAKS BAR CHART */}
        <TuiContainer
          label="09_WEEKLY_PEAKS: BAR CHART"
          badge={<Badge variant="outline" className="text-[10px] rounded-none py-0 h-4 leading-none">HISTORICAL</Badge>}
        >
          <div className="text-xs text-muted-foreground mb-4">
            Weekly peak processor workload levels and metrics overview.
          </div>
          <div className="pt-2 pb-2">
            <ChartContainer config={chartConfig} className="w-full h-[180px] aspect-auto">
              <BarChart data={weeklyData} margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                <XAxis
                  dataKey="day"
                  stroke="var(--color-muted-foreground)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
                <Bar
                  dataKey="workload"
                  fill="var(--color-chart-2)"
                  radius={0}
                  name="workload"
                />
              </BarChart>
            </ChartContainer>
          </div>
          <div className="py-2 justify-between items-center text-[10px] text-muted-foreground bg-muted/10 border-t border-border/80 flex px-2 -mx-4 -mb-4">
            <span className="flex items-center gap-1.5">
              <span className="inline-block size-2 bg-[var(--chart-2)]"></span> WEEKLY LOAD PEAK (%)
            </span>
          </div>
        </TuiContainer>

        {/* NETWORK LATENCY LINE CHART */}
        <TuiContainer
          label="10_NETWORK_LATENCY: LINE CHART"
          badge={<Badge variant="outline" className="text-[10px] rounded-none py-0 h-4 leading-none">DELAY STREAM</Badge>}
        >
          <div className="text-xs text-muted-foreground mb-4">
            Real-time delay logs (ping) tracking packet transit times.
          </div>
          <div className="pt-2 pb-2">
            <ChartContainer config={chartConfig} className="w-full h-[180px] aspect-auto">
              <LineChart data={latencyData} margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                <XAxis
                  dataKey="time"
                  stroke="var(--color-muted-foreground)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="ping"
                  stroke="var(--color-chart-3)"
                  strokeWidth={1.5}
                  dot={{ r: 2, strokeWidth: 1 }}
                  activeDot={{ r: 4 }}
                  name="ping"
                />
              </LineChart>
            </ChartContainer>
          </div>
          <div className="py-2 justify-between items-center text-[10px] text-muted-foreground bg-muted/10 border-t border-border/80 flex px-2 -mx-4 -mb-4">
            <span className="flex items-center gap-1.5">
              <span className="inline-block size-2 bg-[var(--chart-3)]"></span> PACKET TRANSIT (MS)
            </span>
          </div>
        </TuiContainer>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* PANEL 11: RAM MAP */}
        <TuiContainer label="11_MEMORY_MAP">
          <div className="text-xs text-muted-foreground mb-4">
            Volatile RAM &amp; Storage allocation maps.
          </div>
          
          <div className="space-y-4">
            {/* RAM Allocation */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span>SYSTEM MEMORY (RAM)</span>
                <span className="font-bold">1.2 GB / 8.0 GB (15%)</span>
              </div>
              <div className="w-full h-3 border border-border bg-muted/40 p-0.5 rounded-none">
                <div className="h-full bg-primary/75 w-[15%] transition-all duration-300"></div>
              </div>
            </div>

            {/* Swap Memory */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span>SWAP ALLOCATION</span>
                <span className="font-bold">0.4 GB / 4.0 GB (10%)</span>
              </div>
              <div className="w-full h-3 border border-border bg-muted/40 p-0.5 rounded-none">
                <div className="h-full bg-primary/50 w-[10%] transition-all duration-300"></div>
              </div>
            </div>

            {/* Disk Allocation */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span>NON-VOLATILE DISK (SSD)</span>
                <span className="font-bold">142.1 GB / 512 GB (27%)</span>
              </div>
              <div className="w-full h-3 border border-border bg-muted/40 p-0.5 rounded-none">
                <div className="h-full bg-primary w-[27%] transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </TuiContainer>

        {/* PANEL 12: CONTROLS */}
        <TuiContainer label="12_TELEMETRY_CONTROL">
          <div className="text-xs text-muted-foreground mb-4">
            Simulate network traffic anomalies and hardware loading.
          </div>
          
          <div className="flex flex-col gap-3">
            <Button variant="outline" className="w-full text-xs font-semibold justify-start gap-2" onClick={handleSimulateSpike}>
              <RiCpuLine className="size-4 text-rose-500 animate-pulse" />
              Trigger CPU Load Spike (99%)
            </Button>
            
            <Button variant="outline" className="w-full text-xs font-semibold justify-start gap-2" onClick={handleSimulateNetworkBurst}>
              <RiPulseLine className="size-4 text-amber-500 animate-pulse" />
              Simulate Network Packet Burst
            </Button>
            
            <Button variant="secondary" className="w-full text-xs font-semibold justify-start gap-2" onClick={handleResetTelemetry}>
              <RiHistoryLine className="size-4" />
              Restore Metrics Baseline
            </Button>
          </div>
        </TuiContainer>
      </div>
    </div>
  )
}
