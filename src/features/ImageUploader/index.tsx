import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { MdOutlineCancelPresentation } from 'react-icons/md';
import LoadingSpinner from 'src/components/Loading';

interface Iprops {
  handleImageUrl: (url: string | null) => void;
  imageUrl: string | null;
}
const ImageUploader = (props: Iprops) => {
  const { handleImageUrl, imageUrl } = props;
  const [loading, setLoading] = useState(false);

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFileChange = (event: any) => {
    handleUpload(event.target.files[0]);
  };

  const handleUpload = async (file: File) => {
    try {
      const formData = new FormData();
      if (file) {
        formData.append('image', file);
      } else {
        // alert('no file selected');
      }
      setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL!}/upload/image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            
          },
        },
      );
      console.log("handle response", response);
      setLoading(false);

      handleImageUrl(response.data.imageUrl);
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
      handleUpload(files[0]);
    }
  };

  const removeImage = () => {
    handleImageUrl(null);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div
        className={`relative flex h-[200px] w-full flex-col items-center justify-center rounded-lg border-[3px] border-dashed ${
          isDragging ? 'border-blue-500' : 'border-gray-300'
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        <input type="file" className="hidden" onChange={handleFileChange} />
        {imageUrl ? (
          <div className="relative w-full h-full ">
            <div
              className=" absolute right-0 top-0 z-10 cursor-pointer text-[25px]" 
              onClick={() => removeImage()}>
              <MdOutlineCancelPresentation />
            </div>

            <Image src={imageUrl} alt="Uploaded" className="w-auto h-24" fill />
          </div>
        ) : (
          <>
            <p className="text-gray-600">Drag &amp; Drop your picture here</p>
            <p className="mt-2 text-gray-400">or</p>
            <label
              htmlFor="fileInput"
              className="px-4 py-2 mt-2  text-gray-600 bg-blue-500 rounded hover:bg-blue-600">
              Browse Pictures
            </label>
            {loading && (
              <div className="w-10 h-10">
                <LoadingSpinner color="primary" size="lg" />
              </div>
            )}
            <input id="fileInput" type="file" className="hidden" onChange={handleFileChange} />
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
