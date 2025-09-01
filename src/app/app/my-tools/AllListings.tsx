import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import {

  GetAllListedAiTools,
  GetAllListedAiToolsQueryVariables,
  GetListedAiToolsByUserToken,
  GetListedAiToolsByUserTokenQuery,
  GetListedAiToolsByUserTokenQueryVariables,
  ListedAiToolData,
} from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';
import Button from 'src/components/Button';

import { ListedAiToolCard } from './ListedAiToolCard';
import Link from 'next/link';

export const AllListings = () => {
  const queryHostels = useGraphqlClientRequest<GetListedAiToolsByUserTokenQuery, GetListedAiToolsByUserTokenQueryVariables>(
    GetListedAiToolsByUserToken.loc?.source?.body!,
  );

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryHostels({ });
    return res.getListedAiToolsByUserToken;
  };

  const { data: hostels } = useQuery({
    queryKey: ['getListedAiToolsByUserToken'],
    queryFn: fetchData,
  });
  return (    
    <div className="w-full ">
      <hr className="divider w-full" />
      <div className='flex justify-end'>
        <div className='flex gap-2'>
        <Link href="/app/my-tools/new">
        <Button label="Add New Listing" variant="primary" height="sm"  />
        </Link>
        </div>
       
      </div>
      <hr className="divider w-full" />


      <div className="grid gap-[1rem]  bg-slate-100 ">
        {hostels?.data?.map(hostel => (
          <div key={hostel.id}>
            <ListedAiToolCard tool={hostel as ListedAiToolData} />
          </div>
        ))}
      </div>
    </div>
  );
};
