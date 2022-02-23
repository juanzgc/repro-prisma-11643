import { Prisma } from '@prisma/client';
import {Editor} from '@tiptap/react'
import _, { result } from 'lodash';

/**
 * Product Rental
 */


export type ProductType = {
  title: string;
  img: string;
  type: string;
  href: string;
}

export const adminGetBikeRentalsQuery = () : Prisma.bike_rentalFindManyArgs => {
  const query : Prisma.bike_rentalFindManyArgs = {
    where: {
      is_active: true
    },
    orderBy: {
      created_at: "desc"
    }
  }
  return query;
}

export const partnerGetBikeRentalsQuery = (partnerLocation: string[]) : Prisma.bike_rentalFindManyArgs => {
  const query : Prisma.bike_rentalFindManyArgs = {
    where: {
      product_location: {
        some: {
          location: {
            city_slug: {
              in: partnerLocation
            }
          }
        }
      },
      is_active: true
    },
    orderBy: {
      created_at: "desc"
    }
  }
  return query;
}

export const adminGetRentalsQuery = () : Prisma.rentalFindManyArgs => {
  const query : Prisma.rentalFindManyArgs = {
    where: {
      is_active: true
    },
    orderBy: {
      created_at: "desc"
    }
  };
  return query;
}

export const partnerGetRentalsQuery = (partnerLocation: string[]) : Prisma.rentalFindManyArgs => {
  const query : Prisma.rentalFindManyArgs = {
    where: {
      product_location: {
        some: {
          location: {
            city_slug: {
              in: partnerLocation
            }
          }
        }
      },
      is_active: true
    },
    orderBy: {
      created_at: "desc"
    }
  }
  return query;
}

type ProductLocationType = Prisma.product_locationGetPayload<{
  include: {
    location: true
  }
}>;

export type ProductLocationSEOType = {
  [id: string]: Editor;
}

export const postUpdatedProductLocationSEO = async (product_location: ProductLocationType[], productLocationSeo: ProductLocationSEOType) => {
  let prevProductLocations = {};
  product_location.forEach(p_l => {
    prevProductLocations[p_l.id] = p_l
  })
  
  let productLocationsToUpdate = [];
  Object.keys(productLocationSeo).forEach((key: string) => {
    const product_location_id = key;
    const editor : Editor = productLocationSeo[key];
    const jsonSeoDescription = editor.getJSON();
  
    if (!_.isEqual(prevProductLocations[key].seo_description, jsonSeoDescription)) {
      productLocationsToUpdate.push({
        id: Number(product_location_id),
        seo_description: jsonSeoDescription
      })
    }
  })
  
  if (productLocationsToUpdate.length >= 1) {
    let updatedSeoDescResult = await (
      await fetch(`/api/admin/product/description`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          seo_descriptions: productLocationsToUpdate
        })
      })
    ).json()
  
    if (updatedSeoDescResult.error) {
      console.error(updatedSeoDescResult);
      // openAlert("Error updating description", "error");
      // setProcessing(false);
      throw new Error("Unable to update product location SEO");
    }
  }
}
