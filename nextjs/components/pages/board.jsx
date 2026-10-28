"use client";

import { Plus } from "lucide-react";

import { Button, Badge, Progress } from "@/components/kit/primitives";

import { statuses } from "@/lib/demo-data";
import { useWorkspace } from "@/components/workspace/workspace-provider";
export default function PageContent() {
  const { projects, setProjects, filter, setToast, detail, editProject } =
    useWorkspace();
  return (
    <>
      <div className="kit-toolbar">
        <p className="kit-muted">
          Move a card using its status control. Changes also appear in Projects.
        </p>
        <Button primary onClick={() => editProject(null)}>
          <Plus />
          New project
        </Button>
      </div>
      <div className="kit-grid kit-three kit-board">
        {statuses.map((status) => (
          <section className="kit-lane" key={status}>
            <div className="kit-lane-title">
              {status}
              <Badge>
                {projects.filter((p) => p.status === status).length}
              </Badge>
            </div>
            {projects
              .filter((p) => p.status === status)
              .map((p) => (
                <article className="kit-task" key={p.id}>
                  <button
                    className="kit-textbutton"
                    onClick={() => detail(p.id)}
                  >
                    {p.name}
                  </button>
                  <p className="kit-muted kit-caption">
                    {p.owner} · {p.date}
                  </p>
                  <Progress value={p.progress} />
                  <label className="kit-field">
                    Move to
                    <select
                      className="kit-input"
                      value={p.status}
                      onChange={(e) => {
                        setProjects(
                          projects.map((x) =>
                            x.id === p.id
                              ? { ...x, status: e.target.value }
                              : x,
                          ),
                        );
                        setToast("Project moved.");
                      }}
                    >
                      {statuses.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </label>
                </article>
              ))}
          </section>
        ))}
      </div>
    </>
  );
}
