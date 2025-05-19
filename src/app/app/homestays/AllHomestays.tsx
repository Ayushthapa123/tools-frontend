import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { HomeStayCard } from './HomestayCard';
import {
  GetAllHomestaysQuery,
  GetAllHomestaysQueryVariables,
  GetAllHomestays,
  Homestay,
} from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';

export const AllHomestays = () => {
  const querySignupUrl = useGraphqlClientRequest<
    GetAllHomestaysQuery,
    GetAllHomestaysQueryVariables
  >(GetAllHomestays.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await querySignupUrl();
    return res.getAllHomestays;
  };

  const { data: homestays } = useQuery({
    queryKey: ['getAllHomestays'],
    queryFn: fetchData,
  });
  return (
    <div className="w-full ">
      <hr className="divider w-full" />

      <div className="grid gap-[1rem]  bg-slate-100 ">
        {homestays?.data?.map(homestay => (
          <div key={homestay.id}>
            <HomeStayCard homestay={homestay as Homestay} />
          </div>
        ))}
      </div>
    </div>
  );
};
