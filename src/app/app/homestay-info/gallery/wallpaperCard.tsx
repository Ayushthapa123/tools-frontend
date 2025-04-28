import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import {
  DeleteRoomImage,
  DeleteRoomImageMutation,
  DeleteRoomImageMutationVariables,
} from 'src/gql/graphql';
import { useToastStore } from 'src/store/toastStore';
import { WallpaperEditBox } from './WallpaperEditBox';

interface Iprops {
  galleryId: number;
  galleryType: string;
  homestayId: number;
  url: string;
  invalidateKey: string;
}
export const WallpaperCard = (props: Iprops) => {
  const { galleryId, homestayId, url, invalidateKey } = props;

  const [ showEditBox, setShowEditBox ] = useState(false);
  const { setRole, setMessage, setShowToast } = useToastStore();
  const queryClient = useQueryClient();
  const handleBack = () => {
    setShowEditBox(false);
  };

  //create new image
  const mutateDeleteGallery = useGraphqlClientRequest<
    DeleteRoomImageMutation,
    DeleteRoomImageMutationVariables
  >(DeleteRoomImage.loc?.source.body!);

  const { mutateAsync: deleteGallery } = useMutation({
    mutationFn: mutateDeleteGallery,
  });

  const handleDeleteGallery = (galleryId: number) => {
    deleteGallery({ roomImageId: galleryId }).then(res => {
      if (res?.deleteRoomImage?.id) {
        queryClient.invalidateQueries({ queryKey: [ String(invalidateKey) ] });
        setShowToast(true);
        setMessage('Image Deleted Success');
        setRole('success');
      } else {
        setShowToast(true);
        setMessage('Something went wrong');
        setRole('error');
      }
    });
  };
  return (
    <div className=" relative h-[300px] w-[450px] ">
      <div>
        {!showEditBox ? (
          <div>
            <div className="absolute right-3 top-3 z-50  flex flex-col gap-3">
              <div
                className="  z-10 flex h-10 w-10 cursor-pointer flex-col items-center justify-center rounded-full bg-gray-200 align-middle text-lg text-white"
                onClick={() => setShowEditBox(true)}>
                <FaEdit />
              </div>
              {galleryId && (
                <div
                  className="  z-10 flex h-10 w-10 cursor-pointer flex-col items-center justify-center rounded-full bg-gray-200 align-middle text-lg text-white"
                  onClick={() => handleDeleteGallery(galleryId)}>
                  <FaTrash />
                </div>
              )}
            </div>
            <Image
              alt="cover photo"
              src={url ?? '/images/cover-placeholder.jpg'}
              fill
              className=" z-0 rounded-lg"
            />
          </div>
        ) : (
          <div>
            <WallpaperEditBox
              handleBack={handleBack}
              action={galleryId ? 'update' : 'create'}
              galleryId={Number(galleryId)}
              galleryType="ROOM"
              // roomId={Number(roomId)}
              homestayId={Number(homestayId)}
              invalidateKey={invalidateKey}
            />
          </div>
        )}
      </div>
    </div>
  );
};
