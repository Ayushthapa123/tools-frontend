'use client';
import { CiLocationOn } from 'react-icons/ci';
import { BreadCrumbs } from 'src/app/detail-page/BreadCrumbs';
import {
  FindAmenityByHostelId,
  FindAmenityByHostelIdQueryVariables,
  FindAmenityByHostelIdQuery,
  RoomData,
  Hostel,
  Gallery,
  GalleryData,
} from 'src/gql/graphql';
import { MapProvider } from 'src/features/MapProvider';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import TbHandFingerRight, { TbAirConditioning } from "react-icons/tb";
import {
  FaFacebook,
  FaChalkboardTeacher,
  FaWifi,
  FaToilet,
  FaLightbulb,
} from 'react-icons/fa';
import RichTextEditor from 'src/components/RichTextEditor';
import { RoomCardFull } from '../booking/RoomCardFull';
import { FaPhoneFlip, FaSquareParking } from 'react-icons/fa6';
import { MdEmail, MdFreeBreakfast, MdLocalOffer, MdLuggage, MdOutlineFreeBreakfast } from 'react-icons/md';
import { GrInstagram, GrYoutube } from 'react-icons/gr';
import { useRoomStore } from 'src/store/roomStore';
import { useQuery } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { MapComponent } from 'src/features/GoogleMap';
import ShowDetails from '../../room-details/ShowDetails';
import { Modal } from 'src/components/Modal';
import { IoLibrary } from 'react-icons/io5';
import { BiSolidCctv } from 'react-icons/bi';
import { GiClothes } from 'react-icons/gi';
import { RiSafeFill } from 'react-icons/ri';

interface Iprops {
  hostel: Hostel | undefined | null;
  checkInDate: string;
  checkOutDate: string;
}

export default function MainContent(props: Iprops) {
  const { hostel, checkInDate, checkOutDate } = props;
  const [ mainImage, setMainImage ] = useState(0);
  const [ isGalleryOpen, setIsGalleryOpen ] = useState(false);
  const [ showDetails, setShowDetails ] = useState(false);
  const [ selectedRoom, setSelectedRoom ] = useState<RoomData | null>(null);
  const [ showAllAmenities, setShowAllAmenities ] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef<Boolean>(true);

  const roomImages = hostel?.data?.rooms?.[ 0 ]?.image ?? [];
  const editorRef = useRef(hostel?.data?.description ?? '');
  const { roomIds } = useRoomStore();

  //socials
  const facebookUrl = hostel?.data?.social?.facebook ?? '#';
  const instagramUrl = hostel?.data?.social?.instaGram ?? '#';
  const youtubeUrl = hostel?.data?.social?.youTube ?? '#';

  // contact

  // for amenities
  const queryAmenity = useGraphqlClientRequest<
    FindAmenityByHostelIdQuery,
    FindAmenityByHostelIdQueryVariables
  >(FindAmenityByHostelId.loc?.source.body!);
  const fetchData = async () => {
    const res = await queryAmenity({ hostelId: Number(hostel?.data?.id) ?? 0 });
    return res.findAmenityByHostelId ?? null;
  };

  const {
    data: amenities,
    error,
    isLoading: loading,
  } = useQuery({
    queryKey: [ 'getAmenity' ],
    queryFn: fetchData,
    enabled: !!Number(hostel?.data?.id),
  });
  // Parse the amenities string into an array
  const amenitiesArray: string[] = amenities ? amenities.data?.amenities.split(',').filter(Boolean) : [];


  const essentialAmenities = [
    {
      title: "Study table",
      icons: <IoLibrary className="text-xl" />
    },
    {
      title: "Secure lockers",
      icons: <RiSafeFill className="text-xl" />
    },
    {
      title: "Air conditioning / Heating",
      icons: <TbAirConditioning className="text-xl" />
    },
    {
      title: "CCTV surveillance",
      icons: <BiSolidCctv className="text-xl" />
    },
    {
      title: "Parking facility",
      icons: <FaSquareParking className="text-xl" />
    },
    {
      title: "Laundary Service",
      icons: <GiClothes className="text-xl" />
    },
    {
      title: "24/7 front desk",
      icons: <FaChalkboardTeacher className="text-xl" />
    },
    {
      title: "Wi-Fi",
      icons: <FaWifi className="text-xl" />
    },
    {
      title: "Clean toilet bathroom",
      icons: <FaToilet className="text-xl" />
    },
    {
      title: "breakfast",
      icons: <MdFreeBreakfast className="text-xl" />
    },
    {
      title: "Luggage Storage",
      icons: <MdLuggage className="text-xl" />
    },

  ]

  //logic to check if the amenity is in the amenities array
  const extractKeywords = (str: string) =>
    str.toLowerCase().split(/[\s\/\(\)\-]+/).filter(Boolean);
  // Split by space, slash, brackets, hyphen, remove empties

  const matchedAmenities = essentialAmenities.filter(essential => {
    const essentialKeywords = extractKeywords(essential.title);
    return amenitiesArray.some(item => {
      const itemKeywords = extractKeywords(item);
      return itemKeywords.some(keyword => essentialKeywords.includes(keyword));
    });
  });

  const selectedImg = hostel?.data?.gallery?.filter(img => img.isSelected === true);

  const handleShowAllAmenities = () => {
    setShowAllAmenities((prev) => !prev);
  }
  return (
    <div className="bg-gray-50 pb-4">
      {showDetails ? (
        <div className="">
          <ShowDetails setShowDetails={setShowDetails} room={selectedRoom as RoomData} />
        </div>
      ) : (
        <div className="container mx-auto">
          <BreadCrumbs name={hostel?.data?.name ?? ''} slug={hostel?.data?.slug} />
          <div className="box-border w-full lg:flex lg:gap-8 lg:px-10">
            <div className="box-border flex-grow overflow-x-hidden overflow-y-hidden rounded-xl bg-white p-3 shadow-sm md:p-4 md:px-4">
              <div className="mb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">{hostel?.data?.name}</h1>
                    <div className="mt-2 flex items-center text-gray-600">
                      <CiLocationOn className="mr-1 text-2xl text-secondary" />
                      <span className="text-lg">
                        {hostel?.data?.address?.city}, {hostel?.data?.address?.country}
                      </span>
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
                      src={
                        selectedImg?.[ 0 ]?.url ??
                        hostel?.data?.gallery?.[ mainImage ]?.url ??
                        '/images/default-image.png'
                      }
                      alt={`Room image ${mainImage + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      quality={90}
                    />
                  </div>
                </div>

                <div className="mb-8 grid grid-cols-6 gap-3">
                  {hostel?.data?.gallery?.slice(0, 6).map((img: GalleryData, index: number) => (
                    <div
                      key={img.id}
                      className={`relative h-24 w-full cursor-pointer overflow-hidden rounded-lg bg-gray-200 transition-all duration-200 hover:opacity-90
                    ${mainImage === index ? 'ring-blue-600 ring-2 ring-offset-2' : ''}`}
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

                <div className="rounded-xl rounded-t-none border-t-2 border-gray-100 bg-white/70 pt-1">
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
                  <div className='flex items-start justify-between'>
                    <h3 className="mb-4 text-lg font-semibold text-gray-800 ">
                      Top Hostel Facilities
                    </h3>
                    {
                      essentialAmenities.length > 3 && (
                        <div className='text-sm text-gray-500 hover:text-gray-700 cursor-pointer' onClick={handleShowAllAmenities}>
                          Show All
                        </div>
                      )
                    }
                  </div>
                  <div className="grid grid-cols-2 items-start justify-between gap-x-2 gap-y-5">
                    {matchedAmenities.slice(0, 4).map((amenity) => (
                      <div className="flex items-start gap-2" key={amenity.title}>
                        <div className="mt-[2px] bg-blue-50 text-blue-600 flex text-xl items-center justify-center rounded-full text-secondary">
                          {amenity.icons}
                        </div>
                        <span className="text-base text-gray-700">{amenity.title}</span>
                      </div>
                    ))}
                  </div>
                </div>


                <div className="rounded-xl bg-white p-6 shadow-sm">
                  <h3 className="mb-4 border-b border-gray-200 pb-2 text-lg font-semibold text-gray-800">
                    Contact Us
                  </h3>
                  <div className="flex flex-col items-start gap-0 md:flex-row md:gap-4 lg:flex-col lg:gap-0">
                    <div className="flex items-center gap-0">
                      <div className="bg-blue-50 text-blue-600 mb-3 flex h-10 w-10 items-center justify-center rounded-full">
                        <FaPhoneFlip className="h-7 w-7 text-secondary lg:h-6 lg:w-6" />
                      </div>
                      <p className="ml-3 text-base text-gray-700">
                        {hostel?.data?.contact?.phone ?? 'No number'}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-blue-50 text-blue-600 mb-3 flex h-10 w-10 items-center justify-center rounded-full">
                        <MdEmail className="h-8 w-7 text-secondary lg:h-6 lg:w-6" />
                      </div>
                      <p className="ml-3 text-base text-gray-700">
                        {hostel?.data?.contact?.email ?? 'No email'}
                      </p>
                    </div>
                    <div className="flex items-start md:ml-4 lg:ml-0">
                      <div className="mr-3 pt-2 font-medium text-gray-700">Socials:</div>
                      <div className="flex items-center space-x-4">
                        <a
                          href={instagramUrl}
                          className="bg-blue-50 text-blue-600 hover:bg-blue-100 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                        >
                          <GrInstagram className="h-7 w-7 text-secondary lg:h-6 lg:w-6" />
                        </a>
                        <a
                          href={facebookUrl}
                          className="bg-blue-50 text-blue-600 hover:bg-blue-100 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                        >
                          <FaFacebook className="h-7 w-7 text-secondary lg:h-6 lg:w-6" />
                        </a>
                        <a
                          href={youtubeUrl}
                          className="bg-blue-50 text-blue-600 hover:bg-blue-100 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                        >
                          <GrYoutube className="h-7 w-7 text-secondary lg:h-6 lg:w-6" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-white p-6 pt-2 shadow-sm">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">Map On Google</h3>
                  <div className=" h-[450px] w-full overflow-y-hidden rounded-md">
                    <MapProvider>
                      {hostel?.data?.address?.latitude && hostel?.data?.address?.longitude && (
                        <MapComponent
                          lat={hostel.data.address.latitude}
                          lng={hostel.data.address.longitude}
                          description={hostel.data.name}
                        />
                      )}
                    </MapProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 w-[93vw] rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="mb-6 text-2xl font-semibold text-gray-800">Available Rooms</h2>
              {/* <Link
                href={`/hostel/${hostel?.data?.slug}/booking?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`}
                className="mb-3"
              >
                <Button label="View Bookings" className="w-fit bg-primary" />
              </Link> */}
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2" ref={sectionRef}>
              {hostel?.data?.rooms?.map((room: RoomData) => (
                <div
                  key={room.id}
                  className="overflow-hidden rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-md"
                >
                  <RoomCardFull
                    room={room}
                    setSelectedRoom={setSelectedRoom}
                    setShowDetails={setShowDetails}
                    isSelected={roomIds.includes(room.id)}
                    slug={hostel?.data?.slug ?? ''}
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <Modal title='All Amenities' open={showAllAmenities} actionLabel='Okay' key="all-amenities" onSave={() => setShowAllAmenities(false)} handleClose={() => setShowAllAmenities(false)}>
        <div className='border-t border-gray-300 py-4 grid grid-cols-2 gap-3'>
          {
            matchedAmenities.map((am) => (
              <div className='flex items-center gap-3' key={am.title}>
                <div className='flex items-center justify-start text-secondary'>
                  {am.icons}
                </div>
                <span className='text-base text-gray-600'>{am.title}</span>
              </div>
            ))}
          {amenitiesArray.filter(item => {
            const itemKeywords = extractKeywords(item);

            return !essentialAmenities.some(essential => {
              const essentialKeywords = extractKeywords(essential.title);

              return itemKeywords.some(keyword => essentialKeywords.includes(keyword));
            });
          }).map((amenity) => (
            <div key={amenity} className='flex items-center gap-3 w-full'>
              <div className='flex items-center justify-start'>
              <FaLightbulb className='text-xl text-secondary' />
                </div>
              <span className='text-base text-gray-600'>{amenity}</span>
            </div>
          ))
          }
        </div>
      </Modal>
    </div>
  );
}
