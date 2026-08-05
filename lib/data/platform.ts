import {
  BookOpen,
  Box,
  Code,
  GitBranch,
  Globe,
  Lock,
  Puzzle,
  Shield,
  ShoppingBag,
  Smartphone,
  Truck,
  Zap,
} from "lucide-react";

import { links } from "@/lib/site";
import type { FeatureTile, FlowStep, Principle } from "@/types/content";

export const platformStats = [
  { value: "15s", label: "GPS refresh on the live map" },
  { value: "iOS + Android", label: "Driver app with offline mode" },
  { value: "3 taps", label: "To capture proof of delivery" },
  { value: "24/7", label: "Live tracking links for customers" },
] as const;

export const principles: Principle[] = [
  {
    title: "Dispatch-first",
    description:
      "Everything starts from the board. Plan, assign and reshuffle the day in one place, with the map and driver chat a click away.",
    icon: Puzzle,
  },
  {
    title: "Driver-friendly by default",
    description:
      "A clean driver app with offline mode and one-screen proof of delivery, so adoption doesn’t stall in week two.",
    icon: Globe,
  },
  {
    title: "Your data, always exportable",
    description:
      "Every order, scan, photo and signature is yours. Export to CSV anytime or pull it through the API into your own reporting.",
    icon: Lock,
  },
  {
    title: "Connected end to end",
    description:
      "Orders, routes, tracking and billing share one record, so a completed stop becomes an invoice line without anyone re-typing it.",
    icon: Zap,
  },
];

export const featureTiles: FeatureTile[] = [
  {
    title: "Dispatch Board",
    description:
      "Board, table and map views of every order. Drag-and-drop assignment, auto-dispatch by zone and capacity, and bulk actions for the morning rush.",
    icon: Truck,
    tone: "blue",
    href: links.platform,
  },
  {
    title: "Route Planner",
    description:
      "Multi-stop optimization with time windows, vehicle capacity, driver breaks and depot start times. Re-optimize mid-day in one click.",
    icon: ShoppingBag,
    tone: "violet",
    href: links.platform,
  },
  {
    title: "Depots & Cross-Dock",
    description:
      "Load lists by route, barcode scans at load-out, hub-to-hub transfers and depot cut-off times for multi-site operations.",
    icon: Box,
    tone: "amber",
    href: links.platform,
    isNew: true,
  },
  {
    title: "Billing & Settlements",
    description:
      "Rate cards by customer, zone and service level. Invoices on proof of delivery, accessorial charges, and pay runs for employee and contractor drivers.",
    icon: BookOpen,
    tone: "emerald",
    href: links.platform,
  },
  {
    title: "Driver App",
    description:
      "iOS and Android app with navigation handoff, offline mode, barcode scanning, photos, signatures and in-app chat with dispatch.",
    icon: Smartphone,
    tone: "green",
    href: links.platform,
  },
  {
    title: "Teams & Permissions",
    description:
      "Roles for dispatchers, drivers, billing and customers. Per-depot access, single sign-on for larger teams, and an audit trail of every change.",
    icon: Shield,
    tone: "slate",
    href: links.platform,
  },
  {
    title: "API & Webhooks",
    description:
      "REST API, signed webhooks and a JavaScript SDK with sandbox and live keys. Connect your order system, ERP or online store in days.",
    icon: Code,
    tone: "indigo",
    href: links.developers,
  },
  {
    title: "Customer Notifications",
    description:
      "Branded SMS and email with live ETAs, a tracking page on your own domain, and delivery confirmations with the signed POD attached.",
    icon: Puzzle,
    tone: "pink",
    href: links.platform,
  },
];

export const orderFlow: FlowStep[] = [
  {
    stage: "Merchant Portal",
    title: "Merchant books a delivery",
    description:
      "A retailer books through the portal, its store integration or a CSV upload. Pickup, drop-off, window and service level are captured up front.",
    icon: ShoppingBag,
    tone: "violet",
  },
  {
    stage: "Dispatch",
    title: "Dispatch plans & assigns",
    description:
      "Routewise slots the order into the best route, respects capacity and time windows, and pushes the updated run to the driver’s phone.",
    icon: GitBranch,
    tone: "blue",
  },
  {
    stage: "Driver App",
    title: "Driver completes the stop",
    description:
      "The driver follows the route, captures photos and a signature, and the customer’s tracking link updates the moment the stop is done.",
    icon: Smartphone,
    tone: "green",
  },
  {
    stage: "Billing",
    title: "Invoice & pay run update",
    description:
      "The stop is priced from the rate card, added to the customer’s invoice and credited to the driver’s settlement — no manual step.",
    icon: BookOpen,
    tone: "emerald",
  },
];

export const flowGuarantees = [
  "No double entry between dispatch and billing",
  "Shared customers, addresses and vehicles everywhere",
  "One set of roles and permissions",
] as const;
