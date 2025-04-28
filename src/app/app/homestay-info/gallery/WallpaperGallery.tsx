import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';

import {

  GetHomestayWallpaperByHomestayId,
  GetHomestayWallpaperByHomestayIdQuery,
  GetHomestayWallpaperByHomestayIdQueryVariables,
  GetRoomImagesByRoomId,
  GetRoomImagesByRoomIdQuery,
  GetRoomImagesByRoomIdQueryVariables,
} from 'src/gql/graphql';
import { WallpaperCard } from './wallpaperCard';
import { WallpaperEditBox } from './WallpaperEditBox';

interface Iprops {
  galleryType: string;
  galleryKey: string;
  homestayId: number;
}
export const WallpaperGallery = (props: Iprops) => {
  const { galleryKey, galleryType, homestayId } = props;
  const queryRoomAvailibility = useGraphqlClientRequest<
    GetHomestayWallpaperByHomestayIdQuery,
    GetHomestayWallpaperByHomestayIdQueryVariables
  >(GetHomestayWallpaperByHomestayId.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryRoomAvailibility({ homestayId: homestayId });
    return res.getHomestayWallpaperByHomestayId;
  };

  const { data: wallpaperData } = useQuery({
    queryKey: [ String(galleryKey) ],
    queryFn: fetchData,
  });

  const [ showEditBox, setShowEditBox ] = useState(true);

  const handleBack = () => {
    setShowEditBox(false);
  };


  return (
    <div className=" relative z-10 min-h-[250px] w-full rounded-md">
      <h3 className='text-primary inline mr-2'>Homestay Wallpaper</h3>
      <span className='text-gray-400 text-xs'>You can only upload 1 image.</span>
      <div className=" grid gap-10 md:grid-cols-2 mt-4">
        {wallpaperData ?
          <div className="relative">
            <WallpaperCard
              galleryId={Number(wallpaperData?.id)}
              galleryType={galleryType}
              // roomId={roomId}
              homestayId={homestayId}
              url={String(wallpaperData?.url)}
              invalidateKey={galleryKey}
            />
          </div> :
          (
            <div className=" relative mt-10 h-[300px] md:w-[450px]">
              <WallpaperEditBox
                handleBack={handleBack}
                galleryType={galleryType}
                // roomId={roomId}
                homestayId={homestayId}
                action="create"
                invalidateKey={galleryKey}
              />
            </div>
          )
        }
      </div>

    </div>
  );
};
