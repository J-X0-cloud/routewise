import { PrismaClient } from "@prisma/client";

import { customers, depots, drivers, vehicles } from "../lib/data/fleet";

const prisma = new PrismaClient();

async function main() {
  for (const depot of depots) {
    await prisma.depot.upsert({
      where: { id: depot.id },
      update: {},
      create: {
        id: depot.id,
        name: depot.name,
        address: depot.address,
        lat: depot.lat,
        lng: depot.lng,
      },
    });
  }

  for (const customer of customers) {
    await prisma.customer.upsert({
      where: { id: customer.id },
      update: {},
      create: { id: customer.id, name: customer.name, rateCard: customer.rateCard },
    });
  }

  for (const vehicle of vehicles) {
    await prisma.vehicle.upsert({
      where: { id: vehicle.id },
      update: {},
      create: {
        id: vehicle.id,
        label: vehicle.label,
        plate: `CA-${vehicle.id.slice(-2).toUpperCase()}${vehicle.capacityLbs}`,
        type: vehicle.type,
        capacityLbs: vehicle.capacityLbs,
        hasLiftgate: vehicle.hasLiftgate,
        depotId: vehicle.depotId,
      },
    });
  }

  for (const driver of drivers) {
    await prisma.driver.upsert({
      where: { id: driver.id },
      update: {},
      create: {
        id: driver.id,
        name: driver.name,
        phone: "+1 559 555 0100",
        status: driver.status,
        skills: driver.skills,
        lastLat: driver.position.lat,
        lastLng: driver.position.lng,
        lastPingAt: new Date(),
      },
    });
  }

  const order = await prisma.order.upsert({
    where: { customerId_reference: { customerId: "cus_valley_home", reference: "SO-48213" } },
    update: {},
    create: {
      reference: "SO-48213",
      customerId: "cus_valley_home",
      serviceLevel: "two_person",
      proof: ["PHOTO", "SIGNATURE"],
      weightLbs: 360,
      pallets: 2,
      stops: {
        create: [
          {
            type: "PICKUP",
            address: "1420 Industrial Pkwy, Fresno, CA",
            lat: 36.7064,
            lng: -119.7412,
            serviceMins: 8,
          },
          {
            type: "DROPOFF",
            address: "88 W Olive Ave, Visalia, CA",
            lat: 36.3346,
            lng: -119.2934,
            windowStart: 840,
            windowEnd: 960,
            serviceMins: 20,
          },
        ],
      },
    },
  });

  console.log(
    `Seeded ${depots.length} depots, ${drivers.length} drivers and order ${order.reference}`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
