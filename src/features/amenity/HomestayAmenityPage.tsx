// Example page where you'd use the AmenitySelector component
import { useQuery } from '@tanstack/react-query';
import React, {  } from 'react';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { FindAmenityByHomestayId, FindAmenityByHomestayIdDocument, FindAmenityByHomestayIdQuery, FindAmenityByHomestayIdQueryVariables } from 'src/gql/graphql';
import { AmenitySelector } from './AmenitySelector';
import LoadingSpinner from 'src/components/Loading';



export const HomestayAmenitiesPage = ({ homestayId }: { homestayId: number }) => {
  // GraphQL query to fetch homestay details
  const queryAmenity = useGraphqlClientRequest<FindAmenityByHomestayIdQuery, FindAmenityByHomestayIdQueryVariables>(FindAmenityByHomestayId.loc?.source.body!)
  const fetchData = async () => {
    const res = await queryAmenity({homestayId});
    return res.findAmenityByHomestayId ?? null;
  };    

  const { data, error, isLoading: loading } = useQuery({
    queryKey: [ 'getAmenity' ],
    queryFn: fetchData,
    enabled: !!homestayId,
  });
  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;

  // Get existing amenities or provide empty array if none
  const existingAmenities = data?.data?.amenity || "";

  return (
    <div className="container mx-auto p-4">
      <AmenitySelector
        homestayId={(homestayId)}
        existingAmenities={existingAmenities}
        loading={loading}
        amenityId={Number(data?.data?.id)}
      />
    </div>
  );
};
