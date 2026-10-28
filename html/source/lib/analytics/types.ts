// Source-agnostic shapes. Both the mock generator and the GA4 client
// produce exactly these — components never know or care which one answered.

export type DateRangeKey = "7d" | "30d" | "90d" | "12mo";

export type MetricFormat = "number" | "percent" | "duration" | "currency";

export interface Kpi {
  id: string;
  label: string;
  value: number;
  format: MetricFormat;
  deltaPct?: number;
  deltaLabel?: string;
  sparkline?: number[];
}

export interface TimePoint {
  date: string; // ISO date
  value: number;
}

export interface TrendSeries {
  id: string;
  label: string;
  points: TimePoint[];
}

export interface BreakdownRow {
  key: string;
  label: string;
  value: number;
  secondaryValue?: number;
  secondaryLabel?: string;
  meta?: string;
}

export interface HeatmapCell {
  day: number; // 0 = Sunday .. 6 = Saturday
  hour: number; // 0..23
  value: number;
}

export interface DonutSlice {
  key: string;
  label: string;
  value: number;
}

export interface GeoPoint {
  id: string;
  label: string;
  lat: number;
  lng: number;
  value: number;
  county?: string;
  city?: string;
}

export interface QrMenuRow {
  id: string;
  name: string;
  domain: string;
  city: string;
  county: string;
  agent?: string;
  responsibleCchbc?: string;
  itemsCount: number;
  views30d: number;
  viewsLy: number;
  expiry: string; // ISO date
  expired: boolean;
  trend: number[];
}

// ---- Per-section report bundles -------------------------------------------------

export interface OverviewReport {
  kpis: {
    views30d: Kpi;
    viewsLy: Kpi;
    qrMenus: Kpi;
    growthPct: Kpi;
  };
  trendLastYear: TrendSeries;
  trend30d: TrendSeries;
  menusPerYear: BreakdownRow[];
  topMenus: BreakdownRow[];
  realtimeActiveUsers: number;
}

export interface AcquisitionReport {
  byChannel: BreakdownRow[];
  bySourceMedium: BreakdownRow[];
  byCampaign: BreakdownRow[];
  byLandingPage: BreakdownRow[];
  newUsersTrend: TrendSeries;
}

export interface EngagementReport {
  kpis: {
    sessions: Kpi;
    engagedSessions: Kpi;
    engagementRate: Kpi;
    avgEngagementTime: Kpi;
    eventsPerSession: Kpi;
  };
  newVsReturning: DonutSlice[];
  bestHours: BreakdownRow[];
  bestDays: BreakdownRow[];
  busiestTimes: HeatmapCell[];
  scrollDepthPct: number;
}

export interface AudienceReport {
  byCountry: BreakdownRow[];
  byLanguage: BreakdownRow[];
  byDeviceCategory: DonutSlice[];
  byOs: DonutSlice[];
  byBrowser: DonutSlice[];
  byAgeBracket: BreakdownRow[];
  byGender: DonutSlice[];
  googleSignalsEnabled: boolean;
}

export interface ContentReport {
  mostViewedItems: BreakdownRow[];
  categoryViews: BreakdownRow[];
  brandEngagement: {
    totalItemViews: Kpi;
    shareOfAllViews: Kpi;
    brandImpressions: Kpi;
    byBrand: BreakdownRow[];
  };
  video: {
    plays: Kpi;
    fullLoops: Kpi;
    completionRatePct: Kpi;
  };
  menuHealth: {
    items: number;
    categories: number;
    withPricePct: number;
    withPhotoPct: number;
  };
}

export interface NetworkReport {
  qrMenus: QrMenuRow[];
  viewsByCounty: BreakdownRow[];
  bestMenuByCounty: BreakdownRow[];
  menusByCounty: BreakdownRow[];
  geoPoints: GeoPoint[];
  unpinnedCount: number;
  byAgent: BreakdownRow[];
  byResponsibleCchbc: BreakdownRow[];
}

export interface RealtimeReport {
  activeUsers: number;
  perMinute: number[];
  byCountry: BreakdownRow[];
}

export type ReportKind =
  | "overview"
  | "acquisition"
  | "engagement"
  | "audience"
  | "content"
  | "network"
  | "realtime";

export interface DataSourceMeta {
  mode: "mock" | "ga4";
  propertyId?: string;
  generatedAt: string;
}
