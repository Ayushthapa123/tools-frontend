import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useState } from 'react';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import Button from 'src/components/Button';
import ImageUploader from 'src/components/ImageUploader';
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
  const { setMessage, setRole, setShowToast } = useToastStore();

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
      updateGallery({ roomImageId: galleryId, data: { url: imageUrl, caption: '', id: galleryId } }).then(res => {
        if (res?.updateRoomImage?.id) {
          queryClient.invalidateQueries({ queryKey: [String(invalidateKey)] });
          setShowToast(true);
          setMessage('Image Updated Success');
          setRole('success');
          handleBack?.();
        } else {
          setShowToast(true);
          setMessage('Something went wrong');
          setRole('error');
        }
      });
    } else if (imageUrl && roomId) {
      //create
      createGallery({ data: { roomId: roomId, url: imageUrl, caption: '' } }).then(res => {
          if (res.createRoomImage.id) {
          queryClient.invalidateQueries({ queryKey: [String(invalidateKey)] });

          setShowToast(true);
          setMessage('Image Created Success');
          setRole('success');
          handleBack?.();
          setImageUrl(null);
        } else {
          setShowToast(true);
          setMessage('Something went wrong');
          setRole('error');
          handleBack?.();
        }
      });
    }
  };

  return (
    <div className="relative items-center w-full h-full py-4 border ">
      <div className="absolute text-2xl cursor-pointer left-3 top-3">
        {' '}
        <div className="p-1 text-white bg-gray-200 rounded-full " onClick={() => handleBack?.()}>
          {' '}
          <FaLongArrowAltLeft className="rounded-full " />
        </div>
      </div>
      <div className="">
        <div>
          <ImageUploader imageUrl={imageUrl} handleImageUrl={handleImageUrl}  />
        </div>
        <div className="max-w-md mx-auto mt-5 ">
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
