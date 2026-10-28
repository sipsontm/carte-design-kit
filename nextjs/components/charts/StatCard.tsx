"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MetricInfo } from "@/components/explainer/MetricInfo";
import { formatDelta, formatValue } from "@/lib/format";
import type { Kpi } from "@/lib/analytics/types";

export function StatCard({
  kpi,
  metricId,
  invertDelta = false,
}: {
  kpi: Kpi;
  metricId?: string;
  /** Set true for metrics where a negative delta is the good direction. */
  invertDelta?: boolean;
}) {
  const delta = formatDelta(kpi.deltaPct);
  const up = kpi.deltaPct !== undefined && kpi.deltaPct >= 0;
  const isGood = kpi.deltaPct === undefined ? null : invertDelta ? !up : up;

  return (
    <Card className="gap-0 p-5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[14.5px] text-[var(--viz-ink-secondary)]">{kpi.label}</p>
        <MetricInfo id={metricId ?? kpi.id} className="mt-0.5" />
      </div>

      <p className="mt-2.5 text-[30px] font-bold leading-none tracking-[-0.75px]">
        {formatValue(kpi.value, kpi.format)}
      </p>

      <div className="mt-3.5 flex flex-wrap items-center gap-2 text-[12.5px]">
        {delta && (
          <span
            className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 font-semibold"
            style={{
              color: isGood ? "var(--viz-good)" : "var(--viz-critical)",
              background: isGood ? "var(--viz-good-bg)" : "var(--viz-critical-bg)",
            }}
          >
            {up ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
            {delta}
          </span>
        )}
        {kpi.deltaLabel && <span className="text-muted-foreground">{kpi.deltaLabel}</span>}
        {!kpi.deltaLabel && delta && <span className="text-muted-foreground">vs. prev. period</span>}
      </div>
    </Card>
  );
}
