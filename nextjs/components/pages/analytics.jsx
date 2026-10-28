"use client";

import { StatCard } from "@/components/charts/StatCard";
import { ChartCard } from "@/components/charts/ChartCard";
import { TrendArea } from "@/components/charts/TrendArea";
import { BarList } from "@/components/charts/BarList";
import { VerticalBars } from "@/components/charts/VerticalBars";
import { DonutChart } from "@/components/charts/DonutChart";

import { Badge } from "@/components/kit/primitives";

import { daily, series, rows } from "@/lib/demo-data";
import { useWorkspace } from "@/components/workspace/workspace-provider";
export default function PageContent() {
  const { period, setPeriod } = useWorkspace();

  const scale = period === "7" ? 0.28 : period === "90" ? 2.7 : 1;
  return (
    <>
      <div className="kit-toolbar">
        <div className="kit-actions">
          <Badge>Illustrative report</Badge>
          <span className="kit-muted">A reusable analytics layout</span>
        </div>
        <select
          aria-label="Report period"
          className="kit-input"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>
      <div className="kit-grid kit-stats">
        {[
          ["Views", 175904, "number"],
          ["Engagement rate", 68.4, "percent"],
          ["Sessions", 98420, "number"],
          ["Events", 246180, "number"],
        ].map(([label, value, format], i) => (
          <StatCard
            key={label}
            kpi={{
              id: label,
              label,
              value: format === "percent" ? value : Math.round(value * scale),
              format,
              deltaPct: [12.5, 3.2, 8.1, -2.4][i],
            }}
          />
        ))}
      </div>
      <div className="kit-grid kit-five">
        <ChartCard
          title="Views over time"
          subtitle={`Illustrative ${period}-day aggregate`}
          className="kit-span3"
        >
          <TrendArea
            series={series(
              daily.map((v) => Math.round(v * scale)),
              daily.map((_, i) => "Period " + (i + 1)),
            )}
          />
        </ChartCard>
        <ChartCard
          title="Device breakdown"
          subtitle="Ranked by share of views"
          className="kit-span2"
        >
          <DonutChart
            slices={rows(["Mobile", "Desktop", "Tablet"], [76, 19, 5])}
          />
        </ChartCard>
      </div>
      <div className="kit-grid kit-two kit-mt">
        <ChartCard
          title="Monthly completions"
          subtitle="Latest month highlighted"
        >
          <VerticalBars
            rows={rows(
              ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
              [64, 80, 75, 110, 140, 162].map((v) => Math.round(v * scale)),
            )}
            highlightLastN={1}
          />
        </ChartCard>
        <ChartCard
          title="Acquisition channels"
          subtitle="Labels carry identity, grayscale carries magnitude"
        >
          <BarList
            rows={rows(
              ["Direct", "Organic search", "Referral", "Social"],
              [124000, 33000, 14500, 4404].map((v) => Math.round(v * scale)),
            )}
          />
        </ChartCard>
      </div>
    </>
  );
}
