import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { MdOutlineCancel } from 'react-icons/md';
import LoadingSpinner from 'src/components/Loading';
import { enqueueSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';
interface Iprops {
  handleImageUrl: (url: string | null) => void;
  imageUrl: string | null;
}


const ImageUploader = (props: Iprops) => {
  const { handleImageUrl, imageUrl } = props;
  const [ loading, setLoading ] = useState(false);

  const [ isDragging, setIsDragging ] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

  const validateFile = (file: File): boolean => {
    if (!file.type.startsWith('image/')) {
      enqueueSnackbar('Please upload only image files (jpg, jpeg, png)', {
        variant: 'error',
      });
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      enqueueSnackbar('File size should be less than 5MB', {
        variant: 'error',
      });
      return false;
    }

    return true;
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[ 0 ];
    if (file && validateFile(file)) {
      handleUpload(file);
    }
  };

  const handleUpload = async (file: File) => {
    try {
      const formData = new FormData();
      if (file) {
        if (file.size > MAX_FILE_SIZE) {
          enqueueSnackbar(`File must be smaller than ${MAX_FILE_SIZE} MB. `, { variant: 'error' });
          return;
        }
      }
      setLoading(true);
      formData.append('image', file);

      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL!}/upload/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          setLoading(false);
          queryClient.invalidateQueries({ queryKey: [ 'getHostelWallpaper' ] });
          handleImageUrl(res.data.imageUrl);
        });
    } catch (error) {
      setLoading(false);
      console.error('Error uploading image:', error);
      // Handle error
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files && files.length > 0) {
      const file = files[ 0 ];
      if (validateFile(file)) {
        handleUpload(file);
      }
    }
  };

  const removeImage = () => {
    handleImageUrl(null);
  };

  return (
    <div className="mx-auto mt-4 max-w-md">
      <div
        className={`relative flex h-[200px] w-full flex-col items-center justify-center rounded-lg border-[3px] ${!imageUrl ? 'border-dashed' : 'border-none'} ${isDragging ? 'border-blue-500' : 'border-gray-300'
          }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png"
        />
        {imageUrl ? (
          <div className="relative h-full w-full ">
            <div
              className="group absolute right-1 p-1 top-1 z-10 cursor-pointer text-[25px]"
              onClick={() => removeImage()}
            >
              <MdOutlineCancel className='text-red rounded-full group-hover:bg-gray-200' />
            </div>

            <Image src={imageUrl} alt="Uploaded" className="h-24 w-auto" fill />
          </div>
        ) : (
          <>
            <label
              htmlFor="fileInput"
              className="flex flex-col items-center justify-center h-48 w-full cursor-pointer "
            >
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".jpg, .jpeg, .png"
              />
              <p className="text-gray-600">Drag & Drop your picture here</p>
              <p className="mt-2 text-gray-400">or</p>
              <span className="mt-1 inline-block rounded bg-primary/10 px-4 py-2 text-primary">
                Click anywhere to upload
              </span>
            </label>
            {loading && ( 
              <div className="h-10 w-10">
                <LoadingSpinner color="primary" size="lg" />
              </div>
            )}
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".jpg , .jpeg, .png"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
