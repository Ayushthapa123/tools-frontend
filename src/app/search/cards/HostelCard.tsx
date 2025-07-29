'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaRegHeart, FaShower, FaWalking } from 'react-icons/fa';
import { GiCctvCamera } from 'react-icons/gi';
import { GrLocation } from 'react-icons/gr';
import { IoIosWifi } from 'react-icons/io';
import { MdTableRestaurant } from 'react-icons/md';
import { RiPinDistanceLine } from 'react-icons/ri';
import { Badge } from 'src/components/Badge';
import Button from 'src/components/Button';
import { HostelData } from 'src/gql/graphql';
import { calculateWalkingTime } from 'src/utils/calculateWalkingTime';

// Please remove this interface and use the type from the backend

export const HostelCard = ({
  hostel,
  currentLat,
  currentLong,
}: {
  hostel: HostelData;
  currentLat?: number;
  currentLong?: number;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const editorRef = useRef(hostel.description ?? '');
  const [sliderCurrentIndex, setSliderCurrentIndex] = useState(0);

  const mainWallpaper =
    hostel.gallery?.find((img: any) => img.isSelected === true) ?? hostel.gallery?.[0];
  const otherImages = hostel.gallery?.filter((img: any) => img.isSelected === false);
  const imageUrl = mainWallpaper?.url ?? '/images/noPhotoWallpaper.jpg';

  // const imagesArray = [ imgUrl, ...otherImages.map((img: any) => img.url) ].filter(Boolean);

  const imagesArray = [imageUrl, ...(otherImages?.map((img: any) => img.url) || [])].filter(
    Boolean,
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return '!bg-green/80';
      case 'occupied':
        return '!bg-red/80';
      case 'maintenance':
        return '!bg-yellow/80';
      default:
        return '!bg-gray-100 !text-gray-800';
    }
  };

  const capitalizeHostelName = (name: string) => {
    return name.replace(/\b\w/g, char => char.toUpperCase());
  };

  const handleSliderLeftClick = (index: number) => {
    if (index > 0) {
      setSliderCurrentIndex(index - 1);
    }
  };

  const handleSliderRightClick = (index: number) => {
    if (index < imagesArray.length - 1) {
      setSliderCurrentIndex(index + 1);
    }
  };
  // Minimum Room Price Calculator
  const minimumRoomPrice: number | null = Array.isArray(hostel.rooms)
    ? hostel.rooms
        ?.filter(room => room?.price?.baseAmountPerMonth != null)
        .reduce((min: number, room: any) => {
          return Math.min(min, room?.price?.baseAmountPerMonth);
        }, hostel.rooms?.[0]?.price?.baseAmountPerMonth ?? Infinity)
    : null;

  return (
    <div className="group card-bordered mb-2 flex h-full w-full cursor-pointer flex-col gap-4 rounded-xl bg-white pb-2 transition duration-200 ease-in-out hover:opacity-100 hover:shadow-lg">
      <div className="relative h-[300px] w-full rounded-xl border-b-[1px] border-gray-300">
        <div className="group relative h-full w-full">
          <Image
            src={imagesArray[sliderCurrentIndex]}
            alt={hostel.name}
            fill
            className="rounded-xl rounded-b-none object-cover"
          />
          <div className="absolute inset-0 top-[60%]  bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-2 left-2 flex w-fit items-center gap-6">
            <div>
              <IoIosWifi className="h-5 w-5 font-semibold text-white/80" />
            </div>
            <div>
              <FaShower className="h-5 w-5 font-semibold text-white/80" />
            </div>
            <div>
              <MdTableRestaurant className="h-5 w-5 font-semibold text-white/80" />
            </div>
            <div>
              <GiCctvCamera className="h-5 w-5 font-semibold text-white/80" />
            </div>
          </div>
          {/* slider section */}
          {imagesArray.length > 1 && (
            <>
              <div className="absolute bottom-[50%] left-2 flex w-fit items-center gap-6">
                <div className="rounded-full border border-white p-2">
                  <FaChevronLeft
                    className={`h-4 w-4 font-semibold text-white  transition duration-300 ease-in-out group-hover:scale-105 ${sliderCurrentIndex === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={() => handleSliderLeftClick(sliderCurrentIndex)}
                  />
                </div>
              </div>
              <div className="absolute bottom-[50%] right-2 flex w-fit items-center gap-6">
                <div className="rounded-full border border-white p-2">
                  <FaChevronRight
                    className={`h-4 w-4 font-semibold text-white  transition duration-300 ease-in-out group-hover:scale-105 ${sliderCurrentIndex === imagesArray.length - 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={() => handleSliderRightClick(sliderCurrentIndex)}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="absolute right-2 top-1 z-10">
          <Badge
            className={` px-3 py-1 !text-xs font-bold uppercase tracking-wide text-white/90 ${getStatusColor('Available')} !rounded-md `}>
            Available
          </Badge>
        </div>
        <p className="absolute -bottom-3 right-1 rounded-md bg-transparent p-1 px-3 font-semibold text-white/90">
          {hostel.genderType ? `For ${hostel.genderType.toLowerCase()}` : ''}
        </p>
      </div>

      <div className="flex-grow overflow-y-auto px-2" style={{ maxHeight: '180px' }}>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-col leading-3">
            <h3 className="m-0 ml-1 text-2xl font-semibold text-gray-900">
              {capitalizeHostelName(hostel.name)}
            </h3>
            <p className="text-capitalize my-1 flex items-center gap-2 text-xs text-primary/70">
              <GrLocation className="h-5 w-5 font-bold text-red" />
              <span className="text-base text-gray-700">
                {hostel.address?.subCity} {hostel.address?.city}, {hostel.address?.country}
              </span>
            </p>
            <p className="text-capitalize my-1 flex items-center gap-2 text-xs text-primary/70">
              {Boolean(currentLat) &&
                Boolean(currentLong) &&
                Boolean(hostel.address?.latitude) &&
                Boolean(hostel.address?.longitude) && (
                  <span className="flex text-base text-gray-700">
                    <FaWalking className="h-5 w-5 font-bold text-red" />
                    In a walking distance of{' '}
                    {calculateWalkingTime(
                      hostel.address?.latitude ?? 0,
                      hostel.address?.longitude ?? 0,
                      currentLat ?? 0,
                      currentLong ?? 0,
                    )}{' '}
                    minutes
                  </span>
                )}
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="rounded-full p-2 hover:bg-gray-200">
              <FaRegHeart className="h-6 w-6 font-semibold text-red/65" />
            </div>
            {/* <span className='text-sm text-secondary/80 font-semibold'>{currency} {amount}</span> */}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-1">
          {minimumRoomPrice != Infinity ? (
            <div className="">
              <h3 className="m-0 text-sm font-semibold text-gray-600">Starting with</h3>
              <p className="m-0 text-base font-extrabold text-gray-400">
                Nrs <span className="text-2xl text-secondary">{minimumRoomPrice}</span> /month
              </p>
            </div>
          ) : (
            <p>No price mentioned</p>
          )}
          <div className="mt-2 flex items-center justify-between gap-2">
            <Link href={`/hostel/${hostel.slug}`}>
              <Button
                label={'View Details'}
                className="!bg-primary/90 tracking-wide hover:!bg-primary"
                height="sm"
                endAdornment={<FaArrowRight />}
              />
            </Link>
          
          </div>
        </div>
      </div>
    </div>
  );
};
