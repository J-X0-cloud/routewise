import { createHmac, timingSafeEqual } from "node:crypto";

export type WebhookEventType =
  | "order.created"
  | "order.assigned"
  | "order.in_transit"
  | "order.completed"
  | "order.failed"
  | "order.cancelled"
  | "route.optimized";

export interface WebhookEvent<T = unknown> {
  id: string;
  type: WebhookEventType;
  createdAt: string;
  data: T;
}

const TOLERANCE_SECONDS = 300;

function secret(): string {
  const value = process.env.ROUTEWISE_WEBHOOK_SECRET;
  if (!value) throw new Error("ROUTEWISE_WEBHOOK_SECRET is not set");
  return value;
}

/**
 * Signature header format: `t=<unix seconds>,v1=<hex hmac-sha256 of "t.body">`.
 * Including the timestamp in the signed payload blocks replay of old deliveries.
 */
export function signPayload(body: string, timestamp = Math.floor(Date.now() / 1000)): string {
  const digest = createHmac("sha256", secret()).update(`${timestamp}.${body}`).digest("hex");
  return `t=${timestamp},v1=${digest}`;
}

export function verifySignature(
  body: string,
  header: string | null,
  now = Math.floor(Date.now() / 1000),
): boolean {
  if (!header) return false;
  const parts = Object.fromEntries(
    header.split(",").map((part) => part.split("=", 2) as [string, string]),
  );
  const timestamp = Number(parts.t);
  if (!Number.isFinite(timestamp) || Math.abs(now - timestamp) > TOLERANCE_SECONDS) return false;

  const expected = Buffer.from(signPayload(body, timestamp).split("v1=")[1] ?? "", "hex");
  const received = Buffer.from(parts.v1 ?? "", "hex");
  return expected.length === received.length && timingSafeEqual(expected, received);
}

/** Outbound events are queued here and flushed to subscriber endpoints by the delivery worker. */
const outbox: WebhookEvent[] = [];

export function enqueueEvent<T>(type: WebhookEventType, data: T): WebhookEvent<T> {
  const event: WebhookEvent<T> = {
    id: `evt_${crypto.randomUUID().replace(/-/g, "").slice(0, 20)}`,
    type,
    createdAt: new Date().toISOString(),
    data,
  };
  outbox.push(event);
  return event;
}

export function drainOutbox(): WebhookEvent[] {
  return outbox.splice(0, outbox.length);
}
