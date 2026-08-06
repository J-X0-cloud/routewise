import { customers, drivers } from "@/lib/data/fleet";
import { parseClock } from "@/lib/format";
import { geocoder, type Geocoder } from "@/lib/geocode";
import type { CreateOrderInput, ListOrdersQuery, UpdateOrderInput } from "@/lib/validation";
import { enqueueEvent, type WebhookEventType } from "@/lib/webhooks";
import type { Order, OrderStatus, Stop } from "@/types/domain";

export interface Page<T> {
  data: T[];
  nextCursor: string | null;
}

export interface OrderRepository {
  list(query: ListOrdersQuery): Promise<Page<Order>>;
  get(id: string): Promise<Order | null>;
  create(input: CreateOrderInput): Promise<Order>;
  update(id: string, input: UpdateOrderInput): Promise<Order>;
}

export class OrderNotFoundError extends Error {
  constructor(readonly orderId: string) {
    super(`Order ${orderId} was not found`);
    this.name = "OrderNotFoundError";
  }
}

export class DomainError extends Error {
  constructor(
    readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "DomainError";
  }
}

/** Allowed status moves. Anything not listed is rejected with a 409. */
const TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  DRAFT: ["UNASSIGNED", "CANCELLED"],
  UNASSIGNED: ["ASSIGNED", "CANCELLED"],
  ASSIGNED: ["UNASSIGNED", "IN_TRANSIT", "CANCELLED"],
  IN_TRANSIT: ["COMPLETED", "FAILED"],
  COMPLETED: [],
  FAILED: ["UNASSIGNED"],
  CANCELLED: [],
};

const STATUS_EVENTS: Partial<Record<OrderStatus, WebhookEventType>> = {
  ASSIGNED: "order.assigned",
  IN_TRANSIT: "order.in_transit",
  COMPLETED: "order.completed",
  FAILED: "order.failed",
  CANCELLED: "order.cancelled",
};

export function canTransition(from: OrderStatus, to: OrderStatus): boolean {
  return from === to || TRANSITIONS[from].includes(to);
}

const newId = (prefix: string) => `${prefix}_${crypto.randomUUID().replace(/-/g, "").slice(0, 12)}`;

/**
 * In-memory repository used for the sandbox API. It enforces the same rules as the
 * Prisma-backed repository so integrations can be built against it with sandbox keys.
 */
export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders = new Map<string, Order>();

  constructor(private readonly geo: Geocoder) {}

  async list(query: ListOrdersQuery): Promise<Page<Order>> {
    const all = [...this.orders.values()]
      .filter((order) => !query.status || order.status === query.status)
      .filter((order) => !query.priority || order.priority === query.priority)
      .filter((order) => !query.customerId || order.customerId === query.customerId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt) || b.id.localeCompare(a.id));

    const start = query.cursor ? all.findIndex((order) => order.id === query.cursor) + 1 : 0;
    const data = all.slice(start, start + query.limit);
    const hasMore = start + query.limit < all.length;
    return { data, nextCursor: hasMore ? (data.at(-1)?.id ?? null) : null };
  }

  async get(id: string): Promise<Order | null> {
    return this.orders.get(id) ?? null;
  }

  async create(input: CreateOrderInput): Promise<Order> {
    if (!customers.some((customer) => customer.id === input.customerId)) {
      throw new DomainError("unknown_customer", `Customer ${input.customerId} does not exist`);
    }
    const duplicate = [...this.orders.values()].find(
      (order) => order.customerId === input.customerId && order.reference === input.reference,
    );
    if (duplicate) {
      throw new DomainError("duplicate_reference", `Reference ${input.reference} already exists`);
    }

    const id = newId("ord");
    const [pickup, dropoff] = await Promise.all([
      this.toStop(id, "PICKUP", input.pickup),
      this.toStop(id, "DROPOFF", input.dropoff),
    ]);
    const now = new Date().toISOString();

    const order: Order = {
      id,
      reference: input.reference,
      customerId: input.customerId,
      status: "UNASSIGNED",
      priority: input.priority,
      serviceLevel: input.serviceLevel,
      items: input.items,
      proof: input.proof,
      pickup,
      dropoff,
      createdAt: now,
      updatedAt: now,
    };

    if (input.autoDispatch) {
      const driver = drivers.find((candidate) => candidate.status === "AVAILABLE");
      if (driver) {
        order.status = "ASSIGNED";
        order.driverId = driver.id;
      }
    }

    this.orders.set(id, order);
    enqueueEvent("order.created", order);
    if (order.status === "ASSIGNED") enqueueEvent("order.assigned", order);
    return order;
  }

  async update(id: string, input: UpdateOrderInput): Promise<Order> {
    const current = this.orders.get(id);
    if (!current) throw new OrderNotFoundError(id);

    let status = current.status;
    let driverId = current.driverId;

    if (input.driverId) {
      if (!drivers.some((driver) => driver.id === input.driverId)) {
        throw new DomainError("unknown_driver", `Driver ${input.driverId} does not exist`);
      }
      driverId = input.driverId;
      if (status === "UNASSIGNED") status = "ASSIGNED";
    }

    if (input.status) {
      if (!canTransition(status, input.status)) {
        throw new DomainError(
          "invalid_transition",
          `Cannot move an order from ${status} to ${input.status}`,
        );
      }
      status = input.status;
      if (status === "UNASSIGNED") driverId = undefined;
    }

    if (status === "ASSIGNED" && !driverId) {
      throw new DomainError("driver_required", "Assign a driver before marking an order assigned");
    }

    const next: Order = {
      ...current,
      status,
      driverId,
      priority: input.priority ?? current.priority,
      updatedAt: new Date().toISOString(),
    };
    this.orders.set(id, next);

    const event = status !== current.status ? STATUS_EVENTS[status] : undefined;
    if (event) enqueueEvent(event, next);
    return next;
  }

  private async toStop(
    orderId: string,
    type: Stop["type"],
    input: CreateOrderInput["pickup"],
  ): Promise<Stop> {
    const position = await this.geo.geocode(input.address);
    if (!position) {
      throw new DomainError("geocode_failed", `Could not locate "${input.address}"`);
    }
    return {
      id: newId("stp"),
      orderId,
      type,
      status: "PENDING",
      address: input.address,
      ...position,
      serviceMins: type === "PICKUP" ? 8 : 12,
      window: input.window
        ? { start: parseClock(input.window[0]), end: parseClock(input.window[1]) }
        : undefined,
    };
  }
}

const globalForOrders = globalThis as unknown as { orderRepository?: OrderRepository };

export const orderRepository: OrderRepository =
  globalForOrders.orderRepository ?? new InMemoryOrderRepository(geocoder);

if (process.env.NODE_ENV !== "production") globalForOrders.orderRepository = orderRepository;
