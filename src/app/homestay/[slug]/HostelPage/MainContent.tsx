'use client';
import { CiLocationOn } from 'react-icons/ci';
import { BreadCrumbs } from 'src/app/detail-page/BreadCrumbs';
import { CustomChip } from 'src/components/Chip';
import { CgWebsite } from 'react-icons/cg';
import Link from 'next/link';
import { FoodTable } from 'src/app/detail-page/FoodTable';
import Button from 'src/components/Button';
import { FindAmenityByHomestayId, FindAmenityByHomestayIdQueryVariables, FindAmenityByHomestayIdQuery, Homestay, Room } from 'src/gql/graphql';
import { MapProvider } from 'src/features/MapProvider';
import { useRef, useState } from 'react';
import { BsAirplane } from 'react-icons/bs';
import { FcWiFiLogo } from 'react-icons/fc';
import WifiIcon from 'src/components/icons/Wifi';
import Image from 'next/image';
import { FaFacebook, FaParking, FaPlane, FaRegStar, FaShower, FaStar, FaUmbrellaBeach, FaThermometerHalf } from 'react-icons/fa';
import RichTextEditor from 'src/components/RichTextEditor';
import { RoomCardFull } from '../booking/RoomCardFull';
import { FaPhoneFlip } from 'react-icons/fa6';
import { MdEmail, MdLocalOffer, MdOutlineFreeBreakfast } from 'react-icons/md';
import { GrFacebook, GrInstagram, GrYoutube } from 'react-icons/gr';
import { useRoomStore } from 'src/store/roomStore';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { MapComponent } from 'src/features/GoogleMap';
import ShowDetails from '../../../../components/room-details/ShowDetails';

interface Iprops {
  hostel: Homestay | undefined | null;
  checkInDate: string;
  checkOutDate: string;
}

export default function MainContent(props: Iprops) {
  const { hostel, checkInDate, checkOutDate } = props;
  console.log("homestay",hostel)
  const [mainImage, setMainImage] = useState(0);
  const [ isGalleryOpen, setIsGalleryOpen ] = useState(false);
  const [ showDetails, setShowDetails ] = useState(false);
  const [ selectedRoom, setSelectedRoom ] = useState<Room | null>(null);

  const roomImages = hostel?.rooms?.[0]?.image ?? [];
  const editorRef = useRef(hostel?.description ?? '');
  const { roomIds } = useRoomStore();

  // for amenities 
  const queryAmenity = useGraphqlClientRequest<FindAmenityByHomestayIdQuery, FindAmenityByHomestayIdQueryVariables>(FindAmenityByHomestayId.loc?.source.body!)
  const fetchData = async () => {
    const res = await queryAmenity({homestayId: Number(hostel?.id )?? 0 });
    console.log("fetching amenity", res);
    return res.findAmenityByHomestayId[0] ?? null;
  };    

  const { data:amenities, error, isLoading: loading } = useQuery({
    queryKey: [ 'getAmenity' ],
    queryFn: fetchData,
    enabled: !!Number(hostel?.id),
  });
// Parse the amenities string into an array
  const amenitiesArray = amenities ? amenities.amenity.split(',').filter(Boolean) : [];
  
  const essentialAmenities = [
    'Wi-Fi (Free)',
    'Air conditioning / Heating',
    'Free breakfast',
    'Clean private bathroom with hot shower',
    'Free parking',
  ].filter(amenity => amenitiesArray.includes(amenity));
console.log("img",hostel?.image)
  const selectedImg = hostel?.image?.filter((img) => img.isSelected === true);
  console.log("issel",selectedImg)
  return (
    <div className="bg-gray-50 pb-4">
      {showDetails ? (
        <div className=''>
          <ShowDetails setShowDetails={setShowDetails} room={selectedRoom as Room} />
        </div>
      ): (
        <div className="container mx-auto">
          <BreadCrumbs name={hostel?.name ?? ''} />
          <div className="box-border w-full lg:flex lg:gap-8 lg:px-10">
            <div className="box-border flex-grow overflow-x-hidden overflow-y-hidden rounded-xl bg-white p-3 shadow-sm md:p-4 md:px-4">
              <div className="mb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">{hostel?.name}</h1>
                    <div className="mt-2 flex items-center text-gray-600">
                      <CiLocationOn className="mr-1 text-2xl text-secondary" />
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
              <div className="mb-2">
                <div className="relative mb-4 h-[500px] w-full overflow-hidden rounded-2xl bg-gray-200">
                  <div className="group relative h-full w-full">
                    <Image
                      src={selectedImg?.[0]?.url ?? hostel?.image?.[ mainImage ]?.url ?? '/images/default-image.png'}
                      alt={`Room image ${mainImage + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      quality={90}
                    />
                  </div>
                </div>

                <div className="mb-8 grid grid-cols-6 gap-3">
                  {hostel?.image?.slice(0, 6).map((img, index) => (
                    <div
                      key={img.id}
                      className={`relative h-24 w-full cursor-pointer overflow-hidden rounded-lg bg-gray-200 transition-all duration-200 hover:opacity-90
                    ${mainImage === index ? 'ring-2 ring-blue-600 ring-offset-2' : ''}`}
                      onClick={() => setMainImage(index)}
                    >
                      <Image
                        src={img.url ?? '/images/default-image.png'}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="rounded-xl rounded-t-none bg-white/70 border-t-2 border-gray-100 pt-1">
                  <h2 className=" text-2xl font-semibold text-gray-800">Description</h2>
                  <div className="prose max-w-none">
                    <RichTextEditor editorRef={editorRef} readOnly={true} />
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky top-[100px] m-3 lg:m-0 lg:min-w-[380px] lg:max-w-[380px]">
              <div className="space-y-6">

                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">Top Homestay Facilities</h3>
                  <div className="grid grid-cols-2 gap-y-5 gap-x-2 justify-between">
                    {
                      essentialAmenities.map((amenity: string) => (
                        <div className="flex items-center" key={amenity}>
                          <div className=" flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            {amenity.includes('Wi-Fi') ? <WifiIcon className='text-secondary mr-3' /> : amenity.includes('Air conditioning / Heating') ? <FaThermometerHalf className='text-secondary mr-3' /> : amenity.includes('Free breakfast') ? <MdOutlineFreeBreakfast className='text-secondary mr-3' /> : amenity.includes('Clean private bathroom with hot shower') ? <FaShower className='text-secondary mr-3' /> : amenity.includes('Free parking') ? <FaParking className='text-secondary mr-3' /> : amenity.includes('Free airport transfer') ? <FaPlane className='text-secondary mr-3' /> : <FaUmbrellaBeach className='text-secondary mr-3' />}
                          </div>
                          <span className="text-xs text-gray-700">{amenity}</span>
                        </div>
                      ))
                    }
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
                        <FaPhoneFlip className='text-secondary' />
                      </div>
                      <p className="ml-3 text-gray-700">+977 783 705 178</p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <MdEmail className='text-secondary' />
                      </div>
                      <p className="ml-3 text-gray-700">demo123@gmail.com</p>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 pt-2 font-medium text-gray-700">Socials:</div>
                      <div className="flex items-center space-x-4">
                        <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100">
                          <GrInstagram className='text-secondary' />
                        </a>
                        <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100">
                          <FaFacebook className='text-secondary' />
                        </a>
                        <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors hover:bg-blue-100">
                          <GrYoutube className='text-secondary' />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-white p-6 pt-2 shadow-sm">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">Map On Google</h3>
                  <div className=" w-full h-[250px] overflow-y-hidden ">
                    <MapProvider>
                      {hostel?.address?.latitude && hostel?.address?.longitude && (
                        <MapComponent
                          lat={hostel.address.latitude}
                          lng={hostel.address.longitude}
                          description={hostel.name}
                        />
                      )}
                    </MapProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-xl bg-white p-4 shadow-sm w-[93vw] mx-auto">
            <div className='flex items-center justify-between'>
              <h2 className="mb-6 text-2xl font-semibold text-gray-800">Available Rooms</h2>
              <Link href={`/homestay/${hostel?.slug}/booking?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`} className='mb-3'>
                <Button label='View Bookings' className='w-fit bg-primary' />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {hostel?.rooms?.map((room) => (
                <div key={room.id} className="overflow-hidden rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-md">
                  <RoomCardFull
                    room={room}
                    setSelectedRoom={setSelectedRoom}
                    setShowDetails={setShowDetails}
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
      )}
      
    </div>
  );
}