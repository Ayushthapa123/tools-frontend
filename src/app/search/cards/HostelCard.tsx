'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { BiFoodMenu, BiHeart } from 'react-icons/bi';
import { BsLine } from 'react-icons/bs';
import { FaArrowCircleRight, FaSwimmingPool } from 'react-icons/fa';
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
    <div className="card-bordered mb-2 pb-2 flex h-full w-full cursor-pointer flex-col gap-4 rounded-3xl bg-base-100 group hover:opacity-100 transition ease-in-out duration-200">
      <div className="relative h-[300px] w-full rounded-3xl">
        <div className="relative h-full w-full">
          <Image
            src={imgUrl ? imgUrl : '/default-image.png'}
            alt={name}
            fill
            className="rounded-xl object-cover rounded-bl-none rounded-br-none"
          />
          {/* <button className="absolute right-2 top-2 rounded-full bg-white/80 p-2 transition hover:bg-red">
            <BiHeart
              className="h-5 w-5 text-gray-500 hover:text-white"
              onClick={() => {
                isModalOpen && <SignupModal onClose={() => setIsModalOpen(false)} />;
              }}
            />
          </button> */}
        </div>
      </div>

      <div className="flex-grow overflow-y-auto px-4" style={{ maxHeight: '150px' }}>
        <div className='flex justify-between items-center flex-wrap gap-2'>
          <p className="text-capitalize mb-1 text-xs text-primary/70 flex items-center gap-2">
            <GrLocation className='text-secondary'/>
            <span className='text-gray-600 text-sm'>
              {subCity} {city}, {country}
            </span>
          </p>
          <div>
            {/* <span className='text-sm text-secondary/80 font-semibold'>{currency} {amount}</span> */}
          </div>
        </div>
        <h3 className="mb-1 ml-1 text-lg font-medium text-gray-800">{name}</h3>

        <div className="">
          {/* <RichTextEditor editorRef={editorRef} readOnly={true} /> */}
        </div>

        <div className="flex items-center justify-between gap-2 mt-2">
            <Button label={"View full details"} className='bg-primary/90 hover:bg-primary' />
          {/* <div>
            <FaArrowCircleRight className='text-4xl text-gray-400 w-fit group-hover:text-primary/90 transition duration-300 ease-in-out' />
          </div> */}
        </div>
      </div>
    </div>
  );
};
