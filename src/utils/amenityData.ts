export interface AmenityCategoryData {
  [ category: string ]: string[];
}

export const getAmenityCategories = (): AmenityCategoryData => {
  return {
    'Practical Amenities': [
      'Secure lockers for personal belongings',
      'Laundry facilities (self-service)',
      'Laundry access or paid laundry service',
      'Shared kitchen access for cooking',
      'Workspace or study desks',
      '24/7 hot water supply',
    ],
    "Social Amenities": [
      'Common lounge area with TV and games',
      'Outdoor terrace, rooftop, or garden space',
      'On-site café or snack bar',
      'Organized social events or city tours',
      'Book exchange or reading corner',
    ],
    "Security Amenities": [
      '24/7 front desk or staff assistance',
      'CCTV surveillance in common areas',
      'Key card or secure code access to rooms',
      'Female-only dormitory options',
      'Fire safety equipment',
    ],
    "Additional Amenities": [
      'Free breakfast or light snacks',
      'Bicycle rental or parking space',
      'Pet-friendly options (if available)',
      'No curfew for guests',
      'Tour and travel assistance desk',
    ],
  };
};
