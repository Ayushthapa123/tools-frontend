'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { BiFoodMenu, BiHeart } from 'react-icons/bi';
import { BsLine } from 'react-icons/bs';
import { FaArrowCircleRight, FaRegHeart, FaSwimmingPool } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';
import { MdBathroom, MdBreakfastDining, MdSafetyDivider } from 'react-icons/md';
import { TiWiFi } from 'react-icons/ti';
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

  return (
    <div className="group card-bordered mb-2 flex h-full w-full cursor-pointer flex-col gap-4 rounded-xl bg-white pb-2 transition duration-200 ease-in-out hover:opacity-100 hover:shadow-lg">
      <div className="relative h-[300px] w-full border-b-[1px] border-gray-300 rounded-xl">
        <div className="relative h-full w-full">
          <Image
            src={imgUrl ? imgUrl : '/default-image.png'}
            alt={name}
            fill
            className="rounded-xl rounded-b-none object-cover"
          />
        </div>
      </div>

      <div className="flex-grow overflow-y-auto px-4" style={{ maxHeight: '150px' }}>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className='flex flex-1 flex-col leading-3'>
            <h3 className="m-0 ml-1 text-xl font-semibold text-gray-900">{name}</h3>
            <p className="text-capitalize my-1 flex items-center gap-2 text-xs text-primary/70 break-words">
              <GrLocation className="text-secondary w-5 h-5 font-semibold" />
              <span className="text-base text-gray-600 text-wrap">
                {subCity} {city}, {country}
              </span>
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className='rounded-full p-2 hover:bg-gray-200'>
              <FaRegHeart className='w-6 h-6 text-red/65 font-semibold' />
            </div>
            {/* <span className='text-sm text-secondary/80 font-semibold'>{currency} {amount}</span> */}
          </div>  
        </div>
        <div className="">{/* <RichTextEditor editorRef={editorRef} readOnly={true} /> */}</div>

        <div className="mt-2 flex items-center justify-between gap-2">
          <Button label={'View full details'} className="!bg-primary/90 hover:!bg-primary tracking-wide" />
          {/* <div>
            <FaArrowCircleRight className='text-4xl text-gray-400 w-fit group-hover:text-primary/90 transition duration-300 ease-in-out' />
          </div> */}
        </div>
      </div>
    </div>
  );
};
