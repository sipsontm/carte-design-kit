import type { MetricFormat } from "./analytics/types";

export function formatValue(value: number, format: MetricFormat): string {
  switch (format) {
    case "percent":
      return `${value.toFixed(value % 1 === 0 ? 0 : 1)}%`;
    case "duration":
      return formatDuration(value);
    case "currency":
      return `${Math.round(value).toLocaleString("en-US")} lei`;
    case "number":
    default:
      return Math.round(value).toLocaleString("en-US");
  }
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  if (m === 0) return `${s}s`;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

export function formatCompact(value: number): string {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

export function formatDelta(deltaPct: number | undefined): string | null {
  if (deltaPct === undefined || Number.isNaN(deltaPct)) return null;
  const sign = deltaPct > 0 ? "+" : "";
  return `${sign}${deltaPct.toFixed(deltaPct % 1 === 0 ? 0 : 1)}%`;
}
