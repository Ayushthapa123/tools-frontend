import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { RoomCard } from './RoomCard';
import {
  GetRooms,
  GetRoomsQuery,
  GetRoomsQueryVariables,
  DeleteRoom,
  DeleteRoomMutation,
  DeleteRoomMutationVariables,
} from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from 'src/components/Loading';
import { useEffect, useState } from 'react';
import { Modal } from 'src/components/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

export const ActiveRooms = () => {
  const [ showDeleteModal, setShowDeleteModal ] = useState(false);
  const [deletedRoomId,setDeletedRoomId] = useState<number|string|null>(null)
  const [ deleteRoom, setDeleteRoom ] = useState(false);
  const querySignupUrl = useGraphqlClientRequest<
    GetRoomsQuery,
    GetRoomsQueryVariables
  >(GetRooms.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await querySignupUrl();
    return res.roomsByHomestay;
  };

  const { data: rooms,isLoading } = useQuery({
    queryKey: ['getRooms'],
    queryFn: fetchData,
  });

  // deleted room 
  const mutateCreateNearbyPlace = useGraphqlClientRequest<
    DeleteRoomMutation,
    DeleteRoomMutationVariables
  >(DeleteRoom.loc?.source.body!);

  const { mutateAsync } = useMutation({ mutationFn: mutateCreateNearbyPlace });
  const queryClient = useQueryClient();


  useEffect(() => {
    if (deleteRoom) {
      mutateAsync({ id: Number(deletedRoomId) }).then(res => {
        if (res?.removeRoom) {
          enqueueSnackbar("Room deleted.",{variant:"success"})
          queryClient.invalidateQueries({ queryKey: [ 'getRooms' ] });
        } else {
          enqueueSnackbar("Couldn't delete room.",{variant:"error"})
        }
      });
      setShowDeleteModal(false);
    }
  }, [ deleteRoom ])
  
  return (
    <div className="w-full ">
      {isLoading && <div> <LoadingSpinner /></div>}
      <div className="grid gap-[1rem] grid-cols-2 md:grid-cols-3 px-2 md:gap-">
        {rooms?.data?.map(room => (
          <div key={room.id} className='md:mb-4'>
            <RoomCard
              id={room.id ?? ''}
              caption={room.caption ?? ''}
              roomNumber={room.roomNumber ?? ''}
              status={room.status ?? ''}
              price={room.price?.baseAmount ?? 0}
              currency={room.price?.currency ?? ''}
              imageUrl={room.image?.[ 0 ]?.url ?? ''}
              setShowDeleteModal={setShowDeleteModal}
              setDeletedRoomId={setDeletedRoomId}
            />
          </div>
        ))}
          {
          showDeleteModal && (
            <Modal
              open={showDeleteModal}
              handleClose={() => setShowDeleteModal(false)}
              title='Are you sure to delete this room?'
              onSave={()=>setDeleteRoom(true)}
            >
              Disclaimer: you will not be able to see the details of this room after you delete it.
            </Modal>
          )
        }
      </div>
    
    </div>
  );
};
