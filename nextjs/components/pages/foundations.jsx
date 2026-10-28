"use client";

import { Download } from "lucide-react";

import { Panel } from "@/components/kit/primitives";
import { download } from "@/lib/download";

export default function PageContent() {
  return (
    <div className="kit-stack">
      <Panel
        title="Exact foundations"
        subtitle="These are extracted from the application, not a reinterpretation."
      >
        <div className="kit-grid kit-three">
          {[
            ["Canvas", "1280px maximum"],
            ["Sidebar", "264px"],
            ["Page padding", "32px desktop / 20px mobile"],
            ["Grid gap", "16px"],
            ["Card radius", "12px"],
            ["Card padding", "20px KPI / 24px chart"],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="kit-muted kit-caption">{label}</p>
              <p style={{ fontSize: 21, fontWeight: 600, marginTop: 8 }}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </Panel>
      <Panel
        title="Color system"
        subtitle="Cool grays for structure and charts. Green/red only for meaning."
      >
        <div className="kit-grid kit-stats">
          {[
            ["Page", "--viz-page"],
            ["Surface", "--card"],
            ["Primary ink", "--foreground"],
            ["Secondary ink", "--viz-ink-secondary"],
            ["Border", "--border"],
            ["Muted mark", "--viz-mark-muted"],
            ["Success", "--viz-good"],
            ["Critical", "--viz-critical"],
          ].map(([label, token]) => (
            <div className="kit-swatch" key={token}>
              <div
                className="kit-swatch-color"
                style={{ background: `var(${token})` }}
              />
              <p>
                {label}
                <code>{token}</code>
              </p>
            </div>
          ))}
        </div>
      </Panel>
      <div className="kit-grid kit-two">
        <Panel
          title="Hanken Grotesk"
          subtitle="Local fonts. Weights 400, 500, 600, 700."
        >
          <p
            style={{
              fontSize: 30,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-.75px",
            }}
          >
            A clear picture of your work.
          </p>
          <hr className="kit-rule" />
          <p style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-.36px" }}>
            Card title · 17px / 700
          </p>
          <p className="kit-muted kit-mt" style={{ fontSize: 13.5 }}>
            Chart subtitle · 13.5px / 400
          </p>
          <p className="kit-faint kit-mt" style={{ fontSize: 12.5 }}>
            Supporting copy · 12.5px / 400
          </p>
        </Panel>
        <Panel
          title="Take it into another project"
          subtitle="Keep the visual contract. Replace the domain and data."
        >
          <div className="kit-stack">
            <a className="kit-btn" href="/docs/REUSE-PROMPT.md" download>
              <Download size={16} />
              Reusable LLM prompt
            </a>
            <a className="kit-btn" href="/docs/DESIGN-SYSTEM.md" download>
              <Download size={16} />
              Implementation specification
            </a>
            <p className="kit-muted kit-caption">
              Native Next.js routes and reusable React components. Use this
              source directly; keep the original tokens, spacing and chart
              configuration when adapting it to a new product.
            </p>
          </div>
        </Panel>
      </div>
    </div>
  );
}
