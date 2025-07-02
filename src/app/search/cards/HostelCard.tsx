'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { FaRegHeart, FaShower } from 'react-icons/fa';
import { GiCctvCamera } from 'react-icons/gi';
import { GrLocation } from 'react-icons/gr';
import { IoIosWifi } from 'react-icons/io';
import { MdTableRestaurant } from 'react-icons/md';
import { Badge } from 'src/components/Badge';
import Button from 'src/components/Button';

interface Iprops {
  name: string;
  country: string;
  city: string;
  subCity: string;
  imgUrl: string;
  amount?: number;
  currency?: string;
  oneSeater?: boolean | null;
  twoSeater?: boolean | null;
  description?: string;
  threeSeater?: boolean | null;
}
export const HostelCard = (props: Iprops) => {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const {
    name,
    country,
    city,
    subCity,
    imgUrl,
    oneSeater,
    twoSeater,
    threeSeater,
    currency,
    amount,
    description,
  } = props;

  const editorRef = useRef(description ?? '');

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
    return name.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="group card-bordered mb-2 flex h-full w-full cursor-pointer flex-col gap-4 rounded-xl bg-white pb-2 transition duration-200 ease-in-out hover:opacity-100 hover:shadow-lg">
      <div className="relative h-[300px] w-full border-b-[1px] border-gray-300 rounded-xl">
        <div className="relative h-full w-full ">
          <Image
            src={imgUrl ? imgUrl : '/default-image.png'}
            alt={name}
            fill
            className="rounded-xl rounded-b-none object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-xl rounded-b-none"></div>
          <div className='absolute bottom-2 left-2 flex items-center gap-6 w-fit'  >
            <div>
              <IoIosWifi className='w-5 h-5 text-white/80 font-semibold' />
            </div>
            <div>
              <FaShower className='w-5 h-5 text-white/80 font-semibold' />
            </div>
            <div>
              <MdTableRestaurant className='w-5 h-5 text-white/80 font-semibold' />
            </div>
            <div>
              <GiCctvCamera className='w-5 h-5 text-white/80 font-semibold' />
            </div>

          </div>
        </div>
        <div className="absolute right-2 top-1 z-10">
          <Badge className={` px-3 py-1 !text-xs uppercase tracking-wide font-bold text-white/90 ${getStatusColor("Available")} !rounded-md `}>Available</Badge>
        </div>
        <p className='absolute -bottom-3 right-1 text-white/90 bg-transparent p-1 px-3 rounded-md font-semibold'>For Boys</p>
      </div>

      <div className="flex-grow overflow-y-auto px-2" style={{ maxHeight: '150px' }}>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className='flex flex-col leading-3'>
            <h3 className="m-0 ml-1 text-2xl font-semibold text-gray-900">{capitalizeHostelName(name)}</h3>
            <p className="text-capitalize my-1 flex items-center gap-2 text-xs text-primary/70">
              <GrLocation className="text-red w-5 h-5 font-bold" />
              <span className="text-base text-gray-700">
                {subCity} {city}, {country}
              </span>
            </p>
          </div>
          <div>
            <div className='rounded-full p-2 hover:bg-gray-200'>
              <FaRegHeart className='w-6 h-6 text-red/65 font-semibold' />
            </div>
            {/* <span className='text-sm text-secondary/80 font-semibold'>{currency} {amount}</span> */}
          </div>
        </div>
        <div className='flex items-center justify-between border-t border-gray-200 mt-3 pt-1'>
          <div className=''>
            <h3 className='text-sm m-0 font-semibold text-gray-600'>Starting with</h3>
            <p className="m-0 text-base font-extrabold text-gray-400">
                Nrs <span className='text-secondary text-2xl'>10,000</span> /month
              </p>
          </div>
        <div className="mt-2 flex items-center justify-between gap-2">
          <Button label={'View Details'} className="!bg-primary/90 hover:!bg-primary tracking-wide" />
          {/* <div>
            <FaArrowCircleRight className='text-4xl text-gray-400 w-fit group-hover:text-primary/90 transition duration-300 ease-in-out' />
          </div> */}
        </div>
        </div>

      </div>
    </div>
  );
};
