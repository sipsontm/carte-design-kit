import {
  LayoutDashboard,
  ChartNoAxesCombined,
  Table2,
  Columns3,
  CalendarDays,
  FileText,
  Settings,
  CreditCard,
  Component,
  SwatchBook,
  LogIn,
  Search,
  Bell,
  Moon,
  Sun,
  Sparkles,
  Plus,
  Download,
  ArrowLeft,
  ArrowRight,
  X,
  Check,
  Inbox,
  TriangleAlert,
  Send,
  Mail,
  ChevronRight,
  Info,
} from "lucide-react";
export const routes = [
  [
    "overview",
    "Overview",
    LayoutDashboard,
    "All QR menus in the network — here’s how they performed.",
  ],
  [
    "analytics",
    "Analytics",
    ChartNoAxesCombined,
    "The same chart language, composed into a deeper report.",
  ],
  [
    "records",
    "Projects",
    Table2,
    "A working table with search, filters, selection and editing.",
  ],
  [
    "board",
    "Project board",
    Columns3,
    "One dataset. A different way to organize the work.",
  ],
  [
    "calendar",
    "Calendar",
    CalendarDays,
    "Plan the month and keep important dates in view.",
  ],
  [
    "detail",
    "Project details",
    FileText,
    "A focused workspace for one project.",
  ],
  [
    "settings",
    "Settings",
    Settings,
    "Preferences that stay with this browser.",
  ],
  [
    "billing",
    "Plans & billing",
    CreditCard,
    "A complete subscription interface. No real payments.",
  ],
  [
    "components",
    "Components",
    Component,
    "Reusable building blocks, including their interaction states.",
  ],
  [
    "foundations",
    "Foundations",
    SwatchBook,
    "The original measurements, typography and color system.",
  ],
  [
    "signin",
    "Sign in",
    LogIn,
    "A form template with validation. No credentials are sent.",
  ],
];

export const seed = [
  {
    id: 1,
    name: "Customer portal",
    owner: "Alex Morgan",
    status: "In progress",
    progress: 82,
    date: "2026-10-14",
  },
  {
    id: 2,
    name: "Inventory workflow",
    owner: "Sam Lee",
    status: "Review",
    progress: 68,
    date: "2026-10-18",
  },
  {
    id: 3,
    name: "Booking experience",
    owner: "Jamie Taylor",
    status: "In progress",
    progress: 54,
    date: "2026-10-22",
  },
  {
    id: 4,
    name: "Autumn campaign",
    owner: "Alex Morgan",
    status: "Planned",
    progress: 12,
    date: "2026-10-25",
  },
  {
    id: 5,
    name: "Partner onboarding",
    owner: "Sam Lee",
    status: "Review",
    progress: 94,
    date: "2026-10-09",
  },
  {
    id: 6,
    name: "Content library",
    owner: "Jamie Taylor",
    status: "Planned",
    progress: 0,
    date: "2026-11-02",
  },
];

export const statuses = ["Planned", "In progress", "Review"];

export const seedEvents = [
  { id: 1, date: "2026-10-09", title: "Partner review" },
  { id: 2, date: "2026-10-14", title: "Portal launch" },
];

export const months = [
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
];

export const annual = [
  52000, 58000, 78000, 60000, 65000, 100000, 110000, 145000, 156000, 178000,
  214000, 174000, 1200,
];

export const daily = [
  5400, 5500, 7600, 6100, 7300, 6900, 7100, 5500, 4950, 5100, 6500, 7550, 5900,
  4500, 4750, 5100, 4900, 5600, 7900, 8100, 5200, 4450, 4510, 5090, 5330, 7100,
  7220, 5020, 4600, 4660, 760,
];

export const ranks = [
  "Casabunicii",
  "Opia",
  "Freddo",
  "Barbarosa",
  "Cb",
  "Aici",
  "Fabrika",
  "Boom",
  "Artemis",
  "Gold Cafe",
].map((label, i) => ({
  key: String(i),
  label,
  value: [15400, 15200, 8000, 7200, 7100, 6900, 5800, 5000, 4300, 3900][i],
}));

export const series = (values, labels) => ({
  points: values.map((value, i) => ({ date: labels[i], value })),
});

export const rows = (labels, values) =>
  labels.map((label, i) => ({ key: label, label, value: values[i] }));

export const read = (key, fallback) => {
  try {
    return (
      JSON.parse(localStorage.getItem("carte-nextjs-v1:" + key)) ?? fallback
    );
  } catch {
    return fallback;
  }
};

export const save = (key, value) => {
  try {
    localStorage.setItem("carte-nextjs-v1:" + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};
export const routePaths = {
  overview: "/",
  analytics: "/analytics",
  records: "/projects",
  board: "/board",
  calendar: "/calendar",
  detail: "/projects/1",
  settings: "/settings",
  billing: "/billing",
  components: "/components",
  foundations: "/foundations",
  signin: "/sign-in",
};
export function hrefFor(id, recordId = 1) {
  return id === "detail" ? "/projects/" + recordId : routePaths[id] || "/";
}
export function routeFor(pathname) {
  return pathname.startsWith("/projects/")
    ? "detail"
    : Object.keys(routePaths).find((id) => routePaths[id] === pathname) ||
        "404";
}
