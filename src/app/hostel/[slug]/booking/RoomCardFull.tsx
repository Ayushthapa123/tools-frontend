import { Amenities, RoomAmenity, RoomData, RoomStatus } from 'src/gql/graphql';
import Image from 'next/image';
import { useRoomStore } from 'src/store/roomStore';
import Button from 'src/components/Button';
import Link from 'next/link';
import { IoBed } from 'react-icons/io5';
import { MdMeetingRoom, MdOutlineKingBed } from 'react-icons/md';
import { FaShower } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs';
import { BiArea } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { Badge } from 'src/components/Badge';

interface RoomCardProps {
  room: RoomData;
  isSelected: boolean;
  slug: string;
  checkInDate: string;
  checkOutDate: string;
  setShowDetails: (showDetails: boolean) => void;
  setSelectedRoom: (room: RoomData) => void;
}

export const RoomCardFull = ({
  room,
  isSelected,
  slug,
  checkInDate,
  checkOutDate,
  setShowDetails,
  setSelectedRoom,
}: RoomCardProps) => {
  const { setRoomIds, roomIds } = useRoomStore();
  const router = useRouter();
  const pathName = usePathname();
  const [ isBookingPage, setIsBookingPage ] = useState(false);

  useEffect(() => {
    setIsBookingPage(pathName.includes('booking'));
  }, [ pathName ]);

  const handleRoomSelect = (roomId: string) => {
    if (roomIds.includes(roomId)) {
      setRoomIds(roomIds.filter(id => id !== roomId));
    } else {
      setRoomIds([ ...roomIds, roomId ]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return '!bg-green';
      case 'occupied':
        return '!bg-red';
      case 'maintenance':
        return '!bg-yellow';
      default:
        return '!bg-gray-100 !text-gray-800';
    }
  };

  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-xl bg-base-100 transition-all duration-300 xl:flex-row ${isSelected
          ? 'ring-blue-200 border border-blue ring-2'
          : 'border border-gray-200 hover:border-gray-300 hover:shadow-sm'
        }`}
    >
      {/* Status indicator */}
      <div className="absolute left-2 top-1 z-10">
        <Badge className={` px-3 py-1 !text-xs uppercase tracking-wide font-bold text-white ${getStatusColor(room?.status ?? '')} !rounded-md `}>{room?.status ?? ''}</Badge>
      </div>


      {/* Left side - Image */}
      <div className="relative h-44 min-w-[200px] overflow-hidden md:h-80 lg:h-60 xl:h-auto xl:w-1/3">
        {room.image && room.image.length > 0 ? (
          <div className="relative h-full">
            <Image
              src={room.image[ 0 ].url}
              alt={room.caption || 'Room image'}
              fill
              className="object-cover rounded-l-xl transition-transform duration-500"
            />
            {room.image.length > 1 && (
              <div className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white">
                +{room.image.length - 1} Photos
              </div>
            )}
            {
              room.price?.isDiscountActive && ( <div className="absolute right-2 top-1 z-10">
                <Badge className={` px-3 py-1 !text-xs uppercase tracking-wide font-bold text-white bg-blue !rounded-md `}>Discount</Badge>
              </div>)
           }
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <svg
              className="h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Right side - Content */}
      <div className="flex flex-col justify-between p-3 md:px-5 xl:w-2/3">
        <div>
          <h3 className="text-2xl font-semibold text-black">{room.caption}</h3>

          <div className="mt-3 flex flex-wrap gap-3 pl-0">
            <div className="flex items-center rounded-md bg-gray-300 px-3 py-1 text-sm font-medium text-black">
              <MdOutlineKingBed className="mr-1 text-xl text-secondary" />
              {room.capacity}
            </div>
            {room.attachBathroom && (
              <div className="flex items-center rounded-md bg-gray-300 px-3 py-1 text-sm font-medium text-black">
                <FaShower className="mr-1 text-xl text-secondary" />
                Private Bathroom
              </div>
            )}
            <div className="flex items-center rounded-md bg-gray-300 px-3 py-1 text-sm font-medium text-black">
              <BiArea className="mr-1 text-xl text-secondary" />
              {Math.floor(Math.random() * (30 - 20 + 1)) + 20}m²
            </div>
          </div>

          {room.roomAmenity ? (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-2 pl-0">
              {JSON.parse(room.roomAmenity?.amenity ?? '[]')?.slice(0, 4)?.map((amm: any) => {
                return (
                  <div key={amm?.id} className="flex items-start justify-start gap-1 p-1 pl-0">
                    <div className="flex items-start justify-center p-1 h-full min-w-10">
                      <BsCheckCircle className="text-gray-700 text-xl" />
                    </div>
                    <span className="text-gray-700 text-base">{amm.name}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 flex items-center justify-start">
              <span>No room amenities listed.</span>
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between gap-2">
          {/* Price */}
          {room.price && (
            <div className="">
              <div className="flex flex-row-reverse md:items-center justify-between gap-1 md:gap-4 w-full">
                {
                  room.price.baseAmountPerDay && (
                    <div className="flex items-baseline">
                      <span className="ml-1 text-sm md:text-lg font-medium text-secondary">{room.price.currency}</span>
                      <span className="text-3xl font-bold text-secondary">
                        {room.price.baseAmountPerDay}
                      </span>
                      <span className="ml-1 text-sm text-gray-500">/day</span>
                    </div>
                  )
                }
                <div className="flex items-baseline border-r-2 border-gray-400 pr-4">
                  <span className="ml-1 text-sm md:text-lg font-medium text-secondary">{room.price.currency}</span>
                  <span className="text-3xl font-bold text-secondary">
                    {room.price.baseAmountPerMonth}
                  </span>
                  <span className="ml-1 text-sm text-gray-500">/month</span>
                </div>
              </div>
              <div className="text-xs text-gray-400">(Base Price & may include dynamic pricing)</div>
            </div>
          )}

          {/* View Full Room Details */}
          <div className="w-full md:w-fit">
            <Button
              label="View Details"
              className="w-full md:w-fit py-0 bg-primary/90 hover:bg-primary"
              onClick={() => {
                setShowDetails(true);
                setSelectedRoom(room);
              }}
            />
          </div>

          {/* Action Button */}
          {/* {isSelected && (
            <div className="flex items-center">
              <div
                onClick={e => {
                  handleRoomSelect(room.id);
                }}
              >
                <Button className="bg-primary/90 hover:bg-primary" label="Selected" />
              </div>
            </div>
          )} */}
          {/* {isBookingPage
            ? !isSelected && (
                <Link
                  href={`/hostel/${slug}/booking?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`}
                  onClick={e => {
                    e.stopPropagation();
                    handleRoomSelect(room.id);
                    router.refresh();
                  }}
                >
                  <Button className="bg-primary/90 hover:bg-primary" label="Select Room" />
                </Link>
              )
            : !isSelected && (
                <Link
                  href={`/hostel/${slug}/booking?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`}
                  onClick={e => {
                    e.stopPropagation();
                    handleRoomSelect(room.id);
                  }}
                >
                  <Button className="bg-primary/90 hover:bg-primary" label="Book Now" />
                </Link>
              )} */}
        </div>
      </div>

      {/* Selected overlay */}
      {isSelected && (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-success p-1 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
