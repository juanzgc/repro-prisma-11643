import type { NextApiRequest, NextApiResponse } from 'next'
import {LocationType} from 'utils/location';
import {adminGetLocations, partnerGetLocations} from 'utilsDb/location';
import LocationsComponent from 'components/LocationsComponent';

interface PageInterface {
  allLocations: LocationType[]
}

function ViewLocations({ allLocations}: PageInterface) {
  return (
    <>
      <main>
        <div className="flex-1 bg-white py-6 px-4 sm:rounded-md">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 px-2">Locations</h2>

          <LocationsComponent locations={allLocations} />
        </div>
      </main>

    </>

  )
}

export async function getServerSideProps({req, res, query}: {req: NextApiRequest, res: NextApiResponse, query: any}) {


  let allLocations : LocationType[] = [];
  allLocations = await adminGetLocations();


  return {
    props: {
      allLocations: allLocations
    }
  }
};


export default ViewLocations;
