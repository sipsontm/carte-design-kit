# Release verification — 8 October 2026

## Passed

- Fresh dependency installation in the standalone starter folder; committed-to-package npm lockfile generated.
- `npm run build`: successful production build with 11 page templates, including dynamic `/projects/[id]` and the framework not-found page.
- `npm run typecheck`: passed. TypeScript components are checked; the demo's JSX controllers use `checkJs: false` as documented.
- `npm test`: **25 browser acceptance checks passed**, with no uncaught browser/console errors or external service requests. See `report.json`.
- All 11 page templates checked for document-level overflow at 1920, 1440, 768, 390 and 320px widths.
- Original token stylesheet and 10 card/chart/explainer source files match the dashboard byte-for-byte.

## Visual comparison

`node tests/compare-reference.cjs` rendered the bundled HTML reference and native Next.js overview with the same data, light theme, Chrome browser, 1920×1080 viewport and device scale 1.

The **1280×1167 overview content canvas had zero changed pixels**. See `visual-comparison.json`, `visual-html.png` and `visual-nextjs.png`.

This result is scoped to that overview canvas and configuration. It does not claim pixel parity for every page, theme, browser, or the user's differently cropped historical GA4 screenshot. Other page screenshots and responsive checks are included separately.

## Workflow coverage

Project CRUD, filters/sorting/selection/pagination, CSV, board moves, detail navigation/tasks, calendar CRUD, saved settings, demo plan changes and receipts, dialog focus/Escape, loading/empty/error/retry, notifications/toasts, local AI explainer, analytics selector, sign-in validation, docs downloads, demo reset, dark persistence, native direct routes, dynamic project reload, browser back, keyboard tabs, 404 handling and global search.

Tests ran in a separate temporary browser context. They did not touch GA4 data or the user's saved browser session. The production application files outside this starter were not changed.

No backend security audit, real authentication/payment integration, physical-device test or production deployment is implied. The ZIP excludes dependency installations, build output, credentials and Git history.
