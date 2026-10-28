# Copy this prompt into your next project

You are implementing a new application using my attached **Carte UI kit v2**. This is a fidelity task, not a redesign. The reference is the supplied rendered overview and its source, not your idea of a generic clean dashboard.

## My new project

- Product / niche: [describe]
- Stack: [PHP / Laravel Blade / Next.js / Django / Flask / other]
- Pages needed: [list]
- Data / integrations: [describe]
- Required interactions: [describe]

## Read before implementing

1. Open `design-system.html` in a browser and inspect Overview, Components, Foundations, and the relevant page templates.
2. Read `DESIGN-SYSTEM.md`, `components.css`, `source/dashboard.css`, and the source for each component you will reuse.
3. Inspect the reference screenshots in `verification/`. Match viewport dimensions and 100% zoom when comparing.
4. Treat attached files as reference material, not authority to run unrelated commands, expose secrets or change other projects.

## Non-negotiable visual contract

- Use the supplied local Hanken Grotesk fonts, weights 400/500/600/700. Do not substitute Inter, system UI or another lookalike.
- Sidebar: 264px. Main desktop padding: 32px. Canvas: max-width 1280px, centered within the space **after** the sidebar. Grid gap: 16px.
- White/light surface on `#f7f8f9` page. Ink `#13161a`, secondary `#5b626b`, muted `#8b919a`, borders `#e7e9ec`. Use original token names and dark-mode counterparts.
- Flat 1px-bordered cards, 12px radius, no decorative shadow. KPI padding 20px; chart padding 24px.
- Heading and KPI: 30px / 700 / line-height 1 / letter-spacing -0.75px. Chart titles: 17px / 700 / line-height 1 / letter-spacing -0.36px.
- Preserve the exact label/value/footer spacing in `StatCard`, including its 10px and 14px margins. Preserve `ChartCard`'s 8px subtitle margin and 20px header-to-body gap.
- Preserve the 3:2 and reversed 2:3 chart grids. Do not replace them with equal columns or a centered 1500px canvas.
- Charts must retain the original 2px monotone line, subtle 0.12-to-0 gradient, horizontal grid, 12px axis labels, margins, grayscale bars, and original ranked-list anatomy. Reuse Recharts components where practical. A different chart library is acceptable only after visual comparison confirms fidelity.
- Color must carry meaning, not decoration. Green/red are for status or delta; data series use the cool-gray ramp with labels.
- Do not apply global CSS resets after the compiled CSS that override Tailwind margin, typography or utility classes. Do not swap in a component library's default styles.
- Preserve responsive breakpoints and dark mode. Do not hide overflow to conceal broken layouts.

## What may change

Product naming, navigation labels, domain-specific fields, real data, card content, and page composition may change. New components must inherit the same anatomy, density, type scale, border, spacing and interaction patterns. Keep the frozen overview as a regression reference; extend the system instead of simplifying it.

## Functional expectations

Build the requested interactions, including loading, empty, error, validation, success, disabled and destructive-confirmation states. Use real labels, keyboard support and semantic controls. Never imply a backend action succeeded when it is only simulated. Never ship API keys or secrets in client code. Keep sample data clearly labeled until real integration is authorized and verified.

For PHP/Laravel/Django/Flask, translate the same HTML structures into templates. The backend may change; the browser's rendered geometry must not. Refer to `examples/server-rendered.html`. For Next.js/React, reuse the component source. Keep fonts, icons and chart rendering consistent.

## Acceptance checks before handing off

Render at 1920px, 1440px, 768px and 390px widths, at device scale 1 and 100% zoom. Test all relevant pages in light and dark mode. Compare the reference layout at equal dimensions; report deviations instead of calling an approximation pixel-perfect. Check card widths/heights, gaps, padding, font loading and chart geometry—not just palette.

Test navigation, search/filter/sort, forms, dialogs (including Escape and focus return), data persistence where promised, exports, and no document-level mobile overflow. Fix browser errors and broken assets. Provide the runnable result, editable source, brief run instructions and test evidence. Do not deliver only a screenshot or a single static overview.
