import Button from 'src/components/Button';
import { RoomData } from 'src/gql/graphql';
import { Modal } from 'src/components/Modal';
import RoomIcon from 'src/components/icons/Room';
import { FaShower } from 'react-icons/fa';
import { MdOutlineKingBed } from 'react-icons/md';
import { BiArea } from 'react-icons/bi';
import { BsCheckCircleFill } from 'react-icons/bs';
import { Badge } from 'src/components/Badge';
import Image from 'next/image';
import { DetailViewModal } from 'src/app/hostel/room-details/RoomDetailView';
export default function ShowDetails({
  room,
  setShowDetails,
}: {
  room: RoomData;
  setShowDetails: (showDetails: boolean) => void;
}) {

  console.log('room', room);

  return (
    <DetailViewModal
      open={true}
      title="Room Details"
      handleClose={() => {
        setShowDetails(false);
      }}
    >
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Image & Status */}
        <div className="group relative overflow-hidden rounded-lg border border-base-200 bg-base-100 shadow-xl lg:basis-[55%]">
          <div className="relative h-64 w-full lg:h-full">
            <Image
              src={room?.image?.[0]?.url || '/placeholder-room.jpg'}
              alt={room?.caption ?? ''}
              fill
              className="rounded-lg object-cover transition-transform duration-300"
              priority
            />
            <div className="absolute left-3 top-3 z-10">
              <Badge
                className={`px-4 py-1 text-xs uppercase tracking-wide text-white ${room?.status === 'AVAILABLE' ? 'bg-success' : 'bg-error'}`}
              >
                {room?.status}
              </Badge>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="flex flex-col gap-4 overflow-y-scroll lg:basis-[45%]">
          {/* Room Info */}
          <div className="card w-full border border-base-200 bg-base-100 p-4 shadow-md">
            <div className="flex flex-col gap-3">
              <div className="card-title flex items-center gap-2  text-lg font-bold text-primary">
                Basic Details
              </div>
              <div className="grid grid-cols-[60%,40%] gap-2">
                <div className="text-xl font-bold text-secondary ">
                  <span>{room?.caption ?? ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-secondary">
                    {room?.price?.baseAmountPerDay ?? 0}{' '}
                    {room?.price?.currency ?? ''}
                  </span>
                  <span className="text-sm text-gray-500">/night</span>
                </div>
              </div>
              <div className="grid grid-cols-[40%,30%,30%] gap-1 text-sm">
                <div className="flex w-full flex-col gap-1 rounded-lg bg-slate-200 p-2">
                  <span className="font-semibold text-gray-800 ">Room Number:</span>{' '}
                  <p className="font-medium text-gray-600">{room?.roomNumber}</p>
                </div>
                <div className="flex w-full flex-col gap-1 rounded-lg bg-slate-200 p-2">
                  <span className="font-semibold text-gray-800 ">Capacity:</span>{' '}
                  <p className="font-medium text-gray-600">{room?.capacity}</p>
                </div>
                <div className="flex w-full flex-col gap-1 rounded-lg bg-slate-200 p-2">
                  <span className="font-semibold text-gray-800 ">Room Area:</span>{' '}
                  <p className="font-medium text-gray-600">25m²</p>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Amenities */}
          <div className="card w-full border border-base-200 bg-base-100 shadow-md">
            <div className="flex flex-col gap-4 p-4">
              <div className="text-base text-gray-700">
                {room?.description ?? ''}
              </div>
              <div>
                <div className="card-title mb-2 flex items-center  gap-2 text-lg font-bold text-primary">
                  Room Amenities:
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {
                    JSON.parse(room?.roomAmenity?.amenity ?? '[]')?.map((amenity: any) => (
                        <div key={amenity?.id} className="flex items-center text-sm text-gray-700">
                          <BsCheckCircleFill className="mr-2 text-success" />
                          <span>{amenity?.name}</span>
                        </div>
                      ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DetailViewModal>
  );
}
