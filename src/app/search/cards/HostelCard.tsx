'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { BiFoodMenu, BiHeart } from 'react-icons/bi';
import { BsLine } from 'react-icons/bs';
import { FaSwimmingPool } from 'react-icons/fa';
import { MdBathroom, MdBreakfastDining, MdSafetyDivider } from 'react-icons/md';
import { TiWiFi } from 'react-icons/ti';
import SignupModal from 'src/components/Modal/SignUpModal';
import RichTextEditor from 'src/components/RichTextEditor';

interface Iprops {
  name: string;
  country: string;
  city: string;
  subCity: string;
  imgUrl: string;
  amount?: number;
  currency?: string;
  isOriginalHostel?: boolean;
  oneSeater?: boolean | null;
  twoSeater?: boolean | null;
  description?: string;
  threeSeater?: boolean | null;
}
export const HostelCard = (props: Iprops) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <div className="card-bordered mb-2 flex h-full w-full cursor-pointer flex-col gap-4 rounded-3xl p-3">
      <div className="relative h-[300px] w-full rounded-3xl">
        <div className="relative h-full w-full">
          <Image
            src={imgUrl ? imgUrl : '/default-image.png'}
            alt={name}
            fill
            className="rounded-xl object-cover"
          />
          <button className="absolute right-2 top-2 rounded-full bg-white/80 p-2 transition hover:bg-white">
            <BiHeart
              className="h-5 w-5 text-gray-500"
              onClick={() => {
                isModalOpen && <SignupModal onClose={() => setIsModalOpen(false)} />;
              }}
            />
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-2" style={{ maxHeight: '150px' }}>
        <h3 className="mb-1 text-xl font-medium">{name}</h3>
        <p className="text-capitalize mb-3 text-sm">
          {subCity} {city}, {country}
        </p>

        <div className="">
          {/* <RichTextEditor editorRef={editorRef} readOnly={true} /> */}
        </div>

        {/* Price */}
        <div className="mt-2 flex items-center">
          <span className="text-sm">Price From :</span>
          <span className="ml-1 font-semibold">{amount}</span>
          <span className="ml-1 text-sm"> {currency} </span>
        </div>
      </div>
    </div>
  );
};
