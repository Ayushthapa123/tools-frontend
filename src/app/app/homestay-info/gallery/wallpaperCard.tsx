import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import {
  DeleteHomestayImage,
  DeleteHomestayImageMutation,
  DeleteHomestayImageMutationVariables,
  DeleteRoomImageMutationVariables,
} from 'src/gql/graphql';
import { useToastStore } from 'src/store/toastStore';
import { WallpaperEditBox } from './WallpaperEditBox';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

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
  const queryClient = useQueryClient();
  const handleBack = () => {
    setShowEditBox(false);
  };
  const window = useRouter();

  //create new image
  const mutateDeleteGallery = useGraphqlClientRequest<
    DeleteHomestayImageMutation,
    DeleteHomestayImageMutationVariables
  >(DeleteHomestayImage.loc?.source.body!);

  const { mutateAsync: deleteGallery } = useMutation({
    mutationFn: mutateDeleteGallery,
  });

  const handleDeleteGallery = (galleryId: number) => {
    deleteGallery({ homestayImageId: galleryId }).then(res => {
      if (res?.deleteHomestayImage?.id) {
        queryClient.invalidateQueries({ queryKey: [ String(invalidateKey) ] });
        enqueueSnackbar("Image deleted successfully.",{variant:'success'})
        window.refresh();
      } else {
        enqueueSnackbar("Something went wrong",{variant:"error"})
      }
    });
  };
  return (
    <div className=" relative h-[300px] w-[350px] md:w-[450px] ">
      <div>
        {!showEditBox ? (
          <div>
            <div className="absolute right-3 top-3 z-50  flex flex-col gap-3">
              {galleryId && (
                <div
                  className=" border hover:border-error z-10 flex h-10 w-10 cursor-pointer flex-col items-center justify-center rounded-full bg-gray-200 align-middle text-lg text-white"
                  onClick={() => handleDeleteGallery(galleryId)}>
                  <FaTrash className='text-error'/>
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
