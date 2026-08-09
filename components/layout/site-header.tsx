import { ButtonLink } from "@/components/ui/button";
import { SmartLink } from "@/components/ui/smart-link";
import { mainNav } from "@/lib/data/navigation";
import { links } from "@/lib/site";

import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  return (
    <header className="rw-header sticky top-0 z-[60] border-b transition-colors duration-300">
      <div className="relative z-[60] container flex h-[var(--header-height)] items-center justify-between gap-4">
        <Logo />

        <nav
          aria-label="Main"
          className="relative hidden max-w-max flex-1 items-center justify-center lg:flex"
        >
          <ul className="flex flex-1 list-none items-center justify-center gap-2 xl:gap-4">
            {mainNav.map((item) => (
              <li key={item.label} className="relative">
                <SmartLink
                  href={item.href}
                  className="inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-[color,box-shadow] outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px]"
                >
                  {item.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden flex-shrink-0 items-center justify-end gap-3 lg:flex">
          <ButtonLink href={links.signIn} variant="ghost" size="sm">
            Sign in
          </ButtonLink>
          <ButtonLink href={links.demo} size="sm">
            Book a demo
          </ButtonLink>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
