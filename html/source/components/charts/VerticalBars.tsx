"use client";

import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { formatCompact } from "@/lib/format";
import type { BreakdownRow } from "@/lib/analytics/types";
import { EmptyState } from "./EmptyState";

function ChartTooltip({ active, payload }: { active?: boolean; payload?: { payload: BreakdownRow }[] }) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border bg-popover px-3 py-2 text-xs">
      <p className="mb-0.5 font-semibold text-popover-foreground">{row.label}</p>
      <p className="tabular-nums text-muted-foreground">{row.value.toLocaleString("en-US")}</p>
    </div>
  );
}

/** Value label drawn only above inked columns — labelling every column is noise. */
function InkedLabel({
  isInked,
  x,
  y,
  width,
  value,
  index,
}: {
  isInked: (i: number) => boolean;
  x?: number;
  y?: number;
  width?: number;
  value?: number;
  index?: number;
}) {
  if (index === undefined || !isInked(index)) return null;
  if (x === undefined || y === undefined || width === undefined || value === undefined) return null;
  return (
    <text
      x={x + width / 2}
      y={y - 9}
      textAnchor="middle"
      style={{ fill: "var(--viz-ink-primary)", fontSize: 12.5, fontWeight: 600 }}
    >
      {formatCompact(value)}
    </text>
  );
}

/**
 * Single-series columns. No gridlines and no y-axis by design (per the
 * mockup): the peak column is inked and directly labelled, so the scale
 * is read from that one number rather than from axis furniture.
 */
export function VerticalBars({
  rows,
  height = 240,
  highlightLastN = 0,
  needsCustomDimension = false,
  emptyMessage,
}: {
  rows: BreakdownRow[];
  height?: number;
  /** Ink the last N columns instead of the peak (e.g. "most recent years"). */
  highlightLastN?: number;
  /** Marks this breakdown as depending on a GA4 custom dimension. */
  needsCustomDimension?: boolean;
  emptyMessage?: string;
}) {
  if (rows.length === 0) {
    return <EmptyState message={emptyMessage} needsCustomDimension={needsCustomDimension} />;
  }

  const max = Math.max(...rows.map((r) => r.value), 0);
  const peakIndex = rows.findIndex((r) => r.value === max);

  const isInked = (i: number) =>
    highlightLastN > 0 ? i >= rows.length - highlightLastN : i === peakIndex;

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} margin={{ top: 24, right: 4, left: 4, bottom: 0 }} barCategoryGap="26%">
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--viz-ink-muted)", fontSize: 12.5 }}
            tickMargin={12}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--viz-track)" }} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={44} isAnimationActive={false}>
            <LabelList dataKey="value" content={<InkedLabel isInked={isInked} />} />
            {rows.map((_, i) => (
              <Cell key={i} fill={isInked(i) ? "var(--viz-series-1)" : "var(--viz-mark-muted)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
