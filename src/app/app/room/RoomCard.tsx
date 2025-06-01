import IconButton from 'src/components/IconButton';
import DeleteIcon from 'src/components/icons/Delete';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from 'src/components/Badge';
import { FiEdit } from 'react-icons/fi';

interface Iprops {
  id: number | string;
  caption: string;
  roomNumber: string;
  status: string;
  price: number;
  currency: string;
  imageUrl: string;
  setShowDeleteModal: (state: boolean) => void;
  setDeletedRoomId: (val: number | string | null) => void;
}

export const RoomCard = (props: Iprops) => {
  const {
    id,
    caption,
    roomNumber,
    status,
    price,
    currency,
    imageUrl,
    setShowDeleteModal,
    setDeletedRoomId,
  } = props;

  const onClickDelete = () => {
    setDeletedRoomId(id);
    setShowDeleteModal(true);
  };

  // const getStatusColor = (status: string) => {
  //   switch (status.toLowerCase()) {
  //     case 'available':
  //       return 'bg-green-100 text-green-800';
  //     case 'occupied':
  //       return 'bg-red-100 text-red-800';
  //     case 'maintenance':
  //       return 'bg-yellow-100 text-yellow-800';
  //     default:
  //       return 'bg-gray-100 text-gray-800';
  //   }
  // };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg  transition-all duration-300 hover:shadow-xl">
      {/* Image Section */}
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl || '/placeholder-room.jpg'}
          alt={caption}
          fill
          className="rounded-t-2xl object-cover"
          priority
        />
        <div className="absolute left-2 top-1 z-10">
          <Badge className=" px-3 py-1 text-xs uppercase tracking-wide text-white">{status}</Badge>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex min-h-[80px] flex-col gap-3 p-4">
        <div className="">
          <h3 className="mb-2 truncate text-lg font-bold text-gray-900" title={caption}>
            {caption}
          </h3>
          <div className="flex flex-col items-start justify-start gap-2 lg:flex-row lg:items-center lg:justify-between">
            <p className="m-0 text-sm text-gray-500">
              <span className="font-medium">Room Number:</span> {roomNumber}
            </p>
            <p className="m-0 text-sm font-extrabold text-primary">
              {currency} {price.toLocaleString()}
            </p>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="absolute right-3 top-2 z-20 flex gap-2">
          <Link href={`/app/room/${id}`} passHref legacyBehavior>
            <a aria-label="Edit Room">
              <IconButton
                size="small"
                color="primary"
                className="bg-white/80 shadow-md backdrop-blur hover:bg-primary/70 hover:text-white"
              >
                <FiEdit className="h-6 w-6" />
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
