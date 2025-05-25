import Button from "src/components/Button";
import { RoomData } from "src/gql/graphql";
import { Modal } from "src/components/Modal";
import RoomIcon from "src/components/icons/Room";
import { FaShower } from "react-icons/fa";
import { MdOutlineKingBed } from "react-icons/md";
import { BiArea } from "react-icons/bi";
import { BsCheckCircleFill } from "react-icons/bs";
import { Badge } from "src/components/Badge";
import Image from "next/image";
import { RoomDetailView } from "src/app/hostel/room-details/RoomDetailView";
export default function ShowDetails({ room, setShowDetails }: { room: RoomData, setShowDetails: (showDetails: boolean) => void }) {
  // Statically mocked details for now
  const mockRoom = {
    caption: "Deluxe King Room",
    roomNumber: "101",
    status: "AVAILABLE",
    image: [ { url: "/room-sample.jpg" } ],
    capacity: "2",
    attachBathroom: true,
    description: "A spacious deluxe room with king-size bed, private bathroom, and a beautiful view.",
    price: { baseAmount: 3500, currency: "NPR" },
    amenities: [ "Free WiFi", "AC", "TV", "Room Service" ],
    area: "25m²"
  };
  console.log("room",room)

  return (
    <RoomDetailView
      open={true}
      title="Room Details"
      handleClose={() => {
        setShowDetails(false);
      }}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image & Status */}
        <div className="lg:basis-[55%] relative rounded-lg overflow-hidden shadow-xl group border border-base-200 bg-base-100">
          <div className="relative h-64 lg:h-full w-full">
            <Image
              src={room?.image?.[ 0 ]?.url || '/placeholder-room.jpg'}
              alt={room?.caption ?? mockRoom.caption}
              fill
              className="object-cover rounded-lg transition-transform duration-300"
              priority
            />
            <div className="absolute left-3 top-3 z-10">
              <Badge className={`px-4 py-1 text-xs uppercase tracking-wide text-white ${mockRoom.status === 'AVAILABLE' ? 'bg-success' : 'bg-error'}`}>{mockRoom.status}</Badge>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="lg:basis-[45%] flex flex-col gap-4 overflow-y-scroll">
          {/* Room Info */}
          <div className="card w-full bg-base-100 shadow-md border border-base-200 p-4">
            <div className="flex flex-col gap-3">
              <div className="card-title text-lg font-bold text-primary  flex items-center gap-2">
                Basic Details
              </div>
              <div className="grid grid-cols-[60%,40%] gap-2">
                <div className="text-xl font-bold text-secondary ">
                  <span>{room?.caption ?? mockRoom.caption}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-secondary">{room?.price?.baseAmount ?? mockRoom.price.baseAmount} {room?.price?.currency ?? mockRoom.price.currency}</span>
                  <span className="text-sm text-gray-500">/night</span>
                </div>
              </div>
              <div className="grid grid-cols-[40%,30%,30%] gap-1 text-sm">
                <div className="w-full bg-slate-200 p-2 rounded-lg gap-1 flex flex-col"><span className="font-semibold text-gray-800 ">Room Number:</span> <p className="text-gray-600 font-medium">{room?.roomNumber}</p></div>
                <div className="w-full bg-slate-200 p-2 rounded-lg gap-1 flex flex-col"><span className="font-semibold text-gray-800 ">Capacity:</span> <p className="text-gray-600 font-medium">{room?.capacity}</p></div>
                <div className="w-full bg-slate-200 p-2 rounded-lg gap-1 flex flex-col"><span className="font-semibold text-gray-800 ">Room Area:</span> <p className="text-gray-600 font-medium">25m²</p></div>
                {/* <div className="flex flex-wrap gap-2 mt-2">
                  {mockRoom.attachBathroom && (
                    <span className="badge badge-accent gap-1 p-4"><FaShower /> Private Bathroom</span>
                  )}
                </div> */}
              </div>

            </div>
          </div>

          {/* Details & Amenities */}
          <div className="card w-full bg-base-100 shadow-md border border-base-200">
            <div className="p-4 flex flex-col gap-4">

              <div className="text-gray-700 text-base">
                {room?.description ?? mockRoom.description}
              </div>
              <div>
                <div className="card-title text-lg font-bold text-primary  flex items-center gap-2 mb-2">Room Amenities:</div>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                  {room?.roomAmenity?.amenity ? room?.roomAmenity?.amenity?.split(",")?.map((amenity: string) => (
                    <div key={amenity} className="flex items-center text-sm text-gray-700">
                      <BsCheckCircleFill className="mr-2 text-success" />
                      <span>{amenity}</span>
                    </div>
                  )) : mockRoom.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center text-sm text-gray-700">
                      <BsCheckCircleFill className="mr-2 text-success" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoomDetailView>
  );
}