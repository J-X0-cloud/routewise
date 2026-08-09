/**
 * Page-wide texture: a frosted layer over the section glows plus a film-grain overlay.
 * Rendered once in the root layout behind every page.
 */
export function SiteBackground() {
  return (
    <>
      <div className="absolute inset-0 z-[-2] bg-background/10 backdrop-blur-[85px] will-change-transform md:backdrop-blur-[170px]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[-1] hidden size-full bg-repeat opacity-70 mix-blend-overlay dark:block dark:md:opacity-100"
        style={{
          backgroundImage: "url('/textures/grain.webp')",
          backgroundSize: "83.69px 83.69px",
        }}
      />
    </>
  );
}
