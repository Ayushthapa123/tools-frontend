import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { AmenityCard } from './AmenityCard';
import {
  AllRoomAmenitiesOptionQuery,
  AllRoomAmenitiesOptionQueryVariables,
  AllRoomAmenitiesOption,
} from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';
import { useGraphQLQuery } from 'src/hooks/useGraphqlQuery';
import { AmenityOptionForm } from './AmenityOptionForm';

export const AllAmenities = () => {
  const { data: amenityData, isLoading } = useGraphQLQuery<
    AllRoomAmenitiesOptionQuery,
    AllRoomAmenitiesOptionQueryVariables
  >({
    queryKey: ['getRoomAmenityOptions'],
    query: AllRoomAmenitiesOption.loc!.source.body,
    variables: {},
    enabled: true,
  });
  return (
    <div className="w-full ">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Room Amenities</h1>
        <AmenityOptionForm />
      </div>
      <hr className="divider w-full" />

      <div className="grid gap-[1rem]">
        {amenityData?.roomAmenityOptions?.data?.map(amenity => (
          <div key={amenity.id} className="w-full">
            <AmenityCard amenity={amenity} />
          </div>
        ))}
      </div>
    </div>
  );
};
