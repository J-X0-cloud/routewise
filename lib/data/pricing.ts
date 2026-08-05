import { Building2, Cloud, Server, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { links } from "@/lib/site";

/** Every price on the site is derived from this object. Amounts are in US dollars. */
export const priceBook = {
  platformFee: 149,
  perActiveVehicle: 18,
  perAdditionalDepot: 49,
  includedDepots: 1,
  annualDiscount: 0.15,
  meters: {
    sms: { unitPrice: 0.02, freeUnits: 500 },
    apiCalls: { blockPrice: 0.25, blockSize: 100_000, freeUnits: 100_000 },
    webhooks: { blockPrice: 0.25, blockSize: 100_000, freeUnits: 100_000 },
  },
} as const;

export const pricingProofPoints = [
  { value: "$0", label: "Per-order or per-stop fees" },
  { value: "Unlimited", label: "Dispatcher and driver seats" },
  { value: "14 days", label: "Pilot on your real routes" },
] as const;

export interface PricingPath {
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: LucideIcon;
}

export const pricingPaths: PricingPath[] = [
  {
    title: "We run one depot",
    description:
      "Up to about 25 vehicles out of a single yard. Self-serve setup with our onboarding checklist and chat support.",
    cta: "See the plan",
    href: "#plan",
    icon: Cloud,
  },
  {
    title: "We run several depots",
    description:
      "Multiple sites, mixed employee and contractor drivers, or a merchant portal to launch. Guided onboarding recommended.",
    cta: "See onboarding",
    href: "#onboarding",
    icon: Server,
  },
  {
    title: "We need something custom",
    description:
      "ERP integrations, custom job types, a migration from a legacy system, or an enterprise security review.",
    cta: "Talk to our team",
    href: "#enterprise",
    icon: Building2,
  },
];

export const planInclusions = [
  "Unlimited orders and stops — never a per-delivery fee, however busy you get",
  "$18 a month per active vehicle — park one and stop paying for it",
  "Everything included: dispatch, route planning, live tracking, driver app, customer notifications, billing and the merchant portal",
  "No tiers, no add-ons — every feature from day one",
] as const;

export const unlimitedAllowances = [
  "Orders",
  "Stops",
  "Dispatcher seats",
  "Driver app installs",
  "API keys",
  "Customers",
  "Saved addresses",
  "Merchant logins",
  "Rate cards",
  "Delivery zones",
] as const;

export interface Meter {
  name: string;
  description: string;
  rate: string;
  allowance: string;
}

export const meters: Meter[] = [
  {
    name: "Customer SMS",
    description:
      "Text-message ETAs and delivery alerts. Email and push notifications are always free.",
    rate: "$0.02 each",
    allowance: "First 500 free each month",
  },
  {
    name: "API calls",
    description:
      "Counted in whole blocks and rounded down — 99,999 calls in a period cost nothing.",
    rate: "$0.25 per 100,000",
    allowance: "First 100,000 free each period",
  },
  {
    name: "Webhook sends",
    description: "Counted in whole blocks and rounded down, the same way as API calls.",
    rate: "$0.25 per 100,000",
    allowance: "First 100,000 free each period",
  },
];

export interface ServiceOffer {
  title: string;
  subtitle: string;
  price: string;
  priceNote: string;
  icon: LucideIcon;
  features: string[];
  cta: string;
  href: string;
  dashed?: boolean;
}

export const onboardingOffers: ServiceOffer[] = [
  {
    title: "Guided Onboarding",
    subtitle: "For multi-depot rollouts",
    price: "$2,500",
    priceNote: "one-time",
    icon: Server,
    features: [
      "Customer, address and rate-card import",
      "Job types and POD steps configured",
      "Tracking page and notifications branded",
      "On-site or remote go-live day",
      "Driver and dispatcher training",
      "30-day post-launch check-in",
    ],
    cta: "Book onboarding",
    href: links.contact,
  },
  {
    title: "Custom Integrations",
    subtitle: "ERP, accounting & e-commerce",
    price: "Custom",
    priceNote: "pricing",
    icon: Zap,
    features: [
      "ERP and order-system connections",
      "Accounting sync and invoice exports",
      "Custom job types and automations",
      "Migration from legacy dispatch tools",
      "White-label merchant portal",
      "Enterprise security review",
    ],
    cta: "Request a quote",
    href: links.contact,
    dashed: true,
  },
];

export interface SupportPlan {
  name: string;
  dot: string;
  price: string;
  response: string;
  features: { label: string; included: boolean }[];
  cta: string;
  href: string;
  highlighted?: boolean;
}

export const supportPlans: SupportPlan[] = [
  {
    name: "Standard",
    dot: "bg-green-500",
    price: "Included",
    response: "Next business day",
    features: [
      { label: "Help center & video guides", included: true },
      { label: "Chat & email support", included: true },
      { label: "Phone support", included: false },
      { label: "Response-time guarantee", included: false },
      { label: "Named success manager", included: false },
      { label: "Quarterly ops review", included: false },
    ],
    cta: "Visit help center",
    href: links.helpCenter,
  },
  {
    name: "Priority",
    dot: "bg-blue-500",
    price: "$250/mo",
    response: "4-hour response",
    features: [
      { label: "Everything in Standard", included: true },
      { label: "Phone support, 6 a.m.–8 p.m. PT", included: true },
      { label: "Response-time guarantee", included: true },
      { label: "Priority bug fixes", included: true },
      { label: "Onboarding for new depots", included: true },
      { label: "Admin training sessions", included: true },
    ],
    cta: "Talk to our team",
    href: links.contact,
    highlighted: true,
  },
  {
    name: "Premier",
    dot: "bg-purple-500",
    price: "$900/mo",
    response: "1-hour response",
    features: [
      { label: "Everything in Priority", included: true },
      { label: "Named success manager", included: true },
      { label: "Weekend on-call coverage", included: true },
      { label: "Quarterly ops review", included: true },
      { label: "Custom report building", included: true },
      { label: "Early access to new features", included: true },
    ],
    cta: "Talk to our team",
    href: links.contact,
  },
  {
    name: "Enterprise",
    dot: "bg-orange-500",
    price: "Custom",
    response: "Dedicated team",
    features: [
      { label: "Everything in Premier", included: true },
      { label: "Dedicated solutions engineer", included: true },
      { label: "Security review package", included: true },
      { label: "Custom SLAs & uptime credits", included: true },
      { label: "Integration maintenance", included: true },
      { label: "Roadmap collaboration", included: true },
    ],
    cta: "Talk to our team",
    href: links.contact,
  },
];

export const pricingFaq = [
  {
    question: "Do I pay per order or per stop?",
    answer:
      "No. Orders, stops and deliveries are unlimited on every account. You pay a flat platform fee plus $18 a month for each vehicle that runs at least one route in the billing period.",
  },
  {
    question: "What counts as an active vehicle?",
    answer:
      "Any vehicle that is assigned to a route during the billing period. Vehicles you keep on file but do not dispatch are free, so seasonal fleets only pay for the months they run.",
  },
  {
    question: "Do drivers and dispatchers cost extra?",
    answer:
      "No. Driver app installs, dispatcher seats, billing users and merchant-portal logins are all unlimited.",
  },
  {
    question: "What happens during the 14-day pilot?",
    answer:
      "We import your customers and addresses, set up your job types and get a few drivers on the app. You run real routes for two weeks with our team on call, then decide whether to continue.",
  },
  {
    question: "Can Routewise handle more than one depot?",
    answer:
      "Yes. The first depot is included and each additional depot is $49 a month. Depots get their own cut-off times, load lists and permissions.",
  },
  {
    question: "Which systems do you integrate with?",
    answer:
      "Most customers connect an order system, an e-commerce store or an accounting package. The REST API and webhooks cover everything in the app, and our team can build the connection for you under Custom Integrations.",
  },
  {
    question: "Is there a long-term contract?",
    answer:
      "No. Monthly plans can be cancelled at any time. Annual plans save 15% and are invoiced up front.",
  },
  {
    question: "How is our data handled?",
    answer:
      "Your data is encrypted in transit and at rest, backed up daily and exportable at any time to CSV or through the API. Enterprise customers can request our security package.",
  },
] as const;
