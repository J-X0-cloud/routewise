export const siteConfig = {
  name: "Routewise",
  legalName: "Routewise, Inc.",
  title: "Routewise | Dispatch & Fleet Operations for Regional Delivery Companies",
  description:
    "Routewise is the dispatch and fleet operations platform for regional delivery companies: order intake, route planning, live tracking, a driver app with proof of delivery, and billing in one place.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  themeColor: "#0f2224",
  email: "hello@routewise.com",
  offices: ["Fresno", "Sacramento", "Reno"],
} as const;

export const links = {
  demo: `mailto:${siteConfig.email}?subject=Routewise%20demo`,
  contact: `mailto:${siteConfig.email}`,
  signIn: "#",
  helpCenter: "#",
  tour: "#",
  platform: "/platform",
  solutions: "/solutions",
  pricing: "/pricing",
  developers: "/#developers",
} as const;
