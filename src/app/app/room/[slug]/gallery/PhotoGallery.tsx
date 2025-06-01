import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';

import {
  GetRoomImagesByRoomId,
  GetRoomImagesByRoomIdQuery,
  GetRoomImagesByRoomIdQueryVariables,
} from 'src/gql/graphql';
import { useUserStore } from 'src/store/userStore';
import { GalleryEditBox } from './GalleryEditBox';
import { GalleryCard } from './GalleryCard';

interface Iprops {
  galleryType: string;
  galleryKey: string;
  roomId: number;
}
export const PhotoGallery = (props: Iprops) => {
  const { galleryKey, galleryType, roomId } = props;
  const queryRoomAvailibility = useGraphqlClientRequest<
    GetRoomImagesByRoomIdQuery,
    GetRoomImagesByRoomIdQueryVariables
  >(GetRoomImagesByRoomId.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryRoomAvailibility({ roomId: roomId });
    return res.getRoomImagesByRoomId;
  };

  const { data: roomData } = useQuery({
    queryKey: [String(galleryKey)],
    queryFn: fetchData,
  });

  const [showEditBox, setShowEditBox] = useState(true);

  const handleBack = () => {
    setShowEditBox(false);
  };

  return (
    <div className=" relative z-10 min-h-[250px] w-full rounded-md  md:min-h-[400px] lg:min-h-fit">
      <div className=" grid gap-10 lg:grid-cols-2">
        {roomData?.data?.map(room => (
          <div key={room.id} className="relative">
            <GalleryCard
              galleryId={Number(room.id)}
              galleryType={galleryType}
              roomId={roomId}
              url={room.url}
              invalidateKey={galleryKey}
            />
          </div>
        ))}
        <div className=" relative h-[300px] md:w-[450px]">
          {Number(roomData?.data?.length) < 5 && (
            <GalleryEditBox
              handleBack={handleBack}
              galleryType={galleryType}
              roomId={roomId}
              action="create"
              invalidateKey={galleryKey}
            />
          )}
        </div>
      </div>
    </div>
  );
};
