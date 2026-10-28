# Verification · 1 October 2026

**24 automated checks passed** in Chrome 154.0.8037.58. See `report.json` for the exact results, measurements and SHA-256 source hashes.

Verified:

- All 11 page templates render.
- No document-level overflow across all 11 routes at 1920, 1440, 768, 390 and 320px widths.
- Project create/edit/delete, filters, sorting, selection, pagination, CSV export and reload persistence.
- Board status changes, detail navigation and saved task checks.
- Calendar month navigation and event creation/editing/deletion.
- Saved settings, switches, confirmed reset, plan selection and demo receipt download.
- Loading/empty/error/retry states, dialog focus containment and return, Escape dismissal, notification drawer and toast.
- Sign-in validation, local explainer, analytics period changes, documentation downloads.
- Dark-mode persistence, local font loading, and the JavaScript-free server-rendered starter.
- No uncaught browser errors or external HTTP requests from the offline demo.
- Original stylesheet plus 10 original presentation component files match the dashboard byte-for-byte.

## Measured reference geometry at 1920px

| Measurement | Result |
|---|---|
| Canvas | 1280px |
| Sidebar | 264px |
| KPI width / height | 308px / 142.546875px |
| Main chart width / height | 761.59375px / 354.28125px |
| Grid gap | 16px |
| KPI / chart padding | 20px / 24px |
| KPI value / chart subtitle margin | 10px / 8px |
| Card radius | 12px |

## Visual review

The overview, component gallery, mobile overview and dark overview were rendered and visually reviewed. Screenshots for every page are included. The supplied screenshot has different framing/data, so this is **not** a claim of a zero-difference screenshot overlay. Exact source components and measured layout are the reference contract; the demo navigation and content intentionally expand it.

The test runs in a separate browser context; it does not clear your own browser's saved demo edits or touch GA4 credentials. A clean install of the source package outside the original repository has not been tested. The prebuilt offline distribution has been tested directly using `file://`.
