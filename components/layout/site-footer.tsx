import { ButtonLink } from "@/components/ui/button";
import { SmartLink } from "@/components/ui/smart-link";
import { footerColumns } from "@/lib/data/navigation";
import { links, siteConfig } from "@/lib/site";

import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="section-padding relative overflow-hidden border-t bg-card">
      <div className="container text-center">
        <Logo className="mt-20 justify-center gap-3 text-3xl lg:mt-30" markClassName="rw-mark-lg" />
        <h2 className="my-8 text-2xl lg:my-6 lg:text-5xl">
          Fewer phone calls. <span className="text-gradient">More stops delivered.</span>
        </h2>
        <div className="mx-auto flex max-w-sm justify-center gap-4.5">
          <ButtonLink href={links.demo} size="md">
            Book a demo
          </ButtonLink>
          <ButtonLink href={links.pricing} variant="bordered" size="md">
            See pricing
          </ButtonLink>
        </div>
        <p className="mt-3 text-sm">
          14-day pilot · Onboarding included · Unlimited dispatcher seats
        </p>
      </div>

      <div className="container mt-20 lg:mt-30">
        <div className="rw-foot-grid text-left">
          <div className="rw-foot-brand">
            <Logo className="text-lg" />
            <p className="mt-3 text-xs text-muted-foreground">
              Dispatch and fleet operations for regional delivery companies. Built in the USA,
              supported by people who have run a dispatch desk.
            </p>
            <p className="mt-3 text-xs">
              <a href={links.contact} className="text-muted-foreground hover:text-foreground">
                {siteConfig.email}
              </a>
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-sm font-semibold text-foreground">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <SmartLink
                      href={link.href}
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap justify-between gap-2 border-t pt-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.legalName} All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">{siteConfig.offices.join(" · ")}</p>
        </div>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG, no optimisation needed */}
      <img
        src="/footer-glow.svg"
        alt=""
        aria-hidden="true"
        width={1728}
        height={846}
        className="absolute right-0 bottom-0 -z-10 hidden origin-bottom-right scale-50 rotate-30 md:scale-100 md:rotate-0 dark:block"
      />
    </footer>
  );
}
