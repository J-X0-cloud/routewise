import type { Stat } from "@/types/content";

export function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <section className="border-y bg-muted/30">
      <div className="container">
        <dl className="grid grid-cols-2 divide-x divide-y md:grid-cols-4 md:divide-y-0">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-1 px-6 py-10 text-center"
            >
              <dt className="order-2 text-sm font-medium text-muted-foreground">{stat.label}</dt>
              <dd className="order-1 text-4xl font-bold tracking-tight md:text-5xl">
                <span className="inline-block">{stat.value}</span>
                {stat.suffix ? <span>{stat.suffix}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
