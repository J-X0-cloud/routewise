/**
 * Domain types shared by the API route handlers and the in-memory service layer.
 * They mirror prisma/schema.prisma so the services can be swapped onto Prisma one-for-one.
 */

export const ORDER_STATUSES = [
  "DRAFT",
  "UNASSIGNED",
  "ASSIGNED",
  "IN_TRANSIT",
  "COMPLETED",
  "FAILED",
  "CANCELLED",
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const PRIORITIES = ["STANDARD", "RUSH", "STAT"] as const;
export type Priority = (typeof PRIORITIES)[number];

export const PROOF_KINDS = ["PHOTO", "SIGNATURE", "ID_CHECK", "BARCODE"] as const;
export type ProofKind = (typeof PROOF_KINDS)[number];

export type StopType = "PICKUP" | "DROPOFF" | "DEPOT";
export type StopStatus = "PENDING" | "EN_ROUTE" | "ARRIVED" | "COMPLETED" | "SKIPPED";
export type DriverStatus = "AVAILABLE" | "ON_ROUTE" | "ON_BREAK" | "OFF_DUTY";
export type VehicleType = "CARGO_VAN" | "BOX_TRUCK" | "REEFER" | "FLATBED" | "LIFTGATE_TRUCK";

export interface LatLng {
  lat: number;
  lng: number;
}

/** Minutes after midnight in the depot's local time. */
export interface TimeWindow {
  start: number;
  end: number;
}

export interface Stop extends LatLng {
  id: string;
  orderId: string;
  type: StopType;
  status: StopStatus;
  address: string;
  window?: TimeWindow;
  serviceMins: number;
  sequence?: number;
}

export interface OrderItem {
  sku: string;
  qty: number;
  weight: number;
}

export interface Order {
  id: string;
  reference: string;
  customerId: string;
  status: OrderStatus;
  priority: Priority;
  serviceLevel: string;
  items: OrderItem[];
  proof: ProofKind[];
  pickup: Stop;
  dropoff: Stop;
  routeId?: string;
  driverId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  rateCard: string;
}

export interface Driver {
  id: string;
  name: string;
  status: DriverStatus;
  skills: string[];
  vehicleId?: string;
  position: LatLng;
}

export interface Vehicle {
  id: string;
  label: string;
  type: VehicleType;
  capacityLbs: number;
  hasLiftgate: boolean;
  depotId: string;
}

export interface Depot extends LatLng {
  id: string;
  name: string;
  address: string;
}

export interface ProofOfDelivery {
  id: string;
  stopId: string;
  driverId: string;
  kind: ProofKind;
  capturedAt: string;
}

export interface PlannedStop {
  stopId: string;
  sequence: number;
  arrivalMinute: number;
  departureMinute: number;
  legMiles: number;
  /** Minutes past the window end; 0 when on time. */
  lateByMins: number;
}

export interface OptimizedRoute {
  vehicleId: string;
  stops: PlannedStop[];
  distanceMi: number;
  durationMin: number;
  lateStops: number;
}
