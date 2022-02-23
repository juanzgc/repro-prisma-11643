import { Prisma } from '@prisma/client';
import prisma from 'lib/initPrisma';
import {ProductType} from 'utils/product';

export const getAllProductsByLocation = async (location_id: number) => {
  let products : ProductType[] = [];

  // Get Bike Rentals
  let bikeRentals = await prisma.bike_rental.findMany({
    where: {
      junction_bike_rental_variant__location: {
        some: {
          location_id: location_id
        }
      }
    }
  })

  // Get Rentals
  let rentals = await prisma.rental.findMany({
    where: {
      product_location: {
        some: {
          location_id: location_id
        }
      }
    }
  })

  bikeRentals.forEach((item, index) => {
    products.push({
      title: item.title,
      img: item.image,
      type: 'Bike Rental',
      href: `/admin/bike/${item.bike_slug}`
    })
  })

  rentals.forEach((item) => {
    products.push({
      title: item.title,
      img: item.image,
      type: item.rental_type,
      href: `/admin/rental/${item.rental_slug}`
    })
  })

  return products;
}