import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { HostelCard } from './HostelCard';
import {
  GetAllHostelsQuery,
  GetAllHostelsQueryVariables,
  GetAllHostels,
  Hostel,
} from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';

export const AllHostels = () => {
  const querySignupUrl = useGraphqlClientRequest<
    GetAllHostelsQuery,
    GetAllHostelsQueryVariables
  >(GetAllHostels.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await querySignupUrl();
    return res.getAllHostels;
  };

  const { data: hostels } = useQuery({
    queryKey: ['getAllHostels'],
    queryFn: fetchData,
  });
  return (
    <div className="w-full ">
      <hr className="divider w-full" />

      <div className="grid gap-[1rem]  bg-slate-100 ">
        {hostels?.data?.map(hostel => (
          <div key={hostel.id}>
            <HostelCard hostel={hostel as Hostel} />
          </div>
        ))}
      </div>
    </div>
  );
};
