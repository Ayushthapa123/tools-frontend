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
import { GalleryEditBox } from './GalleryEditBox';
import { enqueueSnackbar } from 'notistack';

interface Iprops {
  galleryId: number;
  galleryType: string;
  roomId: number;
  url: string;
  invalidateKey: string;
}
export const GalleryCard = (props: Iprops) => {
  const { galleryId, roomId, url, invalidateKey } = props;

  const [showEditBox, setShowEditBox] = useState(false);
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
      if (res?.deleteRoomImage?.data?.id) {
        queryClient.invalidateQueries({ queryKey: [String(invalidateKey)] });
        enqueueSnackbar('Image Deleted Successfully.', { variant: 'success' });
      } else {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      }
    });
  };
  return (
    <div className=" relative h-[300px] w-[370px] lg:w-[333px] xl:w-[450px] ">
      <div>
        {!showEditBox ? (
          <div>
            <div className="absolute right-3 top-3 z-50  flex flex-col gap-3">
              <div
                className="  z-10 flex h-10 w-10 cursor-pointer  flex-col items-center justify-center rounded-full bg-gray-200 align-middle text-lg text-white hover:border hover:border-error"
                onClick={() => setShowEditBox(true)}
              >
                <FaEdit className="mb-1 ml-1 text-error" />
              </div>
              {galleryId && (
                <div
                  className="  z-10 flex h-10 w-10 cursor-pointer flex-col items-center  justify-center rounded-full bg-gray-200 align-middle text-lg text-white hover:border hover:border-error"
                  onClick={() => handleDeleteGallery(galleryId)}
                >
                  <FaTrash className="text-error" />
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
            <GalleryEditBox
              handleBack={handleBack}
              action={galleryId ? 'update' : 'create'}
              galleryId={Number(galleryId)}
              galleryType="ROOM"
              roomId={Number(roomId)}
              invalidateKey={invalidateKey}
            />
          </div>
        )}
      </div>
    </div>
  );
};
