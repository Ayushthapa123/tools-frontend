import { useMutation } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { CreateAmenity, CreateAmenityDocument, CreateAmenityMutation, CreateAmenityMutationVariables, UpdateAmenity, UpdateAmenityDocument, UpdateAmenityMutation, UpdateAmenityMutationVariables } from 'src/gql/graphql';

const AmenitySelector = ({ homestayId, existingAmenities = "", loading, amenityId }: { homestayId: number, existingAmenities: any, loading: boolean, amenityId: number }) => {
  // Group all available amenities by category
  const amenityCategories: any = {
    'Room Essentials': [
      'Wi-Fi (Free)',
      'Air conditioning / Heating',
      'Clean private bathroom with hot shower',
      'Comfortable bed with fresh linens',
      'Towels and basic toiletries (soap, shampoo)',
      'Power outlets and charging points',
      'Desk / Table and chair',
      'Drinking water',
      'Cupboard / Hangers',
      'Dustbin',
      'Daily housekeeping'
    ],
    'Essential Property Amenities': [
      '24/7 check-in or host availability',
      'Secure entry / Locks on doors',
      'Clean common areas',
      'Parking (on-site or nearby)',
      'Luggage storage',
      'Emergency supplies (first aid, fire extinguisher)'
    ],
    'Basic Kitchen / Food Amenities': [
      'Drinking water (bottled or filtered)',
      'Electric kettle / Tea & coffee supplies',
      'Fridge / Mini fridge',
      'Access to basic kitchen (if applicable)'
    ],
    'Safety & Hygiene Essentials': [
      'Fire extinguisher',
      'First aid kit',
      'Clean and sanitized spaces',
      'Smoke detector (where applicable)',
      'Safe / Lockbox (optional but preferred)'
    ],
    'Optional but Highly Preferred': [
      'TV with local or streaming channels',
      'Free breakfast',
      'Laundry access or paid laundry service',
      'Travel desk / local guide info'
    ]
  };

  // Flatten all amenities for internal processing
  const allAmenities = Object.values(amenityCategories).flat();

  // State to track selected amenities
  console.log("existin", existingAmenities);
  const [ selectedAmenities, setSelectedAmenities ] = useState(existingAmenities);
  console.log("selected", selectedAmenities);

  // State to show success message
  const [ saveSuccess, setSaveSuccess ] = useState(false);

  // Apollo mutation hook
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
    setSelectedAmenities((prevSelected:any) => {
      // Handle both string and array formats
      const currentSelected = typeof prevSelected === 'string' 
        ? prevSelected.split(',').filter(Boolean) 
        : [...prevSelected];
      if (currentSelected.some((item)=> item === amenity)) {
        // Remove if already selected
        return currentSelected.filter(item => item !== amenity).join(',');
      } else {
        // Add if not selected
        return [...currentSelected, amenity].join(',');
      }
    });
  
    // Clear any previous success message when making changes
    if (saveSuccess) {
      setSaveSuccess(false);
    }
  };
  
  // Handler to save amenities
  const handleUpdateAmenities = async () => {
    try {
      const amenitiesArray = typeof selectedAmenities === 'string' 
        ? selectedAmenities.split(',').filter(Boolean) 
        : selectedAmenities;
        
      const updatedRes = await updateAmenities({
        updateAmenityInput: { 
          id: amenityId, 
          amenity: Array.isArray(amenitiesArray) ? amenitiesArray.join(',') : amenitiesArray, 
          homestayId: homestayId 
        }
      });
      
      // Show success message
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
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
      });
      
      // Show success message
      setSaveSuccess(true);
  
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Error creating amenities:", err);
    }
  };
  
  // Handler to select all amenities in a category
  const selectAllInCategory = (category: string) => {
    const categoryAmenities = amenityCategories[category];
    
    setSelectedAmenities((prevSelected:any) => {
      // Convert to array if it's a string
      const currentSelected = typeof prevSelected === 'string' 
        ? prevSelected.split(',').filter(Boolean) 
        : [...prevSelected];
      
      // Add all category amenities that aren't already selected
      categoryAmenities.forEach((amenity:string) => {
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
    
    setSelectedAmenities((prevSelected:any) => {
      // Convert to array if it's a string
      const currentSelected = typeof prevSelected === 'string' 
        ? prevSelected.split(',').filter(Boolean) 
        : [...prevSelected];
      
      // Filter out all amenities from this category
      const newSelected = currentSelected.filter(
        amenity => !categoryAmenities.includes(amenity)
      );
      
      return newSelected.join(',');
    });
  };
  
  return (
    <div className="p-4 max-w-3xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Homestay Amenities</h1>
      <p className="mb-4 text-gray-600">Select all amenities available at your property.</p>
  
      {Object.keys(amenityCategories).map((category) => (
        <div key={category} className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">{category}</h2>
            <div className="space-x-2">
              <button
                onClick={() => selectAllInCategory(category)}
                className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
              >
                Select All
              </button>
              <button
                onClick={() => deselectAllInCategory(category)}
                className="px-2 py-1 text-xs bg-gray-50 text-gray-600 rounded hover:bg-gray-100"
              >
                Deselect All
              </button>
            </div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {amenityCategories[category].map((amenity: string) => {
              // Check if the amenity is in the selectedAmenities
              const isSelected = typeof selectedAmenities === 'string'
                ? selectedAmenities.split(',').some((item) => item === amenity)
                : selectedAmenities.some((item:string) => item === amenity);
                
              return (
                <div key={amenity} className="flex items-start p-2 hover:bg-gray-50 rounded">
                  <input
                    type="checkbox"
                    id={`amenity-${amenity}`}
                    checked={isSelected}
                    onChange={() => handleAmenityChange(amenity)}
                    className="mt-1"
                  />
                  <label
                    htmlFor={`amenity-${amenity}`}
                    className="ml-2 text-gray-700 cursor-pointer"
                  >
                    {amenity}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      ))}
  
      {saveSuccess && (
        <div className="p-3 mb-4 bg-green-100 text-green-700 rounded">
          Amenities saved successfully!
        </div>
      )}
  
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          {typeof selectedAmenities === 'string' 
            ? selectedAmenities.split(',').filter(Boolean).length
            : selectedAmenities.length} of {allAmenities.length} amenities selected
        </div>
        <button
          onClick={existingAmenities === "" ? handleCreateAmenities : handleUpdateAmenities}
          disabled={loading}
          className={`px-4 py-2 rounded font-medium ${
            loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-black hover:bg-blue-700'
          }`}
        >
          {loading ? 'Saving...' : 'Save Amenities'}
        </button>
      </div>
    

      {/* This is just for debugging - you can remove this in production */}
      <div className="mt-8 p-4 border border-gray-200 rounded bg-gray-50">
        <h3 className="text-sm font-semibold mb-2">Selected Amenities (Format for Database):</h3>
        <pre className="text-xs overflow-auto p-2 bg-white border border-gray-200 rounded">
          {JSON.stringify(selectedAmenities, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default AmenitySelector;

// Usage example:
// <AmenitySelector homestayId={1} existingAmenities={['Wi-Fi (Free)','Air conditioning / Heating']} />