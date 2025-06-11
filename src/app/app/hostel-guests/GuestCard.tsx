import IconButton from 'src/components/IconButton';
import DeleteIcon from 'src/components/icons/Delete';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from 'src/components/Badge';
import { FiEdit } from 'react-icons/fi';
import { HostelGuestData, RoomData } from 'src/gql/graphql';

export const GuestCard = ({guest, setShowDeleteModal, setDeletedRoomId}: {guest: HostelGuestData | undefined | null, setShowDeleteModal: (state: boolean) => void, setDeletedRoomId: (val: number | string | null) => void}) => {
  const onClickDelete = () => {
    setDeletedRoomId(guest?.id ?? null);
    setShowDeleteModal(true);
  };

  return (
    <div className="grid grid-cols-12 items-center border-b border-gray-200 py-1 md:px-6 hover:bg-gray-50 transition-colors">
      {/* Guest Image */}
      <div className="col-span-1">
        <div className="relative h-12 w-12">
          <Image
            src={guest?.profilePicture || '/profile-user.png'}
            alt={guest?.fullName ?? ''}
            fill
            className="rounded-full object-cover"
            priority
          />
        </div>
      </div>

      {/* Guest Name */}
      <div className="col-span-3">
        <div className="flex items-center space-x-2">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {guest?.fullName ?? ''}
          </h3>
          <Badge className="px-2 py-0.5 text-xs uppercase tracking-wide">
            {guest?.gender ?? ''}
          </Badge>
        </div>
      </div>

      {/* Email */}
      <div className="col-span-3">
        <p className="text-sm text-gray-500 truncate">
          {guest?.email ?? ''}
        </p>
      </div>

      {/* Phone Number */}
      <div className="col-span-3">
        <p className="text-sm text-gray-500">
          {guest?.phoneNumber ?? ''}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="col-span-2 flex items-center justify-end space-x-2">
        <Link href={`/app/hostel-guests/${guest?.id}`} passHref legacyBehavior>
          <a aria-label="Edit Guest">
            <IconButton
              size="small"
              color="primary"
              className="hover:bg-primary/10"
            >
              <FiEdit className="h-4 w-4" />
            </IconButton>
          </a>
        </Link>
        <IconButton
          onClick={onClickDelete}
          size="small"
          color="error"
          className="hover:bg-error/10"
          aria-label="Delete Guest"
        >
          <DeleteIcon className="h-4 w-4" />
        </IconButton>
      </div>
    </div>
  );
};
