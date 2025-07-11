// Example page where you'd use the AmenitySelector component
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import {
  FindAmenityByHostelId,
  FindAmenityByHostelIdDocument,
  FindAmenityByHostelIdQuery,
  FindAmenityByHostelIdQueryVariables,
  AllAmenitiesOption,
  AllAmenitiesOptionQuery,
  AllAmenitiesOptionQueryVariables,
  AmenityOptionData,
} from 'src/gql/graphql';
import { AmenitySelector } from './AmenitySelector';
import LoadingSpinner from 'src/components/Loading';
import { useGraphQLQuery } from 'src/hooks/useGraphqlQuery';

export const HostelAmenitiesPage = ({ hostelId, isOnboarding = false, handleAmenityChange,onboardingAmenities }: { hostelId: number, isOnboarding?: boolean, handleAmenityChange?: (amenity: AmenityOptionData[]) => void,onboardingAmenities:AmenityOptionData[] }) => {
  // GraphQL query to fetch hostel details
  const queryAmenity = useGraphqlClientRequest<
    FindAmenityByHostelIdQuery,
    FindAmenityByHostelIdQueryVariables
  >(FindAmenityByHostelId.loc?.source.body!);
  const fetchData = async () => {
    const res = await queryAmenity({ hostelId });
    return res.findAmenityByHostelId ?? null;
  };

  const { data: allAmenityOptions,isLoading} = useGraphQLQuery<AllAmenitiesOptionQuery,AllAmenitiesOptionQueryVariables >({
    queryKey: ['allAmenityOptions'],
    query: AllAmenitiesOption.loc!.source.body,
    variables: {  },
    enabled: true
    }); 

  const {
    data,
    error,
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ['getAmenity'],
    queryFn: fetchData,
    enabled: !!hostelId,
    
  });

  // Callback function to refetch data after mutations
  const handleAmenityUpdate = () => {
    refetch();
  };

  if (loading || isLoading) return <LoadingSpinner />;
  if (error) return <p>Error: {error.message}</p>;

  // Get existing amenities or provide empty array if none
  const existingAmenities = JSON.parse(data?.data?.amenities || '[]');

  return (
    <div className="  md:p-4 ">
      <AmenitySelector
        hostelId={hostelId}
        existingAmenities={isOnboarding ? onboardingAmenities : existingAmenities}
        loading={loading}
        amenityId={Number(data?.data?.id)}
        allAmenityOptions={allAmenityOptions}
        onAmenityUpdate={handleAmenityUpdate}
        isOnboarding={isOnboarding}
        handleAmenityChangeFromOnboarding={handleAmenityChange}
      />
    </div>
  );
};
