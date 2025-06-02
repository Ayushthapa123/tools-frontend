'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import {
  CreateRoomAmenity,
  CreateRoomAmenityMutation,
  CreateRoomAmenityMutationVariables,
  FindAmenityByRoomId,
  FindAmenityByRoomIdQuery,
  FindAmenityByRoomIdQueryVariables,
  UpdateRoomAmenity,
  UpdateRoomAmenityMutation,
  UpdateRoomAmenityMutationVariables,
  AllRoomAmenitiesOption,
  AllRoomAmenitiesOptionQuery,
  AllRoomAmenitiesOptionQueryVariables,
  RoomAmenityOptionData,
} from 'src/gql/graphql';

import Button from 'src/components/Button';
import LoadingSpinner from 'src/components/Loading';
import { enqueueSnackbar } from 'notistack';
import { useGraphQLQuery } from 'src/hooks/useGraphqlQuery';
import { BiCheckSquare, BiSquare } from 'react-icons/bi';

export default function RoomAmenityPage({
  handleBack,
  roomId,
}: {
  handleBack: () => void;
  roomId: number;
}) {
  const [selectedRoomAmenity, setSelectedRoomAmenity] = useState<RoomAmenityOptionData[]>([]);
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch all available room amenity options
  const { data: amenityOptions, isLoading: isLoadingOptions } = useGraphQLQuery<
    AllRoomAmenitiesOptionQuery,
    AllRoomAmenitiesOptionQueryVariables
  >({
    queryKey: ['getRoomAmenityOptions'],
    query: AllRoomAmenitiesOption.loc!.source.body,
    variables: {},
    enabled: true,
  });

  // room amenity fetching
  const queryValidity = useGraphqlClientRequest<
    FindAmenityByRoomIdQuery,
    FindAmenityByRoomIdQueryVariables
  >(FindAmenityByRoomId.loc?.source?.body!);
  const getRoomAmenities = async () => {
    const res = await queryValidity({
      roomId: roomId,
    });
    return res.findAmenityByRoomId;
  };
  const { data, isLoading } = useQuery({
    queryKey: ['getRoomAmenities'],
    queryFn: () => getRoomAmenities(),
  });

  useEffect(() => {
    if (data?.data?.amenity) {
      try {
        const parsedAmenities = JSON.parse(data.data.amenity);
        setSelectedRoomAmenity(parsedAmenities);
      } catch (error) {
        console.error('Error parsing amenities:', error);
        setSelectedRoomAmenity([]);
      }
    }
  }, [data?.data?.amenity]);

  //create room amenity
  const mutateRoomAmenity = useGraphqlClientRequest<
    CreateRoomAmenityMutation,
    CreateRoomAmenityMutationVariables
  >(CreateRoomAmenity.loc?.source.body!);

  const { mutateAsync } = useMutation({ mutationFn: mutateRoomAmenity });

  //update room amenity
  const updateRoomAmenity = useGraphqlClientRequest<
    UpdateRoomAmenityMutation,
    UpdateRoomAmenityMutationVariables
  >(UpdateRoomAmenity.loc?.source.body!);

  const { mutateAsync: updateAmenity } = useMutation({ mutationFn: updateRoomAmenity });

  const handleToggle = (amenity: RoomAmenityOptionData) => {
    setSelectedRoomAmenity(prev =>
      prev.some(item => item.id === amenity.id)
        ? prev.filter(item => item.id !== amenity.id)
        : [...prev, amenity],
    );
  };

  const selectAll = () => {
    if (amenityOptions?.roomAmenityOptions?.data) {
      setSelectedRoomAmenity(amenityOptions.roomAmenityOptions.data);
    }
  };

  const clearAll = () => {
    setSelectedRoomAmenity([]);
  };

  const handleFinish = () => {
    router.push(`/app/room`);
  };

  const handleSave = () => {
    if (!data?.data?.id) {
      mutateAsync({
        createAmenityInput: { roomId, amenity: JSON.stringify(selectedRoomAmenity) },
      }).then(res => {
        if (res?.createRoomAmenity.data?.id) {
          queryClient.invalidateQueries({ queryKey: ['getRoomAmenities'] });
          enqueueSnackbar('Amenities Created Successfully!', { variant: 'success' });
        } else {
          enqueueSnackbar('Amenities Not Created!', { variant: 'error' });
        }
      });
    } else {
      updateAmenity({
        updateAmenityInput: {
          id: Number(data?.data?.id),
          amenity: JSON.stringify(selectedRoomAmenity),
        },
      }).then(res => {
        if (res?.updateRoomAmenity.data?.id) {
          queryClient.invalidateQueries({ queryKey: ['getRoomAmenities'] });
          enqueueSnackbar('Amenities Updated Successfully!', { variant: 'success' });
        } else {
          enqueueSnackbar('Amenities Not Updated!', { variant: 'error' });
        }
      });
    }
  };

  if (isLoading || isLoadingOptions) return <LoadingSpinner color="primary" size="lg" />;

  return (
    <div className="mx-auto mt-8 rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Select Room Amenities</h2>
        <div className="flex gap-2">
          <button
            onClick={selectAll}
            className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-gray-700 underline transition-colors hover:bg-gray-50">
            Select All
          </button>
          <button
            onClick={clearAll}
            className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-gray-700 underline transition-colors hover:bg-gray-50">
            Clear All
          </button>
        </div>
      </div>
      <p className="mb-6 text-gray-600">Select all amenities available in this room.</p>

      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        {amenityOptions?.roomAmenityOptions?.data?.map(amenity => {
          const isSelected = selectedRoomAmenity.some(selected => selected.id === amenity.id);

          return (
            <div
              key={amenity.id}
              className={`flex items-center rounded-md p-2 transition-colors ${
                isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => handleToggle(amenity)}>
              <div className="mr-3">
                {isSelected ? (
                  <BiCheckSquare className="text-blue-600 h-5 w-5" />
                ) : (
                  <BiSquare className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <label
                htmlFor={`amenity-${amenity.id}`}
                className={`cursor-pointer ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
                {amenity.name}
              </label>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col items-start  border-t border-gray-100 pt-4">
        <div className="flex w-full flex-col  justify-between gap-4 ">
          <div className="text-sm text-gray-500">
            <span className="text-blue-600 font-medium">{selectedRoomAmenity.length}</span> of{' '}
            {amenityOptions?.roomAmenityOptions?.data?.length || 0} amenities selected
          </div>

          <div className="mt-4 flex w-full gap-3 justify-between ">
            <div>
              <Button
                label="Back"
                onClick={handleBack}
                className="border border-gray-300 text-gray-700 hover:bg-gray-50"
              />
            </div>
            <div className=" flex ">
              <div className=" flex w-auto  gap-3">
                <Button
                  label="Save Amenities"
                  variant="primary"
                  onClick={handleSave}
                  className=""
                />
                <Button
                  label="Done"
                  variant="primary"
                  onClick={handleFinish}
                  className=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
