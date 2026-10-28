# Carte · Next.js starter

A source-first Next.js App Router starter containing **all 11 page templates and interactions from the expanded HTML kit**. This is not an iframe or HTML wrapper. Each page has a real route and an editable React component.

## Start

Install Node.js 20.9+ (Node 22 or 24 is also suitable), then run in this folder:

```sh
npm ci
npm run dev
```

Open the URL printed by Next.js. There are no environment variables, credentials or API keys to configure. The fonts are bundled locally. Dependency installation requires internet; the running demo does not need an external service.

For a production build:

```sh
npm run build
npm start
```

Stop the development server before building. This starter has its own `.next` folder and does not modify the original GA4 dashboard. Next honors the `PORT` environment variable; the scripts do not hardcode a port.

## Page inventory

| Route | What works |
|---|---|
| `/` | Original KPI cards, metric explainers, area charts, ranked list, explanatory empty state |
| `/analytics` | Period selector, sample aggregates, area/column/donut/bar charts |
| `/projects` | Search, filter, sort, select, paginate, CSV export, create, edit and confirmed delete |
| `/projects/[id]` | Deep-linkable project detail, activity/tasks/files sections, saved task checks, summary/profile cards |
| `/board` | Three lanes; status moves update the same project dataset |
| `/calendar` | Month navigation and event create/edit/delete |
| `/settings` | Validated workspace details, switches, theme and confirmed reset |
| `/billing` | Plan cards, demo plan changes, invoice table and sample receipt downloads |
| `/components` | KPI variants, forms, profile/progress/info cards, dialogs, drawer, toasts, loading/empty/error/retry states |
| `/foundations` | Typography, colors, layout measurements and downloadable instructions |
| `/sign-in` | Accessible validation and clearly simulated sign-in |

Native not-found, loading and error boundaries are also included.

## Where to work

```text
app/                          Next.js route files and root layout
components/pages/             One editable component per page template
components/workspace/         Shared shell, state provider and dialogs
components/kit/primitives.jsx  Button, Panel, Badge, Progress, Modal
components/charts/            Original dashboard chart/stat components
components/ui/                Original card/popover primitives
components/explainer/         Metric explainer
lib/demo-data.js              Sample datasets, persistence helpers, route map
lib/analytics/types.ts        Original typed chart/report shapes, no GA4 client
app/globals.css               Original Tailwind tokens and theme
styles/components.css         Expanded kit layouts and controls
styles/fonts.css              Self-hosted Hanken Grotesk declarations
public/fonts/                 Local font files
public/docs/                  Downloadable design spec and reuse prompt
docs/                         Architecture, design contract, acceptance guidance
reference/                    HTML-kit reference screenshots and offline preview
tests/smoke.cjs               Browser acceptance tests
verification/                 Current Next.js test evidence
```

The original chart components, tokens and format helpers are TypeScript. The page templates and demo controller use readable JSX/JavaScript. `allowJs` enables this deliberate mixed-source setup; `checkJs` is disabled, so `typecheck` does not provide full type coverage for those demo controllers. Convert a domain page to TSX when adopting it in a fully typed application.

## Hand this package to another LLM

Give it the **whole ZIP**, your feature brief, and `REUSE-PROMPT.md`. Ask it to modify this source directly. Do not ask it to recreate the appearance from screenshots. See `AGENTS.md` and `docs/ARCHITECTURE.md` for the safe extension points.

## Demo boundaries

- Local sample data only; no GA4 or model-provider clients are included.
- Projects, events, task checks, workspace preferences and theme persist in this browser under `carte-nextjs-v1:*`.
- The provider restores browser state after mount to keep server rendering and hydration consistent. Do not put browser globals into server-rendered initializers.
- Sign-in is validation, not authentication. Billing never charges. Messages are not sent. Files are not uploaded. Ask AI is a preset explainer with an explicit demo label.
- No production security, authorization, billing, database or AI integration is implied. Implement those behind server-side boundaries when adapting this starter.
- Storage is for fictional demo records, not sensitive data. Deletion affects local demo data only.

## Checks

```sh
npm run typecheck
npm run build
npm start -- --port 4185
# In a second terminal:
npm test
```

Tests default to `http://127.0.0.1:4185`; set `KIT_URL` to change it. The test runner uses an installed Chrome/Edge on Windows when found. Otherwise install the Playwright browser with `npx playwright install chromium`, or set `BROWSER_EXECUTABLE` to your browser path.

In Windows PowerShell, use `npm.cmd start -- --port 4185` if the `npm.ps1` wrapper drops forwarded flags. Alternatively, set `$env:PORT='4185'` and run `npm start`.

`npm run format` formats the authored page/layout code. Keep the original chart/token baseline stable. Tests use a separate browser context and do not clear your own saved demo data.

See `verification/README.md` for the checks actually run for this release. Keep the lockfile to reproduce dependency versions. `node_modules`, `.next`, personal credentials and Git history are intentionally excluded from the ZIP.
