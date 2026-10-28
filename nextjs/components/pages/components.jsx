"use client";

import {
  Sparkles,
  Plus,
  Check,
  Inbox,
  TriangleAlert,
  Mail,
  Info,
} from "lucide-react";
import { StatCard } from "@/components/charts/StatCard";

import { Button, Panel, Badge, Progress } from "@/components/kit/primitives";

import { rows } from "@/lib/demo-data";
import { useWorkspace } from "@/components/workspace/workspace-provider";
export default function PageContent() {
  const { setModal, setToast, state, setState, setAnswer, editProject } =
    useWorkspace();
  return (
    <div className="kit-stack">
      <div className="kit-grid kit-stats">
        {[
          {
            id: "a",
            label: "Positive delta",
            value: 1284,
            format: "number",
            deltaPct: 8.2,
          },
          {
            id: "b",
            label: "Negative delta",
            value: 24,
            format: "number",
            deltaPct: -3.1,
          },
          { id: "c", label: "Percentage", value: 68.4, format: "percent" },
          {
            id: "d",
            label: "Lower is better",
            value: 42,
            format: "number",
            deltaPct: -6.1,
          },
        ].map((kpi, i) => (
          <StatCard key={kpi.id} kpi={kpi} invertDelta={i === 3} />
        ))}
      </div>
      <div className="kit-grid kit-two">
        <Panel
          title="Actions & overlays"
          subtitle="Every control below has a working example."
        >
          <div className="kit-actions">
            <Button primary onClick={() => editProject(null)}>
              <Plus />
              Create
            </Button>
            <Button onClick={() => setModal("notifications")}>Drawer</Button>
            <Button onClick={() => setToast("Your changes have been saved.")}>
              Toast
            </Button>
            <Button disabled>Disabled</Button>
          </div>
          <hr className="kit-rule" />
          <div className="kit-actions">
            <Badge tone="good">Completed</Badge>
            <Badge>Pending</Badge>
            <Badge tone="bad">Failed</Badge>
          </div>
        </Panel>
        <Panel
          title="Loading, empty & error"
          subtitle="Use the selector to preview each state."
          action={
            <select
              className="kit-input"
              style={{ width: 110 }}
              aria-label="Component state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              {["Ready", "Loading", "Empty", "Error"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          }
        >
          {state === "Ready" ? (
            <div className="kit-empty">
              <Check />
              <p>All changes are saved.</p>
            </div>
          ) : state === "Loading" ? (
            <div role="status" aria-label="Loading preview">
              {[100, 80, 60].map((w) => (
                <div
                  key={w}
                  className="kit-skeleton"
                  style={{ width: w + "%" }}
                />
              ))}
              <span className="kit-caption kit-muted">Loading preview…</span>
            </div>
          ) : state === "Empty" ? (
            <div className="kit-empty">
              <Inbox />
              <p>No projects yet.</p>
              <Button onClick={() => editProject(null)}>
                Create your first project
              </Button>
            </div>
          ) : (
            <div className="kit-empty" role="alert">
              <TriangleAlert />
              <p>We couldn’t load this example.</p>
              <Button
                onClick={() => {
                  setState("Ready");
                  setToast("Demo retry succeeded.");
                }}
              >
                Try again
              </Button>
            </div>
          )}
        </Panel>
      </div>
      <div className="kit-grid kit-three">
        <Panel title="Profile card" subtitle="Identity + one clear action">
          <div className="kit-actions">
            <span className="kit-avatar">AM</span>
            <div>
              Alex Morgan
              <p className="kit-muted kit-caption">Product designer</p>
            </div>
          </div>
          <Button className="kit-mt" onClick={() => setModal("message")}>
            <Mail />
            Compose message
          </Button>
        </Panel>
        <Panel title="Progress card" subtitle="Magnitude without decoration">
          <p className="kit-price">
            82<small>% complete</small>
          </p>
          <Progress value={82} />
          <p className="kit-muted kit-caption kit-mt">
            18 of 22 tasks completed
          </p>
        </Panel>
        <Panel
          title="Informational card"
          subtitle="Helpful context where it’s needed"
        >
          <Info size={20} />
          <p className="kit-muted kit-mt">
            Autoplay is not proof that someone watched an ad. Keep metric
            explanations close to the number.
          </p>
          <Button
            className="kit-mt"
            onClick={() => {
              setAnswer("");
              setModal("ai");
            }}
          >
            <Sparkles />
            Open explainer
          </Button>
        </Panel>
      </div>
      <Panel
        title="Form controls"
        subtitle="Text, select, date, textarea and native validation"
      >
        <form
          className="kit-form"
          onSubmit={(e) => {
            e.preventDefault();
            setToast("Example form validated. No message sent.");
          }}
        >
          <div className="kit-grid kit-three">
            <label className="kit-field">
              Name
              <input
                className="kit-input"
                required
                placeholder="Project name"
              />
            </label>
            <label className="kit-field">
              Category
              <select className="kit-input">
                <option>Operations</option>
                <option>Marketing</option>
                <option>Product</option>
              </select>
            </label>
            <label className="kit-field">
              Due date
              <input className="kit-input" type="date" required />
            </label>
          </div>
          <label className="kit-field">
            Description
            <textarea
              className="kit-input"
              rows={3}
              required
              placeholder="What should this project achieve?"
            />
          </label>
          <div>
            <Button primary type="submit">
              Validate form
            </Button>
          </div>
        </form>
      </Panel>
    </div>
  );
}
