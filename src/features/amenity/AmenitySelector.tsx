"use client";
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { BiCheckSquare, BiSquare } from 'react-icons/bi';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import Button from 'src/components/Button';
import { CreateAmenity, CreateAmenityMutation, CreateAmenityMutationVariables, UpdateAmenity, UpdateAmenityDocument, UpdateAmenityMutation, UpdateAmenityMutationVariables } from 'src/gql/graphql';
import { getAmenityCategories } from 'src/utils/amenityData';
import { enqueueSnackbar } from 'notistack';
  export const AmenitySelector = ({
  homestayId,
  existingAmenities = "",
  loading,
  amenityId
}: {
  homestayId: number,
  existingAmenities: any,
  loading: boolean,
  amenityId: number
}) => {
  // Get amenity categories from shared utility
  const amenityCategories = getAmenityCategories();

  // Flatten all amenities for internal processing
  const allAmenities = Object.values(amenityCategories).flat();

  // State to track selected amenities
  const [ selectedAmenities, setSelectedAmenities ] = useState(existingAmenities);

  // State to track which categories are expanded/collapsed
  const [ expandedCategories, setExpandedCategories ] = useState<Record<string, boolean>>(
    Object.keys(amenityCategories).reduce((acc, category) => ({ ...acc, [ category ]: true }), {})
  );

  // Apollo mutation hooks
  const mutateUpdateAmenities = useGraphqlClientRequest<
    UpdateAmenityMutation,
    UpdateAmenityMutationVariables
  >(UpdateAmenity.loc?.source.body!);

  const { mutateAsync: updateAmenities, isPending: isUpdateAmenityPending } = useMutation({
    mutationFn: mutateUpdateAmenities,
    mutationKey: [ "update amenity" ]
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
      const currentSelected = typeof prevSelected === 'string'
        ? prevSelected.split(',').filter(Boolean)
        : [ ...prevSelected ];

      if (currentSelected.some((item) => item === amenity)) {
        // Remove if already selected
        return currentSelected.filter(item => item !== amenity).join(',');
      } else {
        // Add if not selected
        return [ ...currentSelected, amenity ].join(',');
      }
    });

  };

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [ category ]: !prev[ category ]
    }));
  };

  // Handler to save amenities
  const handleUpdateAmenities = async () => {
    try {
      const amenitiesArray = typeof selectedAmenities === 'string'
        ? selectedAmenities.split(',').filter(Boolean)
        : selectedAmenities;

    updateAmenities({
        updateAmenityInput: {
          id: amenityId,
          amenity: Array.isArray(amenitiesArray) ? amenitiesArray.join(',') : amenitiesArray,
          homestayId: homestayId
        }
      }).then((res) => {
        if (res.updateAmenity.data?.id) {
          enqueueSnackbar("Amenities updated.",{variant:'success'})
        }
      });

    } catch (err) {
      console.error("Error updating amenities:", err);
    }
  };

  const handleCreateAmenities = async () => {
    try {
      const amenitiesArray = typeof selectedAmenities === 'string'
        ? selectedAmenities.split(',').filter(Boolean)
        : selectedAmenities;

      await createAmenity({
        createAmenityInput: {
          amenity: Array.isArray(amenitiesArray) ? amenitiesArray.join(',') : amenitiesArray,
          homestayId: homestayId
        }
      }).then((res) => {
        if (res.createAmenity.data?.id) {
          enqueueSnackbar("Amenities created.",{variant:'success'})
        }
      });


    } catch (err) {
      console.error("Error creating amenities:", err);
    }
  };

  // Handler to select all amenities in a category
  const selectAllInCategory = (category: string) => {
    const categoryAmenities = amenityCategories[ category ];

    setSelectedAmenities((prevSelected: any) => {
      // Convert to array if it's a string
      const currentSelected = typeof prevSelected === 'string'
        ? prevSelected.split(',').filter(Boolean)
        : [ ...prevSelected ];

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
    const categoryAmenities = amenityCategories[ category ];

    setSelectedAmenities((prevSelected: any) => {
      // Convert to array if it's a string
      const currentSelected = typeof prevSelected === 'string'
        ? prevSelected.split(',').filter(Boolean)
        : [ ...prevSelected ];

      // Filter out all amenities from this category
      const newSelected = currentSelected.filter(
        amenity => !categoryAmenities.includes(amenity)
      );

      return newSelected.join(',');
    });
  };

  // Calculate the selected count for each category
  const getCategorySelectedCount = (category: string) => {
    const categoryAmenities = amenityCategories[ category ];
    const selectedArray = typeof selectedAmenities === 'string'
      ? selectedAmenities.split(',').filter(Boolean)
      : selectedAmenities;

    return categoryAmenities.filter((amenity: string) =>
      selectedArray.includes(amenity)
    ).length;
  };


  return (
    <div className="p-6 w-full mx-auto bg-white/80 rounded-lg shadow-md border border-gray-100">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Homestay Amenities</h1>
      <p className="mb-6 text-gray-600">Select all amenities available at your property.</p>
      {Object.keys(amenityCategories).map((category:any) => (
        <div key={category} className="mb-6 border-b border-gray-100 pb-4 last:border-b-0">
          <div
            className="flex justify-between items-center mb-3 cursor-pointer group"
            onClick={() => toggleCategory(category)}
          >
            <div className="flex items-center">
   
              <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                {category}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({getCategorySelectedCount(category)}/{amenityCategories[ category ].length})
                </span>
              </h2>
            </div>
            <div className="flex md:space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  selectAllInCategory(category);
                }}
                className="px-3 underline text-nowrap py-1 text-xs bg-white border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
              >
                Select All
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deselectAllInCategory(category);
                }}
                className="px-3 underline py-1 text-xs bg-white border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {expandedCategories[ category ] && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 pl-8">
              {amenityCategories[ category ].map((amenity: string) => {
                // Check if the amenity is in the selectedAmenities
                const isSelected = typeof selectedAmenities === 'string'
                  ? selectedAmenities.split(',').some((item) => item === amenity)
                  : selectedAmenities.some((item: string) => item === amenity);

                return (
                  <div
                    key={amenity}
                    className={`flex items-center p-2 rounded-md transition-colors ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                    onClick={() => handleAmenityChange(amenity)}
                  >
                    <div className="mr-3">
                      {isSelected ? (
                        <BiCheckSquare className="h-5 w-5 text-blue-600" />
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

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-500 mb-4 sm:mb-0">
          <span className="font-medium text-blue-600">
            {typeof selectedAmenities === 'string'
              ? selectedAmenities.split(',').filter(Boolean).length
              : selectedAmenities.length}
          </span> of {allAmenities.length} amenities selected
        </div>
        <div>
          <Button
            label={loading ? 'Saving...' : 'Save Amenities'}
            onClick={existingAmenities === "" ? handleCreateAmenities : handleUpdateAmenities}
            disabled={loading || isUpdateAmenityPending || isCreateAmenityPending}
            className={`px-4 py-2 rounded-full font-medium ${loading || isUpdateAmenityPending || isCreateAmenityPending
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
              }`}
          />
        </div>
      </div>
    </div>
  );
};