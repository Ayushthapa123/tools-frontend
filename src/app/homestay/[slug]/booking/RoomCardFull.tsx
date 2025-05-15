import { Room, RoomStatus } from "src/gql/graphql";
import Image from "next/image";
import { useRoomStore } from "src/store/roomStore";
import Button from "src/components/Button";
import Link from "next/link";
import { IoBed } from "react-icons/io5";
import { MdMeetingRoom, MdOutlineKingBed } from "react-icons/md";
import { FaShower } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { BiArea } from "react-icons/bi";
import { useRouter } from "next/navigation";

interface RoomCardProps {
  room: Room;
  isSelected: boolean;
  slug: string;
  checkInDate: string;
  checkOutDate: string;
  setShowDetails: (showDetails: boolean) => void;
  setSelectedRoom: (room: Room) => void;
}

export const RoomCardFull = ({ room, isSelected, slug, checkInDate, checkOutDate, setShowDetails, setSelectedRoom }: RoomCardProps) => {
  const { setRoomIds, roomIds } = useRoomStore();
  const router = useRouter()
  const pathName = usePathname();
  const [ isBookingPage, setIsBookingPage ] = useState(false);
  console.log("room ",room)

  useEffect(() => {
    setIsBookingPage(pathName.includes("booking"));
  }, [ pathName ]);

  const handleRoomSelect = (roomId: string) => {
    if (roomIds.includes(roomId)) {
      setRoomIds(roomIds.filter((id) => id !== roomId));
    } else {
      setRoomIds([ ...roomIds, roomId ]);
    }
    
  };

  return (
    <div
      className={`group relative flex flex-col xl:flex-row h-full overflow-hidden rounded-xl bg-base-100 transition-all duration-300 ${isSelected
          ? 'border border-blue ring-2 ring-blue-200'
          : 'border border-gray-200 hover:border-gray-300 hover:shadow-lg'
        }`}
    >
      {/* Status indicator */}
      <div className={`absolute left-1 top-2 z-10 rounded-full px-3 py-1 text-xs font-semibold text-white ${room.status === RoomStatus.Available
          ? 'bg-green-500'
          : 'bg-red-500'
        }`}>
        {room.status}
      </div>

      {/* Left side - Image */}
      <div className="relative h-44 md:h-80 lg:h-60 xl:h-auto xl:w-2/3 min-w-[200px] overflow-hidden">
        {room.image && room.image.length > 0 ? (
          <div className="relative h-full bg-red">
            <Image
              src={room.image[ 0 ].url}
              alt={room.caption || "Room image"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {room.image.length > 1 && (
              <div className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white">
                +{room.image.length - 1} Photos
              </div>
            )}
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
      <div className="flex xl:w-3/5 flex-col justify-between p-3 md:p-5">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{room.caption}</h3>

          <div className="mt-3 flex flex-wrap gap-3 pl-0">
            {/* <div className="flex items-center rounded-full bg-blue/40 px-3 py-1 text-sm text-black">
              <MdMeetingRoom className="mr-1 text-xl text-secondary" />
              Room {room.roomNumber || 'N/A'}
            </div> */}
            <div className="flex items-center rounded-full bg-blue/40 px-3 py-1 text-sm text-black">
              <MdOutlineKingBed className="mr-1 text-xl text-secondary" />
              {room.capacity}
            </div>
            {room.attachBathroom && (
              <div className="flex items-center rounded-full bg-blue/40 px-3 py-1 text-sm text-black">
                <FaShower className="mr-1 text-xl text-secondary" />
                Private Bathroom
              </div>
            )}
            <div className="flex items-center rounded-full bg-blue/40 px-3 py-1 text-sm text-black">
              <BiArea className="mr-1 text-xl text-secondary" />
              {Math.floor(Math.random() * (30 - 20 + 1)) + 20}m²
            </div>
          </div>
            
          {
            room.roomAmenity ? (
                <div className="grid grid-cols-2 gap-2 mt-2">
                
                {room.roomAmenity?.amenity.split(",").slice(0,4).map((amm) => {
              return (
                <div key={amm} className="flex items-center justify-start gap-2">
                  <BsCheckCircleFill className="mr-2 text-green-500" />
                  <span className="mr-1">{ amm}</span>
                  </div>
              )
            })}
            </div>) : (
                <div className="flex items-center justify-start mt-8">
                  <span>No room amenities listed.</span>
                </div> 
           )
          }

          {/* <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <span>Free WiFi</span>
            </div>
            <div className="flex items-center">
              <BsCheckCircleFill className="mr-2 text-green-500" />
              <span>AC</span>
            </div>
            <div className="flex items-center">
              <BsCheckCircleFill className="mr-2 text-green-500" />
              <span>TV</span>
            </div>
            <div className="flex items-center">
              <BsCheckCircleFill className="mr-2 text-green-500" />
              <span>Room Service</span>
            </div>
          </div> */}
        </div>

        <div className="mt-5 flex items-center justify-between gap-2">
          {/* Price */}
          {/* {room.price && (
            <div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-secondary">
                  {room.price.baseAmount}
                </span>
                <span className="ml-1 text-lg font-medium text-secondary">{room.price.currency}</span>
                <span className="ml-1 text-sm text-gray-500">/night</span>
              </div>
              <div className="text-xs text-gray-400">(Base Price & may include dynamic pricing)</div>
            </div>
          )} */}

          {/* View Full Room Details */}
          <div className="w-fit">
            <Button label="View Details" className="bg-primary/90 hover:bg-primary w-fit" onClick={() => { setShowDetails(true); setSelectedRoom(room); }}/>
          </div>

          {/* Action Button */}
          {isSelected && (
            <div className="flex items-center">
              <div onClick={
                (e) => {
                  handleRoomSelect(room.id);
                }
              }>
              <Button
                className="bg-primary/90 hover:bg-primary"
                label="Selected"
              />
              </div>
            </div>
          )}{(
            isBookingPage ? (
              !isSelected &&
              <Link
              href={`/homestay/${slug}/booking?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`}
                  onClick={(e) => {
                e.stopPropagation();
                  handleRoomSelect(room.id);
                  router.refresh();
              }}>
                <Button
                  className="bg-primary/90 hover:bg-primary"
                  label="Select Room"
                />
              </Link>
            ) : ( !isSelected && 
              <Link
                href={`/homestay/${slug}/booking?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRoomSelect(room.id)
                   }}
              >
                <Button
                  className="bg-primary/90 hover:bg-primary"
                  label="Book Now"
                />
              </Link>
            )
          )}
        </div>
      </div>

      {/* Selected overlay */}
      {isSelected && (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-success p-1 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
};