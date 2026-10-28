# Carte UI kit · v2

Start here: **open `design-system.html` in your browser.** Keep this folder intact. No installation, API key, account, internet connection or dev server is needed for the compiled demo.

This version replaces the previous simplified mockup. The overview uses the actual dashboard's presentation components, local Hanken Grotesk font files, original color tokens, 1280px canvas, 16px grid spacing, and 3:2 / 2:3 chart layouts.

## What you get

- 11 interactive page templates: overview, analytics, projects table, board, calendar, detail, settings, billing, component gallery, foundations, and sign-in.
- Working create/edit/delete, sorting, filtering, selection, pagination, CSV exports, calendar events, task checkboxes, settings, theme switching, dialogs, drawers, toasts, explainers, and validation.
- Original stat, area, column, donut, ranked-list, bar-list, card and popover source components.
- Dark mode and responsive layouts.
- `REUSE-PROMPT.md`: copy-and-paste instructions for another LLM.
- `DESIGN-SYSTEM.md`: measurements, component rules, states, portability, and limitations.
- `examples/server-rendered.html`: a JavaScript-free markup starting point for PHP / Blade / Django / Jinja, using the same CSS and fonts.
- `verification/`: generated screenshots and test results.

## Important boundaries

This is a functional **front-end demo**, not a production SaaS backend. Sample analytics are fixed illustrative values. Project records, events, preferences and selected plan persist locally when browser storage is available. Nothing connects to GA4 or touches the existing dashboard's credentials.

Sign-in validates a fictional form but does not authenticate. Billing changes a sample plan but does not charge. Message composition does not send email. File selection does not upload. Ask AI is a clearly labeled local explainer with preset answers, not a model integration.

Local file storage behavior varies by browser. For consistent persistence, run `node serve.cjs` and open `http://127.0.0.1:4174`. Set `PORT` to choose another port. Do not enter real passwords or secrets into this demo.

## Reuse in another project

1. Copy the whole kit folder, not only the HTML file.
2. Give your LLM `REUSE-PROMPT.md`, `DESIGN-SYSTEM.md`, `src/`, `source/`, `components.css`, `assets/`, and the reference screenshots.
3. Specify your domain, target stack, pages and real data requirements.
4. Keep the visual contract; replace domain labels, data bindings and backend actions.
5. Compare screenshots at the same viewport before accepting the port.

For a React project, reuse the source components. For server-rendered PHP/Laravel/Python, use the HTML example and CSS directly, or mount the compiled React app inside your server's page. Backend language does not determine UI appearance.

## Editing and rebuilding

The compiled assets already work. Only source edits need a build.

Inside the original dashboard checkout:

```sh
node design-kit/build.cjs
```

In a separate copy of the kit, with Node.js and npm installed:

```sh
npm install
npm run build
npm start
```

The normal build uses the frozen source snapshot. `node design-kit/build.cjs --sync-dashboard` explicitly refreshes the presentation snapshot from the original parent dashboard; use it only when you intend to update the design baseline. It never copies `.env` files, service credentials or analytics responses.

Run `npm test` after installing Playwright and its browser, or set `BROWSER_EXECUTABLE` to an installed Chrome/Edge executable. On this workstation the test also detects the bundled Playwright runtime.

The build was verified inside the original checkout. A clean external npm install is not required to use the kit and has not been independently verified. There is no standalone lockfile yet; preserve the compiled assets for exact reproducibility.
