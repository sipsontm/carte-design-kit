"use client";

import { StatCard } from "@/components/charts/StatCard";
import { ChartCard } from "@/components/charts/ChartCard";
import { TrendArea } from "@/components/charts/TrendArea";
import { RankedList } from "@/components/charts/BarList";

import { EmptyState } from "@/components/charts/EmptyState";

import { months, annual, daily, ranks, series, rows } from "@/lib/demo-data";

export default function PageContent() {
  return (
    <>
      <div className="kit-grid kit-stats" data-reference="kpis">
        {[
          {
            id: "views30d",
            label: "Views (30d)",
            value: 175904,
            format: "number",
            deltaPct: -15,
            deltaLabel: "since last month",
          },
          {
            id: "viewsLy",
            label: "Views (1y)",
            value: 1385770,
            format: "number",
            deltaPct: 113.8,
            deltaLabel: "vs last year",
          },
          {
            id: "qrMenus",
            label: "Active QR-Menus",
            value: 220,
            format: "number",
            deltaLabel: "with views in the last 30d",
          },
          {
            id: "growthPct",
            label: "Growth",
            value: 113.8,
            format: "percent",
            deltaLabel: "menu views vs last year",
          },
        ].map((kpi) => (
          <StatCard key={kpi.id} kpi={kpi} />
        ))}
      </div>
      <div className="kit-grid kit-five" data-reference="chart-row">
        <ChartCard
          title="Total views, last 12 months"
          subtitle="Menu views per month, network-wide"
          metricId="viewsLy"
          className="kit-span3"
        >
          <TrendArea series={series(annual, months)} />
        </ChartCard>
        <ChartCard
          title="QR-Menus onboarded per year"
          subtitle="New venues added to the network"
          metricId="qrMenus"
          className="kit-span2"
        >
          <EmptyState message="Onboarding dates live in your venue database, not GA4 — wire that up to fill this in." />
        </ChartCard>
      </div>
      <div className="kit-grid kit-five">
        <ChartCard
          title="Top QR menus"
          subtitle="Ranked by views, last 30 days"
          className="kit-span2"
        >
          <RankedList rows={ranks} />
        </ChartCard>
        <ChartCard
          title="Views, last 30 days"
          subtitle="Daily trend across the network"
          metricId="views30d"
          className="kit-span3"
        >
          <TrendArea
            series={series(
              daily,
              daily.map((_, i) =>
                i === 30
                  ? "2026-10-01"
                  : `2026-09-${String(i + 1).padStart(2, "0")}`,
              ),
            )}
          />
        </ChartCard>
      </div>
      <p className="kit-demo-note">
        REFERENCE PAGE · Fixed illustrative data, not a live GA4 report.
        Original dashboard cards, charts, font and tokens.
      </p>
    </>
  );
}
