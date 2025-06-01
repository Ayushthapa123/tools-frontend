import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import IconButton from 'src/components/IconButton';
import DeleteIcon from 'src/components/icons/Delete';
import { DeleteRoom, DeleteRoomMutation, DeleteRoomMutationVariables } from 'src/gql/graphql';
import { useToastStore } from 'src/store/toastStore';
import Link from 'next/link';
import EditIcon from 'src/components/icons/Edit';
import { enqueueSnackbar } from 'notistack';

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

  const mutateDeleteRoom = useGraphqlClientRequest<DeleteRoomMutation, DeleteRoomMutationVariables>(
    DeleteRoom.loc?.source.body!,
  );

  const { mutateAsync } = useMutation({ mutationFn: mutateDeleteRoom });
  const queryClient = useQueryClient();

  const onSubmit = async () => {
    mutateAsync({ id: Number(id) }).then(res => {
      if (res?.removeRoom) {
        enqueueSnackbar('Room Deleted', { variant: 'error' });
        queryClient.invalidateQueries({ queryKey: ['getRooms'] });
      } else {
        enqueueSnackbar('Something went wrong', { variant: 'warning' });
      }
    });
  };

  return (
    <div className="card relative w-full border border-gray-200 bg-base-100 shadow-lg">
      {/* Card Header */}
      <div className="flex items-start justify-between p-4">
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
        <div className="h-52 w-full overflow-hidden">
          <img src={roomImage} alt={roomCaption} className="h-full w-full object-cover" />
        </div>
      )}

      {/* Info Section */}
      <div className="grid grid-cols-1 gap-y-2 p-4 text-sm md:grid-cols-2">
        <div>
          <p>
            <span className="font-semibold">Room Number:</span> {roomNumber}
          </p>
          <p>
            <span className="font-semibold">Room ID:</span> {roomId}
          </p>
        </div>
        <div>
          {/* <p><span className="font-semibold">Status:</span> {status}</p> */}
          <p>
            <span className="font-semibold">Payment Status:</span> {paymentStatus}
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold">Date:</span> {checkInDate} to {checkOutDate}
          </p>
          <p>
            <span className="font-semibold">Check Out:</span> {checkOutDate}
          </p>
        </div>
        <div>
          <p>
            <span className="font-semibold">Guest Name:</span> {guestName}
          </p>
          <p>
            <span className="font-semibold">Guest Email:</span> {guestEmail}
          </p>
        </div>
      </div>
    </div>
  );
};
