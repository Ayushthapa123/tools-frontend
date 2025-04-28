// import { useQuery } from '@tanstack/react-query';
// import { useState } from 'react';
// import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';

// import {

//   GetRoomImagesByRoomId,
//   GetRoomImagesByRoomIdQuery,
//   GetRoomImagesByRoomIdQueryVariables,
// } from 'src/gql/graphql';
// import { WallpaperCard } from './wallpaperCard';
// import { WallpaperEditBox } from './WallpaperEditBox';

// interface Iprops {
//   galleryType: string;
//   galleryKey: string;
//   homestayId: number;
// }
// export const WallpaperGallery = (props: Iprops) => {
//   // const { galleryKey, galleryType, homestayId } = props;
//   // const queryRoomAvailibility = useGraphqlClientRequest<
//   //   GetRoomImagesByRoomIdQuery,
//   //   GetRoomImagesByRoomIdQueryVariables
//   // >(GetRoomImagesByRoomId.loc?.source?.body!);

//   // //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
//   // const fetchData = async () => {
//   //   const res = await queryRoomAvailibility({ roomId: roomId });
//   //   return res.getRoomImagesByRoomId;
//   // };

//   // const { data: roomData } = useQuery({
//   //   queryKey: [String(galleryKey)],
//   //   queryFn: fetchData,
//   // });

//   const [showEditBox, setShowEditBox] = useState(true);

//   const handleBack = () => {
//     setShowEditBox(false);
//   };

//   return (
//     <div className=" relative z-10 min-h-[250px] w-full rounded-md  md:min-h-[400px] lg:min-h-[500px]">
//       <div className=" grid gap-10 md:grid-cols-2">
//         {roomData?.map(room => (
//           <div key={room.id} className="relative">
//             <WallpaperCard
//               galleryId={Number(room.id)}
//               galleryType={galleryType}
//               // roomId={roomId}
//               homestayId={homestayId}
//               url={room.url}
//               invalidateKey={galleryKey}
//             />
//           </div>
//         ))}
//       </div>
//       <div className=" relative mt-10 h-[300px] md:w-[450px]">
//         {Number(roomData?.length) < 5 && (
//           <WallpaperEditBox
//             handleBack={handleBack}
//             galleryType={galleryType}
//             // roomId={roomId}
//             homestayId={homestayId}
//             action="create"
//             invalidateKey={galleryKey}
//           />
//         )}
//       </div>
//     </div>
//   );
// };
