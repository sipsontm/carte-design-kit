# Reuse prompt — Next.js edition

Build my new application directly on the attached Carte Next.js starter.

My product: [describe the niche and users].
Required pages and workflows: [list].
Real integrations/data: [describe].

This is a source-reuse task, not a design-from-scratch task. Read `AGENTS.md`, `README.md`, `docs/DESIGN-SYSTEM.md` and `docs/ARCHITECTURE.md`. Run the starter and inspect the relevant pages before editing.

Preserve the supplied Hanken Grotesk font, tokens, layout proportions, card padding, spacing, radii, navigation density, axis styles and chart configuration. Keep the overview as the reference baseline. Reuse `components/charts`, `components/kit`, and the page templates; do not approximate them with another library's defaults.

You may change the product names, navigation labels, domain fields, data bindings and compositions needed by my product. Keep the visual system. Add new patterns by extending the existing primitives. There are 11 working page templates, not just an overview to recreate.

Use real Next.js routes and the shared layout. Keep browser interaction code in Client Components. Use Server Components, server actions or route handlers for real data and secrets as appropriate to the installed Next.js version. Read its local docs. Never ship service-account credentials or model keys to the browser.

The starter's local persistence and simulated sign-in/billing/AI are demos. Replace them deliberately with authorized real integrations, including validation, loading, empty, error and permission states. Do not make a fake action look real.

Before delivery, run a production build and typecheck. Test the affected workflows, direct/deep URLs, reload persistence, browser back/forward, downloads, dialogs, keyboard navigation, dark mode, and mobile overflow. Compare the UI at matching viewport sizes to `reference/` and the running baseline. The design must match in geometry, typography and chart rendering—not just colors. Report any remaining differences and integration limitations.

Deliver the runnable project, editable source, concise start instructions and verification evidence.
