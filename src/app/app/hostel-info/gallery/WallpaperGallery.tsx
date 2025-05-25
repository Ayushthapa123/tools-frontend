import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';

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
  const queryRoomAvailibility = useGraphqlClientRequest<
    GetGalleryByHostelIdQuery,
    GetGalleryByHostelIdQueryVariables
  >(GetGalleryByHostelId.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryRoomAvailibility({ hostelId: hostelId });
    return res.getGalleryByHostelId;
  };

  const { data: wallpaperData } = useQuery({
    queryKey: [ String(galleryKey) ],
    queryFn: fetchData,
  });

  const [ showEditBox, setShowEditBox ] = useState(true);

  const handleBack = () => {
    setShowEditBox(false);
  };
  const mainImage = wallpaperData?.data?.filter(img => img?.isSelected)[0];


  return (
    <div className=" relative z-10 min-h-[250px] w-full rounded-md flex items-center justify-center flex-col gap-0">
      <span className='text-gray-400 text-xs block md:inline'>You can only upload upto 6 images.</span>
      <div className="">
      
            <div className=" relative mt-10 h-[300px] md:w-[450px]">
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
