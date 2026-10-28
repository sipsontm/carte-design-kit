"use client";

import { Plus, Download, ArrowLeft, ArrowRight, Inbox } from "lucide-react";

import { Button, Panel, Badge, Progress } from "@/components/kit/primitives";

import { statuses } from "@/lib/demo-data";
import { useWorkspace } from "@/components/workspace/workspace-provider";
export default function PageContent() {
  const {
    projects,
    query,
    setQuery,
    filter,
    setFilter,
    sort,
    setSort,
    selected,
    setSelected,
    setPage,
    setModal,
    detail,
    editProject,
    filtered,
    pages,
    safePage,
    visible,
    exportCSV,
  } = useWorkspace();
  return (
    <Panel
      title="All projects"
      subtitle={`${projects.length} projects in your demo workspace`}
      action={
        <Button primary onClick={() => editProject(null)}>
          <Plus />
          New project
        </Button>
      }
    >
      <div className="kit-toolbar">
        <input
          className="kit-input"
          aria-label="Search projects"
          placeholder="Search projects or owners…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
        />
        <div className="kit-actions">
          <select
            className="kit-input"
            aria-label="Filter status"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
          >
            {["All", ...statuses].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <Button onClick={exportCSV}>
            <Download />
            Export CSV
          </Button>
          {selected.length > 0 && (
            <Button className="danger" onClick={() => setModal("delete")}>
              Delete {selected.length}
            </Button>
          )}
        </div>
      </div>
      <div className="kit-table-wrap">
        <table className="kit-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  aria-label="Select visible projects"
                  checked={
                    visible.length > 0 &&
                    visible.every((p) => selected.includes(p.id))
                  }
                  onChange={(e) =>
                    setSelected(
                      e.target.checked
                        ? [
                            ...new Set([
                              ...selected,
                              ...visible.map((p) => p.id),
                            ]),
                          ]
                        : selected.filter(
                            (id) => !visible.some((p) => p.id === id),
                          ),
                    )
                  }
                />
              </th>
              <th>
                <button
                  className="kit-textbutton"
                  onClick={() => setSort(!sort)}
                >
                  Project {sort ? "↓" : "↑"}
                </button>
              </th>
              <th>Owner</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Due date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((p) => (
              <tr key={p.id}>
                <td>
                  <input
                    type="checkbox"
                    aria-label={"Select " + p.name}
                    checked={selected.includes(p.id)}
                    onChange={(e) =>
                      setSelected(
                        e.target.checked
                          ? [...selected, p.id]
                          : selected.filter((id) => id !== p.id),
                      )
                    }
                  />
                </td>
                <td>
                  <button
                    className="kit-textbutton"
                    onClick={() => detail(p.id)}
                  >
                    {p.name}
                  </button>
                </td>
                <td>{p.owner}</td>
                <td>
                  <Badge tone={p.status === "Review" ? "good" : ""}>
                    {p.status}
                  </Badge>
                </td>
                <td style={{ minWidth: 110 }}>
                  <div className="kit-between kit-caption">
                    <span>{p.progress}%</span>
                  </div>
                  <Progress value={p.progress} />
                </td>
                <td className="kit-muted">{p.date}</td>
                <td>
                  <Button onClick={() => editProject(p)}>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!visible.length && (
        <div className="kit-empty">
          <Inbox />
          <p>No projects match these filters.</p>
          <Button
            onClick={() => {
              setQuery("");
              setFilter("All");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
      <div className="kit-pagination">
        <span className="kit-muted kit-caption">
          {filtered.length} results · Page {safePage} of {pages}
        </span>
        <div className="kit-actions">
          <Button
            disabled={safePage === 1}
            onClick={() => setPage(safePage - 1)}
          >
            <ArrowLeft />
            Previous
          </Button>
          <Button
            disabled={safePage === pages}
            onClick={() => setPage(safePage + 1)}
          >
            Next
            <ArrowRight />
          </Button>
        </div>
      </div>
    </Panel>
  );
}
