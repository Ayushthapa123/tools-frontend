"use client";
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { BiCheckCircle } from 'react-icons/bi';
import { BsCheckCircle } from 'react-icons/bs';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import LoadingSpinner from 'src/components/Loading';
import { FindAmenityByHomestayId, FindAmenityByHomestayIdQuery, FindAmenityByHomestayIdQueryVariables } from 'src/gql/graphql';
import { getAmenityCategories } from 'src/utils/amenityData';

interface AmenityDisplayProps {
  homestayId: number,
  showAll:boolean,
}

export const AmenityDisplay: React.FC<AmenityDisplayProps> = ({ 
  homestayId,
  showAll=true
}) => {
  const [ expandedView, setExpandedView ] = useState(showAll);
  const queryAmenity = useGraphqlClientRequest<FindAmenityByHomestayIdQuery, FindAmenityByHomestayIdQueryVariables>(FindAmenityByHomestayId.loc?.source.body!)
  const fetchData = async () => {
    const res = await queryAmenity({homestayId});
    console.log("fetching amenity", res);
    return res.findAmenityByHomestayId[0] ?? null;
  };    

  const { data:amenities, error, isLoading: loading } = useQuery({
    queryKey: [ 'getAmenity' ],
    queryFn: fetchData,
    enabled: !!homestayId,
  });
  
  // Get amenity categories from shared utility
  const amenityCategories = getAmenityCategories();
  
  // Parse the amenities string into an array
  const amenitiesArray = amenities ? amenities.amenity.split(',').filter(Boolean) : [];
  
  // Check which categories have amenities
  const categoriesWithAmenities = Object.entries(amenityCategories).map(([category, items]) => {
    const categoryAmenities = items.filter(item => amenitiesArray.includes(item));
    return {
      category,
      amenities: categoryAmenities,
      hasAmenities: categoryAmenities.length > 0
    };
  }).filter(cat => cat.hasAmenities);
  
  // Get top amenities for compact view
  const getTopAmenities = () => {
    // First highlight Wi-Fi, Air conditioning, and other essentials if available
    const essentialAmenities = [
      'Wi-Fi (Free)',
      'Air conditioning / Heating',
      'Free breakfast',
      'Clean private bathroom with hot shower'
    ].filter(amenity => amenitiesArray.includes(amenity));
    
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
        <LoadingSpinner color='primary' size='sm'  />
      </div>
    )
  }
  // If there are no amenities, show a message
  if (amenitiesArray.length === 0) {
    return (
      <div className={`p-4 bg-gray-50 rounded-lg text-center text-gray-500 `}>
        No amenities information available
      </div>
    );
  }
  
  return (
    <div className={`bg-white rounded-lg`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className='mb-4 text-xl font-semibold text-gray-800"'>Amenities</h3>
            <button 
              onClick={() => setExpandedView(!expandedView)}
              className="text-sm text-blue hover:text-black"
            >
              {expandedView ? "Show less":"Show More"}
            </button>
          </div>
      {expandedView ? (
        // Full detailed view grouped by category
        <div>
          
          
          <div className="grid grid-cols-1 gap-x-6 gap-y-4">
            {categoriesWithAmenities.map(({ category, amenities }) => (
              <div key={category} className="mb-4">
                <h4 className="font-medium text-primary mb-2">{category}</h4>
                <ul className="space-y-2">
                  {amenities.map(amenity => (
                    <li key={amenity} className="flex items-start">
                      <BiCheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
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
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-500">{amenitiesArray.length} total</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            {getTopAmenities().map(amenity => (
              <div key={amenity} className="flex items-start">
                <BsCheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">{amenity}</span>
              </div>
            ))}
          </div>
          
          {amenitiesArray.length > 8 && (
            <button 
              onClick={() => setExpandedView(true)}
              className="w-full py-2 mt-2 border border-gray-200 rounded-md text-blue-600 hover:bg-blue-50 transition-colors text-center"
            >
              Show all {amenitiesArray.length} amenities
            </button>
          )}
        </div>
      )}
    </div>
  );
};