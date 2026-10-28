# Architecture and extension guide

## Native Next.js structure

`app/layout.tsx` is a Server Component. It imports global styles in a stable order and composes the client-side workspace provider, shell, dialogs and routed page children. Each route imports only its page component; there is no embedded HTML file or iframe.

`WorkspaceProvider` stays mounted across client-side navigation. The shell uses `next/link`; action-driven navigation uses `useRouter`. `usePathname` selects metadata and determines the current project from `/projects/[id]`. Loading and error boundaries use the framework's conventions.

## Shared state and persistence

Projects are shared between the table, board and details. Calendar events, task checks, preferences, plan and theme have independent browser-storage keys. The initial server and client render use deterministic sample values. An effect restores browser storage after mount; persistence effects are guarded by `hydrated` so defaults cannot overwrite saved values before restoration.

`lib/demo-data.js` holds the fixtures, routes and storage helpers. This is the boundary to replace with a real data layer. Storage failures fall back to in-memory behavior; localStorage is not a secure database. Do not reuse it for secrets or production authorization.

## Component ownership

| Layer | Purpose | Typical change |
|---|---|---|
| `components/ui` | Original card/popover primitives | Rare, approved design-system edits |
| `components/charts` | Original stat, area, column, donut and ranked/bar-list rendering | Supply new data; preserve appearance |
| `components/kit/primitives.jsx` | Button, panel, badge, progress, dialog | Shared variants and accessibility |
| `components/pages` | Domain page compositions | Rename fields, swap fixtures, compose new cards |
| `components/workspace` | Navigation, state, shared overlays | Connect backend flows or change product shell |
| `app` | Framework routing and server boundaries | Add a real URL or server data loader |

The demo intentionally uses one small context for clarity. A larger production application may separate theme, projects and overlay state or adopt a query cache. That refactor should not change the DOM/CSS rendering contract.

## Add a page

1. Add a route file such as `app/inventory/page.tsx`.
2. Add a page component in `components/pages`, reusing the existing primitives and chart types.
3. Add a navigation entry and path in `lib/demo-data.js` if the page belongs in the sidebar.
4. Decide whether its data belongs in server props, a server-only data module or the demo provider. Do not move secrets into the provider.
5. Add route/workflow checks and capture desktop/mobile screenshots.

## Add a backend

Define domain models and authorization first. Replace project/event setters with validated API mutations or server actions and implement pending/error/optimistic states intentionally. Keep payment and model-provider operations server-side. Treat sample activity and invoice fixtures as placeholders, not evidence of real events. The demo date labels are fixed to preserve reproducible screenshots.

## Fidelity

The original presentation components and `app/globals.css` are copied from the dashboard. `styles/components.css` adds the expanded kit patterns. Local font files are served from `public/fonts`; no Google Fonts request is needed at runtime or build time.

Do not edit compiled HTML-kit assets to change this application. Change the native source. `reference/html-preview/` is a separate offline visual reference only. Existing screenshots are design references, not proof that an untested edit still matches them.
