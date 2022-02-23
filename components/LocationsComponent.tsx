import Image from 'next/image';
import Link from 'next/link';
import {LocationType} from 'utils/location';

export default function LocationsComponent({locations}: {locations: LocationType[]}) {

  if (!locations) return <p>No locations.</p>;

  return (
    <div className="bg-white">
      <div className="py-6">
        <div className="flex flex-wrap">
          {locations.map((location, id) => (
            <div key={id} className="w-1/2 lg:w-1/3 flex-grow lg:flex-grow-0 px-2 py-4">
            <Link href={`/locations/${location.city_slug}`} passHref>
              <a className="group">
                <div className="w-full bg-gray-200 rounded-lg overflow-hidden h-44 sm:h-60 relative border-2 border-gray-100">
                  <Image
                    src={location.image}
                    alt={location.city}
                    layout="fill"
                    objectFit="contain"
                    className="w-full h-full bg-white rounded-lg border border-gray-100"
                    quality={70}
                  />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-800">{location.city}</h3>
                <p className="mt-1 text-sm text-gray-500 uppercase">{location.country}</p>
              </a>
            </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}