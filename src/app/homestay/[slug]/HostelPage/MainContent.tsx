'use client';
import { CiLocationOn } from 'react-icons/ci';
import { BreadCrumbs } from 'src/app/detail-page/BreadCrumbs';
import { CustomChip } from 'src/components/Chip';
import { CgWebsite } from 'react-icons/cg';
import Link from 'next/link';
import { ImageGallery } from 'src/app/detail-page/Gallery';
import { FoodTable } from 'src/app/detail-page/FoodTable';
import Button from 'src/components/Button';
import { Homestay } from 'src/gql/graphql';
import { MapComponent } from 'src/components/GoogleMap';
import { MapProvider } from 'src/features/MapProvider';
import { useRef, useState } from 'react';
import { Accordion } from '@material-tailwind/react';
import { BsAirplane } from 'react-icons/bs';
import { FcWiFiLogo } from 'react-icons/fc';
import WifiIcon from 'src/components/icons/Wifi';
import Image from 'next/image';
import { FaFacebook, FaParking, FaRegStar, FaStar } from 'react-icons/fa';
import RichTextEditor from 'src/components/RichTextEditor';
import { RoomCardFull } from '../booking/RoomCardFull';
import { FaPhoneFlip } from 'react-icons/fa6';
import { MdEmail, MdLocalOffer } from 'react-icons/md';
import { GrFacebook, GrInstagram, GrYoutube } from 'react-icons/gr';
import { useRoomStore } from 'src/store/roomStore';
import { motion } from 'framer-motion';

interface Iprops {
  hostel: Homestay | undefined | null;
  checkInDate: string;
  checkOutDate: string;
}

export default function MainContent(props: Iprops) {
  const { hostel, checkInDate, checkOutDate } = props;
  const [mainImage, setMainImage] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const roomImages = hostel?.rooms?.[0]?.image ?? [];
  const editorRef = useRef(hostel?.description ?? '');
  const { roomIds } = useRoomStore();

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto">
        <BreadCrumbs name={hostel?.name ?? ''} />
        <div className="box-border w-full lg:flex lg:gap-8 lg:px-10">
          <div className="box-border flex-grow overflow-x-hidden rounded-xl bg-white p-3 shadow-sm md:p-4 md:px-4">
            <div className="mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{hostel?.name}</h1>
                  <div className="mt-2 flex items-center text-gray-600">
                    <CiLocationOn className="mr-1 text-2xl text-blue-600" />
                    <span className="text-lg">{hostel?.address?.city}, {hostel?.address?.country}</span>
                  </div>
                </div>
                {/* <div className="flex space-x-3">
                  <button className="flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100">
                    <MdLocalOffer className="mr-2" /> Special Offers
                  </button>
                </div> */}
              </div>
            </div>

            <div className="mb-8">
              <div className="relative mb-4 h-[500px] w-full overflow-hidden rounded-2xl bg-gray-200">
                {roomImages.length > 0 ? (
                  <div className="group relative h-full w-full">
                    <Image
                      src={roomImages[mainImage]?.url ?? '/images/default-image.png'}
                      alt={`Room image ${mainImage + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      quality={90}
                    />
                    <button 
                      onClick={() => setIsGalleryOpen(true)}
                      className="absolute bottom-4 right-4 rounded-lg bg-white/80 px-4 py-2 text-sm font-medium text-gray-800 backdrop-blur-sm transition-opacity hover:bg-white/90"
                    >
                      View All Photos
                    </button>
                  </div>
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-300">
                    <span className="text-gray-500">Homestay image</span>
                  </div>
                )}
              </div>

              <div className="mb-8 grid grid-cols-6 gap-3">
                {roomImages.slice(0, 6).map((img, index) => (
                  <div
                    key={img.id}
                    className={`relative h-24 w-full cursor-pointer overflow-hidden rounded-lg bg-gray-200 transition-all duration-200 hover:opacity-90
                    ${mainImage === index ? 'ring-2 ring-blue-600 ring-offset-2' : ''}`}
                    onClick={() => setMainImage(index)}
                  >
                    <Image
                      src={img.url}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="rounded-xl rounded-t-none bg-white/70 border-t-2 border-gray-100 pt-1">
                <h2 className=" text-2xl font-semibold text-gray-800">Description</h2>
                {/* <div className="prose max-w-none">
                  <RichTextEditor editorRef={editorRef} readOnly={true} />
                </div> */}
                <div className='text-xs font-light leading-tight text-gray-600  '> 
                  {hostel?.description} 
                </div>
              </div>
            </div>
          </div>

          <div className="sticky top-[100px] m-3 lg:m-0 lg:min-w-[380px] lg:max-w-[380px]">
            <div className="space-y-6">

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">Hotel Facilities</h3>
                <div className="grid grid-cols-2 gap-y-5 gap-x-2 justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <BsAirplane />
                    </div>
                    <span className="text-sm text-gray-700">Airport Transport</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <WifiIcon />
                    </div>
                    <span className="text-sm text-gray-700">Free WiFi</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <FaParking />
                    </div>
                    <span className="text-sm text-gray-700">Free Parking</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">Rules</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs font-medium text-gray-500">Check In</p>
                    <p className="mt-1 text-base font-medium text-gray-800">10:00 AM</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs font-medium text-gray-500">Check Out</p>
                    <p className="mt-1 text-base font-medium text-gray-800">1:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 border-b border-gray-200 pb-2 text-lg font-semibold text-gray-800">Contact Us</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <FaPhoneFlip />
                    </div>
                    <p className="ml-3 text-gray-700">+977 783 705 178</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <MdEmail />
                    </div>
                    <p className="ml-3 text-gray-700">demo123@gmail.com</p>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-3 pt-2 font-medium text-gray-700">Socials:</div>
                    <div className="flex items-center space-x-4">
                      <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100">
                        <GrInstagram />
                      </a>
                      <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100">
                        <FaFacebook />
                      </a>
                      <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100">
                        <GrYoutube />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-xl bg-white m-6 p-4 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">Available Rooms</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {hostel?.rooms?.map((room) => (
              <div key={room.id} className="overflow-hidden rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-md">
                <RoomCardFull
                  room={room}
                  isSelected={roomIds.includes(room.id)}
                  slug={hostel?.slug}
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}