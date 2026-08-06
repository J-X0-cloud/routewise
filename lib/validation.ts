import { z } from "zod";

import { ORDER_STATUSES, PRIORITIES, PROOF_KINDS } from "@/types/domain";

const clock = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use 24-hour HH:MM");

export const timeWindowSchema = z
  .tuple([clock, clock])
  .refine(([start, end]) => start < end, "Window must end after it starts");

export const addressSchema = z.object({
  address: z.string().trim().min(5).max(200),
  window: timeWindowSchema.optional(),
});

export const orderItemSchema = z.object({
  sku: z.string().trim().min(1).max(64),
  qty: z.number().int().positive().max(999),
  weight: z.number().nonnegative().max(20_000),
});

export const createOrderSchema = z.object({
  reference: z.string().trim().min(1).max(64),
  customerId: z.string().min(1).default("cus_valley_home"),
  priority: z.enum(PRIORITIES).default("STANDARD"),
  serviceLevel: z.string().trim().min(1).max(32).default("standard"),
  pickup: addressSchema,
  dropoff: addressSchema,
  items: z.array(orderItemSchema).min(1).max(100),
  proof: z.array(z.enum(PROOF_KINDS)).max(4).default(["PHOTO"]),
  autoDispatch: z.boolean().default(false),
});
export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export const listOrdersSchema = z.object({
  status: z.enum(ORDER_STATUSES).optional(),
  priority: z.enum(PRIORITIES).optional(),
  customerId: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(25),
  cursor: z.string().optional(),
});
export type ListOrdersQuery = z.infer<typeof listOrdersSchema>;

export const updateOrderSchema = z
  .object({
    status: z.enum(ORDER_STATUSES).optional(),
    priority: z.enum(PRIORITIES).optional(),
    driverId: z.string().min(1).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, "Nothing to update");
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;

export const optimizeRouteSchema = z.object({
  depotId: z.string().min(1),
  vehicleId: z.string().min(1),
  startTime: clock.default("07:00"),
  stops: z
    .array(
      z.object({
        id: z.string().min(1),
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
        serviceMins: z.number().int().min(0).max(240).default(10),
        window: timeWindowSchema.optional(),
        weightLbs: z.number().nonnegative().optional(),
      }),
    )
    .min(1)
    .max(150),
});
export type OptimizeRouteInput = z.infer<typeof optimizeRouteSchema>;

export const quoteSchema = z.object({
  customerId: z.string().min(1),
  serviceLevel: z
    .enum(["standard", "two_person", "medical", "grocery", "heavy"])
    .default("standard"),
  pickup: z.object({ address: z.string().trim().min(5) }),
  dropoff: z.object({ address: z.string().trim().min(5) }),
  accessorials: z
    .array(z.enum(["stairs", "haul_away", "wait_time", "liftgate", "return"]))
    .default([]),
});
export type QuoteInput = z.infer<typeof quoteSchema>;

export const nearbyDriversSchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
  radiusMi: z.coerce.number().positive().max(100).default(10),
  status: z.enum(["AVAILABLE", "ON_ROUTE", "ON_BREAK", "OFF_DUTY"]).optional(),
  skills: z
    .string()
    .optional()
    .transform((value) => (value ? value.split(",").map((skill) => skill.trim()) : [])),
  limit: z.coerce.number().int().min(1).max(25).default(5),
});

export const estimateSchema = z.object({
  activeVehicles: z.number().int().min(0).max(500),
  drivers: z.number().int().min(0).max(500),
  depots: z.number().int().min(1).max(50),
  stopsPerMonth: z.number().int().min(0),
  smsPerMonth: z.number().int().min(0).default(0),
  apiCallsPerMonth: z.number().int().min(0).default(0),
  webhooksPerMonth: z.number().int().min(0).default(0),
  period: z.enum(["monthly", "annual"]).default("monthly"),
});
