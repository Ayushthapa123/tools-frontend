import Image from 'next/image';
import { BiFoodMenu } from 'react-icons/bi';
import { FaSwimmingPool } from 'react-icons/fa';
import { MdBathroom, MdBreakfastDining } from 'react-icons/md';
import { TiWiFi } from 'react-icons/ti';

export const HostelCard = () => {
  const facilities = [];
  return (
    <div className="  card-bordered flex h-[230px] w-full cursor-pointer gap-4 rounded-3xl p-3 ">
      <div className=" card-bordered h-full w-[350px] rounded-3xl relative">
        <Image src={"/images/default-image.png"} alt='' fill className=' rounded-xl'/>
      </div>
      <div className="flex-grow ">
        <h3 className="text-3xl card-title line-clamp-1 text-primary">Unity Homes</h3>
        <div className="flex gap-3 text-lg text-secondary">
          <TiWiFi /> <MdBreakfastDining />
          <MdBathroom />
          <FaSwimmingPool />
          <BiFoodMenu />
        </div>
        <div className="my-3 ">
          <h3 className="font-medium text-secondary">Kupondole, Lalitpur</h3>
     
        </div>
        <div className="mt-3 ">
          <h3 className=" card-title">Nearby Places</h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            UN Park, Thapathali campus, Patan Multiple campus
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-end h-full ">
        <h3 className="text-gray-500">1,2,3 Seater Available</h3>
      </div>
    </div>
  );
};
