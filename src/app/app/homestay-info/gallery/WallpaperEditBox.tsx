import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import Button from 'src/components/Button';
import ImageUploader from 'src/components/ImageUploader';
import {
  CreateHomestayImage,
  CreateHomestayImageMutation,
  CreateHomestayImageMutationVariables,
  CreateRoomImage,
  CreateRoomImageMutation,
  CreateRoomImageMutationVariables,
  UpdateHomestayImage,
  UpdateHomestayImageMutation,
  UpdateHomestayImageMutationVariables,
  UpdateRoomImage,
  UpdateRoomImageMutation,
  UpdateRoomImageMutationVariables,
} from 'src/gql/graphql';
import { useToastStore } from 'src/store/toastStore';

interface IcoverEdit {
  handleBack?: () => void;
  galleryType: string;
  galleryId?: number;
  homestayId?: number;
  action?: 'create' | 'update';
  invalidateKey: string;
}

export const WallpaperEditBox = (props: IcoverEdit) => {
  const { galleryType, handleBack, galleryId, homestayId, invalidateKey } = props;
  const window = useRouter();

  const queryClient = useQueryClient();
  const { setMessage, setRole, setShowToast } = useToastStore();

  const [ imageUrl, setImageUrl ] = useState<string | null>(null);
  const handleImageUrl = (url: string | null) => {
    setImageUrl(url);
  };



  //create new image

  const mutateCreateGallery = useGraphqlClientRequest<CreateHomestayImageMutation, CreateHomestayImageMutationVariables>(CreateHomestayImage.loc?.source.body!)
  const { mutateAsync: createGallery } = useMutation({
    mutationFn: mutateCreateGallery,
    mutationKey:[String(invalidateKey)]
  });

  //create new image
  const mutateUpdateGallery = useGraphqlClientRequest<
    UpdateHomestayImageMutation,
    UpdateHomestayImageMutationVariables
  >(UpdateHomestayImage.loc?.source.body!);

  const { mutateAsync: updateGallery } = useMutation({
    mutationFn: mutateUpdateGallery,
  });
  const handleSubmit = () => {
    if (imageUrl && galleryId) {
      //update
      updateGallery({ homestayImageId: galleryId, data: { url: imageUrl, caption: '', homestayId: galleryId } }).then(res => {
        if (res?.updateHomestayImage?.id) {
          queryClient.invalidateQueries({ queryKey: [ String(invalidateKey) ]});
          setShowToast(true);
          setMessage('Image Updated Success');
          setRole('success');
          handleBack?.();
          window.refresh();
        } else {
          setShowToast(true);
          setMessage('Something went wrong');
          setRole('error');
        }
      });
    } else if (imageUrl && homestayId) {
      //create
      createGallery({ data: { homestayId: homestayId, url: imageUrl, caption: '' } }).then(async (res) => {
        if (res.createHomestayImage.id) {
          await queryClient.invalidateQueries({ queryKey: [ String(invalidateKey) ] });

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
    <div className="relative items-center w-full h-full border rounded-xl">
      {/* <div className="absolute text-2xl cursor-pointer left-3 top-3">
        {' '}
        <div className="p-1 text-white bg-gray-200 rounded-full " onClick={() => handleBack?.()}>
          {' '}
          <FaLongArrowAltLeft className="rounded-full " />
        </div>
      </div> */}
      <div className="">
        <div>
          <ImageUploader imageUrl={imageUrl} handleImageUrl={handleImageUrl} />
        </div>
        <div className="max-w-md mx-auto mt-5 pb-4 ">
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
