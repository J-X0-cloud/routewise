import { CostEstimator } from "./cost-estimator";
import { MeteredUsage } from "./metered-usage";
import { PlanCard } from "./plan-card";

export function PlanSection() {
  return (
    <section id="plan" className="section-padding scroll-mt-24">
      <div className="container">
        <div className="mb-6 text-center">
          <h2 className="mb-2 text-3xl font-bold">Routewise</h2>
          <p className="text-muted-foreground">
            Fully hosted. Updated every week. One plan, whatever size your fleet.
          </p>
        </div>

        <PlanCard />

        <div className="mt-14">
          <div className="mb-6 text-center">
            <h3 className="mb-2 text-2xl font-bold">What would it cost you?</h3>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Line by line, the same way it appears on your statement.
            </p>
          </div>
          <CostEstimator />
        </div>

        <MeteredUsage />
      </div>
    </section>
  );
}
