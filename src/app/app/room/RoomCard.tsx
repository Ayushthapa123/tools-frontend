import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import IconButton from 'src/components/IconButton';
import DeleteIcon from 'src/components/icons/Delete';
import {
  DeleteRoom,
  DeleteRoomMutation,
  DeleteRoomMutationVariables,
} from 'src/gql/graphql';
import { useToastStore } from 'src/store/toastStore';
import { UpdateRoomModal } from './UpdateRoomModal';
import Link from 'next/link';
import EditIcon from 'src/components/icons/Edit';
import Image from 'next/image';
import { Badge } from '@material-tailwind/react';

interface Iprops {
  id: number | string;
  caption: string;
  roomNumber: string;
  status: string;
  price: number;
  currency: string;
  imageUrl: string;
}

export const RoomCard = (props: Iprops) => {
  const { id, caption, roomNumber, status, price, currency, imageUrl } = props;
  const mutateCreateNearbyPlace = useGraphqlClientRequest<
    DeleteRoomMutation,
    DeleteRoomMutationVariables
  >(DeleteRoom.loc?.source.body!);

  const { mutateAsync } = useMutation({ mutationFn: mutateCreateNearbyPlace });
  const queryClient = useQueryClient();

  const { setMessage, setRole, setShowToast } = useToastStore();

  const onSubmit = async () => {
    mutateAsync({ id: Number(id) }).then(res => {
      if (res?.removeRoom) {
        setShowToast(true);
        setMessage('Room Deleted!');
        setRole('success');
        queryClient.invalidateQueries({ queryKey: ['getRooms'] });
      } else {
        setShowToast(true);
        setMessage('Something went wrong!');
        setRole('error');
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'occupied':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl || '/placeholder-room.jpg'}
          alt={caption}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800">{caption}</h3>
          <Badge className={getStatusColor(status)}>{status}</Badge>
        </div>

        <div className="space-y-2">
          <p className="text-gray-600">
            <span className="font-medium">Room Number:</span> {roomNumber}
          </p>
          <p className="text-lg font-bold text-primary">
            {currency} {price.toLocaleString()}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex gap-2">
          <Link href={`/app/room/${id}`}>
            <IconButton className="bg-white/80 hover:bg-white">
              <EditIcon className="w-5 h-5" />
            </IconButton>
          </Link>
          <IconButton 
            onClick={onSubmit}
            className="bg-white/80 hover:bg-white"
          >
            <DeleteIcon className="w-5 h-5" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
