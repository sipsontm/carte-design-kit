export type MetricCategory =
  | "Overview"
  | "Acquisition"
  | "Engagement"
  | "Audience"
  | "Content"
  | "Network"
  | "Technical concepts";

export interface MetricDoc {
  id: string;
  label: string;
  category: MetricCategory;
  definition: string;
  formula?: string;
  howToImprove: string[];
  benchmarkNote?: string;
}

export const METRICS_CATALOG: MetricDoc[] = [
  // ---- Overview ----------------------------------------------------------
  {
    id: "views30d",
    label: "Views (30 days)",
    category: "Overview",
    definition:
      "The number of times any QR menu page was loaded in the last 30 days. In GA4 terms this is the screenPageViews metric — every page load counts, even if the same person reloads or revisits.",
    formula: "COUNT(page_view events) over the trailing 30 days",
    howToImprove: [
      "Get more venues to put table talkers / stickers where the QR code is highly visible — views are gated by scan volume.",
      "Reduce menu load time; a slow first paint on mobile networks causes drop-off before the view event even fires.",
      "Track this alongside unique visitors — a rising views count with flat unique visitors just means more repeat scans per guest, not real growth.",
    ],
  },
  {
    id: "viewsLy",
    label: "Views (last 12 months)",
    category: "Overview",
    definition: "Total page views across the whole network over the trailing 12 months — the headline growth number.",
    howToImprove: [
      "This is a lagging indicator of network size (menu count) and per-venue traffic combined — decompose it: is growth coming from more venues, or more views per venue?",
      "Compare month-over-month in the trend chart rather than staring at the yearly total; seasonality (terrace season, holidays) moves this a lot.",
    ],
  },
  {
    id: "growthPct",
    label: "Growth %",
    category: "Overview",
    definition: "Year-over-year percentage change in total views, comparing the trailing 12 months to the 12 months before that.",
    formula: "(views this year − views last year) / views last year × 100",
    howToImprove: [
      "Growth from adding new venues is easier to move short-term than growth from existing venues viewing more — track both separately if you want a durable number.",
    ],
  },
  {
    id: "qrMenus",
    label: "QR-Menus (active)",
    category: "Overview",
    definition:
      "Count of distinct venues that received at least one view in the period. GA4 alone can't tell you your *total* signed venue count (including zero-view ones) — that lives in your own venue database.",
    howToImprove: [
      "A gap between total contracted menus and 'active this month' is your churn/dormancy signal — venues with a QR code nobody scans are the ones worth calling.",
    ],
  },

  // ---- Engagement ---------------------------------------------------------
  {
    id: "sessions",
    label: "Sessions",
    category: "Engagement",
    definition:
      "A session is a group of interactions from one visitor within a given time frame (GA4 defaults to a 30-minute inactivity timeout). One guest scanning, browsing for 5 minutes, and leaving is one session — even if they viewed 10 items.",
    formula: "GA4 counts a new session on session_start; renewed after 30 min of inactivity or at midnight",
    howToImprove: [
      "Sessions scale with foot traffic and QR placement — this metric moves with the business, not just the app.",
      "Watch for artificially inflated sessions from staff testing the menu on a shared device repeatedly; it's noise, not signal.",
    ],
  },
  {
    id: "engagedSessions",
    label: "Engaged sessions",
    category: "Engagement",
    definition:
      "A session counts as 'engaged' if it lasted 10+ seconds, had a key event (conversion), or had 2+ page/screen views. This is GA4's replacement for the old, much-criticized 'bounce rate'.",
    howToImprove: [
      "A guest who opens the menu, glances for 3 seconds, and closes it (common when someone already knows what they want) is NOT engaged — that's fine and expected, don't chase 100%.",
    ],
  },
  {
    id: "engagementRate",
    label: "Engagement rate",
    category: "Engagement",
    definition: "The share of sessions that were 'engaged' (see above). The inverse of the old bounce rate.",
    formula: "engaged sessions / sessions × 100",
    howToImprove: [
      "Make the landing category obvious — if guests have to guess where 'drinks' is, they close the menu before engaging.",
      "Autoplay video ads that are too long or block scrolling can push engagement rate down if guests bail before the menu content loads.",
    ],
    benchmarkNote: "Typical restaurant/hospitality mobile web sessions land 60–85% engaged; below 50% usually means a slow load or confusing landing screen.",
  },
  {
    id: "avgEngagementTime",
    label: "Avg. engagement time",
    category: "Engagement",
    definition: "Average time a session was actually in the foreground and being interacted with (GA4 excludes tab-backgrounded time, unlike old 'time on page').",
    howToImprove: [
      "Longer isn't automatically better — a guest who finds their order in 20 seconds had a *good* experience, not a disengaged one. Pair this with items-viewed and conversion-style events to judge quality.",
      "If this metric is very low network-wide, check whether categories are logically grouped; excessive scrolling to find a section reads as 'engagement' but is often friction.",
    ],
  },
  {
    id: "eventsPerSession",
    label: "Events / session",
    category: "Engagement",
    definition: "Average number of GA4 events (page_view, scroll, item clicks, video plays, etc.) fired per session — a proxy for how much a guest actually did in the menu.",
    howToImprove: [
      "Adding meaningful custom events (item tap, category switch) gives you a far richer picture than page_view alone — if this number is close to 1, you're likely only tracking page loads.",
    ],
  },
  {
    id: "newVsReturning",
    label: "New vs. returning",
    category: "Engagement",
    definition: "Split of sessions from first-time visitors vs. people who've scanned a QR menu (any menu, if using one GA4 property) before.",
    howToImprove: [
      "High returning share on a single venue is a great sign — repeat diners re-checking the menu. Low returning share is completely normal and expected for most restaurant use cases.",
    ],
  },
  {
    id: "scrollDepth",
    label: "Scrolled to bottom",
    category: "Engagement",
    definition: "Share of visitors who scrolled 90%+ down the page — GA4's automatically-collected 'scroll' event.",
    howToImprove: [
      "Low scroll-to-bottom on a long menu might mean guests found what they wanted early (fine) or gave up scrolling (not fine) — cross-check against category view spread to tell which.",
    ],
  },
  {
    id: "busiestTimes",
    label: "Busiest times (day × hour)",
    category: "Engagement",
    definition: "A heatmap of views grouped by day of week and hour of day — when guests are actually opening the menu.",
    howToImprove: [
      "Schedule video ad refreshes / campaign changes to land just before your busiest windows so the newest content gets maximum exposure.",
      "If busiest hours don't line up with a venue's actual service hours, the QR code placement or table talker might be getting scanned by non-diners (delivery riders, passersby).",
    ],
  },

  // ---- Acquisition ---------------------------------------------------------
  {
    id: "byChannel",
    label: "Traffic by channel",
    category: "Acquisition",
    definition:
      "GA4 buckets every session into a channel — Direct, Organic Social, Referral, Organic Search, etc. — based on the URL params / referrer that brought the visitor in.",
    howToImprove: [
      "For a QR-menu business, 'Direct' dominating is expected and healthy — that's the QR scan itself. A large 'Organic Search' or 'Referral' share means people are finding menus outside the physical QR code (e.g. Google listings) — worth a dedicated landing strategy.",
    ],
  },
  {
    id: "bySourceMedium",
    label: "Source / medium",
    category: "Acquisition",
    definition: "A finer-grained cut than channel — the literal source (e.g. instagram, google) paired with medium (social, organic, referral).",
    howToImprove: [
      "Tag any printed table-talker or sticker QR code with UTM parameters (utm_source=table, utm_medium=qr) so it separates cleanly from social/link-in-bio scans.",
    ],
  },
  {
    id: "byCampaign",
    label: "Campaigns",
    category: "Acquisition",
    definition: "Sessions attributed to a specific UTM campaign (utm_campaign) — useful for measuring a specific push, e.g. a seasonal menu promo.",
    howToImprove: ["Only useful if you're actively tagging links with utm_campaign — otherwise this stays empty, which is normal."],
  },
  {
    id: "landingPage",
    label: "Landing pages",
    category: "Acquisition",
    definition: "Which specific menu URL a session started on — effectively 'which venue', but also catches anyone landing on a non-root path.",
    howToImprove: [],
  },

  // ---- Audience -------------------------------------------------------------
  {
    id: "byCountry",
    label: "Users by country",
    category: "Audience",
    definition: "Geolocation of visitors based on IP address, bucketed to country.",
    howToImprove: [
      "A meaningful non-Romania share (tourists) is a signal to invest in translated menu content and multi-language toggles.",
    ],
  },
  {
    id: "byLanguage",
    label: "Users by language",
    category: "Audience",
    definition: "The visitor's browser/device language setting — not the same as country; a Romanian on an English-language phone shows as English.",
    howToImprove: ["Compare against your menu's available translations — a big gap (e.g. lots of English but no English menu) is a quick win."],
  },
  {
    id: "byDeviceCategory",
    label: "Device category",
    category: "Audience",
    definition: "Mobile vs. tablet vs. desktop split.",
    howToImprove: [
      "QR-menu traffic should be 90%+ mobile by nature — a surprisingly high desktop share usually means bots, staff previewing the menu, or the link being shared outside the table.",
    ],
  },
  {
    id: "byOs",
    label: "Operating system",
    category: "Audience",
    definition: "iOS vs. Android vs. other, from the user agent.",
    howToImprove: ["If iOS dominates, prioritize Safari-specific QA (autoplay-muted video restrictions are stricter on iOS Safari)."],
  },
  {
    id: "byBrowser",
    label: "Browser",
    category: "Audience",
    definition: "Which browser rendered the menu — Safari, Chrome, Samsung Internet, etc.",
    howToImprove: ["Samsung Internet and in-app browsers (Instagram/Facebook webview) often have quirks with autoplay video — test there specifically, not just Chrome/Safari."],
  },
  {
    id: "byAgeBracket",
    label: "Age demographics",
    category: "Audience",
    definition: "Estimated age bracket, inferred from signed-in Google account data — only populated when Google Signals is enabled on the property.",
    howToImprove: [],
    benchmarkNote: "Coverage is partial by nature (only signed-in Google users) — treat this as directional, not a census.",
  },
  {
    id: "byGender",
    label: "Gender demographics",
    category: "Audience",
    definition: "Estimated gender, same Google Signals mechanism and same partial-coverage caveat as age.",
    howToImprove: [],
  },

  // ---- Content (business-specific) --------------------------------------------
  {
    id: "mostViewedItems",
    label: "Most viewed items",
    category: "Content",
    definition: "Which individual menu items (dishes/drinks) guests looked at most, from item-level view events.",
    howToImprove: [
      "Feed this back to venue owners — items near the top with low actual order rates (if they track POS data) suggest a pricing or description problem, not a demand problem.",
    ],
  },
  {
    id: "categoryViews",
    label: "Category views",
    category: "Content",
    definition: "Views grouped by menu category (mains, drinks, desserts, etc.) — shows where attention concentrates.",
    howToImprove: ["A category with very low views might just be poorly placed in the nav order — try moving it earlier and see if views change."],
  },
  {
    id: "brandEngagement",
    label: "Coca-Cola brand engagement",
    category: "Content",
    definition:
      "Views of Coca-Cola portfolio items (Coca-Cola, Fanta, Sprite, Dorna, Schweppes, Fuzetea, Cappy, Burn) as a share of all item views network-wide — the core commercial metric for the CCHBC relationship.",
    formula: "Coke portfolio item views / total item views × 100",
    howToImprove: [
      "This is the number to put in front of CCHBC — it directly demonstrates shelf-space value of the standardized portfolio placement.",
      "If share is trending down, check whether new venues are placing the Coke portfolio prominently in their menu — placement discipline matters as much as guest demand.",
    ],
  },
  {
    id: "videoEngagement",
    label: "Background video engagement",
    category: "Content",
    definition: "Plays, full loops, and completion rate for the two autoplay-muted background videos per menu — the ad-impression metric CCHBC pays for.",
    howToImprove: [
      "Full loops matter more than plays for ad value — a video that plays once and gets scrolled past delivers far less than one that loops 5 times during a long browsing session.",
      "Keep videos short (6–15s) and visually legible with sound off — muted autoplay means the creative has to work purely visually.",
    ],
    benchmarkNote: "To split plays per individual video (top vs. bottom), register an event-scoped custom dimension named video_label in GA4 Admin → Custom definitions — otherwise totals are combined.",
  },
  {
    id: "menuHealth",
    label: "Menu health (items/categories/photos/prices)",
    category: "Content",
    definition: "Content-completeness metrics from your menu CMS, not GA4 — item count, category count, % with a price set, % with a photo.",
    howToImprove: [
      "Items with photos consistently get more views in food-menu products generally — a low with-photo % is usually the single highest-leverage fix per venue.",
    ],
  },

  // ---- Network (business-specific) ----------------------------------------------
  {
    id: "viewsByCounty",
    label: "Views by county",
    category: "Network",
    definition: "Views rolled up by Romanian county (județ), from a custom dimension your app attaches to each page view.",
    howToImprove: ["Use this to prioritize where to put the next CCHBC field agent — counties with high views-per-menu but few menus signal room to sign more venues."],
  },
  {
    id: "byAgent",
    label: "Agent performance",
    category: "Network",
    definition: "Menu views rolled up by the Coca-Cola representative who onboarded each venue.",
    howToImprove: ["Pair views with scans-per-menu (not just totals) so a rep with fewer, higher-performing venues isn't penalized against one with many low-traffic ones."],
  },
  {
    id: "byResponsibleCchbc",
    label: "Responsabil CCHBC performance",
    category: "Network",
    definition: "Same idea as agent performance, rolled up by the internal CCHBC account owner responsible for each venue relationship.",
    howToImprove: [],
  },

  // ---- Technical concepts (no chart attached — pure glossary) ---------------------
  {
    id: "concept-key-events",
    label: "Key events (conversions)",
    category: "Technical concepts",
    definition:
      "GA4's term for what used to be called 'conversions' — specific events you've marked as business-critical (e.g. a video reaching 100% completion, or a 'call venue' tap). Marking an event as a key event doesn't change the data, just how it's surfaced in reports.",
    howToImprove: ["Mark video_loop_complete and any 'view full menu PDF' style action as key events — it makes them show up in the acquisition/channel reports automatically."],
  },
  {
    id: "concept-attribution",
    label: "Attribution models",
    category: "Technical concepts",
    definition:
      "How GA4 decides which channel 'gets credit' when a user's journey touches multiple sources before converting. GA4 defaults to data-driven attribution, which uses machine learning across your actual conversion paths rather than a fixed rule like 'last click'.",
    howToImprove: [],
  },
  {
    id: "concept-thresholding",
    label: "Data thresholding & sampling",
    category: "Technical concepts",
    definition:
      "When Google Signals is on and a report segment has too few users, GA4 withholds that row entirely ('thresholding') to protect privacy — you'll see gaps, not wrong numbers. Separately, very high-volume properties may see 'sampling' notices on ad-hoc Explore reports (standard reports and the Data API are unsampled up to very high row counts).",
    howToImprove: ["If demographic rows go missing for a venue, it's almost always thresholding on a low-traffic segment, not a tracking bug."],
  },
  {
    id: "concept-google-signals",
    label: "Google Signals",
    category: "Technical concepts",
    definition:
      "An opt-in setting that lets GA4 use data from users signed into their Google account to power cross-device reporting and demographics (age/gender). Off by default; must be enabled per-property in GA4 Admin.",
    howToImprove: [],
  },
  {
    id: "concept-realtime",
    label: "Realtime report",
    category: "Technical concepts",
    definition: "Shows activity from roughly the last 30 minutes, refreshed continuously — useful for confirming tracking works, not for trend analysis.",
    howToImprove: [],
  },
];

export function getMetric(id: string): MetricDoc | undefined {
  return METRICS_CATALOG.find((m) => m.id === id);
}

export function metricsByCategory(): Record<MetricCategory, MetricDoc[]> {
  const out = {} as Record<MetricCategory, MetricDoc[]>;
  for (const m of METRICS_CATALOG) {
    (out[m.category] ??= []).push(m);
  }
  return out;
}

export const METRIC_CATEGORIES: MetricCategory[] = [
  "Overview",
  "Acquisition",
  "Engagement",
  "Audience",
  "Content",
  "Network",
  "Technical concepts",
];
