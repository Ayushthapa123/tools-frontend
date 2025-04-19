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
import Link from 'next/link';
import EditIcon from 'src/components/icons/Edit';

interface Iprops {
  id: number | string;
  title: string;
  roomNumber: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  paymentStatus: string;
  guestName: string;
  guestEmail: string;
  roomImage: string;
  roomCaption: string;
}

export const BookingCard = (props: Iprops) => {
  const {
    id,
    title,
    roomNumber,
    roomId,
    checkInDate,
    checkOutDate,
    status,
    paymentStatus,
    guestName,
    guestEmail,
    roomImage,
    roomCaption,
  } = props;

  const mutateDeleteRoom = useGraphqlClientRequest<
    DeleteRoomMutation,
    DeleteRoomMutationVariables
  >(DeleteRoom.loc?.source.body!);

  const { mutateAsync } = useMutation({ mutationFn: mutateDeleteRoom });
  const queryClient = useQueryClient();
  const { setMessage, setRole, setShowToast } = useToastStore();

  const onSubmit = async () => {
    mutateAsync({ id: Number(id) }).then((res) => {
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

  return (
    <div className="card w-full shadow-lg border border-gray-200 bg-base-100 relative">
      {/* Card Header */}
      <div className="flex justify-between items-start p-4">
        <div>
          <h2 className="text-xl font-bold text-primary">{title}</h2>
          <p className="text-sm text-gray-500">{roomCaption}</p>
        </div>
        <div className="flex gap-2">
          {/* <Link href={`/app/room/${id}`}>
            <IconButton className="btn btn-ghost">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onSubmit} className="btn btn-ghost">
            <DeleteIcon />
          </IconButton> */}
        </div>
      </div>

      {/* Room Image */}
      {roomImage && (
        <div className="w-full h-52 overflow-hidden">
          <img
            src={roomImage}
            alt={roomCaption}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* Info Section */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm">
        <div>
          <p><span className="font-semibold">Room Number:</span> {roomNumber}</p>
          <p><span className="font-semibold">Room ID:</span> {roomId}</p>
        </div>
        <div>
          {/* <p><span className="font-semibold">Status:</span> {status}</p> */}
          <p><span className="font-semibold">Payment Status:</span> {paymentStatus}</p>
        </div>
        <div>
          <p><span className="font-semibold">Check In:</span> {checkInDate}</p>
          <p><span className="font-semibold">Check Out:</span> {checkOutDate}</p>
        </div>
        <div>
          <p><span className="font-semibold">Guest Name:</span> {guestName}</p>
          <p><span className="font-semibold">Guest Email:</span> {guestEmail}</p>
        </div>
      </div>
    </div>
  );
};
