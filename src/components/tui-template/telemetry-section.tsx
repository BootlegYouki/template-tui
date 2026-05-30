import { Button } from "@/components/ui/button"
import { TuiContainer } from "@/components/ui/tui-container"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { AreaChart, Area, BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from "recharts"
import {
  RiPulseLine,
  RiCpuLine,
  RiHistoryLine,
  RiPieChartLine,
  RiRadarLine,
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
  core_engine: {
    label: "Core Engine",
    color: "var(--chart-1)",
  },
  net_daemon: {
    label: "Net Daemon",
    color: "var(--chart-2)",
  },
  db_sync: {
    label: "Database Sync",
    color: "var(--chart-3)",
  },
  log_index: {
    label: "Log Indexer",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

const processData = [
  { name: "CORE_ENGINE", value: 45, color: "var(--color-chart-1)" },
  { name: "NET_DAEMON", value: 25, color: "var(--color-chart-2)" },
  { name: "DB_SYNC", value: 18, color: "var(--color-chart-3)" },
  { name: "LOG_INDEX", value: 12, color: "var(--color-chart-4)" },
]

const radarData = [
  { subject: "SPEED", A: 120, B: 110 },
  { subject: "SECURITY", A: 98, B: 130 },
  { subject: "MEMORY", A: 86, B: 130 },
  { subject: "LATENCY", A: 99, B: 100 },
  { subject: "UPTIME", A: 85, B: 90 },
  { subject: "STABILITY", A: 65, B: 85 },
]

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

      {/* NEW GRAPHS ROW: PROCESS PIE & RADAR DIAGNOSTICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* PROCESS DISTRIBUTION PIE CHART */}
        <TuiContainer
          label="13_PROCESS_DISTRIBUTION: PIE CHART"
          badge={<RiPieChartLine className="size-3 text-primary animate-pulse" />}
        >
          <div className="text-xs text-muted-foreground mb-4">
            Volatile hardware threads memory layout allocation metrics.
          </div>
          <div className="pt-2 pb-2 flex items-center justify-center">
            <div className="relative w-full h-[180px] flex items-center justify-center">
              <ChartContainer config={chartConfig} className="w-[180px] h-[180px]">
                <PieChart>
                  <Pie
                    data={processData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {processData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="var(--color-border)" strokeWidth={1} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
              <div className="absolute flex flex-col items-center justify-center text-[10px] pointer-events-none">
                <span className="text-muted-foreground uppercase">Total</span>
                <span className="font-bold text-foreground">100%</span>
              </div>
            </div>
          </div>
          <div className="py-2 justify-between items-center text-[9px] text-muted-foreground bg-muted/10 border-t border-border/80 grid grid-cols-2 gap-1 px-2 -mx-4 -mb-4">
            {processData.map((d) => (
              <span key={d.name} className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
                <span className="inline-block size-2 shrink-0" style={{ backgroundColor: d.color }}></span> {d.name} ({d.value}%)
              </span>
            ))}
          </div>
        </TuiContainer>

        {/* RADAR DIAGNOSTICS */}
        <TuiContainer
          label="14_SYSTEM_RADAR: RADAR CHART"
          badge={<RiRadarLine className="size-3 text-primary animate-pulse" />}
        >
          <div className="text-xs text-muted-foreground mb-4">
            Multi-dimensional diagnostic vectors for engine metrics.
          </div>
          <div className="pt-2 pb-2 flex items-center justify-center">
            <ChartContainer config={chartConfig} className="w-full h-[180px] aspect-auto flex items-center justify-center">
              <RadarChart cx="50%" cy="50%" outerRadius="60%" data={radarData} margin={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <PolarGrid className="stroke-border/40" />
                <PolarAngleAxis dataKey="subject" stroke="var(--color-muted-foreground)" fontSize={8} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="var(--color-border)" fontSize={7} />
                <Radar name="Operator Node" dataKey="A" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.2} />
                <Radar name="Target Node" dataKey="B" stroke="var(--color-chart-2)" fill="var(--color-chart-2)" fillOpacity={0.08} strokeDasharray="3 3" />
                <ChartTooltip content={<ChartTooltipContent />} />
              </RadarChart>
            </ChartContainer>
          </div>
          <div className="py-2 justify-between items-center text-[10px] text-muted-foreground bg-muted/10 border-t border-border/80 flex px-2 -mx-4 -mb-4">
            <span className="flex items-center gap-1.5">
              <span className="inline-block size-2 bg-[var(--chart-1)]"></span> OPERATOR NODE
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block size-2 bg-[var(--chart-2)] border border-dashed"></span> TARGET CORE
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
