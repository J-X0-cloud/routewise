import { ChevronDown } from "lucide-react";

import { pricingFaq } from "@/lib/data/pricing";

/** Native <details> accordion: works without JavaScript and is indexable. */
export function PricingFaq() {
  return (
    <section className="section-padding border-t bg-muted/20">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-2">
          {pricingFaq.map((item) => (
            <details key={item.question} className="rw-faq rounded-lg border bg-card px-4">
              <summary className="flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50">
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground"
                />
              </summary>
              <div className="pb-4 text-[0.9rem] leading-relaxed text-muted-foreground">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
