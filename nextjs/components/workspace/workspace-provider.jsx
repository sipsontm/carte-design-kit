"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FileText } from "lucide-react";

import { download } from "@/lib/download";
import {
  routes,
  seed,
  seedEvents,
  read,
  save,
  hrefFor,
  routeFor,
} from "@/lib/demo-data";
const WorkspaceContext = createContext(null);
export function useWorkspace() {
  const value = useContext(WorkspaceContext);
  if (!value) throw new Error("Wrap this page in WorkspaceProvider");
  return value;
}
export function WorkspaceProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const route = routeFor(pathname);
  const [hydrated, setHydrated] = useState(false);
  const [dark, setDark] = useState(false);
  const [projects, setProjects] = useState(seed);
  const [events, setEvents] = useState(seedEvents);
  const [prefs, setPrefs] = useState({
    name: "Carte workspace",
    email: "hello@example.com",
    language: "English",
    digest: true,
    alerts: true,
  });
  const [plan, setPlan] = useState("Team");
  const [query, setQuery] = useState(""),
    [filter, setFilter] = useState("All"),
    [sort, setSort] = useState(false),
    [selected, setSelected] = useState([]),
    [page, setPage] = useState(1);
  const [recordId, setRecordId] = useState(1),
    [modal, setModal] = useState(null),
    [toast, setToast] = useState(""),
    [tab, setTab] = useState("Activity"),
    [period, setPeriod] = useState("30"),
    [month, setMonth] = useState(9),
    [year, setYear] = useState(2026),
    [state, setState] = useState("Ready"),
    [unread, setUnread] = useState(true),
    [answer, setAnswer] = useState("");
  const [tasks, setTasks] = useState({});
  const meta = routes.find((r) => r[0] === route) || [
    "404",
    "Page not found",
    FileText,
    "Choose a page from the navigation.",
  ];
  const current = projects.find(
    (p) =>
      p.id === (route === "detail" ? Number(pathname.split("/")[2]) : recordId),
  );

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle("dark", dark);
    save("dark", dark);
  }, [dark, hydrated]);
  useEffect(() => {
    if (hydrated) save("projects", projects);
  }, [projects, hydrated]);
  useEffect(() => {
    if (hydrated) save("events", events);
  }, [events, hydrated]);
  useEffect(() => {
    if (hydrated) save("tasks", tasks);
  }, [tasks, hydrated]);
  useEffect(() => {
    if (hydrated) save("recordId", recordId);
  }, [recordId, hydrated]);
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  const go = (id) => {
    setQuery("");
    setPage(1);
    router.push(hrefFor(id, recordId));
  };
  const detail = (id) => {
    setRecordId(id);
    setTab("Activity");
    router.push("/projects/" + id);
  };
  const editProject = (project) => setModal({ type: "project", project });
  const filtered = projects
    .filter(
      (p) =>
        (filter === "All" || p.status === filter) &&
        (p.name + " " + p.owner).toLowerCase().includes(query.toLowerCase()),
    )
    .sort((a, b) =>
      sort ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name),
    );
  const pages = Math.max(1, Math.ceil(filtered.length / 5)),
    safePage = Math.min(page, pages),
    visible = filtered.slice((safePage - 1) * 5, safePage * 5);
  const exportCSV = () => {
    const cell = (x) => '"' + String(x).replaceAll('"', '""') + '"';
    download(
      "carte-projects-demo.csv",
      [
        ["Name", "Owner", "Status", "Progress", "Due date"],
        ...filtered.map((p) => [p.name, p.owner, p.status, p.progress, p.date]),
      ]
        .map((r) => r.map(cell).join(","))
        .join("\r\n"),
      "text/csv;charset=utf-8",
    );
    setToast("Filtered projects exported as CSV.");
  };
  useEffect(() => {
    setDark(read("dark", false));
    setProjects(read("projects", seed));
    setEvents(read("events", seedEvents));
    setPrefs(
      read("prefs", {
        name: "Carte workspace",
        email: "hello@example.com",
        language: "English",
        digest: true,
        alerts: true,
      }),
    );
    setPlan(read("plan", "Team"));
    setRecordId(read("recordId", 1));
    setTasks(read("tasks", {}));
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (route === "detail" && Number.isFinite(Number(pathname.split("/")[2])))
      setRecordId(Number(pathname.split("/")[2]));
  }, [pathname, route]);

  return (
    <WorkspaceContext.Provider
      value={{
        route,
        dark,
        setDark,
        projects,
        setProjects,
        events,
        setEvents,
        prefs,
        setPrefs,
        plan,
        setPlan,
        query,
        setQuery,
        filter,
        setFilter,
        sort,
        setSort,
        selected,
        setSelected,
        page,
        setPage,
        recordId,
        setRecordId,
        modal,
        setModal,
        toast,
        setToast,
        tab,
        setTab,
        period,
        setPeriod,
        month,
        setMonth,
        year,
        setYear,
        state,
        setState,
        unread,
        setUnread,
        answer,
        setAnswer,
        tasks,
        setTasks,
        meta,
        current,
        go,
        detail,
        editProject,
        filtered,
        pages,
        safePage,
        visible,
        exportCSV,
        hydrated,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}
