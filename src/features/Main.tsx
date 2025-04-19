'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'src/components/Button';
import ReactSelect from 'src/features/react-hook-form/ReactSelect';

import { MdOutlineCancelPresentation } from 'react-icons/md';
import Link from 'next/link';

import { IoMdDownload } from 'react-icons/io';
import Toast from './Toast';

type OptionsData = {
  style: string;
  roomType: string;
  rennovation: string;
};

interface Iprops {
  projectName: string;
}

export const Main = (props: Iprops) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    getValues,
    formState: { errors },
  } = useForm<OptionsData>({
    defaultValues: {
      style: 'victorian',
      roomType: 'bedroom',
      rennovation: 'interior',
    },
  });

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
      setSelectedFile(files[0]);
      readAndDisplayImage(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
      readAndDisplayImage(file);
    }
  };

  const readAndDisplayImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file); // Reading file as data URL
  };

  const [binaryString, setBinaryString] = useState<any>('');

  const handleApiCall = async () => {
    if (selectedFile) {
      setLoading(true);
      setResultImage(null);
      try {
        // Create a FormData object and append the file
        const formData = new FormData();
        // formData.append('file', new Blob([binaryData]), selectedFile.name);
        formData.append('file', selectedFile);

        // Fetch the processed image from the backend
        fetch(
          `https://api-renovate.onrender.com/upload-image/?style=${getValues().style}&room=${getValues().roomType}`,
          {
            method: 'POST',
            body: formData,
          },
        )
          .then(response => response.arrayBuffer())
          .then(arrayBuffer => {
            const blob = new Blob([arrayBuffer]);

            // const binaryString = arrayBufferToString(arrayBuffer);
            // uploadImage(binaryString);

            // Now 'binaryString' contains the image data in binary string form

            // Now 'binaryString' contains the image data in binary string form

            const processedImageUrl = URL.createObjectURL(blob);
            setResultImage(processedImageUrl);
            // processedImage.src = processedImageUrl;
            // processedImage.style.display = 'block';
            setLoading(false);
            return processedImageUrl;
          })

          .catch(error => {
            console.error('Error:', error);
            setMessage('Error Uploading Image');
            setShowAlert(true);
            setLoading(false);
          });

        // Reset state after API call if needed
        // setSelectedFile(null);

        // setImageUrl(null);
      } catch (error) {
        console.error('Error calling API:', error);
        setLoading(false);
      }
    }
  };

  function arrayBufferToString(arrayBuffer: any) {
    const binaryArray = new Uint8Array(arrayBuffer);
    const binaryString = binaryArray.reduce((str, byte) => str + String.fromCharCode(byte), '');
    return binaryString;
  }

  const uploadImage = async (binaryString: string) => {
    alert('nooo')
    try {
      const response = await fetch('http://localhost:3003/upload/image', {
        method: 'POST',
        body: JSON.stringify({ binaryData: binaryString }), // Convert to JSON string
        headers: {
          'Content-Type': 'application/json', // Set the content type to indicate JSON data
        },
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const responseData = await response.json();
      console.log('Image uploaded successfully:', responseData.imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const rennovationOptions = [
    { label: 'Interior', value: 'interior' },
    { label: 'Exterior', value: 'exterior' },
  ];
  const roomOptions = [
    { label: 'bedroom', value: 'bedroom' },
    { label: 'living room', value: 'living room' },
    { label: 'dining room', value: 'dining room' },
    { label: 'kitchen', value: 'kitchen' },
    { label: 'bathroom', value: 'bathroom' },
  ];

  const stylesOptions = [
    { label: 'victorian', value: 'victorian' },
    { label: 'gothic', value: 'gothic' },
    { label: 'steampunk', value: 'steampunk' },
    { label: 'medieval', value: 'medieval' },
    { label: 'renaissance', value: 'renaissance' },
  ];

  const removeImage = () => {
    setImageUrl(null);
  };
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <div className="flex flex-col w-full gap-5  lg:flex-row">
      {showAlert && <Toast role="alert" message={message} />}
      <div className="flex h-[calc(100vh-70px)] w-full flex-col  shadow-lg lg:w-[350px]">
        <div className="p-5 ">
          <h2 className="text-lg font-bold  text-primary">Upload a picture of your home</h2>
        </div>
        <div className="flex flex-col h-full p-5 ">
          <div
            className={`relative flex h-[200px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed ${
              isDragging ? 'border-blue-500' : 'border-gray-300'
            }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}>
            <input type="file" className="hidden" onChange={handleChange} />
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
                  className="px-4 py-2 mt-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600">
                  Browse Pictures
                </label>
                <input id="fileInput" type="file" className="hidden" onChange={handleChange} />
              </>
            )}
          </div>
          <div className="flex-grow ">
            {/* <button onClick={() => uploadImage('fslf')}>upload image</button> */}
            <div className="mt-9">
              <ReactSelect
                name="rennovation"
                control={control}
                label=" Rennovation"
                options={rennovationOptions}
                required
                helperText={errors.roomType?.type === 'required' ? 'Selection is Required' : ''}
                error={!!errors.rennovation}
              />
            </div>
            <div className="mt-5">
              <ReactSelect
                name="roomType"
                control={control}
                label=" Room"
                options={roomOptions}
                required
                helperText={errors.roomType?.type === 'required' ? 'Selection is Required' : ''}
                error={!!errors.roomType}
              />
            </div>
            <div className="mt-5">
              <ReactSelect
                name="style"
                control={control}
                label=" Style"
                options={stylesOptions}
                required
                helperText={errors.style?.type === 'required' ? 'Selection is Required' : ''}
                error={!!errors.style}
              />
            </div>
          </div>
          <div className="relative mt-5 ">
            <Button
              label="Generate"
              disabled={loading}
              className={`${loading ? 'bg-gray-300' : ''}`}
              onClick={() => handleApiCall()}
            />
          </div>
        </div>
      </div>
      <div className="box-border flex-grow  p-9">
        <div className=" relative top-[-20px] w-full  font-semibold text-primary">
          <Link href={'/app'}>Rennovate</Link> / {props.projectName}
        </div>
        {resultImage ? (
          <div className=" relative h-[300px]  w-full rounded-lg border-[5px] border-primary bg-slate-200 md:h-[80vh]">
            <div className="absolute z-10 flex flex-col items-center justify-center text-white align-middle rounded-full shadow  left-3 top-3 h-7 w-7 bg-primary">
              1
            </div>
            <div
            // onClick={() => uploadImage()}
            >
              <div className="absolute z-10 flex flex-col items-center justify-center p-3 text-3xl text-white align-middle rounded-full shadow  right-3 top-3 bg-primary">
                <IoMdDownload />
              </div>{' '}
            </div>

            <Image src={resultImage} alt="result image" className="w-full h-full " fill />
          </div>
        ) : (
          <div className="w-full ">
            {loading ? (
              <div>
                <div className="skeleton h-[70vh] w-full bg-primary  "></div>
              </div>
            ) : (
              <div className=" relative h-[300px]  w-full rounded-lg border-[5px] border-primary bg-slate-200 md:h-[80vh]">
                <div className="absolute z-10 flex flex-col items-center justify-center text-white align-middle rounded-full shadow  left-3 top-3 h-7 w-7 bg-primary">
                  1
                </div>
                <div className="absolute z-10 flex flex-col items-center justify-center px-3 text-white align-middle rounded-full shadow  right-3 top-3 bg-primary">
                  Sample{loading}
                </div>
                <Image src={'/images/default-image.png'} alt="result image" fill />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
