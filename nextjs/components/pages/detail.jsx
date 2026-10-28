"use client";

import { ArrowLeft, Inbox, Mail } from "lucide-react";

import { EmptyState } from "@/components/charts/EmptyState";
import { Button, Panel, Badge, Progress } from "@/components/kit/primitives";

import { useWorkspace } from "@/components/workspace/workspace-provider";
export default function PageContent() {
  const {
    setModal,
    setToast,
    tab,
    setTab,
    tasks,
    setTasks,
    current,
    go,
    editProject,
  } = useWorkspace();

  if (!current)
    return (
      <Panel title="No project selected">
        <EmptyState message="Create a project to try this layout." />
        <Button className="kit-mt" onClick={() => editProject(null)}>
          New project
        </Button>
      </Panel>
    );
  return (
    <>
      <div className="kit-toolbar">
        <Button onClick={() => go("records")}>
          <ArrowLeft />
          All projects
        </Button>
        <Button primary onClick={() => editProject(current)}>
          Edit project
        </Button>
      </div>
      <div className="kit-grid kit-five" style={{ marginTop: 0 }}>
        <Panel
          title={current.name}
          subtitle="Project workspace / Overview"
          className="kit-span3"
        >
          <div
            className="kit-tabs"
            role="tablist"
            aria-label="Project sections"
          >
            {["Activity", "Tasks", "Files"].map((t) => (
              <button
                role="tab"
                id={"project-tab-" + t}
                aria-controls="project-panel"
                tabIndex={tab === t ? 0 : -1}
                aria-selected={tab === t}
                key={t}
                onKeyDown={(e) => {
                  const names = ["Activity", "Tasks", "Files"];
                  let target;
                  if (e.key === "ArrowRight")
                    target = (names.indexOf(t) + 1) % 3;
                  else if (e.key === "ArrowLeft")
                    target = (names.indexOf(t) + 2) % 3;
                  else if (e.key === "Home") target = 0;
                  else if (e.key === "End") target = 2;
                  if (target !== undefined) {
                    e.preventDefault();
                    setTab(names[target]);
                    document
                      .getElementById("project-tab-" + names[target])
                      ?.focus();
                  }
                }}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div
            role="tabpanel"
            id="project-panel"
            aria-labelledby={"project-tab-" + tab}
            tabIndex={0}
          >
            {tab === "Activity" ? (
              <ul className="kit-list">
                {[
                  ["AM", "Project brief approved", "Today, 10:32"],
                  ["SL", "First review completed", "Yesterday, 14:20"],
                  ["JT", "Project created", "October 1, 09:00"],
                ].map(([initial, title, time]) => (
                  <li key={title}>
                    <span className="kit-avatar">{initial}</span>
                    <div>
                      <p>{title}</p>
                      <p className="kit-faint kit-caption">
                        {time} · Sample activity
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : tab === "Tasks" ? (
              <ul className="kit-list">
                {[
                  "Confirm the brief",
                  "Review the first version",
                  "Share the final handoff",
                ].map((task, i) => (
                  <li key={task}>
                    <input
                      type="checkbox"
                      id={"task-" + i}
                      checked={!!tasks[current.id + ":" + i]}
                      onChange={(e) =>
                        setTasks({
                          ...tasks,
                          [current.id + ":" + i]: e.target.checked,
                        })
                      }
                    />
                    <label htmlFor={"task-" + i}>{task}</label>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="kit-empty">
                <Inbox />
                <p>No files attached to this demo project.</p>
                <label className="kit-field">
                  Try the file selector
                  <input
                    type="file"
                    onChange={(e) =>
                      setToast(
                        e.target.files[0]
                          ? `Selected ${e.target.files[0].name}. Demo only; no file uploaded.`
                          : "No file selected.",
                      )
                    }
                  />
                </label>
              </div>
            )}
          </div>
        </Panel>
        <div className="kit-span2 kit-stack">
          <Panel title="Project summary">
            <div className="kit-stack">
              <div className="kit-between">
                <span className="kit-muted">Status</span>
                <Badge>{current.status}</Badge>
              </div>
              <div className="kit-between">
                <span className="kit-muted">Owner</span>
                <span>{current.owner}</span>
              </div>
              <div className="kit-between">
                <span className="kit-muted">Due date</span>
                <span>{current.date}</span>
              </div>
              <hr className="kit-rule" />
              <div className="kit-between">
                <span>Progress</span>
                <strong>{current.progress}%</strong>
              </div>
              <Progress value={current.progress} />
            </div>
          </Panel>
          <Panel title="People" subtitle="Compact profile card">
            <div className="kit-between">
              <div className="kit-actions">
                <span className="kit-avatar">
                  {current.owner
                    .split(" ")
                    .map((x) => x[0])
                    .join("")}
                </span>
                <div>
                  {current.owner}
                  <p className="kit-muted kit-caption">Project owner</p>
                </div>
              </div>
              <Button
                icon
                aria-label="Compose message"
                onClick={() => setModal("message")}
              >
                <Mail />
              </Button>
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}
