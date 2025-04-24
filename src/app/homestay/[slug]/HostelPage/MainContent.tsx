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
import { FaFacebook, FaParking } from 'react-icons/fa';
import RichTextEditor from 'src/components/RichTextEditor';
import { RoomCardFull } from '../booking/RoomCardFull';
import { FaPhoneFlip } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { GrFacebook, GrInstagram, GrYoutube } from 'react-icons/gr';

interface Iprops {
  hostel: Homestay | undefined | null;
  checkInDate: string;
  checkOutDate: string;
}
export default function MainContent(props: Iprops) {
  const { hostel, checkInDate, checkOutDate } = props;
  const [ mainImage, setMainImage ] = useState(0);

  const roomImages = hostel?.rooms?.[ 0 ]?.image ?? [];

  const editorRef = useRef(hostel?.description ?? '');

  return (
    <div>
      <BreadCrumbs name={hostel?.name ?? ''} />
      <div className="box-border w-full lg:flex lg:pr-10 ">
        <div className="box-border flex-grow overflow-x-hidden p-3 md:p-16 md:pb-0 md:pt-4 md:pl-24 ">
          <div>
            <h1 className="text-dark font-bold">
              {hostel?.name}
            </h1>
            <div className="text-6 my-3 flex text-lg font-semibold">
              <CiLocationOn className="relative text-3xl " /> <span>{hostel?.address?.city}, {hostel?.address?.country}</span>
            </div>
          </div>
          {/* Image Gallery */}
          <div className="mb-4">
            {/* Main Image */}
            <div className="relative mb-2 h-[400px] w-full overflow-hidden rounded-lg bg-gray-200">
              {roomImages.length > 0 ? (
                <Image
                  src={roomImages[ mainImage ]?.url ?? '/images/default-image.png'}
                  alt={`Room image ${mainImage + 1}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-300">
                  <span className="text-gray-500">Homestay image</span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="mb-8 grid grid-cols-6 gap-7">
              {roomImages.map((img, index) => (
                <div
                  key={img.id}
                  className={`relative h-20 w-full cursor-pointer overflow-hidden rounded-md bg-gray-200
         ${mainImage === index ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setMainImage(index)}>
                  <Image
                    src={img.url}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Description Section */}
            <div className="bg-gray-100 rounded-xl px-3">
              <div tabIndex={0} className="collapse collapse-arrow">
                <input type="checkbox" defaultChecked />
                <div className="collapse-title px-4 text-lg font-medium">Description</div>

                <div>
                  <RichTextEditor editorRef={editorRef} readOnly={true} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" top-[100px] m-3  h-[100vh]   lg:m-0  lg:min-w-[450px] lg:max-w-[450px] ">
          <div className="card h-auto w-full gap-7 p-10">
            {/* Card 1: Price & Booking */}
            {/* <div className="card  sticky overflow-hidden bg-offwhite-cream shadow-md">
              <div className="bg-forest-green-500 p-4 text-center text-white">
                <div className="text-sm">
                  from
                  <span className="text-2xl font-bold">
                    {hostel?.rooms?.[ 0 ]?.price?.baseAmount}
                  </span>{' '}
                  {hostel?.rooms?.[ 0 ]?.price?.currency} /night
                </div>
              </div>

              <div className="p-0">
                <div className="grid grid-cols-2 border-b">
                  <button className=" btn-ghost rounded-none border-r ">BOOK</button>
                  <button className=" btn-ghost rounded-none ">INQUIRY</button>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4">
                  <div className="form-control rounded-md border p-2">
                    <label className="label">
                      <span className="label-text text-xs ">Check In</span>
                    </label>
                    <span className="text-sm font-medium">04/17/2025</span>
                  </div>
                  <div className="form-control rounded-md border p-2">
                    <label className="label">
                      <span className="label-text text-xs ">Check Out</span>
                    </label>
                    <span className="text-sm font-medium">04/18/2025</span>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <div className="form-control rounded-md border p-2">
                    <label className="label">
                      <span className="label-text text-xs ">Guests</span>
                    </label>
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span>1 Adult - 0 Children</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="h-4 w-4 text-gray-400"
                        viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          d="M12.53 16.28a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 1.06-1.06L12 14.69l5.47-5.47a.75.75 0 1 1 1.06 1.06l-6 6Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <button className="w-full rounded-full bg-forest-green-500">
                    CHECK AVAILABILITY
                  </button>
                </div>
              </div>
            </div> */}

            {/* Hotel Facilities Section */}
            <div className="bg-gray-100 rounded-xl p-3">
              <div tabIndex={0} className="collapse collapse-arrow">
                <input type="checkbox" defaultChecked />
                <div className="collapse-title px-4 py-3 text-lg font-bold ">Hotel Facilities</div>
                <div className="collapse-content px-4 pb-4">
                  <div className="grid grid-cols-2  justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 flex h-10 w-10 items-center justify-center">
                        <BsAirplane />
                      </div>
                      <span className='w-full'>Airport Transport</span>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-3 flex h-10 w-10 items-center justify-center ">
                        <WifiIcon />
                      </div>
                      <span>Internet - Wifi</span>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-3 flex h-10 w-8 items-center justify-center ">
                        <FaParking />
                      </div>
                      <span>Parking</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rules Section */}
            <div className="bg-gray-100 rounded-xl p-3">
              <div tabIndex={0} className="collapse collapse-arrow ">
                <input type="checkbox" defaultChecked />
                <div className="collapse-title px-4 py-3 text-lg font-bold ">Rules</div>
                <div className="collapse-content px-4 pb-4">
                  <div className="grid grid-cols-2 justify-between">
                    <div>
                      <p className="mb-1 font-medium">Check In</p>
                      <p className="font-medium">10:00 AM</p>
                    </div>
                    <div>
                      <p className="mb-1 font-medium ">Check Out</p>
                      <p className="font-medium ">1:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Image */}
            {/* <div className="card sticky gap-7  bg-offwhite-cream p-4 shadow-md">
              <div className="flex h-48 items-center justify-center">
                <Image
                  src={'/images/default-image.png'}
                  width={200}
                  height={200}
                  alt="Room Image"
                  className=" rounded-xl"
                />
              </div>
            </div> */}

            {/* Card 4: Information Contact */}
            <div className="card sticky gap-2  bg-gray-100 p-4 shadow-md">
              <h4 className=" text-sm border-b-2 pb-2">Contact Us</h4>
              <div className="space-y-2">
                <div className='flex items-center justify-start gap-3'>
                  <h5 className="text-md "><FaPhoneFlip /></h5>
                  <p className="text-sm">+977783705178</p>
                </div>
                <div className='flex items-center justify-start gap-3'>
                  <h5 className="text-md "><MdEmail /></h5>
                  <p className="text-sm">demo123@gmail.com</p>
                </div>
                <div className='flex items-start justify-start gap-4'>
                <div className='font-semibold'>
                  Socials :
                </div>
                <div className='flex items-center justify-start gap-3'>
                  <h5 className="text-xl "><GrInstagram /></h5>
                  <h5 className="text-xl "><FaFacebook /></h5>
                  <h5 className="text-xl "><GrYoutube /></h5>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
      {/* Room Section */}
      <div className="p-4 md:p-16 md:pl-24">
        <div tabIndex={0} className="collapse collapse-arrow ">
          {/* <input type="checkbox" defaultChecked /> */}
          <div className="collapse-title px-4 py-3 text-lg font-medium ">Rooms</div>
          <div className='grid grid-cols-2'>
            {hostel?.rooms?.map((room) => (
              <div key={room.id} className='mb-4 p-4'>
                <RoomCardFull
                  key={room.id}
                  room={room}
                  isSelected={false}
                  slug={hostel?.slug}
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                />
              </div>
            ))}
          </div>
          {/* <div className="collapse-content px-4 pb-4">
                  <div className="overflow-hidden rounded-lg border ">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="flex h-48 items-center justify-center">
                        <Image
                          src={hostel?.rooms?.[0]?.image?.[0]?.url ?? '/images/default-image.png'}
                          width={200}
                          height={200}
                          alt="Room Image"
                          className=" rounded-xl"
                        />
                      </div>
                      <div className="p-4 md:col-span-2">
                        <h3 className="mb-2 text-xl font-medium ">Double Room</h3>
                        <div className="mb-4 grid grid-cols-3 gap-4">
                          <div className="flex items-center">
                            <span className="mr-2 ">12m²</span>
                            <span className="mr-2 ">x2</span>
                            <span className="mr-2 ">x2</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xl font-bold ">
                            <span className="text-sm font-normal">
                              {hostel?.rooms?.[0]?.price?.currency}
                            </span>
                            {hostel?.rooms?.[0]?.price?.amount}
                          </div>
                          <div className="mt-10">
                            <Link href={`/homestay/${hostel?.slug}/booking`}>
                              <button className="rounded-md bg-forest-green px-4 py-2 text-sm">
                                Book Room
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
        </div>
      </div>
    </div>
  );
}
