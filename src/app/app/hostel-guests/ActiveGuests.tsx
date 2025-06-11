import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { GuestCard } from './GuestCard';
import {
  GetRooms,
  GetRoomsQuery,
  GetRoomsQueryVariables,
  DeleteRoom,
  DeleteRoomMutation,
  DeleteRoomMutationVariables,
  GetHostelGuestsQueryVariables,
  GetHostelGuests,
  GetHostelGuestsQuery,
  RemoveHostelGuest,
  RemoveHostelGuestMutation,
  RemoveHostelGuestMutationVariables,
} from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from 'src/components/Loading';
import { useEffect, useState } from 'react';
import { Modal } from 'src/components/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

export const ActiveGuests = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletedRoomId, setDeletedRoomId] = useState<number | string | null>(null);
  const [deleteRoom, setDeleteRoom] = useState(false);
  const queryGetHostelGuests = useGraphqlClientRequest<GetHostelGuestsQuery, GetHostelGuestsQueryVariables>(
    GetHostelGuests.loc?.source?.body!,
  );

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryGetHostelGuests();
    return res.hostelGuestsByHostelId;
  };

  const { data: guests, isLoading } = useQuery({
    queryKey: ['getHostelGuests'],
    queryFn: fetchData,
  });

  // deleted room
  const mutateDeleteGuest = useGraphqlClientRequest<
    RemoveHostelGuestMutation,
    RemoveHostelGuestMutationVariables
  >(RemoveHostelGuest.loc?.source.body!);

  const { mutateAsync } = useMutation({ mutationFn: mutateDeleteGuest });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (deleteRoom) {
      mutateAsync({ id: Number(deletedRoomId) }).then(res => {
        if (res?.removeHostelGuest?.data?.id) {
          enqueueSnackbar('Guest deleted.', { variant: 'success' });
          queryClient.invalidateQueries({ queryKey: ['getHostelGuests'] });
        } else {
          enqueueSnackbar("Couldn't delete guest.", { variant: 'error' });
        }
      });
      setShowDeleteModal(false);
    }
  }, [deleteRoom]);

  return (
    <div className="w-full ">
      {isLoading && (
        <div>
          {' '}
          <LoadingSpinner />
        </div>
      )}
      <div className="grid  gap-[1rem] md:px-2 ">
        {guests?.data?.map(guest => (
          <div key={guest.id} className="md:mb-4">
            <GuestCard
             guest={guest}
              setShowDeleteModal={setShowDeleteModal}
              setDeletedRoomId={setDeletedRoomId}
            />
          </div>
        ))}
        {showDeleteModal && (
          <Modal
            open={showDeleteModal}
            handleClose={() => setShowDeleteModal(false)}
            title="Are you sure to delete this guest?"
            onSave={() => setDeleteRoom(true)} 
            actionLabel="Delete"


          >
            Disclaimer: you will not be able to see the details of this guest after you delete it.
          </Modal>
        )}
      </div>
    </div>
  );
};
