import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';

import {
  GetGalleryByHostelId,
  GetGalleryByHostelIdQuery,
  GetGalleryByHostelIdQueryVariables,
  GetRoomImagesByRoomId,
  GetRoomImagesByRoomIdQuery,
  GetRoomImagesByRoomIdQueryVariables,
} from 'src/gql/graphql';
import { WallpaperCard } from './wallpaperCard';
import { WallpaperEditBox } from './WallpaperEditBox';

interface Iprops {
  galleryType: string;
  galleryKey: string;
  hostelId: number;
}
export const WallpaperGallery = (props: Iprops) => {
  const { galleryKey, galleryType, hostelId } = props;

  const [showEditBox, setShowEditBox] = useState(true);

  const handleBack = () => {
    setShowEditBox(false);
  };

  return (
    <div className=" relative z-10 flex min-h-[250px] w-full flex-col items-center justify-center gap-0 rounded-md ">
      <span className="block text-xs text-gray-400 md:inline">
        You can only upload upto 6 images.
      </span>
      <div className=" w-full">
        <div className=" relative mt-10 h-[300px] md:w-[450px] w-full">
          <WallpaperEditBox
            handleBack={handleBack}
            galleryType={galleryType}
            // roomId={roomId}
            hostelId={hostelId}
            action="create"
            invalidateKey={galleryKey}
          />
        </div>
        {/* ) */}
        {/* } */}
      </div>
    </div>
  );
};
