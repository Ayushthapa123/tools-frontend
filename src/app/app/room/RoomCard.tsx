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
  setDeletedRoomId: (val:number|string|null)=>void;
}

export const RoomCard = (props: Iprops) => {
  const { id, caption, roomNumber, status, price, currency, imageUrl,setShowDeleteModal, setDeletedRoomId } = props;
  

  const onClickDelete = () => {
    setDeletedRoomId(id)
    setShowDeleteModal(true);
  }

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
    <div className="relative bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl  transition-all duration-300 group">
      {/* Image Section */}
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl || '/placeholder-room.jpg'}
          alt={caption}
          fill
          className="object-cover rounded-t-2xl"
          priority
        />
        <div className="absolute left-2 top-1 z-10">
          <Badge className=" px-3 py-1 text-xs uppercase tracking-wide text-white">{status}</Badge>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col gap-3 min-h-[80px]">
        <div className="">
          <h3 className="mb-2 text-lg font-bold text-gray-900 truncate" title={caption}>{caption}</h3>
          <div className='flex gap-2 justify-start items-start lg:justify-between lg:items-center flex-col lg:flex-row'>
          <p className="m-0 text-gray-500 text-sm">
            <span className="font-medium">Room Number:</span> {roomNumber}
          </p>
          <p className="m-0 text-sm font-extrabold text-primary">
            {currency} {price.toLocaleString()}
          </p>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="absolute top-2 right-3 flex gap-2 z-20">
          <Link href={`/app/room/${id}`} passHref legacyBehavior>
            <a aria-label="Edit Room">
              <IconButton size="small" color="primary" className="bg-white/80 hover:bg-primary/70 hover:text-white shadow-md backdrop-blur">
                <FiEdit className='w-6 h-6'/>
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
            <DeleteIcon className="w-5 h-5 hover:text-error" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
