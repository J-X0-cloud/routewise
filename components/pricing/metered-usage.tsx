import { meters } from "@/lib/data/pricing";

export function MeteredUsage() {
  return (
    <div className="mx-auto mt-14 max-w-4xl">
      <div className="mb-5 text-center">
        <h3 className="mb-2 text-2xl font-bold">The three things we meter</h3>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Everything else is included. These are charged only on what you actually use, at the same
          rates whether you pay monthly or annually.
        </p>
      </div>
      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="rw-table-reflow w-full min-w-[34rem] text-sm">
          <thead>
            <tr className="border-b bg-muted/30">
              <th scope="col" className="px-4 py-3 text-left font-medium">
                Meter
              </th>
              <th scope="col" className="px-4 py-3 text-left font-medium">
                Rate
              </th>
              <th scope="col" className="px-4 py-3 text-left font-medium">
                Free allowance
              </th>
            </tr>
          </thead>
          <tbody>
            {meters.map((meter) => (
              <tr key={meter.name} className="border-b align-top last:border-0">
                <td className="px-4 py-3">
                  <div className="font-medium">{meter.name}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{meter.description}</div>
                </td>
                <td className="px-4 py-3 font-medium whitespace-nowrap tabular-nums">
                  {meter.rate}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{meter.allowance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Orders and stops are not on this list, and never will be.
      </p>
    </div>
  );
}
