import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

import { useState } from 'react';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
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
  const { galleryType, handleBack, roomId, hostelId, galleryId, invalidateKey } = props;
  const router = useRouter();

  const queryClient = useQueryClient();

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const handleImageUrl = (url: string | null) => {
    setImageUrl(url);
  };

  //create new image

  const mutateCreateGallery = useGraphqlClientRequest<
    CreateGalleryMutation,
    CreateGalleryMutationVariables
  >(CreateGallery.loc?.source.body!);
  const { mutateAsync: createGallery } = useMutation({
    mutationFn: mutateCreateGallery,
    mutationKey: [String(invalidateKey)],
  });

  const handleSubmit = async () => {
    // create
    try {
      const response = await createGallery({
        data: {
          hostelId: Number(hostelId),
          url: imageUrl ?? '',
          caption: '',
        },
      });

      if (response?.createGallery?.data?.id) {
        await queryClient.invalidateQueries({ queryKey: [(invalidateKey)] });
        await queryClient.invalidateQueries({ queryKey: ['getGalleryByHostelId'] });
        enqueueSnackbar('Image Added Successfully', { variant: 'success' });
        setImageUrl(null);
        router.push(window.location.pathname);
        handleBack?.();
      } else {
        throw new Error('Failed to get valid response ID');
      }
    } catch (error) {
      enqueueSnackbar('Something went wrong.', { variant: 'error' });
    }
  };

  return (
    <div className="relative h-full w-full items-center rounded-xl border">
      {/* <div className="absolute left-3 top-3 cursor-pointer text-2xl">
        {' '}
        <div
          className="rounded-full bg-gray-200 p-1 text-white "
          onClick={() => {
            handleBack?.();
            setImageUrl(null);
          }}
        >
          {' '}
          <FaLongArrowAltLeft className="rounded-full " />
        </div>
      </div> */}
      <div className="w-full h-full">
        <div>
          <ImageUploader imageUrl={imageUrl} handleImageUrl={handleImageUrl} />
        </div>
        <div className="mx-auto mt-5 max-w-md pb-4 ">
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
