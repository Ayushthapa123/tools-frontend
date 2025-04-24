import { Room, RoomStatus } from "src/gql/graphql";
import Image from "next/image";
import { useRoomStore } from "src/store/roomStore";
import Button from "src/components/Button";
import Link from "next/link";
import { IoBed } from "react-icons/io5";
import { MdMeetingRoom } from "react-icons/md";
interface RoomCardProps {
  room: Room;
  isSelected: boolean;
  slug: string;
  checkInDate: string;
  checkOutDate: string;
}

export const RoomCardFull = ({ room, isSelected, slug, checkInDate, checkOutDate }: RoomCardProps) => {
  const { setRoomIds, roomIds } = useRoomStore()
  const handleRoomSelect = (roomId: string) => {
    if (roomIds.includes(roomId)) {
      setRoomIds(roomIds.filter((id) => id !== roomId))
    } else {
      setRoomIds([...roomIds, roomId])
    }
  }
  console.log("room", room)
  return (
    <div
      onClick={() => handleRoomSelect(room.id)}
      className={`card card-side  bg-gray-50 shadow-md hover:shadow-lg transition-all cursor-pointer ${isSelected ? 'border-2 border-green-600' : 'border border-gray-200 hover:border-gray-400'
        }`}
    >
      {/* Left side - Image */}
      <figure className="min-w-[290px] cursor-default">
        {room.image && room.image.length > 0 ? (
          <div className="relative h-full w-full lg:max-h-[240]">
            <Image
              src={room.image[ 0 ].url}
              alt={room.caption}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="h-full w-full bg-base-200 flex items-center justify-center">
            <svg
              className="h-12 w-12 text-base-300"
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
      </figure>

      <div className="card-body p-4 cursor-default w-full">
        {/* <div className="flex justify-between items-start"> */}
        <div>
          <div className="space-y-2 flex-1">
            {/* Header Section */}
            <div>
              <div className={`badge badge-xs px-3 py-4 mb-4 ${room.status === RoomStatus.Available
                ? 'badge-success'
                : 'badge-error'
                }`}>
                <span className="text-[2px]">{room.status}</span>
              </div>
              <h3 className="card-title text-lg">{room.caption}</h3>
              <div className="flex items-center justify-between gap-2 mt-1">
                <span className="badge badge-outline text-nowrap p-4">
                  <span className="text-xl pr-3"><MdMeetingRoom /></span>Room {room.roomNumber || 'N/A'}
                </span>
                <span className="badge badge-outline badge-primary text-nowrap p-4">
                  <span className="text-xl pr-3"><IoBed /></span>
                  {room.capacity}
                </span>
              </div>
            </div>

            {/* Price Section */}
            {room.price && (
              <div className="flex items-baseline gap-1 pt-2">
                <span className="text-3xl font-semibold text-primary">
                  {room.price.isDynamicPricing ? room.price.dynamicAmount : room.price.baseAmount} {room.price.currency}
                </span>
                <span className="text-sm text-base-content/60">/night</span>
              </div>
            )}

            {/* Features Section */}
            <div className="flex flex-wrap gap-2 mt-3">
              {/* <div className={`badge ${
                  room.status === RoomStatus.Available 
                    ? 'badge-success' 
                    : 'badge-error'
                }`}>
                  {room.status}
                </div> */}
              {room.attachBathroom && (
                <div className="badge badge-secondary">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12h-4M3 12h4m8-9v4M12 21v-4"
                    />
                  </svg>
                  Attached Bathroom
                </div>
              )}
            </div>
          </div>

          {/* Selection Indicator */}
          {isSelected ? (
            <div className="flex-shrink-0">
              <div className=" w-full">
                <Button className="bg-green-600" label={"Selected"}/>
              </div>
            </div>
          ) : (
            <Link href={`/homestay/${slug}/booking?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`}>
              <Button label="Select room" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};