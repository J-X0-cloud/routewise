import { ButtonLink } from "@/components/ui/button";
import { SmartLink } from "@/components/ui/smart-link";
import { mainNav } from "@/lib/data/navigation";
import { links } from "@/lib/site";

/** Native <details> menu: usable before hydration and with JavaScript disabled. */
export function MobileMenu() {
  return (
    <details className="rw-menu static lg:hidden">
      <summary
        aria-label="Open main menu"
        className="relative flex size-8 rounded-sm border text-muted-foreground"
      >
        <span className="sr-only">Open main menu</span>
        <div className="absolute top-1/2 left-1/2 block w-4 -translate-x-1/2 -translate-y-1/2">
          <span
            aria-hidden="true"
            className="absolute block h-0.25 w-full -translate-y-1.5 rounded-full bg-current"
          />
          <span
            aria-hidden="true"
            className="absolute block h-0.25 w-full rounded-full bg-current"
          />
          <span
            aria-hidden="true"
            className="absolute block h-0.25 w-full translate-y-1.5 rounded-full bg-current"
          />
        </div>
      </summary>
      <div className="rw-menu-panel">
        {mainNav.map((item) => (
          <SmartLink key={item.label} href={item.href} className="rw-menu-link">
            {item.label}
          </SmartLink>
        ))}
        <a href={links.signIn} className="rw-menu-link">
          Sign in
        </a>
        <ButtonLink href={links.demo} size="sm" className="mt-3.5 h-11 text-base">
          Book a demo
        </ButtonLink>
      </div>
    </details>
  );
}
