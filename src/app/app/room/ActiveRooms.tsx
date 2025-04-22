import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { CreateRoomModal } from './CreateRoomModal';
import { RoomCard } from './RoomCard';
import {
  GetRooms,
  GetRoomsQuery,
  GetRoomsQueryVariables,
} from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';

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

  const { data: rooms } = useQuery({
    queryKey: ['getRooms'],
    queryFn: fetchData,
  });
  return (
    <div className="w-full ">
      <div className="flex w-full justify-end">
        <CreateRoomModal />
      </div>
      <hr className="divider w-full" />

      <div className="grid gap-[1rem]  bg-slate-100 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {rooms?.map(room => (
          <div key={room.id}>
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
    </div>
  );
};
