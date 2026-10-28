"use client";

import { Moon, Sun } from "lucide-react";

import { Button, Panel } from "@/components/kit/primitives";

import { save } from "@/lib/demo-data";
import { useWorkspace } from "@/components/workspace/workspace-provider";
export default function PageContent() {
  const { dark, setDark, prefs, setPrefs, setModal, setToast } = useWorkspace();
  return (
    <div className="kit-grid kit-five" style={{ marginTop: 0 }}>
      <Panel
        title="Workspace details"
        subtitle="Editable fields with local persistence"
        className="kit-span3"
      >
        <form
          key={prefs.name + prefs.email + prefs.language}
          className="kit-form"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const next = {
              ...prefs,
              name: data.get("name").trim(),
              email: data.get("email"),
              language: data.get("language"),
            };
            setPrefs(next);
            setToast(
              save("prefs", next)
                ? "Workspace settings saved in this browser."
                : "Storage unavailable; changes kept for this session.",
            );
          }}
        >
          <label className="kit-field">
            Workspace name
            <input
              className="kit-input"
              name="name"
              defaultValue={prefs.name}
              required
              pattern=".*\S.*"
            />
          </label>
          <label className="kit-field">
            Contact email
            <input
              className="kit-input"
              name="email"
              type="email"
              defaultValue={prefs.email}
              required
            />
          </label>
          <label className="kit-field">
            Preferred language
            <select
              className="kit-input"
              name="language"
              defaultValue={prefs.language}
            >
              <option>English</option>
              <option>Romanian</option>
              <option>French</option>
            </select>
            <small>
              Saved as a preference. The demo UI remains in English.
            </small>
          </label>
          <div>
            <Button primary type="submit">
              Save changes
            </Button>
          </div>
        </form>
      </Panel>
      <div className="kit-span2 kit-stack">
        <Panel
          title="Notifications"
          subtitle="Switch controls with clear labels"
        >
          {[
            ["digest", "Weekly digest"],
            ["alerts", "Project updates"],
          ].map(([key, label]) => (
            <div className="kit-switch" key={key}>
              <span id={"switch-" + key}>{label}</span>
              <button
                role="switch"
                aria-checked={prefs[key]}
                aria-labelledby={"switch-" + key}
                onClick={() => {
                  const next = { ...prefs, [key]: !prefs[key] };
                  setPrefs(next);
                  save("prefs", next);
                }}
              >
                <span />
              </button>
            </div>
          ))}
        </Panel>
        <Panel title="Appearance">
          <div className="kit-between">
            <span>Dark mode</span>
            <Button onClick={() => setDark(!dark)}>
              {dark ? <Sun /> : <Moon />}
              {dark ? "Light" : "Dark"}
            </Button>
          </div>
        </Panel>
        <Panel
          title="Reset demo"
          subtitle="Restore sample projects, events and preferences."
        >
          <Button className="danger" onClick={() => setModal("reset")}>
            Reset demo data
          </Button>
        </Panel>
      </div>
    </div>
  );
}
