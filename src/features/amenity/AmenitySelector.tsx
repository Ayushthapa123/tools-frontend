'use client';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { BiCheckSquare, BiSquare } from 'react-icons/bi';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import Button from 'src/components/Button';
import {
  CreateAmenity,
  CreateAmenityMutation,
  CreateAmenityMutationVariables,
  UpdateAmenity,
  UpdateAmenityDocument,
  UpdateAmenityMutation,
  UpdateAmenityMutationVariables,
} from 'src/gql/graphql';
import { getAmenityCategories } from 'src/utils/amenityData';
import { enqueueSnackbar } from 'notistack';
export const AmenitySelector = ({
  hostelId,
  existingAmenities = '',
  loading,
  amenityId,
}: {
  hostelId: number;
  existingAmenities: any;
  loading: boolean;
  amenityId: number;
}) => {
  // Get amenity categories from shared utility
  const amenityCategories = getAmenityCategories();

  // Flatten all amenities for internal processing
  const allAmenities = Object.values(amenityCategories).flat();

  // State to track selected amenities
  const [selectedAmenities, setSelectedAmenities] = useState(existingAmenities);

  // State to track which categories are expanded/collapsed
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    Object.keys(amenityCategories).reduce((acc, category) => ({ ...acc, [category]: true }), {}),
  );

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

  // Handler for checkbox change
  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities((prevSelected: any) => {
      // Handle both string and array formats
      const currentSelected =
        typeof prevSelected === 'string'
          ? prevSelected.split(',').filter(Boolean)
          : [...prevSelected];

      if (currentSelected.some(item => item === amenity)) {
        // Remove if already selected
        return currentSelected.filter(item => item !== amenity).join(',');
      } else {
        // Add if not selected
        return [...currentSelected, amenity].join(',');
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

  // Handler to save amenities
  const handleUpdateAmenities = async () => {
    try {
      const amenitiesArray =
        typeof selectedAmenities === 'string'
          ? selectedAmenities.split(',').filter(Boolean)
          : selectedAmenities;

      updateAmenities({
        updateAmenityInput: {
          id: amenityId,
          amenity: Array.isArray(amenitiesArray) ? amenitiesArray.join(',') : amenitiesArray,
          hostelId: hostelId,
        },
      }).then(res => {
        if (res.updateAmenity.data?.id) {
          enqueueSnackbar('Amenities updated.', { variant: 'success' });
        }
      });
    } catch (err) {
      console.error('Error updating amenities:', err);
    }
  };

  const handleCreateAmenities = async () => {
    try {
      const amenitiesArray =
        typeof selectedAmenities === 'string'
          ? selectedAmenities.split(',').filter(Boolean)
          : selectedAmenities;

      await createAmenity({
        createAmenityInput: {
          amenity: Array.isArray(amenitiesArray) ? amenitiesArray.join(',') : amenitiesArray,
          hostelId: hostelId,
        },
      }).then(res => {
        if (res.createAmenity.data?.id) {
          enqueueSnackbar('Amenities created.', { variant: 'success' });
        }
      });
    } catch (err) {
      console.error('Error creating amenities:', err);
    }
  };

  // Handler to select all amenities in a category
  const selectAllInCategory = (category: string) => {
    const categoryAmenities = amenityCategories[category];

    setSelectedAmenities((prevSelected: any) => {
      // Convert to array if it's a string
      const currentSelected =
        typeof prevSelected === 'string'
          ? prevSelected.split(',').filter(Boolean)
          : [...prevSelected];

      // Add all category amenities that aren't already selected
      categoryAmenities.forEach((amenity: string) => {
        if (!currentSelected.includes(amenity)) {
          currentSelected.push(amenity);
        }
      });
      return currentSelected.join(',');
    });
  };

  // Handler to deselect all amenities in a category
  const deselectAllInCategory = (category: string) => {
    const categoryAmenities = amenityCategories[category];

    setSelectedAmenities((prevSelected: any) => {
      // Convert to array if it's a string
      const currentSelected =
        typeof prevSelected === 'string'
          ? prevSelected.split(',').filter(Boolean)
          : [...prevSelected];

      // Filter out all amenities from this category
      const newSelected = currentSelected.filter(amenity => !categoryAmenities.includes(amenity));

      return newSelected.join(',');
    });
  };

  // Calculate the selected count for each category
  const getCategorySelectedCount = (category: string) => {
    const categoryAmenities = amenityCategories[category];
    const selectedArray =
      typeof selectedAmenities === 'string'
        ? selectedAmenities.split(',').filter(Boolean)
        : selectedAmenities;

    return categoryAmenities.filter((amenity: string) => selectedArray.includes(amenity)).length;
  };

  return (
    <div className="mx-auto w-full rounded-lg border border-gray-100 bg-white/80 p-6 shadow-md">
      <h1 className="mb-2 text-2xl font-bold text-gray-800">Hostel Amenities</h1>
      <p className="mb-6 text-gray-600">Select all amenities available at your property.</p>
      {Object.keys(amenityCategories).map((category: any) => (
        <div key={category} className="mb-6 border-b border-gray-100 pb-4 last:border-b-0">
          <div
            className="group mb-3 flex cursor-pointer items-center justify-between"
            onClick={() => toggleCategory(category)}
          >
            <div className="flex items-center">
              <h2 className="group-hover:text-blue-600 text-lg font-semibold text-gray-800 transition-colors">
                {category}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({getCategorySelectedCount(category)}/{amenityCategories[category].length})
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
              {amenityCategories[category].map((amenity: string) => {
                // Check if the amenity is in the selectedAmenities
                const isSelected =
                  typeof selectedAmenities === 'string'
                    ? selectedAmenities.split(',').some(item => item === amenity)
                    : selectedAmenities.some((item: string) => item === amenity);

                return (
                  <div
                    key={amenity}
                    className={`flex items-center rounded-md p-2 transition-colors ${
                      isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleAmenityChange(amenity)}
                  >
                    <div className="mr-3">
                      {isSelected ? (
                        <BiCheckSquare className="text-blue-600 h-5 w-5" />
                      ) : (
                        <BiSquare className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <label
                      htmlFor={`amenity-${amenity}`}
                      className={`cursor-pointer ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}
                    >
                      {amenity}
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
            {typeof selectedAmenities === 'string'
              ? selectedAmenities.split(',').filter(Boolean).length
              : selectedAmenities.length}
          </span>{' '}
          of {allAmenities.length} amenities selected
        </div>
        <div>
          <Button
            label={loading ? 'Saving...' : 'Save Amenities'}
            onClick={existingAmenities === '' ? handleCreateAmenities : handleUpdateAmenities}
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
