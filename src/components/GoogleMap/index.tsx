
'use client';

//Map component Component from library
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useState } from 'react';

//Map's styling
export const defaultMapContainerStyle = {
  width: '100%',
  height: '80vh',
  borderRadius: '15px 0px 0px 15px',
};

interface Iprops {
  description: string;
  lat: number;
  lng: number;
}
const MapComponent = (props: Iprops) => {
  const { lat, lng } = props;
  const defaultMapCenter = {
    lat:lat?? 27.7172,
    lng: lng??85.324,
  };

  const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: 'satellite',
  };

  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        options={defaultMapOptions}
        zoom={28}>
        {<Marker position={{ lat, lng }} />}

      </GoogleMap>
    </div>
  );
};

export { MapComponent };
