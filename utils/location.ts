import { Prisma } from '@prisma/client'

export type LocationType = Prisma.locationGetPayload<{}>;

export type EditLocationType = Prisma.locationGetPayload<{
  include: {
    location_zone: true
  }
}>;

export type UpdateLocationBodyType = {
  seo_description?: string;
  image?: string;
  zone?: any[]
}
export const updateLocation = async (id: number, body: UpdateLocationBodyType) => {
  const resp = await (
    await fetch(`/api/admin/location/${id}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  })).json();
  return resp;
}