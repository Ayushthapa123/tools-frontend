import IconButton from 'src/components/IconButton';
import DeleteIcon from 'src/components/icons/Delete';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from 'src/components/Badge';
import { RoomData } from 'src/gql/graphql';
import EditIcon from 'src/components/icons/Edit';

export const RoomCard = ({ room, setShowDeleteModal, setDeletedRoomId }: { room: RoomData | undefined | null, setShowDeleteModal: (state: boolean) => void, setDeletedRoomId: (val: number | string | null) => void }) => {


  const onClickDelete = () => {
    setDeletedRoomId(room?.id ?? null);
    setShowDeleteModal(true);
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

  const roomSeater = [
    {
      label: "One Seater",
      value: "ONE_BED"
    },
    {
      label: "Two Seater",
      value: "TWO_BED"
    },
    {
      label: "Three Seater",
      value: "THREE_BED"
    },
    {
      label: "Four Seater",
      value: "FOUR_BED"
    },
    {
      label: "Five Seater",
      value: "FIVE_BED"
    },
    {
      label: "Six Seater",
      value: "SIX_BED"
    },
    {
      label: "Seven Seater",
      value: "SEVEN_BED"
    },
    {
      label: "Eight Seater",
      value: "EIGHT_BED"
    },
  ]
  const roomSeaterType = roomSeater.filter(seater => seater.value === room?.capacity)

  return (
    <div className="group relative overflow-hidden rounded-md border border-gray-100 bg-white shadow-lg  transition-all duration-300 hover:shadow-xl lg:!min-h-48">
      {/* Image Section */}
      <div className="relative h-48 w-full">
        <Image
          src={room?.image?.[ 0 ]?.url || '/placeholder-room.jpg'}
          alt={room?.caption ?? ''}
          fill
          className="rounded-t-md object-cover"
          priority
        />
        <div className="absolute left-2 top-1 z-10">
          <Badge className={` px-3 py-1 !text-xs uppercase tracking-wide font-bold text-white ${getStatusColor(room?.status ?? '')} !rounded-md `}>{room?.status ?? ''}</Badge>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex min-h-[130px] gap-3 py-4 px-2">
        <div className='w-full flex flex-col justify-between'>
          <div className="flex flex-col items-start justify-start gap-0 lg:gap-2 lg:flex-row lg:items-start lg:justify-between pb-1 ">
            <h3 className="mb-0 text-lg font-bold text-gray-900" title={room?.caption ?? ''}>
              {room?.caption ?? ""}
            </h3>
            <div>
              <p className="m-0 text-base text-nowrap bg-slate-200 rounded-md p-1 px-3 font-extrabold text-primary">{roomSeaterType[0]?.label}</p>
            </div>
          </div>
          <div>
          <p className='text-sm font-semibold my-0 text-gray-500 pt-1 border-t border-gray-200'>
              Room No. 
              <span className="font-bold text-gray-600"> {room?.roomNumber ?? ''}</span>
            </p>
           
            <div className='w-full flex items-center justify-between '>
              <p className="m-0 text-sm font-extrabold text-gray-400">
                {room?.price?.currency} <span className='text-primary text-xl'>{room?.price?.baseAmountPerMonth}</span> /month
              </p>
              <p className="m-0 text-sm font-extrabold text-gray-400">
                {room?.price?.currency} <span className='text-primary text-xl'>{room?.price?.baseAmountPerDay}</span> /day
              </p>
            </div>
        </div>
          </div>
        {/* Action Buttons */}
        <div className="absolute right-3 top-2 z-20 flex gap-2">
          <Link href={`/app/room/${room?.id}`} passHref legacyBehavior>
            <a aria-label="Edit Room">
              <IconButton
                size="small"
                color="primary"
                className="bg-white/80 shadow-md backdrop-blur hover:bg-primary/70 hover:text-white"
              >
                <EditIcon className="h-6 w-6" />
              </IconButton>
            </a>
          </Link>
          <IconButton
            onClick={onClickDelete}
            size="small"
            color="error"
            className="bg-white/80 shadow-md backdrop-blur"
            aria-label="Delete Room"
          >
            <DeleteIcon className="h-5 w-5 hover:text-error" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
