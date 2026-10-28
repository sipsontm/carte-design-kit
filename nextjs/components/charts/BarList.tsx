import type { BreakdownRow } from "@/lib/analytics/types";
import { formatCompact } from "@/lib/format";
import { cn } from "@/lib/utils";
import { EmptyState } from "./EmptyState";

/** Label + full-width track. The row label carries identity, so the bar is pure magnitude. */
export function BarList({
  rows,
  valueFormatter = formatCompact,
  className,
  needsCustomDimension = false,
  needsVenueDb = false,
}: {
  rows: BreakdownRow[];
  valueFormatter?: (value: number) => string;
  className?: string;
  /** Suggest checking the /setup connection when empty. */
  needsCustomDimension?: boolean;
  /** GA4 can't provide this at all — points at the venue DB. */
  needsVenueDb?: boolean;
}) {
  const max = Math.max(...rows.map((r) => r.value), 1);

  if (rows.length === 0)
    return <EmptyState needsCustomDimension={needsCustomDimension} needsVenueDb={needsVenueDb} />;

  return (
    <div className={cn("space-y-3.5", className)}>
      {rows.map((row, i) => (
        <div key={`${row.key}-${i}`} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 text-[14px]">
          <div className="min-w-0">
            <p className="truncate">{row.label}</p>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[var(--viz-track)]">
              <div
                className="h-full rounded-full bg-[var(--viz-series-1)]"
                style={{ width: `${Math.max(2, (row.value / max) * 100)}%` }}
              />
            </div>
          </div>
          <span className="whitespace-nowrap font-semibold tabular-nums">{valueFormatter(row.value)}</span>
        </div>
      ))}
    </div>
  );
}

/** Numbered rows with a rank chip and an inline magnitude bar, as in the mockup's "Top items". */
export function RankedList({
  rows,
  valueFormatter = formatCompact,
  className,
  needsCustomDimension = false,
  needsVenueDb = false,
}: {
  rows: BreakdownRow[];
  valueFormatter?: (value: number) => string;
  className?: string;
  /** Suggest checking the /setup connection when empty. */
  needsCustomDimension?: boolean;
  /** GA4 can't provide this at all — points at the venue DB. */
  needsVenueDb?: boolean;
}) {
  const max = Math.max(...rows.map((r) => r.value), 1);

  if (rows.length === 0)
    return <EmptyState needsCustomDimension={needsCustomDimension} needsVenueDb={needsVenueDb} />;

  return (
    <ol className={cn("-my-1 divide-y", className)}>
      {rows.map((row, i) => (
        <li key={`${row.key}-${i}`} className="flex items-center gap-3 py-3">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted text-[11.5px] font-medium tabular-nums text-[var(--viz-ink-secondary)]">
            {i + 1}
          </span>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[14.5px] font-semibold leading-tight">{row.label}</p>
            {row.secondaryLabel && (
              <p className="truncate text-[12.5px] text-muted-foreground">{row.secondaryLabel}</p>
            )}
          </div>

          <div className="hidden h-1.5 w-16 shrink-0 overflow-hidden rounded-full bg-[var(--viz-track)] sm:block">
            <div
              className="h-full rounded-full bg-[var(--viz-series-1)]"
              style={{ width: `${Math.max(4, (row.value / max) * 100)}%` }}
            />
          </div>

          <span className="w-14 shrink-0 text-right text-[14px] font-semibold tabular-nums">
            {valueFormatter(row.value)}
          </span>
        </li>
      ))}
    </ol>
  );
}
