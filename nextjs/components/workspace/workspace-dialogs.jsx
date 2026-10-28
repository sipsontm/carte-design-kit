"use client";

import { Check, Send, Info } from "lucide-react";

import { Button, Badge, Modal } from "@/components/kit/primitives";

import { seed, statuses, seedEvents, rows, save } from "@/lib/demo-data";
import { useWorkspace } from "@/components/workspace/workspace-provider";
export default function WorkspaceDialogs() {
  const {
    projects,
    setProjects,
    events,
    setEvents,
    setPrefs,
    setPlan,
    setQuery,
    filter,
    setFilter,
    selected,
    setSelected,
    setPage,
    modal,
    setModal,
    toast,
    setToast,
    setState,
    unread,
    setUnread,
    answer,
    setAnswer,
    setTasks,
  } = useWorkspace();
  function dialog() {
    const close = () => setModal(null);
    if (modal?.type === "project") {
      const p = modal.project;
      return (
        <Modal title={p ? "Edit project" : "New project"} close={close}>
          <form
            className="kit-form"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              const next = {
                id: p?.id ?? Date.now(),
                name: f.get("name").trim(),
                owner: f.get("owner").trim(),
                status: f.get("status"),
                date: f.get("date"),
                progress: Number(f.get("progress")),
              };
              setProjects(
                p
                  ? projects.map((x) => (x.id === p.id ? next : x))
                  : [...projects, next],
              );
              setState("Ready");
              close();
              setToast(p ? "Project updated." : "Project created.");
            }}
          >
            <label className="kit-field">
              Project name
              <input
                className="kit-input"
                name="name"
                defaultValue={p?.name}
                required
                pattern=".*\S.*"
                maxLength={100}
              />
            </label>
            <label className="kit-field">
              Owner
              <input
                className="kit-input"
                name="owner"
                defaultValue={p?.owner}
                required
                pattern=".*\S.*"
              />
            </label>
            <div className="kit-grid kit-two">
              <label className="kit-field">
                Status
                <select
                  className="kit-input"
                  name="status"
                  defaultValue={p?.status || "Planned"}
                >
                  {statuses.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label className="kit-field">
                Progress (%)
                <input
                  className="kit-input"
                  type="number"
                  name="progress"
                  min={0}
                  max={100}
                  defaultValue={p?.progress || 0}
                  required
                />
              </label>
            </div>
            <label className="kit-field">
              Due date
              <input
                className="kit-input"
                name="date"
                type="date"
                defaultValue={p?.date || "2026-10-15"}
                required
              />
            </label>
            <div className="kit-actions">
              <Button primary type="submit">
                {p ? "Save project" : "Create project"}
              </Button>
              <Button onClick={close}>Cancel</Button>
            </div>
          </form>
        </Modal>
      );
    }
    if (modal?.type === "event")
      return (
        <Modal title={modal.event ? "Edit event" : "New event"} close={close}>
          <form
            className="kit-form"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget),
                event = {
                  id: modal.event?.id ?? Date.now(),
                  title: f.get("title").trim(),
                  date: f.get("date"),
                };
              setEvents(
                modal.event
                  ? events.map((x) => (x.id === event.id ? event : x))
                  : [...events, event],
              );
              close();
              setToast("Calendar event saved.");
            }}
          >
            <label className="kit-field">
              Title
              <input
                className="kit-input"
                name="title"
                defaultValue={modal.event?.title}
                required
                pattern=".*\S.*"
              />
            </label>
            <label className="kit-field">
              Date
              <input
                className="kit-input"
                name="date"
                type="date"
                defaultValue={modal.date}
                required
              />
            </label>
            <div className="kit-actions">
              <Button primary type="submit">
                Save event
              </Button>
              {modal.event && (
                <Button
                  className="danger"
                  onClick={() => {
                    setEvents(events.filter((e) => e.id !== modal.event.id));
                    close();
                    setToast("Demo event deleted.");
                  }}
                >
                  Delete event
                </Button>
              )}
            </div>
          </form>
        </Modal>
      );
    if (modal === "delete" || modal === "reset" || modal?.type === "plan") {
      const reset = modal === "reset",
        del = modal === "delete";
      return (
        <Modal
          title={
            reset
              ? "Reset demo data?"
              : del
                ? `Delete ${selected.length} projects?`
                : `Switch to ${modal.name}?`
          }
          close={close}
        >
          <p className="kit-muted">
            {reset
              ? "This replaces this kit’s local sample data and preferences. It does not affect your GA dashboard."
              : del
                ? "The selected demo records will be removed from this browser. You can restore sample data in Settings."
                : "This changes the example plan only. No payment method is collected and no charge is made."}
          </p>
          <div className="kit-actions kit-mt">
            <Button
              primary
              onClick={() => {
                if (reset) {
                  setProjects(seed);
                  setEvents(seedEvents);
                  setQuery("");
                  setFilter("All");
                  setPage(1);
                  setTasks({});
                  setPrefs({
                    name: "Carte workspace",
                    email: "hello@example.com",
                    language: "English",
                    digest: true,
                    alerts: true,
                  });
                  save("prefs", {
                    name: "Carte workspace",
                    email: "hello@example.com",
                    language: "English",
                    digest: true,
                    alerts: true,
                  });
                  setPlan("Team");
                  save("plan", "Team");
                  setSelected([]);
                } else if (del) {
                  setProjects(projects.filter((p) => !selected.includes(p.id)));
                  setSelected([]);
                } else {
                  setPlan(modal.name);
                  save("plan", modal.name);
                }
                close();
                setToast(
                  reset
                    ? "Demo reset."
                    : del
                      ? "Selected demo projects deleted."
                      : "Demo plan changed.",
                );
              }}
            >
              Confirm
            </Button>
            <Button onClick={close}>Cancel</Button>
          </div>
        </Modal>
      );
    }
    if (modal === "notifications")
      return (
        <Modal title="Notifications" close={close} drawer>
          <Badge>{unread ? "2 unread" : "All caught up"}</Badge>
          <ul className="kit-list">
            <li>
              <Check size={18} />
              <div>
                Kit ready to explore
                <p className="kit-muted kit-caption">
                  Try the reference and component pages.
                </p>
              </div>
            </li>
            <li>
              <Info size={18} />
              <div>
                Your data stays local
                <p className="kit-muted kit-caption">
                  This demo has no backend connection.
                </p>
              </div>
            </li>
          </ul>
          <Button
            className="kit-mt"
            disabled={!unread}
            onClick={() => setUnread(false)}
          >
            Mark all as read
          </Button>
        </Modal>
      );
    if (modal === "message")
      return (
        <Modal title="Compose a message" close={close}>
          <form
            className="kit-form"
            onSubmit={(e) => {
              e.preventDefault();
              close();
              setToast("Demo message validated. No email sent.");
            }}
          >
            <label className="kit-field">
              To
              <input
                className="kit-input"
                type="email"
                required
                defaultValue="alex@example.com"
              />
            </label>
            <label className="kit-field">
              Message
              <textarea className="kit-input" rows={5} required />
            </label>
            <p className="kit-muted kit-caption">
              Interaction example only. This does not send messages.
            </p>
            <Button primary type="submit">
              <Send />
              Preview send
            </Button>
          </form>
        </Modal>
      );
    if (modal === "ai")
      return (
        <Modal title="Ask AI · interface demo" close={close} drawer>
          <p className="kit-muted">
            This kit contains a local explainer, not an AI connection. It never
            asks for API keys. Your actual dashboard’s AI integration is
            unchanged.
          </p>
          <div className="kit-stack kit-mt">
            {[
              "What makes this layout exact?",
              "How do I reuse it in Laravel?",
              "What do the chart colors mean?",
            ].map((q, i) => (
              <Button
                key={q}
                onClick={() =>
                  setAnswer(
                    [
                      "The reference uses the original StatCard, ChartCard, TrendArea and RankedList components, original CSS tokens, and local Hanken Grotesk fonts. The content canvas is 1280px, with 16px gaps and a 3:2 chart split.",
                      "Use the rendered HTML structure and the supplied CSS in Blade templates. Keep the measurements and DOM hierarchy intact. Replace data bindings and event handlers with your own implementation; do not replace the UI with a different component library’s defaults.",
                      "The gray ramp represents magnitude or emphasis. The darkest mark highlights the primary value. Labels carry category identity. Green and red are reserved for positive and negative states, not decorative series colors.",
                    ][i],
                  )
                }
              >
                {q}
              </Button>
            ))}
          </div>
          {answer && (
            <div className="kit-panel kit-mt" role="status">
              {answer}
            </div>
          )}
        </Modal>
      );
    return null;
  }
  return (
    <>
      {modal && dialog()}
      {toast && (
        <div className="kit-toast" role="status">
          {toast}
        </div>
      )}
    </>
  );
}
