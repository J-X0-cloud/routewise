import type { Metadata } from "next";
import { Fragment } from "react";

import { SolutionGroup } from "@/components/solutions/solution-group";
import { SolutionsCta } from "@/components/solutions/solutions-cta";
import { SolutionsHero } from "@/components/solutions/solutions-hero";
import { solutionGroups } from "@/lib/data/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Routewise for courier, grocery, pharmacy, furniture, building supply and B2B delivery companies — by industry, by use case and by role.",
};

export default function SolutionsPage() {
  return (
    <>
      <SolutionsHero />
      {solutionGroups.map((group, index) => (
        <Fragment key={group.id}>
          {index > 0 ? (
            <div className="container">
              <div className="border-t" />
            </div>
          ) : null}
          <SolutionGroup group={group} />
        </Fragment>
      ))}
      <SolutionsCta />
    </>
  );
}
