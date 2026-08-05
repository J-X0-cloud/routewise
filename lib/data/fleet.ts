import type { Customer, Depot, Driver, Vehicle } from "@/types/domain";

/**
 * Sandbox fleet used by the API routes in development and by `prisma db seed`.
 * Coordinates are real Central Valley and Sierra locations so ETAs look plausible.
 */

export const depots: Depot[] = [
  {
    id: "dep_fresno",
    name: "Fresno Main Yard",
    address: "1420 Industrial Pkwy, Fresno, CA",
    lat: 36.7064,
    lng: -119.7412,
  },
  {
    id: "dep_sacramento",
    name: "Sacramento Cross-Dock",
    address: "8250 Power Ridge Rd, Sacramento, CA",
    lat: 38.4705,
    lng: -121.4151,
  },
  {
    id: "dep_reno",
    name: "Reno Hub",
    address: "550 Edison Way, Reno, NV",
    lat: 39.5122,
    lng: -119.7735,
  },
];

export const customers: Customer[] = [
  { id: "cus_valley_home", name: "Valley Home Furnishings", rateCard: "two_person" },
  { id: "cus_sierra_rx", name: "Sierra Pharmacy Group", rateCard: "medical" },
  { id: "cus_centralfresh", name: "Central Fresh Grocers", rateCard: "grocery" },
  { id: "cus_ridgeline", name: "Ridgeline Building Supply", rateCard: "heavy" },
];

export const vehicles: Vehicle[] = [
  {
    id: "veh_van_04",
    label: "Van 04",
    type: "CARGO_VAN",
    capacityLbs: 3500,
    hasLiftgate: false,
    depotId: "dep_fresno",
  },
  {
    id: "veh_box_11",
    label: "Box 11",
    type: "BOX_TRUCK",
    capacityLbs: 9800,
    hasLiftgate: true,
    depotId: "dep_fresno",
  },
  {
    id: "veh_reefer_02",
    label: "Reefer 02",
    type: "REEFER",
    capacityLbs: 7200,
    hasLiftgate: true,
    depotId: "dep_fresno",
  },
  {
    id: "veh_flat_07",
    label: "Flatbed 07",
    type: "FLATBED",
    capacityLbs: 14000,
    hasLiftgate: false,
    depotId: "dep_sacramento",
  },
];

export const drivers: Driver[] = [
  {
    id: "drv_marisol",
    name: "Marisol Vega",
    status: "AVAILABLE",
    skills: ["id_check", "cold_chain"],
    vehicleId: "veh_reefer_02",
    position: { lat: 36.7468, lng: -119.7726 },
  },
  {
    id: "drv_dante",
    name: "Dante Okafor",
    status: "ON_ROUTE",
    skills: ["two_person", "liftgate"],
    vehicleId: "veh_box_11",
    position: { lat: 36.3302, lng: -119.2921 },
  },
  {
    id: "drv_hannah",
    name: "Hannah Lindqvist",
    status: "AVAILABLE",
    skills: ["id_check"],
    vehicleId: "veh_van_04",
    position: { lat: 36.8252, lng: -119.7029 },
  },
  {
    id: "drv_tomas",
    name: "Tomás Reyes",
    status: "ON_BREAK",
    skills: ["liftgate", "crane"],
    vehicleId: "veh_flat_07",
    position: { lat: 38.5816, lng: -121.4944 },
  },
];

/** Known addresses resolve instantly; anything else goes through the geocoder. */
export const addressBook: Record<string, { lat: number; lng: number }> = {
  "1420 Industrial Pkwy, Fresno, CA": { lat: 36.7064, lng: -119.7412 },
  "88 W Olive Ave, Visalia, CA": { lat: 36.3346, lng: -119.2934 },
  "410 N Willis St, Visalia, CA": { lat: 36.3337, lng: -119.2987 },
  "2823 Fresno St, Fresno, CA": { lat: 36.7477, lng: -119.7871 },
  "1015 E Main St, Hanford, CA": { lat: 36.3274, lng: -119.6457 },
  "301 E Tulare Ave, Tulare, CA": { lat: 36.2077, lng: -119.3401 },
  "1203 G St, Reedley, CA": { lat: 36.5963, lng: -119.4504 },
  "550 Edison Way, Reno, NV": { lat: 39.5122, lng: -119.7735 },
};
