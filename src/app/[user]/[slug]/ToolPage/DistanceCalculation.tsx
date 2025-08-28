'use client';
import { Autocomplete } from '@react-google-maps/api';
import React, { useState, useRef } from 'react';
import Button from 'src/components/Button';

export default function DistanceCalculation({ lat, lng }: { lat: number; lng: number }) {
  const autocompleteRef1 = useRef<any>(null);
  const [searchText, setSearchText] = useState('');
  const [query, setQuery] = useState('');
  const [currentLatLng, setCurrentLatLng] = useState({ lat: 0, lng: 0 });
  const [distance, setDistance] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0); // in minutes

  const estimateWalkingTime = (distanceInMeters: number): number => {
    const walkingSpeedKmh = 5; // average human walking speed
    const distanceKm = distanceInMeters / 1000;
    const timeInHours = distanceKm / walkingSpeedKmh;
    const timeInMinutes = timeInHours * 60;

    return Math.round(timeInMinutes); // returns minutes with 2 decimal places
  };

  const calculateDistance = () => {
    const distance = google.maps.geometry.spherical.computeDistanceBetween(currentLatLng, {
      lat,
      lng,
    });
    setDistance(distance / 1000); // also only show 2 decimal places
    setEstimatedTime(estimateWalkingTime(distance)); // also only show 2 decimal places
  };

  const handlePlaceChanged = () => {
    const place = autocompleteRef1.current.getPlace();
    setCurrentLatLng({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
    // calculateDistance();
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setQuery(e.target.value);
  };
  return (
    <div className="flex flex-col ">
      <Autocomplete
        onLoad={autocomplete => (autocompleteRef1.current = autocomplete)}
        className="w-full "
        onPlaceChanged={handlePlaceChanged}>
        <input
          type="text"
          placeholder="Search Your Location"
          value={searchText}
          className="w-full rounded-lg border-2 border-primary bg-white py-3 pl-3 pr-4 text-base placeholder-gray-400 shadow-sm transition-all duration-200 focus:border-secondary focus:ring-2 focus:ring-secondary"
          onChange={handleLocationChange}
          defaultValue={query}
        />
      </Autocomplete>
      <div className="flex flex-col gap-0">
        <div>
          <p className="text-md text-gray-500 ">Estimated Distance Is: {distance.toFixed(2)} Km</p>
        </div>
        <div className="mt-[-8px]">
          <p className="text-md text-gray-500">
            Estimated Walking Time Is: {estimatedTime} Minutes
          </p>
        </div>
      </div>
      <Button label="Calculate Distance" height="sm" onClick={() => calculateDistance()} />
    </div>
  );
}

{
  /* <input
type="text"
placeholder="Search your location..."
value={searchText}
className="w-full rounded-lg border-2 border-primary bg-white py-3 pl-12 pr-4 text-base shadow-sm focus:border-secondary focus:ring-2 focus:ring-secondary transition-all duration-200 placeholder-gray-400"
onChange={handleLocationChange}
defaultValue={query}
autoComplete="off"
spellCheck={false}
/> */
}
