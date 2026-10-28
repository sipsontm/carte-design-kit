"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCompact } from "@/lib/format";
import type { TrendSeries } from "@/lib/analytics/types";

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-popover px-3 py-2 text-xs">
      <p className="mb-0.5 font-semibold text-popover-foreground">{label}</p>
      <p className="tabular-nums text-muted-foreground">{payload[0].value.toLocaleString("en-US")} views</p>
    </div>
  );
}

export function TrendArea({ series, height = 240 }: { series: TrendSeries; height?: number }) {
  const data = series.points.map((p) => ({ date: p.date, value: p.value }));

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--viz-series-1)" stopOpacity={0.12} />
              <stop offset="100%" stopColor="var(--viz-series-1)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--viz-gridline)" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--viz-ink-muted)", fontSize: 12 }}
            tickMargin={10}
            minTickGap={28}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--viz-ink-muted)", fontSize: 12 }}
            tickFormatter={(v: number) => formatCompact(v)}
            width={44}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--viz-baseline)", strokeWidth: 1 }} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--viz-series-1)"
            strokeWidth={2}
            fill="url(#trend-fill)"
            activeDot={{ r: 4, fill: "var(--viz-series-1)", stroke: "var(--viz-surface)", strokeWidth: 2 }}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
