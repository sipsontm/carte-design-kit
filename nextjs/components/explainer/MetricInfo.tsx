"use client";

import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getMetric } from "@/lib/metrics-catalog";
import { cn } from "@/lib/utils";

export function MetricInfo({ id, className }: { id: string; className?: string }) {
  const metric = getMetric(id);
  if (!metric) return null;

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "inline-flex size-4 shrink-0 items-center justify-center rounded-full text-muted-foreground/70 transition-colors hover:text-foreground",
          className
        )}
        aria-label={`What is ${metric.label}?`}
      >
        <Info className="size-3.5" />
      </PopoverTrigger>
      <PopoverContent className="w-80 text-sm" align="start">
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{metric.category}</p>
            <h4 className="font-semibold leading-tight">{metric.label}</h4>
          </div>
          <p className="text-muted-foreground">{metric.definition}</p>
          {metric.formula && (
            <p className="rounded-md bg-muted px-2 py-1.5 font-mono text-xs text-foreground/80">{metric.formula}</p>
          )}
          {metric.howToImprove.length > 0 && (
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">How to improve it</p>
              <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
                {metric.howToImprove.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
          {metric.benchmarkNote && (
            <p className="border-t pt-2 text-xs text-muted-foreground">{metric.benchmarkNote}</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
