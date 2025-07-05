'use client';

import { GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
import { useState, useRef, useEffect } from 'react';

// Map's styling
const defaultMapContainerStyle = {
  width: '100%',
  height: '70vh',
  borderRadius: '15px 0px 0px 15px',
  marginTop: '10px',
  zIndex:"1"
};

const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: 'auto',
  mapTypeId: 'roadmap',
};

interface Iprops {
  lat?: number | null;
  lng?: number | null;
  description?: string | null;
  clickedLatLng?: { lat: number | null; lng: number | null } | null;
  setClickedLatLng: (lat: number | null, lng: number | null) => void;
}

export const MapComponent = (props: Iprops) => {
  const { lat, lng, clickedLatLng, setClickedLatLng } = props;

  const defaultMapCenter = {
    lat: lat ?? 27.7172,
    lng: lng ?? 85.324,
  };
  const [mapCenter, setMapCenter] = useState(defaultMapCenter);
  const autocompleteRef = useRef<any>(null);

  const handleMapClick = (event: any) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setClickedLatLng?.(lat, lng);
    }
  };

  const handlePlaceChanged = () => {
    console.log("handlePlaceChanged");
    const place = autocompleteRef.current.getPlace();
    console.log("place",place);
    if (place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setMapCenter({ lat, lng });
      setClickedLatLng?.(lat, lng);
    }
  };

  return (
    <div className="w-full h-[70vh] z-0">
      {clickedLatLng && (
        <div className="mt-4">

          {/* <p>Latitude: {clickedLatLng.lat}</p>
          <p>Longitude: {clickedLatLng.lng}</p> */}

        </div>
      )}
      <Autocomplete
        onLoad={autocomplete => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handlePlaceChanged}
        className="w-full z-50"
      >
        <input
          type="text"
          placeholder="Search Your Location Here & Select Below"
          className="mb-4 rounded-lg border p-2 md:w-[400px]"
          style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
        />
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={mapCenter}
        options={defaultMapOptions}
        zoom={14}
        onClick={handleMapClick}
      >
        {/* Add a Marker at the clicked or searched location */}
        {clickedLatLng && (
          <Marker position={{ lat: clickedLatLng.lat ?? 0, lng: clickedLatLng.lng ?? 0 }} />
        )}
      </GoogleMap>
    </div>
  );
};
