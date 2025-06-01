'use client';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { BiCheckCircle } from 'react-icons/bi';
import { BsCheckCircle } from 'react-icons/bs';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import LoadingSpinner from 'src/components/Loading';
import {
  FindAmenityByHostelId,
  FindAmenityByHostelIdQuery,
  FindAmenityByHostelIdQueryVariables,
} from 'src/gql/graphql';
import { getAmenityCategories } from 'src/utils/amenityData';

interface AmenityDisplayProps {
  hostelId: number;
  showAll: boolean;
}

export const AmenityDisplay: React.FC<AmenityDisplayProps> = ({ hostelId, showAll = true }) => {
  const [expandedView, setExpandedView] = useState(showAll);
  const queryAmenity = useGraphqlClientRequest<
    FindAmenityByHostelIdQuery,
    FindAmenityByHostelIdQueryVariables
  >(FindAmenityByHostelId.loc?.source.body!);
  const fetchData = async () => {
    const res = await queryAmenity({ hostelId });
    return res.findAmenityByHostelId ?? null;
  };

  const {
    data: amenities,
    error,
    isLoading: loading,
  } = useQuery({
    queryKey: ['getAmenity'],
    queryFn: fetchData,
    enabled: !!hostelId,
  });

  // Get amenity categories from shared utility
  const amenityCategories = getAmenityCategories();

  // Parse the amenities string into an array
  const amenitiesArray = amenities ? amenities.data?.amenities.split(',').filter(Boolean) : [];

  // Check which categories have amenities
  const categoriesWithAmenities = Object.entries(amenityCategories)
    .map(([category, items]) => {
      const categoryAmenities = items.filter(item => amenitiesArray?.includes(item));
      return {
        category,
        amenities: categoryAmenities,
        hasAmenities: categoryAmenities.length > 0,
      };
    })
    .filter(cat => cat.hasAmenities);

  // Get top amenities for compact view
  const getTopAmenities = () => {
    // First highlight Wi-Fi, Air conditioning, and other essentials if available
    const essentialAmenities = [
      'Wi-Fi (Free)',
      'Air conditioning / Heating',
      'Free breakfast',
      'Clean private bathroom with hot shower',
    ].filter(amenity => amenitiesArray?.includes(amenity));

    // Then take a few from each category with amenities to showcase variety
    const highlightedAmenities = [...essentialAmenities];

    categoriesWithAmenities.forEach(category => {
      // Add 1-2 amenities from each category that aren't already included
      const categoriesToAdd = category.amenities
        .filter(amenity => !highlightedAmenities.includes(amenity))
        .slice(0, 2);

      highlightedAmenities.push(...categoriesToAdd);
    });

    // Return 8 total amenities for compact view
    return highlightedAmenities.slice(0, 8);
  };

  if (loading) {
    return (
      <div>
        <LoadingSpinner color="primary" size="sm" />
      </div>
    );
  }
  // If there are no amenities, show a message
  if (amenitiesArray?.length === 0) {
    return (
      <div className={`rounded-lg bg-gray-50 p-4 text-center text-gray-500 `}>
        No amenities information available
      </div>
    );
  }

  return (
    <div className={`rounded-lg bg-white`}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className='text-gray-800" mb-4 text-xl font-semibold'>Amenities</h3>
        <button
          onClick={() => setExpandedView(!expandedView)}
          className="text-sm text-blue hover:text-black"
        >
          {expandedView ? 'Show less' : 'Show More'}
        </button>
      </div>
      {expandedView ? (
        // Full detailed view grouped by category
        <div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-4">
            {categoriesWithAmenities.map(({ category, amenities }) => (
              <div key={category} className="mb-4">
                <h4 className="mb-2 font-medium text-primary">{category}</h4>
                <ul className="space-y-2">
                  {amenities.map(amenity => (
                    <li key={amenity} className="flex items-start">
                      <BiCheckCircle className="text-green-500 mr-2 mt-0.5 h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-600">{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Compact view with highlights and count
        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-gray-500">{amenitiesArray?.length} total</span>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-3">
            {getTopAmenities().map(amenity => (
              <div key={amenity} className="flex items-start">
                <BsCheckCircle className="text-green-500 mr-2 mt-0.5 h-4 w-4 flex-shrink-0" />
                <span className="text-sm text-gray-600">{amenity}</span>
              </div>
            ))}
          </div>

          {amenitiesArray?.length && amenitiesArray?.length > 8 && (
            <button
              onClick={() => setExpandedView(true)}
              className="text-blue-600 hover:bg-blue-50 mt-2 w-full rounded-md border border-gray-200 py-2 text-center transition-colors"
            >
              Show all {amenitiesArray?.length} amenities
            </button>
          )}
        </div>
      )}
    </div>
  );
};
