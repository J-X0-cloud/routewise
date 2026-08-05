import type { CodeSample } from "@/types/content";

export const developerIntro = {
  title: ["Plug Into the Systems", "You Already Run"],
  subtitle: "Routewise API & Webhooks",
  description:
    "A documented REST API, signed webhooks and a JavaScript SDK let your team connect order systems, ERPs and e-commerce stores in days — with sandbox keys from day one.",
} as const;

export const codeSamples: CodeSample[] = [
  {
    id: "create-order",
    title: "Create an order",
    description: "Push deliveries in from your OMS, ERP or store",
    filename: "create-order.js",
    language: "JavaScript",
    code: `import Routewise from '@routewise/sdk';

const rw = new Routewise(process.env.ROUTEWISE_KEY);

// Push a delivery in and let dispatch auto-assign it
const order = await rw.orders.create({
  reference: 'SO-48213',
  pickup:  { address: '1420 Industrial Pkwy, Fresno, CA' },
  dropoff: { address: '88 W Olive Ave, Visalia, CA',
             window: ['14:00', '16:00'] },
  items:   [{ sku: 'PAL-STD', qty: 2, weight: 180 }],
  proof:   ['photo', 'signature'],
  autoDispatch: true,
});

// Stream status changes back to your own stack
rw.events.on('order.completed', async (event) => {
  await erp.markDelivered(event.order.reference);
});`,
  },
  {
    id: "quote-route",
    title: "Quote a route",
    description: "Price a pickup and drop-off before you commit",
    filename: "quote-route.js",
    language: "JavaScript",
    code: `import Routewise from '@routewise/sdk';

const rw = new Routewise(process.env.ROUTEWISE_KEY);

// Price a job against the customer's rate card
const quote = await rw.quotes.create({
  customer: 'cus_valley_home',
  serviceLevel: 'two_person',
  pickup:  { address: '1420 Industrial Pkwy, Fresno, CA' },
  dropoff: { address: '410 N Willis St, Visalia, CA' },
  accessorials: ['stairs', 'haul_away'],
});

console.log(quote.total);      // 211.03
console.log(quote.distanceMi); // 44.49

// Book it only if the customer accepts the price
if (quote.total < 250) await rw.orders.fromQuote(quote.id);`,
  },
  {
    id: "subscribe-events",
    title: "Subscribe to events",
    description: "Stream status changes to your own systems",
    filename: "webhooks.js",
    language: "JavaScript",
    code: `import Routewise from '@routewise/sdk';

const rw = new Routewise(process.env.ROUTEWISE_KEY);

// Register an endpoint for the events you care about
await rw.webhooks.create({
  url: 'https://ops.example.com/routewise',
  events: ['order.assigned', 'stop.arrived', 'order.completed'],
});

// Verify the signature before trusting the payload
export async function POST(request) {
  const body = await request.text();
  const event = rw.webhooks.verify(body, request.headers);
  await queue.publish(event.type, event.data);
  return new Response(null, { status: 204 });
}`,
  },
  {
    id: "nearby-drivers",
    title: "Find nearby drivers",
    description: "Match rush work to the closest available van",
    filename: "nearby-drivers.js",
    language: "JavaScript",
    code: `import Routewise from '@routewise/sdk';

const rw = new Routewise(process.env.ROUTEWISE_KEY);

// Who can take a STAT pharmacy run right now?
const drivers = await rw.drivers.nearby({
  near: { lat: 36.7378, lng: -119.7871 },
  radiusMi: 10,
  status: 'available',
  skills: ['id_check'],
  limit: 3,
});

// Hand the job to the closest one
const [closest] = drivers;
await rw.orders.assign('ord_7Kq2', { driver: closest.id });`,
  },
];
