import { Prisma } from '@prisma/client'
import prisma from 'lib/initPrisma';

export const adminGetLocations = async () => {
  const locations = await prisma.location.findMany({
    orderBy: [
      {
        country: 'asc'
      },
      {
        city: "asc"
      }
    ]
  })

  return locations;
}

export const partnerGetLocations = async (partnerLocation: string[]) => {
  const lowerPartnerLocation = partnerLocation.map(loc => loc.toLowerCase());

  const locations = await prisma.location.findMany({
    where: {
      city_slug: {
        in: lowerPartnerLocation
      }
    },
  });
  return locations;
}

export const getLocation = async (city_slug: string) => {
  const location = await prisma.location.findUnique({
    where: {
      city_slug: city_slug
    },
    include: {
      location_zone: true,
      junction_bike_rental_variant__location: {
        include: {
          bike_rental: true
        }
      }
    }
  })
  return location;
}
