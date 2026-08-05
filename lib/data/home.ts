import {
  ChartColumn,
  Container,
  GitBranch,
  Heart,
  Radio,
  Recycle,
  ShoppingCart,
  Truck,
  UtensilsCrossed,
  Workflow,
  Wrench,
} from "lucide-react";

import type { DispatchTab, IndustryTile, PlatformModule, Stat } from "@/types/content";

export const heroStats: Stat[] = [
  { value: "15", suffix: "s", label: "GPS refresh on the live map" },
  { value: "3", suffix: " taps", label: "To capture proof of delivery" },
  { value: "1", suffix: " board", label: "For every order, driver and van" },
  { value: "24", suffix: "/7", label: "Live tracking links for customers" },
];

export const platformModules: PlatformModule[] = [
  {
    id: "dispatch",
    badge: "Dispatch",
    tone: "blue",
    title: "Dispatch Board",
    description:
      "See every order by status, drag work onto drivers, and rebalance the day in seconds when a truck breaks down or a rush order lands.",
    bullets: [
      "Board, table and map views of every order",
      "Auto-assign by zone, capacity and skills",
      "Time windows and priority flags",
      "Bulk import from CSV, email or API",
    ],
    image: {
      src: "/images/dispatch-board.webp",
      alt: "Routewise dispatch board with orders grouped by status and drivers assigned",
    },
    featured: true,
  },
  {
    id: "tracking",
    badge: "Tracking",
    tone: "orange",
    title: "Live Map & ETAs",
    description:
      "Every van on one map with GPS refreshed every 15 seconds, and a branded page where customers follow their delivery.",
    bullets: [
      "Live positions and route breadcrumbs",
      "Predictive ETAs that adjust to traffic",
      "Branded SMS and email tracking links",
      "Late-run alerts before customers call",
    ],
    image: {
      src: "/images/live-map.webp",
      alt: "Routewise live map with active orders, driver positions and unassigned work",
    },
  },
  {
    id: "depots",
    badge: "Depots",
    tone: "violet",
    title: "Depots & Cross-Dock",
    description:
      "Run several depots from one account. Stage freight by route, scan loads onto vans, and hand off between hubs without losing the chain of custody.",
    bullets: [
      "Load lists per route and vehicle",
      "Barcode scans at load-out and handoff",
      "Hub-to-hub transfers for regional lanes",
      "Depot-level cut-off times",
    ],
    image: {
      src: "/images/depot-overview.webp",
      alt: "Routewise depot overview with load-out, receiving and exception counts",
    },
  },
  {
    id: "billing",
    badge: "Billing",
    tone: "emerald",
    title: "Billing & Driver Pay",
    description:
      "Completed stops become invoice lines and driver settlements automatically, priced from rate cards by customer, zone and service level.",
    bullets: [
      "Invoice on proof of delivery",
      "Employee and contractor pay runs",
      "Accessorials: wait time, stairs, returns",
      "Exports to your accounting system",
    ],
    image: {
      src: "/images/billing-overview.webp",
      alt: "Routewise billing overview with invoices, receivables and driver settlements",
    },
  },
  {
    id: "portal",
    badge: "Portal",
    tone: "pink",
    title: "Merchant Portal",
    description:
      "Give the retailers you deliver for their own login to book pickups, upload orders and download signed PODs — no more phone-in bookings.",
    bullets: [
      "Self-serve booking on your rate card",
      "Bulk uploads and recurring pickups",
      "POD and invoice downloads",
      "Your logo on your own domain",
    ],
    image: {
      src: "/images/merchant-portal.webp",
      alt: "Routewise merchant portal where a retailer manages the products it ships",
    },
  },
];

export const dispatchTabs: DispatchTab[] = [
  {
    id: "workflow-builder",
    title: "Workflow Builder",
    summary: "Model every job type — no code.",
    icon: Workflow,
    image: {
      src: "/images/workflow-builder.webp",
      alt: "Routewise workflow builder showing a custom job type with pickup, depot and delivery steps",
    },
    body: "Define the jobs you actually run — two-person furniture drops, pharmacy runs with ID checks, pallet deliveries that need a liftgate — and the steps, photos and signatures each one requires. Any status change can notify the customer, price the stop or call your own systems.",
    highlights: [
      "Custom fields per job type",
      "Visual step-by-step flow designer",
      "Required photos, signatures and ID checks",
      "Notifications and webhooks on any status",
      "Templates for common delivery types",
    ],
  },
  {
    id: "auto-dispatch",
    title: "Auto-Dispatch & Route Planner",
    summary: "Build tomorrow’s runs before you leave tonight.",
    icon: GitBranch,
    image: {
      src: "/images/dispatch-board.webp",
      alt: "Routewise dispatch board with orders grouped by status and drivers assigned",
    },
    body: "Routewise slots every order into the best route, respecting time windows, vehicle capacity, driver breaks and depot start times. When a rush order lands or a van goes down at 11 a.m., re-optimize the affected runs in one click and push the changes straight to drivers’ phones.",
    highlights: [
      "Multi-stop optimization with time windows",
      "Capacity by weight, volume and pallet count",
      "Auto-assign by zone, capacity and skills",
      "One-click mid-day re-optimization",
      "Depot start times and driver breaks",
    ],
  },
  {
    id: "live-tracking",
    title: "Live Tracking & ETAs",
    summary: "Know where every van is, every 15 seconds.",
    icon: Radio,
    image: {
      src: "/images/live-tracking.webp",
      alt: "Routewise live tracking view showing a three-stop route on the map with driver, vehicle and status timeline",
    },
    body: "Every van on one map with route breadcrumbs and predictive ETAs that adjust to traffic. Customers get a branded tracking link by SMS or email, and dispatch sees late runs flagged before anyone picks up the phone.",
    highlights: [
      "GPS refreshed every 15 seconds",
      "Predictive ETAs that adjust to traffic",
      "Branded tracking page on your domain",
      "Late-run alerts for dispatch",
      "Full stop timeline per order",
    ],
  },
  {
    id: "driver-app",
    title: "Driver App & Proof of Delivery",
    summary: "One screen per stop. Three taps to close it out.",
    icon: Wrench,
    image: {
      src: "/images/depot-overview.webp",
      alt: "Routewise depot overview with load-out, receiving and exception counts",
    },
    body: "A clean iOS and Android app with the day’s route, navigation handoff and offline mode. Drivers scan at load-out, capture photos, signatures and ID checks at the door, and chat with dispatch without leaving the stop.",
    highlights: [
      "iOS and Android, with offline mode",
      "Navigation handoff to Google or Apple Maps",
      "Barcode scans at load-out and delivery",
      "Photos, signatures and ID checks",
      "In-app chat with dispatch",
    ],
  },
  {
    id: "reporting",
    title: "On-Time & Cost Reporting",
    summary: "The numbers for Monday’s ops meeting, already done.",
    icon: ChartColumn,
    image: {
      src: "/images/billing-overview.webp",
      alt: "Routewise billing overview with invoices, receivables and driver settlements",
    },
    body: "On-time rate, cost per stop, driver performance and margin by customer and lane, straight from the same records dispatch and billing use. Filter by depot or date range and export anything to CSV.",
    highlights: [
      "On-time rate by driver, route and customer",
      "Cost per stop and per mile",
      "Margin by customer and lane",
      "Depot and date-range filters",
      "Scheduled CSV exports",
    ],
  },
];

export const industryTiles: IndustryTile[] = [
  {
    title: "Courier & Same-Day",
    description:
      "Mix on-demand and scheduled jobs, auto-assign by zone, and give every recipient a live tracking link.",
    icon: Truck,
    tone: "blue",
  },
  {
    title: "Furniture & Appliance",
    description:
      "Two-person crews, delivery windows, room-of-choice notes and damage photos captured at the door.",
    icon: ShoppingCart,
    tone: "violet",
  },
  {
    title: "Grocery & Food Distribution",
    description:
      "Tight windows, temperature notes on every stop and multi-drop routes planned before the first truck leaves.",
    icon: UtensilsCrossed,
    tone: "orange",
  },
  {
    title: "Pharmacy & Medical",
    description:
      "Chain-of-custody scans, ID checks at the door and priority dispatch for STAT deliveries.",
    icon: Heart,
    tone: "green",
  },
  {
    title: "Building Supply",
    description:
      "Liftgate and crane requirements, jobsite contacts and heavy-load routing for contractor deliveries.",
    icon: Recycle,
    tone: "pink",
  },
  {
    title: "Regional LTL & B2B",
    description:
      "Multi-stop lanes, hub-to-hub transfers and pallet counts that reconcile straight into billing.",
    icon: Container,
    tone: "yellow",
  },
];
