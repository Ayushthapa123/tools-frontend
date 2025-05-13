// 'use client';

// import { GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { useState, useRef, useEffect } from 'react';
// import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
// import Button from 'src/components/Button';
// import { TextArea } from 'src/components/TextArea';
// import {
//   CreateMapLocation,
//   CreateMapLocationMutation,
//   CreateMapLocationMutationVariables,
//   GetGoogleMapLocation,
//   GetGoogleMapLocationQuery,
//   GetGoogleMapLocationQueryVariables,
//   UpdateMapLocation,
//   UpdateMapLocationMutation,
//   UpdateMapLocationMutationVariables,
// } from 'src/gql/graphql';
// import { useToastStore } from 'src/store/toastStore';
// import { useUserStore } from 'src/store/userStore';

// // Map's styling
// const defaultMapContainerStyle = {
//   width: '100%',
//   height: '60vh',
//   borderRadius: '15px 0px 0px 15px',
//   marginTop: '10px',
// };

// const defaultMapOptions = {
//   zoomControl: true,
//   tilt: 0,
//   gestureHandling: 'auto',
//   mapTypeId: 'satellite',
// };

// export const MapComponent = () => {
//   const queryGetMapLocation = useGraphqlClientRequest<
//     GetGoogleMapLocationQuery,
//     GetGoogleMapLocationQueryVariables
//   >(GetGoogleMapLocation.loc?.source?.body!);
//   const { user } = useUserStore();

//   const fetchGoogleLocation = async () => {
//     const res = await queryGetMapLocation({ id: Number(user.homestayId) });
//     return res.googleMapLocation;
//   };

//   const { data: locationData, isLoading } = useQuery({
//     queryKey: ['getGoogleMapLocation'],
//     queryFn: fetchGoogleLocation,
//   });
//   return (
//     <div>
//       {!isLoading && (
//         <Map
//           description={locationData?.description}
//           id={locationData?.googleMapLocationId}
//           lat={locationData?.lat}
//           lng={locationData?.lng}
//         />
//       )}
//     </div>
//   );
// };

// interface Iprops {
//   lat?: number | null;
//   lng?: number | null;
//   description?: string | null;
//   id?: number | null;
// }

// export const Map = (props: Iprops) => {
//   const { lat, lng, description, id } = props;
//   const [clickedLatLng, setClickedLatLng] = useState<{ lat: number; lng: number } | null>(
//     lat && lng ? { lat: lat, lng: lng } : null,
//   );
//   const [des, setDes] = useState(description ?? '');
//   const defaultMapCenter = {
//     lat: lat ?? 27.7172,
//     lng: lng ?? 85.324,
//   };
//   const [mapCenter, setMapCenter] = useState(defaultMapCenter);
//   const autocompleteRef = useRef<any>(null);
//   const { user } = useUserStore();
//   const { setRole, setMessage, setShowToast } = useToastStore();
//   const queryClient = useQueryClient();

//   const handleMapClick = (event: any) => {
//     if (event.latLng) {
//       const lat = event.latLng.lat();
//       const lng = event.latLng.lng();
//       setClickedLatLng({ lat, lng });
//     }
//   };

//   const handlePlaceChanged = () => {
//     const place = autocompleteRef.current.getPlace();
//     if (place.geometry && place.geometry.location) {
//       const lat = place.geometry.location.lat();
//       const lng = place.geometry.location.lng();
//       setMapCenter({ lat, lng });
//       setClickedLatLng({ lat, lng });
//     }
//   };

//   const mutateCreateMapLocation = useGraphqlClientRequest<
//     CreateMapLocationMutation,
//     CreateMapLocationMutationVariables
//   >(CreateMapLocation.loc?.source.body!);

//   const { mutateAsync: createAsync, isPending: isCreating } = useMutation({
//     mutationFn: mutateCreateMapLocation,
//   });

//   const mutateUpdateMapLocation = useGraphqlClientRequest<
//     UpdateMapLocationMutation,
//     UpdateMapLocationMutationVariables
//   >(UpdateMapLocation.loc?.source.body!);

//   const { mutateAsync: updateAsync, isPending: isUpdating } = useMutation({
//     mutationFn: mutateUpdateMapLocation,
//   });

//   const onSubmit = async () => {
//     if (!clickedLatLng) return;

//     if (id) {
//       updateAsync({
//         id: Number(id),
//         data: {
//           googleMapLocationId: Number(id),
//           description: des ?? '',
//           lat: Number(clickedLatLng?.lat),
//           lng: Number(clickedLatLng?.lng),
//         },
//       }).then(res => {
//         if (res?.updateGoogleMapLocation.googleMapLocationId) {
//           setShowToast(true);
//           setMessage('Location Updated!');
//           setRole('success');
//           queryClient.invalidateQueries({ queryKey: ['getGoogleMapLocation'] });
//         } else {
//           setShowToast(true);
//           setMessage('Something went wrong!');
//           setRole('error');
//         }
//       });
//     } else {
//       createAsync({
//         homestayId: Number(user.homestayId),
//         data: {
//           description: des ?? '',
//           lat: Number(clickedLatLng?.lat),
//           lng: Number(clickedLatLng?.lng),
//         },
//       }).then(res => {
//         if (res?.createGoogleMapLocation.googleMapLocationId) {
//           setShowToast(true);
//           setMessage('Location Created!');
//           setRole('success');
//           queryClient.invalidateQueries({ queryKey: ['getGoogleMapLocation'] });
//         } else {
//           setShowToast(true);
//           setMessage('Something went wrong!');
//           setRole('error');
//         }
//       });
//     }
//   };

//   return (
//     <div className="w-full">
//       <Autocomplete
//         onLoad={autocomplete => (autocompleteRef.current = autocomplete)}
//         onPlaceChanged={handlePlaceChanged}>
//         <input
//           type="text"
//           placeholder="Search Your Location"
//           className="mb-4 rounded-lg border p-2 md:w-[300px]"
//           style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
//         />
//       </Autocomplete>
//       <GoogleMap
//         mapContainerStyle={defaultMapContainerStyle}
//         center={mapCenter}
//         options={defaultMapOptions}
//         zoom={14}
//         onClick={handleMapClick}>
//         {/* Add a Marker at the clicked or searched location */}
//         {clickedLatLng && <Marker position={clickedLatLng} />}
//       </GoogleMap>
//       {clickedLatLng && (
//         <div className="mt-4">
//           <p>Clicked Latitude: {clickedLatLng.lat}</p>
//           <p>Clicked Longitude: {clickedLatLng.lng}</p>
//         </div>
//       )}
//       <div className="mt-5 w-full">
//         <TextArea label="Location Description" value={des} onChange={e => setDes(e.target.value)} />
//       </div>
//       <Button
//         label="Update Location Info"
//         className=" w-min"
//         onClick={() => onSubmit()}
//         loading={isCreating}
//         disabled={isCreating}
//       />
//     </div>
//   );
// };
