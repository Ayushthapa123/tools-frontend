import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import Button from 'src/components/Button';
import ImageUploader from 'src/features/ImageUploader';
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
  const router = useRouter();

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
    mutationKey: [ String(invalidateKey) ]
  });

  //create new image
  const mutateUpdateGallery = useGraphqlClientRequest<
    UpdateHomestayImageMutation,
    UpdateHomestayImageMutationVariables
  >(UpdateHomestayImage.loc?.source.body!);

  const { mutateAsync: updateGallery } = useMutation({
    mutationFn: mutateUpdateGallery,
  });
  const handleSubmit = async () => {
       // create
      try {
        const response = await createGallery({
          data: {
            homestayId: Number(homestayId),
            url: imageUrl ?? '',
            caption: ''
          }
        });

        if (response?.createHomestayImage?.id) {
          await queryClient.invalidateQueries({ queryKey: [ String(invalidateKey) ] });
          await queryClient.invalidateQueries({queryKey:["getHomestayWallpaper"]})
          console.log("after submitting", response?.createHomestayImage);
          setShowToast(true);
          setMessage('Image Created Successfully');
          setImageUrl(null);
          setRole('success');
          handleBack?.();
          router.push(window.location.pathname)

        } else {
          throw new Error('Failed to get valid response ID');
        }
      }
    catch (error) {
      console.error('Error creating gallery image:', error);
      setShowToast(true);
      setMessage(`Error: ${error instanceof Error ? error.message : 'Something went wrong'}`);
      setRole('error');
    }
  }

  return (
    <div className="relative items-center w-full h-full border rounded-xl">
      <div className="absolute text-2xl cursor-pointer left-3 top-3">
        {' '}
        <div className="p-1 text-white bg-gray-200 rounded-full " onClick={() => { handleBack?.(); setImageUrl(null) }}>
          {' '}
          <FaLongArrowAltLeft className="rounded-full " />
        </div>
      </div>
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
