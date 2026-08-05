import {
  Briefcase,
  ChartColumn,
  ClipboardList,
  Code,
  Heart,
  MapPin,
  Navigation,
  Package,
  Recycle,
  Shield,
  Ship,
  ShoppingCart,
  Truck,
  UserCog,
  Users,
  Utensils,
  Zap,
} from "lucide-react";

import type { SolutionGroup } from "@/types/content";

export const solutionHighlights = [
  "Built for 5–150 vehicle fleets",
  "Multi-depot ready",
  "Unlimited dispatcher seats",
  "14-day pilot on real routes",
] as const;

export const solutionGroups: SolutionGroup[] = [
  {
    id: "industry",
    eyebrow: "By Industry",
    title: "Built for the freight you actually carry",
    description:
      "A furniture drop and a pharmacy run have very little in common. Routewise ships with job types, proof-of-delivery steps and notifications tuned for each.",
    items: [
      {
        title: "Regional LTL & B2B",
        description:
          "Multi-stop lanes, pallet counts and liftgate flags, with hub transfers and PODs that reconcile straight into billing.",
        icon: Truck,
      },
      {
        title: "Grocery & Food Distribution",
        description:
          "Tight delivery windows, temperature notes on every stop, and multi-drop routes planned before the first truck leaves.",
        icon: Utensils,
      },
      {
        title: "Courier & Same-Day",
        description:
          "Mix on-demand and scheduled jobs, auto-assign by zone, and give every recipient a live tracking link.",
        icon: Package,
      },
      {
        title: "Retail & E-commerce Partners",
        description:
          "Plug into your merchants’ stores, promise realistic delivery windows, and handle returns on the same run.",
        icon: ShoppingCart,
      },
      {
        title: "Pharmacy & Medical",
        description:
          "Chain-of-custody scans, ID checks at the door, and priority dispatch for STAT and after-hours deliveries.",
        icon: Heart,
      },
      {
        title: "Building Supply",
        description:
          "Jobsite contacts, crane and liftgate requirements, and heavy-load routing for contractor deliveries.",
        icon: Recycle,
      },
      {
        title: "Furniture & Appliance",
        description:
          "Two-person crews, room-of-choice notes, haul-away, and damage photos captured before the driver leaves.",
        icon: Ship,
      },
      {
        title: "Office & Campus Runs",
        description:
          "Recurring runs for mailrooms, labs and campuses, with signature capture and department-level billing.",
        icon: Shield,
      },
    ],
  },
  {
    id: "use-case",
    eyebrow: "By Use Case",
    title: "Fix the problems costing you the most",
    description:
      "Late deliveries, phone tag with customers, and invoices that lag a week behind. Start with the problem that hurts most and grow from there.",
    items: [
      {
        title: "On-Time Delivery",
        description:
          "Plan realistic windows, spot late runs early, and send proactive ETAs so customers stop calling dispatch.",
        icon: MapPin,
      },
      {
        title: "Route Planning",
        description:
          "Fit more stops into every shift with routing that respects time windows, capacity, breaks and depot hours.",
        icon: Navigation,
      },
      {
        title: "Drivers & Vehicles",
        description:
          "Driver documents, vehicle inspections and availability in one place, so you only dispatch what’s ready to roll.",
        icon: Truck,
      },
      {
        title: "Order Intake",
        description:
          "Take orders from the portal, email, CSV or API and land them on the board already validated and geocoded.",
        icon: ClipboardList,
      },
      {
        title: "Reporting",
        description:
          "On-time rate, cost per stop and driver performance from your own data — ready for the Monday ops meeting.",
        icon: ChartColumn,
      },
      {
        title: "Integrations",
        description:
          "Connect your ERP, accounting package or online store with a documented REST API and signed webhooks.",
        icon: Zap,
      },
    ],
  },
  {
    id: "role",
    eyebrow: "By Role",
    title: "Designed for everyone who touches a delivery",
    description:
      "Dispatchers, drivers, billing and the customer waiting at the door — each gets the view they need and nothing they don’t.",
    items: [
      {
        title: "Dispatchers",
        description:
          "One board for every order and driver, with late-run alerts and drag-and-drop reassignment when plans change.",
        icon: UserCog,
      },
      {
        title: "Operations Managers",
        description:
          "Daily on-time, cost-per-stop and utilization reporting across every depot, without building spreadsheets.",
        icon: Truck,
      },
      {
        title: "Drivers",
        description:
          "A simple app with the day’s route, navigation handoff, offline mode and one-screen proof of delivery.",
        icon: Code,
      },
      {
        title: "Owners & GMs",
        description:
          "A clear view of margin by customer and lane, and the confidence to bid on bigger contracts.",
        icon: Briefcase,
      },
      {
        title: "Depot Leads",
        description:
          "Load lists by route, barcode scans at load-out, and a clean handoff from the dock to the driver.",
        icon: Package,
      },
      {
        title: "Customer Service",
        description:
          "Answer “where’s my delivery?” in seconds with live ETAs, signed PODs and photos on every order.",
        icon: Users,
      },
    ],
  },
];
