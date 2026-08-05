import { links } from "@/lib/site";
import type { FooterColumn, NavLink } from "@/types/content";

export const mainNav: NavLink[] = [
  { label: "Platform", href: links.platform },
  { label: "Solutions", href: links.solutions },
  { label: "Pricing", href: links.pricing },
  { label: "Developers", href: links.developers },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Platform overview", href: links.platform },
      { label: "Dispatch board", href: links.platform },
      { label: "Live tracking", href: links.platform },
      { label: "Driver app", href: links.platform },
      { label: "Billing & settlements", href: links.platform },
      { label: "Pricing", href: links.pricing },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "All solutions", href: links.solutions },
      { label: "Courier & same-day", href: links.solutions },
      { label: "Grocery & food distribution", href: links.solutions },
      { label: "Pharmacy & medical", href: links.solutions },
      { label: "Furniture & appliance", href: links.solutions },
      { label: "Building supply", href: links.solutions },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "API overview", href: links.developers },
      { label: "Webhooks", href: links.developers },
      { label: "JavaScript SDK", href: links.developers },
      { label: "Status", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Customers", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: links.contact },
      { label: "Security", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];
