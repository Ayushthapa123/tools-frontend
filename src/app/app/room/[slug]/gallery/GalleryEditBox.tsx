import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

import { useState } from 'react';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import Button from 'src/components/Button';
import ImageUploader from 'src/features/ImageUploader';
import {
  CreateRoomImage,
  CreateRoomImageMutation,
  CreateRoomImageMutationVariables,
  UpdateRoomImage,
  UpdateRoomImageMutation,
  UpdateRoomImageMutationVariables,
} from 'src/gql/graphql';
import { useToastStore } from 'src/store/toastStore';

interface IcoverEdit {
  handleBack?: () => void;
  galleryType: string;
  galleryId?: number;
  roomId?: number;
  action?: 'create' | 'update';
  invalidateKey: string;
}

export const GalleryEditBox = (props: IcoverEdit) => {
  const { galleryType, handleBack, galleryId, roomId, invalidateKey } = props;

  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const handleImageUrl = (url: string | null) => {
    setImageUrl(url);
  };

  //create new image
  const mutateCreateGallery = useGraphqlClientRequest<
    CreateRoomImageMutation,
    CreateRoomImageMutationVariables
  >(CreateRoomImage.loc?.source.body!);

  const { mutateAsync: createGallery } = useMutation({
    mutationFn: mutateCreateGallery,
  });

  //create new image
  const mutateUpdateGallery = useGraphqlClientRequest<
    UpdateRoomImageMutation,
    UpdateRoomImageMutationVariables
  >(UpdateRoomImage.loc?.source.body!);

  const { mutateAsync: updateGallery } = useMutation({
    mutationFn: mutateUpdateGallery,
  });
  const handleSubmit = () => {
    if (imageUrl && galleryId) {
      //update
      updateGallery({
        roomImageId: galleryId,
        data: { url: imageUrl, caption: '', id: galleryId },
      }).then(res => {
        if (res?.updateRoomImage?.data?.id) {
          queryClient.invalidateQueries({ queryKey: [String(invalidateKey)] });
          enqueueSnackbar('Image Updated Success', { variant: 'success' });
          handleBack?.();
        } else {
          enqueueSnackbar("Couldn't upload image", { variant: 'error' });
        }
      });
    } else if (imageUrl && roomId) {
      //create
      createGallery({ data: { roomId: roomId, url: imageUrl, caption: '' } }).then(res => {
        if (res.createRoomImage.data?.id) {
          queryClient.invalidateQueries({ queryKey: [String(invalidateKey)] });

          enqueueSnackbar('Image Created Success', { variant: 'success' });
          handleBack?.();
          setImageUrl(null);
        } else {
          enqueueSnackbar('Something went wrong.', { variant: 'error' });
          handleBack?.();
        }
      });
    }
  };

  return (
    <div className="relative h-full w-full items-center rounded-lg border py-4">
      <div className="">
        <div>
          <ImageUploader imageUrl={imageUrl} handleImageUrl={handleImageUrl} />
        </div>
        <div className="mx-auto mt-5 max-w-md ">
          <Button
            label="Upload Image"
            disabled={imageUrl ? false : true}
            onClick={() => handleSubmit()}
          />
        </div>
      </div>
    </div>
  );
};
