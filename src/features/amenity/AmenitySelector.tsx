'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { BiCheckSquare, BiSquare } from 'react-icons/bi';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import Button from 'src/components/Button';
import {

  AllAmenitiesOption,
  AllAmenitiesOptionQuery,
  AllAmenitiesOptionQueryVariables,
  CreateAmenity,
  CreateAmenityMutation,
  CreateAmenityMutationVariables,
  UpdateAmenity,
  UpdateAmenityMutation,
  UpdateAmenityMutationVariables,
  HostelAmenityType,
  AmenityOption,
  AmenityOptionData,
} from 'src/gql/graphql';
import { enqueueSnackbar } from 'notistack';
import { useGraphQLQuery } from 'src/hooks/useGraphqlQuery';
export const AmenitySelector = ({
  hostelId,
  existingAmenities = [],
  loading,
  amenityId,
  allAmenityOptions,
  onAmenityUpdate,
}: {
  hostelId: number;
  existingAmenities: AmenityOptionData[];
  loading: boolean;
  amenityId: number;
  allAmenityOptions: AllAmenitiesOptionQuery | undefined;
  onAmenityUpdate?: () => void;
}) => {

  // get amenity options from the database


// format them in such way they seperate according to amenityType
// retun in format like {HostelAmenityType.Other:[{name,description,id}]}
// also sort them according to amenityType. place other at the end
const formattedAmenityOptions = allAmenityOptions?.amenityOptions?.data?.reduce(
  (acc, amenity) => { 
    const type = amenity.hostelAmenityType;

    if (!acc[type]) {
      acc[type] = [];
    }

    acc[type].push({
      name: amenity.name,
      description: amenity.description??"",
      id: amenity.id,
      hostelAmenityType: type
    });

    return acc;
  },
  {} as Record<HostelAmenityType, { name: string; description: string; id: string; hostelAmenityType: HostelAmenityType }[]>
); 

console.log("ffffffffffffffffffffffff",formattedAmenityOptions)


  // Flatten all amenities for internal processing
  const allAmenities = Object.values(formattedAmenityOptions || {}).flat();

  // State to track selected amenities
  const [selectedAmenities, setSelectedAmenities] = useState<AmenityOptionData[]>(existingAmenities);

  // State to track which categories are expanded/collapsed
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    Object.keys(formattedAmenityOptions || {}).reduce((acc, category) => ({ ...acc, [category]: true }), {})
  );

  // Helper function to get count of selected amenities in a category
  const getCategorySelectedCount = (category: string) => {
    const categoryAmenities = formattedAmenityOptions?.[category as HostelAmenityType] || [];
    return categoryAmenities.filter(amenity => 
      selectedAmenities.some(selected => selected.id === amenity.id)
    ).length;
  };

  // Handler to select all amenities in a category
  const selectAllInCategory = (category: string) => {
    const categoryAmenities = formattedAmenityOptions?.[category as HostelAmenityType] || [];
    const newSelectedAmenities = [...selectedAmenities];
    
    categoryAmenities.forEach(amenity => {
      if (!newSelectedAmenities.some(selected => selected.id === amenity.id)) {
        newSelectedAmenities.push({
          id: amenity.id,
          name: amenity.name,
          description: amenity.description,
          hostelAmenityType: category as HostelAmenityType
        });
      }
    });
    
    setSelectedAmenities(newSelectedAmenities);
  };

  // Handler to deselect all amenities in a category
  const deselectAllInCategory = (category: string) => {
    const categoryAmenities = formattedAmenityOptions?.[category as HostelAmenityType] || [];
    const categoryIds = categoryAmenities.map(amenity => amenity.id);
    
    setSelectedAmenities(prev => 
      prev.filter(amenity => !categoryIds.includes(amenity.id))
    );
  };

  // Handler to toggle individual amenity selection
  const handleAmenityChange = (amenityId: string) => {
    setSelectedAmenities(prev => {
      const isSelected = prev.some(amenity => amenity.id === amenityId);
      if (isSelected) {
        return prev.filter(amenity => amenity.id !== amenityId);
      } else {
        const amenityToAdd = allAmenities.find(amenity => amenity.id === amenityId);
        if (amenityToAdd) {
          return [...prev, {
            id: amenityToAdd.id,
            name: amenityToAdd.name,
            description: amenityToAdd.description,
            hostelAmenityType: amenityToAdd.hostelAmenityType
          }];
        }
        return prev;
      }
    });
  };

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Apollo mutation hooks
  const mutateUpdateAmenities = useGraphqlClientRequest<
    UpdateAmenityMutation,
    UpdateAmenityMutationVariables
  >(UpdateAmenity.loc?.source.body!);

  const { mutateAsync: updateAmenities, isPending: isUpdateAmenityPending } = useMutation({
    mutationFn: mutateUpdateAmenities,
    mutationKey: ['update amenity'],
  });

  const mutateCreateAmenities = useGraphqlClientRequest<
    CreateAmenityMutation,
    CreateAmenityMutationVariables
  >(CreateAmenity.loc?.source.body!);

  const { mutateAsync: createAmenity, isPending: isCreateAmenityPending } = useMutation({
    mutationFn: mutateCreateAmenities,
  });

  // Handler to save amenities
  const handleUpdateAmenities = async () => {
    try {
      const amenitiesArray =selectedAmenities;

      updateAmenities({
        updateAmenityInput: {
          id: amenityId,
          amenity: JSON.stringify(amenitiesArray),
          hostelId: hostelId,
        },
      }).then(res => {
        if (res.updateAmenity.data?.id) {
          enqueueSnackbar('Amenities updated.', { variant: 'success' });
          if (onAmenityUpdate) {
            onAmenityUpdate();
          }
        }
      });
    } catch (err) {
      console.error('Error updating amenities:', err);
    }
  };

  const handleCreateAmenities = async () => {
    try {
      const amenitiesArray= selectedAmenities;

      await createAmenity({
        createAmenityInput: {
          amenity: JSON.stringify(amenitiesArray),
          hostelId: hostelId,
        },
      }).then(res => {
        if (res.createAmenity.data?.id) {
          enqueueSnackbar('Amenities created.', { variant: 'success' });
          if (onAmenityUpdate) {
            onAmenityUpdate();
          }
        }
      });
    } catch (err) {
      console.error('Error creating amenities:', err);
    }
  };

  return (
    <div className="mx-auto w-full rounded-lg border border-gray-100 bg-white/80 p-6 shadow-md">
      <h1 className="mb-2 text-2xl font-bold text-gray-800">Hostel Amenities</h1>
      <p className="mb-6 text-gray-600">Select all amenities available at your property.</p>
      {Object.keys(formattedAmenityOptions || {}).map((category) => (
        <div key={category} className="mb-6 border-b border-gray-100 pb-4 last:border-b-0">
          <div
            className="group mb-3 flex cursor-pointer items-center justify-between"
            onClick={() => toggleCategory(category)}
          >
            <div className="flex items-center">
              <h2 className="group-hover:text-blue-600 text-lg font-semibold text-gray-800 transition-colors">
                {category}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({getCategorySelectedCount(category)}/{formattedAmenityOptions?.[category as HostelAmenityType]?.length || 0})
                </span>
              </h2>
            </div>
            <div className="flex md:space-x-2">
              <button
                onClick={e => {
                  e.stopPropagation();
                  selectAllInCategory(category);
                }}
                className="text-nowrap rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-gray-700 underline transition-colors hover:bg-gray-50"
              >
                Select All
              </button>
              <button
                onClick={e => {
                  e.stopPropagation();
                  deselectAllInCategory(category);
                }}
                className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-gray-700 underline transition-colors hover:bg-gray-50"
              >
                Clear
              </button>
            </div>
          </div>

          {expandedCategories[category] && (
            <div className="mt-2 grid grid-cols-1 gap-3 pl-8 md:grid-cols-2">
              {formattedAmenityOptions?.[category as HostelAmenityType]?.map((amenity) => {
                const isSelected = selectedAmenities.some(selected => selected.id === amenity.id);

                return (
                  <div
                    key={amenity.id}
                    className={`flex items-center rounded-md p-2 transition-colors ${
                      isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleAmenityChange(amenity.id)}
                  >
                    <div className="mr-3">
                      {isSelected ? (
                        <BiCheckSquare className="text-blue-600 h-5 w-5" />
                      ) : (
                        <BiSquare className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <label
                      htmlFor={`amenity-${amenity.id}`}
                      className={`cursor-pointer ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}
                    >
                      {amenity.name}
                    </label>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}

      <div className="mt-6 flex flex-col items-start justify-between border-t border-gray-100 pt-4 sm:flex-row sm:items-center">
        <div className="mb-4 text-sm text-gray-500 sm:mb-0">
          <span className="text-blue-600 font-medium">
            {selectedAmenities.length}
          </span>{' '}
          of {allAmenities.length} amenities selected
        </div>
        <div>
          <Button
            label={loading ? 'Saving...' : 'Save Amenities'}
            onClick={existingAmenities.length === 0 ? handleCreateAmenities : handleUpdateAmenities}
            disabled={loading || isUpdateAmenityPending || isCreateAmenityPending}
            className={`rounded-full px-4 py-2 font-medium ${
              loading || isUpdateAmenityPending || isCreateAmenityPending
                ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
