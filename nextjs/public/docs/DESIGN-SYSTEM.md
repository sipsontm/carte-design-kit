# Carte design system — Next.js edition

The original dashboard defines the visual baseline. `app/globals.css` contains its tokens; `components/charts`, `components/ui` and `components/explainer` contain its presentation source. `styles/components.css` adds the rich kit layouts. The Next.js page components compose these directly.

The fixtures are illustrative, not live GA4 data. Expanded navigation and demo content intentionally differ from the original dashboard. Use the original render rules as the contract; do not claim identical historical data or a zero-difference screenshot without testing.

## Layout contract

| Element | Exact rule |
|---|---|
| Desktop sidebar | 264px, white surface, 1px right border; hidden below 768px |
| Main padding | 32px at 768px+, 20px below |
| Content canvas | 1280px max, centered in remaining content region |
| Header | Separate surface, 1px bottom border, 20px vertical padding, 24px horizontal / 32px at 1024px+ |
| Grid | 16px gaps; chart rows have 16px top margin |
| KPI columns | 1 below 640px; 2 at 640px; 4 at 1280px |
| Chart columns | 1 below 1024px; 5-track grid above, with 3/2 or 2/3 spans |
| Card | 1px border; 12px radius; no shadow |
| KPI card | 20px padding; 10px label-to-number margin; 14px number-to-footer margin |
| Chart card | 24px padding; 8px title-to-subtitle margin; 20px header-to-chart gap |
| Area plot | 240px height; margin top 8 / right 8 / left 0 / bottom 0; Y-axis width 44px |
| Controls | 40px height, 10px radius |
| Ranked row | 12px vertical padding; 12px gap; 24px rank chip; 64×6px bar; 56px value slot |

The max-width is intentional: on very wide displays, there is whitespace on **both** sides of the centered canvas. Never add an extra sidebar offset to that canvas. Use the shell's flex layout.

## Typography

Hanken Grotesk is bundled locally, including the source's Latin and extended subsets. The compiled demo needs no font network requests. Use 400 for text, 500 for navigation/controls, 600 for labels/ranks, 700 for major figures and titles. Default line-height follows the original Tailwind base (1.5); explicit component values override it.

| Role | Size / weight | Additional rule |
|---|---|---|
| Page title / KPI number | 30px / 700 | Line-height 1; -0.75px tracking |
| Brand | 21px / 600 | Tight tracking |
| Chart title | 17px / 700 | Line-height 1; -0.36px tracking |
| Navigation | 15px / 500 | 18px icons |
| KPI label / ranked label | 14.5px / 400 or 600 | Secondary / primary ink |
| Chart subtitle | 13.5px / 400 | Secondary ink |
| Supporting text | 12.5px / 400 | Muted ink |
| Chart axis | 12px / 400 | Muted ink |

Do not introduce an unlayered `p { margin: 0 }` reset after the compiled stylesheet. It overrides the original utility margins and visibly changes card height.

## Tokens

Use `source/dashboard.css` as the complete token catalog. Do not maintain a second approximate palette.

| Purpose | Light | Dark |
|---|---|---|
| Page (`--viz-page`) | #f7f8f9 | #101317 |
| Card (`--card`) | #ffffff | #16191d |
| Primary ink (`--foreground`) | #13161a | #f7f8f9 |
| Secondary ink | #5b626b | #b4bbc3 |
| Muted ink | #8b919a | #8b919a |
| Border | #e7e9ec | #272c33 |
| Track | #eef0f2 | #22262c |
| Muted mark | #d7dbe0 | #363d47 |
| Positive / background | #0f7a4d / #eaf5ef | #4ab883 / #16302a |
| Negative / background | #b23b3b / #f8ecec | #e08585 / #3a2222 |

`.dark` on the document activates the alternate palette. Do not invert the whole page using a CSS filter. Grayscale charts use labels and legends to identify categories. Status uses words in addition to color.

## Component & page coverage

| Page | Components and working behaviors |
|---|---|
| Overview | Original KPI cards, metric popovers, 2 area charts, ranked list, explanatory empty card |
| Analytics | Period selector, KPIs, area, column, donut and horizontal bars; deterministic sample aggregates |
| Projects | Search, status filter, alphabetical sort, 5-row pagination, select-all/current selection, CSV export, create, edit, confirmed delete |
| Board | 3 status lanes, progress/task cards; status moves update the same project dataset |
| Calendar | Month navigation, current month, create/edit/delete dated events |
| Details | Shared record data, summary/profile cards, activity/tasks/files sections; task persistence; file selector example |
| Settings | Validated profile fields, notification switches, saved preferences, theme toggle, confirmed reset |
| Plans & billing | Three pricing cards, plan-change confirmation, example invoice table and downloadable demo receipts |
| Components | KPI variants; primary/secondary/disabled actions; modal, drawer, toast; status, loading, empty, error/retry, profile, progress, info and form patterns |
| Foundations | Token swatches, typography, measured layout rules, documentation downloads |
| Sign in | Required email and minimum-length password validation, explicitly simulated success |

This covers common admin/SaaS page patterns, not every possible page type. Add new domain patterns by combining these primitives.

## Interaction and accessibility rules

- Use buttons for actions and links for navigation. Controls have labels; icon-only buttons have accessible names.
- Dialogs have names, focus containment, Escape dismissal and focus return. Destructive project/reset actions require confirmation.
- Toasts announce status. Error previews use `role=alert`; loading previews announce their state.
- Switches expose checked state. Progress bars expose numeric value. Status is never encoded by color alone.
- Focus outlines are retained. Reduced-motion preference disables skeleton animation.
- On narrow screens, navigation becomes a select. Wide tables/calendars scroll within their panels, not the whole document.
- The inherited muted text is deliberately low-contrast in some places. Visual fidelity is not a blanket WCAG-AA claim; production accessibility requirements may require approved token adjustments.


## Next.js implementation

See `ARCHITECTURE.md` for routes, state boundaries and backend extension points. Keep stylesheet imports together in `app/layout.tsx`. Fonts are local under `public/fonts`, with declarations in `styles/fonts.css`. The copied source uses the `@/` alias defined by `tsconfig.json`.

New pages should reuse the primitives from `components/kit/primitives.jsx` and the original chart components. No iframe, compiled HTML or external service is involved in rendering the Next.js application. `reference/html-preview/` is supplied only for quick visual comparison.

## Verification

Run the production build, typecheck and browser suite described in the README. See `verification/` for actual release results and `reference/` for the earlier HTML-kit screenshots. Keep viewport dimensions, fixture data, browser zoom and font loading consistent when comparing.
