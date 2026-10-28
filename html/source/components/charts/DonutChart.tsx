"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { DonutSlice } from "@/lib/analytics/types";
import { formatCompact } from "@/lib/format";

// Ordinal ramp: slices are ranked by share, so darkest = largest. The legend
// beside the donut carries identity, never the shade alone.
const SERIES = [
  "var(--viz-series-1)",
  "var(--viz-series-2)",
  "var(--viz-series-3)",
  "var(--viz-series-4)",
  "var(--viz-series-5)",
  "var(--viz-series-6)",
];

function ChartTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="mb-1 font-medium text-popover-foreground">{payload[0].name}</p>
      <p className="tabular-nums text-muted-foreground">{formatCompact(payload[0].value)}</p>
    </div>
  );
}

export function DonutChart({ slices, size = 160 }: { slices: DonutSlice[]; size?: number }) {
  const total = slices.reduce((s, x) => s + x.value, 0);

  return (
    <div className="flex items-center gap-6">
      <div style={{ width: size, height: size }} className="shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={slices}
              dataKey="value"
              nameKey="label"
              innerRadius="62%"
              outerRadius="100%"
              paddingAngle={2}
              stroke="var(--viz-surface)"
              strokeWidth={2}
              isAnimationActive={false}
            >
              {slices.map((s, i) => (
                <Cell key={`${s.key}-${i}`} fill={SERIES[i % SERIES.length]} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="min-w-0 flex-1 space-y-2.5 text-[13.5px]">
        {slices.map((s, i) => (
          <li key={`${s.key}-${i}`} className="flex items-center gap-2.5">
            <span className="size-2.5 shrink-0 rounded-full" style={{ background: SERIES[i % SERIES.length] }} />
            <span className="truncate">{s.label}</span>
            <span className="ml-auto shrink-0 font-semibold tabular-nums">
              {total ? Math.round((s.value / total) * 100) : 0}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
