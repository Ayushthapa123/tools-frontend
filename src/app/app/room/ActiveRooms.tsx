import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { CreateRoomModal } from './CreateRoomModal';
import { RoomCard } from './RoomCard';
import {
  GetRooms,
  GetRoomsQuery,
  GetRoomsQueryVariables,
} from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from 'src/components/Loading';

export const ActiveRooms = () => {
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
  return (
    <div className="w-full ">
      {isLoading && <div> <LoadingSpinner /></div>}
      <div className="grid gap-[1rem] grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-4 px-2">
        {rooms?.map(room => (
          <div key={room.id} className='xl:min-h-[320px]'>
            <RoomCard
              id={room.id}
              caption={room.caption ?? ''}
              roomNumber={room.roomNumber ?? ''}
              status={room.status ?? ''}
              price={room.price?.baseAmount ?? 0}
              currency={room.price?.currency ?? ''}
              imageUrl={room.image?.[0]?.url ?? ''}
            />
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center">
        <CreateRoomModal />
      </div>
    </div>
  );
};
