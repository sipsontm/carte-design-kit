# Repository guide

This repository contains two independent packages: `html/` and `nextjs/`.

- Read the README and design specification for the implementation you are changing.
- Preserve the shared design system: local Hanken Grotesk, original colors, spacing, card anatomy and chart rendering.
- Next.js contributors must also follow `nextjs/AGENTS.md` and consult the installed framework documentation for APIs they modify.
- Keep the HTML demo directly usable from disk; keep Next.js routes native to the App Router.
- Use illustrative data until a real integration is explicitly requested. Keep credentials in ignored environment files, never in browser bundles.
- Tests and screenshots under `verification/` document specific runs. Rerun relevant checks before making new claims about behavior or visual parity.
- Do not copy the original GA4 application's credentials or unrelated business source into this repository.
