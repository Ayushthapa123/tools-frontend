"use client"
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { FaLightbulb } from 'react-icons/fa';
import { Modal } from 'src/components/Modal';
import { FindAmenityByHostelIdQueryVariables } from 'src/gql/graphql';
import { FindAmenityByHostelIdQuery } from 'src/gql/graphql';
import { FindAmenityByHostelId } from 'src/gql/graphql';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';

export default function AmenitiesProvided({hostelId}:{hostelId:number}) {

  const [ showAllAmenities, setShowAllAmenities ] = useState(false);

      // for amenities
  const queryAmenity = useGraphqlClientRequest<
  FindAmenityByHostelIdQuery,
  FindAmenityByHostelIdQueryVariables
>(FindAmenityByHostelId.loc?.source.body!);
const fetchData = async () => {
  const res = await queryAmenity({ hostelId});
  return res.findAmenityByHostelId ?? null;
};

const {
  data: amenities,
  error,
  isLoading: loading,
} = useQuery({
  queryKey: [ 'getAmenity' ],
  queryFn: fetchData,
  enabled: !!hostelId,
});

 // Parse the amenities string into an array
  // the reason for this logic is : From backend we were getting json of string of string; so 
  // if first parsing was still returning string, we parsed it again, ultimately double parsing
  const firstAmenityParse = amenities?.data?.amenities ? JSON.parse(amenities?.data?.amenities):[];
  const amenitiesArray = firstAmenityParse ? typeof firstAmenityParse === 'string' ? JSON.parse(firstAmenityParse):firstAmenityParse : [];

  const handleShowAllAmenities = () => {
    setShowAllAmenities((prev) => !prev);
  }
  
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
    <div className='flex items-start justify-between'>
      <h3 className="mb-4 text-lg font-semibold text-gray-800 ">
        Top Hostel Facilities
      </h3>
      {
        amenitiesArray.length > 6 && (
          <div className='text-sm text-gray-500 hover:text-gray-700 cursor-pointer' onClick={handleShowAllAmenities}>
            Show All
          </div>
        )
      }
    </div>
    <div className="grid grid-cols-2 items-start justify-between gap-x-2 gap-y-5">
      {amenitiesArray.length > 0 ? amenitiesArray.slice(0, 6).map((amenity: any) => (
        <div className="flex items-start gap-2" key={amenity.name}>
          <div className='flex items-center justify-start'>
            <FaLightbulb className='text-xl text-secondary' />
          </div>
          <span className='text-base font-medium text-gray-600'>{amenity.name}</span>
        </div>
      )) : <div className='text-center text-gray-500'>No top amenities found</div>}
    </div>
    <Modal title='All Amenities' open={showAllAmenities} actionLabel='Okay' key="all-amenities" onSave={() => setShowAllAmenities(false)} handleClose={() => setShowAllAmenities(false)} className='min-w-[70vw]'>
        <div className='border-t border-gray-300 py-4 grid grid-cols-2 gap-3'>
          {amenitiesArray && amenitiesArray.map((amenity: any) => (
            <div key={amenity.id} className='flex items-start gap-3 w-full'>
              <div className='flex items-center justify-start'>
                <FaLightbulb className='text-xl text-secondary' />
              </div>
              <span className='text-base font-semibold text-gray-600'>{amenity.name}</span>
            </div>
          ))
          }
        </div>
      </Modal>
  </div>
  )
}
