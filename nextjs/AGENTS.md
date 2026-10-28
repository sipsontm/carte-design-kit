# Carte Next.js source contract

This is a runnable source starter, not an invitation to reinterpret the reference design.

1. Read `README.md`, `docs/DESIGN-SYSTEM.md` and `docs/ARCHITECTURE.md` before changing the UI.
2. Inspect the installed Next.js guides in `node_modules/next/dist/docs/` for the APIs you touch. Do not assume an older Next.js convention applies.
3. Preserve the local Hanken Grotesk fonts, original tokens, 264px sidebar, 1280px canvas, 16px grid gaps, 20px KPI padding, 24px chart padding and 12px card radius unless the human explicitly requests a design change.
4. Reuse components. Do not swap in a UI library's default typography, spacing, radii or chart styles. Do not place a global margin reset after the Tailwind stylesheet.
5. Routes live in `app`; domain UI lives in `components/pages`; shared demo state lives in `WorkspaceProvider`. Use Next Link/router navigation, not URL hashes.
6. Never read `window`, `location`, `document` or `localStorage` during server render. Restore local state in an effect and gate persistence until restoration is complete.
7. Keep sample data visibly labeled. Never imply that demo sign-in, billing, messages, uploads or the local AI explainer are real integrations.
8. Do not add credentials to client code. No secrets are needed to run this starter.
9. Before handoff, run a production build, typecheck and relevant browser checks. Test direct URLs, refresh, back navigation, mobile overflow, keyboard focus and light/dark appearance. Stop dev before building in the same checkout.
10. Match reference viewport and data when comparing screenshots. Report any visual differences instead of claiming pixel-perfect parity without measurement.
