import Link from "next/link";

/**
 * Shown when a card's query returned nothing. Two distinct reasons:
 *  - `needsVenueDb`: GA4 can't provide this at all (agent, subscription dates,
 *    menu content counts) — it must come from your own venue database.
 *  - otherwise: a normal "no data in this period" state, with an optional link
 *    to /setup to double-check the connection.
 */
export function EmptyState({
  message = "No data for this period.",
  needsVenueDb = false,
  needsCustomDimension = false,
}: {
  message?: string;
  /** GA4 fundamentally doesn't have this — points at your venue DB. */
  needsVenueDb?: boolean;
  /** Data looks absent — suggest checking the /setup connection. */
  needsCustomDimension?: boolean;
}) {
  const resolvedMessage = needsVenueDb
    ? "Not tracked in GA4 — this comes from your venue database."
    : message;

  return (
    <div className="flex min-h-24 flex-col justify-center rounded-lg border border-dashed px-4 py-6 text-[13.5px] text-[var(--viz-ink-secondary)]">
      <p>{resolvedMessage}</p>
      {needsVenueDb && (
        <p className="mt-1 text-muted-foreground">
          Join your commercial records (venue → agent / Responsabil CCHBC / expiry) keyed by subdomain to fill
          this in.
        </p>
      )}
      {!needsVenueDb && needsCustomDimension && (
        <p className="mt-1 text-muted-foreground">
          If you expected data here,{" "}
          <Link href="/setup" className="underline underline-offset-2 hover:text-foreground">
            check the connection
          </Link>
          .
        </p>
      )}
    </div>
  );
}
