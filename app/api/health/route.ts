import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/** Liveness + database reachability, used by the load balancer and uptime checks. */
export async function GET() {
  const startedAt = performance.now();
  try {
    await db.$queryRaw`SELECT 1`;
    return Response.json({
      status: "ok",
      database: "reachable",
      latencyMs: Math.round(performance.now() - startedAt),
    });
  } catch {
    return Response.json({ status: "degraded", database: "unreachable" }, { status: 503 });
  }
}
