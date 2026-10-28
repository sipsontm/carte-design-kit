"use client";
import React from "react";
import Link from "next/link";
import { CalendarDays, Search, Bell, Moon, Sun, Sparkles } from "lucide-react";

import { Button, Badge } from "@/components/kit/primitives";

import { routes, hrefFor } from "@/lib/demo-data";
import { useWorkspace } from "@/components/workspace/workspace-provider";
export default function WorkspaceShell({ children }) {
  const {
    route,
    dark,
    setDark,
    prefs,
    setQuery,
    recordId,
    setModal,
    setAnswer,
    meta,
    go,
  } = useWorkspace();
  return (
    <>
      <a
        className="kit-skip"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main-content").focus();
        }}
      >
        Skip to content
      </a>
      <div className="kit-shell">
        <aside className="kit-sidebar">
          <Link className="kit-brand" href="/">
            <span className="kit-logo">C</span>Carte
          </Link>
          <nav className="kit-nav" aria-label="Main navigation">
            {routes.map(([id, label, Icon], i) => (
              <React.Fragment key={id}>
                {(i === 0 || i === 6 || i === 8) && (
                  <div className="kit-nav-label">
                    {i === 0
                      ? "Workspace"
                      : i === 6
                        ? "Management"
                        : "Design library"}
                  </div>
                )}
                <Link
                  href={hrefFor(id, recordId)}
                  aria-current={route === id ? "page" : undefined}
                >
                  <Icon />
                  {label}
                </Link>
              </React.Fragment>
            ))}
          </nav>
          <div style={{ height: 32 }} />
          <div className="kit-workspace">
            <strong>{prefs.name}</strong>
            <p>UI kit v2 · Local demo</p>
          </div>
        </aside>
        <div className="kit-content">
          <header className="kit-header">
            <select
              className="kit-input kit-mobile-nav"
              aria-label="Navigate to page"
              value={route}
              onChange={(e) => go(e.target.value)}
            >
              {routes.map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
            <div>
              <h1>{meta[1]}</h1>
              <p>{meta[3]}</p>
            </div>
            <div className="kit-header-actions">
              <form
                className="kit-search"
                onSubmit={(e) => {
                  e.preventDefault();
                  const q = new FormData(e.currentTarget).get("q");
                  go("records");
                  setQuery(String(q));
                }}
              >
                <Search />
                <input
                  className="kit-input"
                  name="q"
                  aria-label="Global project search"
                  placeholder="Search projects, people…"
                />
              </form>
              <Button onClick={() => go("calendar")}>
                <CalendarDays />
                Oct 1, 2026
              </Button>
              <Badge>Demo data</Badge>
              <Button
                icon
                aria-label="Notifications"
                onClick={() => setModal("notifications")}
              >
                <Bell />
              </Button>
              <Button
                icon
                aria-label={
                  dark ? "Switch to light mode" : "Switch to dark mode"
                }
                onClick={() => setDark(!dark)}
              >
                {dark ? <Sun /> : <Moon />}
              </Button>
              <Button
                primary
                onClick={() => {
                  setAnswer("");
                  setModal("ai");
                }}
              >
                <Sparkles />
                Ask AI
              </Button>
            </div>
          </header>
          <main className="kit-main" id="main-content" tabIndex={-1}>
            <div className="kit-canvas">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
