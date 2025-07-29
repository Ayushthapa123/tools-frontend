import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { HostelCard } from './ListingCard';
import {

  HostelData,
  GetAllListingsByUserIdQuery,
  GetAllListingsByUserId,
  GetAllListingsByUserIdQueryVariables,
} from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';
import Button from 'src/components/Button';
import { CreateHostelModal } from '../hostel-info/CreateHostelModal';
import { useState } from 'react';

export const AllListings = () => {
  const queryHostels = useGraphqlClientRequest<GetAllListingsByUserIdQuery, GetAllListingsByUserIdQueryVariables>(
    GetAllListingsByUserId.loc?.source?.body!,
  );

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryHostels({ });
    return res.getHostelsByUserToken;
  };

  const { data: hostels } = useQuery({
    queryKey: ['getAllListingsByUserId'],
    queryFn: fetchData,
  });
  const [showModal,setShowModal]=useState(false)
  return (    
    <div className="w-full ">
      <hr className="divider w-full" />
      <div className='flex justify-end'>
        <div className='flex gap-2'>
        <Button label="Add New Listing" variant="primary" height="sm" onClick={()=>setShowModal(true)} />
        </div>
        <div>
          {showModal &&<CreateHostelModal />}
        </div>
      </div>
      <hr className="divider w-full" />


      <div className="grid gap-[1rem]  bg-slate-100 ">
        {hostels?.data?.map(hostel => (
          <div key={hostel.id}>
            <HostelCard hostel={hostel as HostelData} />
          </div>
        ))}
      </div>
    </div>
  );
};
