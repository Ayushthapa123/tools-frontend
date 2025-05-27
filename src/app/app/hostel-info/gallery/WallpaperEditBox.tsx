import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

import { useState } from 'react';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import Button from 'src/components/Button';
import ImageUploader from 'src/features/ImageUploader';
import {
  CreateGalleryMutation,
  CreateGallery,

  CreateGalleryMutationVariables,
  UpdateGalleryMutation,
  UpdateGalleryMutationVariables,
  UpdateGallery,
} from 'src/gql/graphql';
import { useToastStore } from 'src/store/toastStore';

interface IcoverEdit {
  handleBack?: () => void;
  galleryType: string;
  roomId?: number;
  hostelId?: number;
  action?: 'create' | 'update';
  invalidateKey: string;
  galleryId?: number;
}

export const WallpaperEditBox = (props: IcoverEdit) => {
  const { galleryType, handleBack, roomId, hostelId,galleryId, invalidateKey } = props;
  const router = useRouter();

  const queryClient = useQueryClient();

  const [ imageUrl, setImageUrl ] = useState<string | null>(null);
  const handleImageUrl = (url: string | null) => {
    setImageUrl(url);
  };



  //create new image

  const mutateCreateGallery = useGraphqlClientRequest<CreateGalleryMutation, CreateGalleryMutationVariables>(CreateGallery.loc?.source.body!)
  const { mutateAsync: createGallery } = useMutation({
    mutationFn: mutateCreateGallery,
    mutationKey: [ String(invalidateKey) ]
  });



  const handleSubmit = async () => {
       // create
      try {
        const response = await createGallery({
          data: {
            hostelId: Number(hostelId),
            url: imageUrl ?? '',
            caption: ''
          }
        });

        if (response?.createGallery?.data?.id) {
          await queryClient.invalidateQueries({ queryKey: [ String(invalidateKey) ] });
          await queryClient.invalidateQueries({queryKey:["getGalleryByHostelId"]})
          enqueueSnackbar('Image Created Successfully',{variant:'success'})
          setImageUrl(null);
          handleBack?.();
          router.push(window.location.pathname)

        } else {
          throw new Error('Failed to get valid response ID');
        }
      }
    catch (error) {
     enqueueSnackbar("Something went wrong.",{variant:'error'})
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
