'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Modal } from 'src/components/Modal';
import { FaTrash } from 'react-icons/fa';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import {
  GetGalleryByHostelId,
  GetGalleryByHostelIdQuery,
  GetGalleryByHostelIdQueryVariables,
  DeleteRoomImage,
  DeleteRoomImageMutation,
  DeleteRoomImageMutationVariables,
  SelectGallery,
  SelectGalleryMutationVariables,
  GetHostelByTokenQuery,
  GetHostelByToken,
  GetHostelByTokenQueryVariables,
  SelectGalleryMutation,
  GalleryData,
} from 'src/gql/graphql';
import { WallpaperGallery } from '../hostel-info/gallery/WallpaperGallery';
import { enqueueSnackbar } from 'notistack';
import LoadingSpinner from 'src/components/Loading';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  //hostel id
  const queryHostelData = useGraphqlClientRequest<
    GetHostelByTokenQuery,
    GetHostelByTokenQueryVariables
  >(GetHostelByToken.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryHostelData();
    return res.getHostelByToken;
  };

  const { data: hostelData, isLoading } = useQuery({
    queryKey: ['getHostelByToken'],
    queryFn: fetchData,
  });

  // Get hostel wallpapers query
  const queryWallpapers = useGraphqlClientRequest<
    GetGalleryByHostelIdQuery,
    GetGalleryByHostelIdQueryVariables
  >(GetGalleryByHostelId.loc?.source?.body!);

  const fetchWallpapers = async () => {
    const res = await queryWallpapers({ hostelId: Number(hostelData?.data?.id) });
    return res.getGalleryByHostelId;
  };

  const { data: wallpaperData } = useQuery({
    queryKey: ['getGalleryByHostelId'],
    queryFn: fetchWallpapers,
    enabled: !!hostelData?.data?.id,
  });
  console.log("wd",wallpaperData)

  const mainWallpaper = wallpaperData?.data?.filter(img => img?.isSelected)[0] || wallpaperData?.data?.[0];

  // Delete wallpaper mutation
  const mutateDeleteGallery = useGraphqlClientRequest<
    DeleteRoomImageMutation,
    DeleteRoomImageMutationVariables
  >(DeleteRoomImage.loc?.source.body!);

  const { mutateAsync: deleteGallery } = useMutation({
    mutationFn: mutateDeleteGallery,
  });

  // Select wallpaper mutation
  const mutateSelectGallery = useGraphqlClientRequest<
    SelectGalleryMutation,
    SelectGalleryMutationVariables
  >(SelectGallery.loc?.source.body!);

  const { mutateAsync: selectGallery } = useMutation({
    mutationFn: mutateSelectGallery,
  });

  const handleImageClick = (img: GalleryData) => {
    if (img) {
      setSelectedImage(img);
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleDelete = async (img: GalleryData | undefined, e: React.MouseEvent) => {
    if (img) {
      e.stopPropagation();
      try {
        const response = await deleteGallery({
          roomImageId: Number(img.id),
        });

        if (response?.deleteRoomImage?.data?.id) {
          queryClient.invalidateQueries({ queryKey: ['getGalleryByHostelId'] });
          enqueueSnackbar('Room Deleted.', { variant: 'success' });
        }
      } catch (error) {
        enqueueSnackbar('Something went wrong', { variant: 'warning' });
      }
    }
  };
  const handleSelectGallery = async () => {
    try {
      const response = await selectGallery({
        galleryId: Number(selectedImage?.id),
        hostelId: Number(hostelData?.data?.id),
      });

      if (response?.selectGallery?.data?.id) {
        queryClient.invalidateQueries({ queryKey: ['getGalleryByHostelId'] });
        enqueueSnackbar('Image selected successfully.', { variant: 'success' });
        setShowModal(false);
      }
    } catch (error) {
      enqueueSnackbar('Failed to select image', { variant: 'error' });
    }
  };

  return (
    <div className="container mx-auto px-4 pb-4">
      <h1 className='text-2xl font-semibold mb-2'>Wallpaper Gallery</h1>

      {/* Main Image Section */}
        {mainWallpaper ? (
       <div className="mb-6">
          <div className="relative h-[300px] w-full overflow-hidden rounded-2xl bg-gray-200 lg:h-[500px]">
            <div className="relative h-full w-full">
              <Image
                src={mainWallpaper?.url ?? ''}
                alt={`Main image1}`}
                fill
                className="object-cover transition-transform duration-500"
                quality={90}
              />
            </div>
          </div>
      </div>
        ) : (
          <div>
            {isLoading && <LoadingSpinner />}
          </div>
        )}

      {/* Thumbnail Images Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {wallpaperData?.data?.map((img, index) => (
          <div
            key={img?.id}
            className={`relative h-24 w-full cursor-pointer overflow-hidden rounded-lg bg-gray-200 transition-all duration-200 hover:opacity-90
              ${img?.id === mainWallpaper?.id ? 'ring-2 ring-primary ring-offset-2' : ''}
              ${String(selectedImage?.id) === String(img?.id) ? 'ring-blue-600 ring-2 ring-offset-2' : ''}`}
            onClick={() => handleImageClick(img)}
          >
            <Image
              src={img?.url ?? ''}
              alt={`Thumbnail ${index + 1}`}
              fill
              className={`rounded-lg object-cover`}
            />
            <button
              onClick={e => handleDelete(img, e)}
              className="bg-red-500 absolute right-2 top-2 z-50 rounded-full bg-error p-1.5 text-white duration-200 hover:bg-white hover:text-error/80"
              aria-label="Delete image"
            >
              <FaTrash className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {Number(wallpaperData?.data?.length) < 6 && (
        <div className="card card-body card-bordered bg-white pt-2 mt-4">
          <WallpaperGallery
            hostelId={Number(hostelData?.data?.id)}
            galleryType="ROOM"
            galleryKey="getGalleryByHostelId"
          />
        </div>
      )}

      {showModal && (
        <Modal
          title="Are you sure you want to make this image your wallpaper?"
          open={showModal}
          handleClose={handleModalClose}
          onSave={handleSelectGallery}
        >
          <div className="relative h-[200px] w-full rounded-lg">
            <Image
              src={selectedImage?.url ?? '/images/default-image.png'}
              alt={`Thumbnail + 1}`}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
