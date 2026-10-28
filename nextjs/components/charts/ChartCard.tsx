"use client";

import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { MetricInfo } from "@/components/explainer/MetricInfo";
import { cn } from "@/lib/utils";

export function ChartCard({
  title,
  subtitle,
  metricId,
  action,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  metricId?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("gap-5 p-6", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="text-[17px] font-bold leading-none tracking-[-0.36px]">{title}</h3>
            {metricId && <MetricInfo id={metricId} />}
          </div>
          {subtitle && <p className="mt-2 text-[13.5px] text-[var(--viz-ink-secondary)]">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </Card>
  );
}
