'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Modal } from 'src/components/Modal';
import { FaTrash } from 'react-icons/fa';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { useToastStore } from 'src/store/toastStore';
import {
  GetHomestayWallpaperByHomestayId,
  GetHomestayWallpaperByHomestayIdQuery,
  GetHomestayWallpaperByHomestayIdQueryVariables,
  DeleteHomestayImage,
  DeleteHomestayImageMutation,
  DeleteHomestayImageMutationVariables,
  SelectHomestayImage,
  SelectHomestayImageMutation,
  SelectHomestayImageMutationVariables,
  GetHomestayByTokenQuery,
  GetHomestayByToken,
  GetHomestayByTokenQueryVariables
} from 'src/gql/graphql';
import { WallpaperGallery } from '../homestay-info/gallery/WallpaperGallery';


interface HomestayImage {
  id: string;
  url: string;
  isSelected: boolean;
}

export default function Gallery() {
  const [ selectedImage, setSelectedImage ] = useState<HomestayImage | null>(null);
  const [ showModal, setShowModal ] = useState(false);
  const queryClient = useQueryClient();
  const { setMessage, setRole, setShowToast } = useToastStore();

  //homestay id
  const queryHostelData = useGraphqlClientRequest<
    GetHomestayByTokenQuery,
    GetHomestayByTokenQueryVariables
  >(GetHomestayByToken.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryHostelData();
    return res.getHomestayByToken;
  };

  const { data: homestayData, isLoading } = useQuery({
    queryKey: [ 'getHomestayByToken' ],
    queryFn: fetchData,
  });

  // Get homestay wallpapers query
  const queryWallpapers = useGraphqlClientRequest<
    GetHomestayWallpaperByHomestayIdQuery,
    GetHomestayWallpaperByHomestayIdQueryVariables
  >(GetHomestayWallpaperByHomestayId.loc?.source?.body!);

  console.log("hstyid", homestayData?.id);
  const fetchWallpapers = async () => {
    const res = await queryWallpapers({ homestayId: Number(homestayData?.id) });
    return res.getHomestayWallpaperByHomestayId;
  };

  const { data: wallpaperDat } = useQuery({
    queryKey: [ 'getHomestayWallpaper' ],
    queryFn: fetchWallpapers,
    enabled: !!homestayData?.id,
  });
  const wallpaperData = wallpaperDat?.filter(img => img.url !== ("https:/example.com/image.jpg"));
  // remove this line after removing example.com from db

  const mainWallpaper = wallpaperData?.filter(img => img.isSelected)[ 0 ];

  // Delete wallpaper mutation
  const mutateDeleteWallpaper = useGraphqlClientRequest<
    DeleteHomestayImageMutation,
    DeleteHomestayImageMutationVariables
  >(DeleteHomestayImage.loc?.source.body!);

  const { mutateAsync: deleteWallpaper } = useMutation({
    mutationFn: mutateDeleteWallpaper,
  });

  // Select wallpaper mutation
  const mutateSelectWallpaper = useGraphqlClientRequest<
    SelectHomestayImageMutation,
    SelectHomestayImageMutationVariables
  >(SelectHomestayImage.loc?.source.body!);

  const { mutateAsync: selectWallpaper } = useMutation({
    mutationFn: mutateSelectWallpaper,
  });

  const handleImageClick = (img: HomestayImage) => {
    setSelectedImage(img);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleDelete = async (img: HomestayImage, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await deleteWallpaper({
        homestayImageId: Number(img.id)
      });

      if (response?.deleteHomestayImage?.id) {
        queryClient.invalidateQueries({ queryKey: [ 'getHomestayWallpaper' ] });
        setShowToast(true);
        setMessage('Image deleted successfully');
        setRole('success');
      }
    } catch (error) {
      setShowToast(true);
      setMessage('Failed to delete image');
      setRole('error');
    }
  };

  const handleSelectWallpaper = async () => {
    try {
      const response = await selectWallpaper({
        selectHomestayImageId: Number(selectedImage?.id),
        homestayId: Number(homestayData?.id)
      });

      if (response?.selectHomestayImage?.id) {
        queryClient.invalidateQueries({ queryKey: [ 'getHomestayWallpaper' ] });
        setShowToast(true);
        setMessage('Wallpaper selected successfully');
        setRole('success');
        setShowModal(false);
      }
    } catch (error) {
      setShowToast(true);
      setMessage('Failed to select wallpaper');
      setRole('error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-primary">Homestay Images</h1>

      {/* Main Image Section */}
      <div className="mb-6">
        {
          mainWallpaper? (<div className="relative h-[500px] w-full overflow-hidden rounded-2xl bg-gray-200">
            <div className="relative h-full w-full">
              <Image
                src={mainWallpaper?.url}
                alt={`Main image1}`}
                fill
                className="object-cover transition-transform duration-500"
                quality={90}
              />
            </div>
          </div>) : (
              <div>
                <span className='text-gray-500'>No wallpaper to display</span>
              </div>
          )
        }
      </div>

      {/* Thumbnail Images Section */}
      <div className="grid grid-cols-6 gap-3">
        {wallpaperData?.map((img, index) => (
          <div
            key={img.id}
            className={`relative h-24 w-full cursor-pointer overflow-hidden rounded-lg bg-gray-200 transition-all duration-200 hover:opacity-90
              ${img.id === mainWallpaper?.id ? 'ring-2 ring-primary ring-offset-2' : ''}
              ${String(selectedImage?.id) === String(img.id) ? 'ring-2 ring-blue-600 ring-offset-2' : ''}`}
            onClick={() => handleImageClick(img)}
          >
            <Image
              src={img.url}
              alt={`Thumbnail ${index + 1}`}
              fill
              className={`object-cover rounded-lg`}
            />
            <button
              onClick={(e) => handleDelete(img, e)}
              className="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white hover:text-error/80 duration-200 bg-error hover:bg-white z-50"
              aria-label="Delete image"
            >
              <FaTrash className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {
         Number(wallpaperData?.length) < 6 && (
          <div className="bg-white card-body card card-bordered my-4 ">
            <WallpaperGallery homestayId={Number(homestayData?.id)} galleryType="ROOM" galleryKey="getRoomImages" />
          </div>
        )
      }

      {showModal && (
        <Modal
          title='Are you sure you want to make this image your wallpaper?'
          open={showModal}
          handleClose={handleModalClose}
          onSave={handleSelectWallpaper}
        >
          <div className='relative h-[200px] rounded-lg w-full'>
            <Image
              src={selectedImage?.url ?? '/images/default-image.png'}
              alt={`Thumbnail + 1}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
