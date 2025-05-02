export interface AmenityCategoryData {
  [category: string]: string[];
}

export const getAmenityCategories = (): AmenityCategoryData => {
  return {
    'Room Essentials': [
      'Wi-Fi (Free)',
      'Air conditioning / Heating',
      'Clean private bathroom with hot shower',
      'Comfortable bed with fresh linens',
      'Power outlets and charging points',
      'Desk / Table and chair',
      'Drinking water',
      'Digital room safe',
      'Daily housekeeping'
    ],
    'Essential Property Amenities': [
      '24/7 check-in or host availability',
      'Secure entry / Locks on doors',
      'Clean common areas',
      'Parking (on-site or nearby)',
      'Luggage storage',
      'Security cameras',
      'Wheelchair accessibility'
    ],
    'Basic Kitchen / Food Amenities': [
      'Drinking water (bottled or filtered)',
      'Electric kettle / Tea & coffee supplies',
      'Fridge / Mini fridge',
      'Microwave oven',
      'Basic cookware and utensils'
    ],
    'Safety & Hygiene Essentials': [
      'Fire extinguisher',
      'First aid kit',
      'Clean and sanitized spaces',
      'Smoke detector (where applicable)',
      'Safe / Lockbox (optional but preferred)',
      'Emergency contact numbers',
      'Security personnel'
    ],
    'Optional but Highly Preferred': [
      'TV with local or streaming channels',
      'Free breakfast',
      'Laundry access or paid laundry service',
      'Travel desk / local guide info',
      'Swimming pool',
      'Fitness center / Gym',
      'Restaurant / Café on-site'
    ]
  };
};