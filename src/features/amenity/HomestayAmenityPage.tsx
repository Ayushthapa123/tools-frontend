// Example page where you'd use the AmenitySelector component
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { FindAmenityByHomestayId, FindAmenityByHomestayIdDocument, FindAmenityByHomestayIdQuery, FindAmenityByHomestayIdQueryVariables } from 'src/gql/graphql';
import AmenitySelector from './AmenitySelector';



const HomestayAmenitiesPage = ({ homestayId }: { homestayId: number }) => {
  // GraphQL query to fetch homestay details
  const queryAmenity = useGraphqlClientRequest<FindAmenityByHomestayIdQuery, FindAmenityByHomestayIdQueryVariables>(FindAmenityByHomestayId.loc?.source.body!)
  const fetchData = async () => {
    const res = await queryAmenity({homestayId});
    console.log("fetching amenity", res);
    return res.findAmenityByHomestayId[0] ?? null;
  };    

  const { data, error, isLoading: loading } = useQuery({
    queryKey: [ 'getAmenity' ],
    queryFn: fetchData,
    enabled: !!homestayId,
  });
  if (loading) return <p>Loading...</p>;
  console.log("amm", data);
  if (error) return <p>Error: {error.message}</p>;

  // Get existing amenities or provide empty array if none
  const existingAmenities = data?.amenity || "";

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        {/* <h1 className="text-3xl font-bold mb-2">{data.homestay.name}</h1> */}
        <p className="text-gray-600">Manage amenities for your homestay</p>
      </div>

      <AmenitySelector
        homestayId={(homestayId)}
        existingAmenities={existingAmenities}
        loading={loading}
        amenityId={Number(data?.id)}
      />
    </div>
  );
};

export default HomestayAmenitiesPage;