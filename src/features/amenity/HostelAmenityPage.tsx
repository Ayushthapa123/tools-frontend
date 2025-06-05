// Example page where you'd use the AmenitySelector component
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import {
  FindAmenityByHostelId,
  FindAmenityByHostelIdDocument,
  FindAmenityByHostelIdQuery,
  FindAmenityByHostelIdQueryVariables,
} from 'src/gql/graphql';
import { AmenitySelector } from './AmenitySelector';
import LoadingSpinner from 'src/components/Loading';

export const HostelAmenitiesPage = ({ hostelId }: { hostelId: number }) => {
  // GraphQL query to fetch hostel details
  const queryAmenity = useGraphqlClientRequest<
    FindAmenityByHostelIdQuery,
    FindAmenityByHostelIdQueryVariables
  >(FindAmenityByHostelId.loc?.source.body!);
  const fetchData = async () => {
    const res = await queryAmenity({ hostelId });
    return res.findAmenityByHostelId ?? null;
  };

  const {
    data,
    error,
    isLoading: loading,
  } = useQuery({
    queryKey: ['getAmenity'],
    queryFn: fetchData,
    enabled: !!hostelId,
  });
  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;

  // Get existing amenities or provide empty array if none
  const existingAmenities = JSON.parse(data?.data?.amenities || '[]');

  return (
    <div className="container mx-auto p-4">
      <AmenitySelector
        hostelId={hostelId}
        existingAmenities={existingAmenities}
        loading={loading}
        amenityId={Number(data?.data?.id)}
      />
    </div>
  );
};
