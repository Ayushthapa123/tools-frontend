'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useUserStore } from 'src/store/userStore';

import Button from 'src/components/Button';
import { Tabs } from 'src/components/Tabs';
import ServiceTab from './tabs';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { useQuery } from '@tanstack/react-query';
import {  GetHostelServicesByHostelId, GetHostelServicesByHostelIdDocument, GetHostelServicesByHostelIdQuery, GetHostelServicesByHostelIdQueryVariables, HostelServiceType } from 'src/gql/graphql';
export default function Page() {
  return (
    <div>
      <Suspense>
        <PageContent />
      </Suspense>
    </div>
  );
}

function PageContent() {
  const searchParams = useSearchParams();
  const param = searchParams.get('id');

  const { user } = useUserStore();

  //get the payment profile

  const [ activeTab, setActiveTab ] = useState(0);
  
  // fetch the services from the database

  const queryHostelServices = useGraphqlClientRequest<GetHostelServicesByHostelIdQuery, GetHostelServicesByHostelIdQueryVariables>(
    GetHostelServicesByHostelId.loc?.source?.body!,
  );

  const fetchHostelServices = async () => {
    if (!user?.hostelId) {
      throw new Error('Hostel ID not found');
    }
    const res = await queryHostelServices({hostelId: Number(user?.hostelId)});
    return res.getHostelServicesByHostelId;
  };

  const { data: hostelServices, isLoading, error } = useQuery({
    queryKey: ['getHostelServicesByHostelId', user?.hostelId],
    queryFn: fetchHostelServices,
    enabled: !!user?.hostelId, // Only run query if hostelId exists
  });
 

  const facebookMarketingServices = hostelServices?.data?.filter(service => service.hostelServiceType === HostelServiceType.FacebookMarketing);

  const googleMarketingServices = hostelServices?.data?.filter(service => service.hostelServiceType === HostelServiceType.GoogleMarketing);

  const employeeServices = hostelServices?.data?.filter(service => service.hostelServiceType === HostelServiceType.Employee);

  const furnitureServices = hostelServices?.data?.filter(service => service.hostelServiceType === HostelServiceType.Furniture);

  const realEstateServices = hostelServices?.data?.filter(service => service.hostelServiceType === HostelServiceType.RealEstate);

  const otherServices = hostelServices?.data?.filter(service => service.hostelServiceType !== HostelServiceType.FacebookMarketing && service.hostelServiceType !== HostelServiceType.GoogleMarketing && service.hostelServiceType !== HostelServiceType.Employee && service.hostelServiceType !== HostelServiceType.Furniture && service.hostelServiceType !== HostelServiceType.RealEstate);
  
  

  const mobileTabs = [
    { label: 'Facebook Marketing', id: ' 1', content: <ServiceTab tabName='Facebook Marketing' tabServices={facebookMarketingServices ?? []} hostelId={user?.hostelId} /> },
    // { name: 'Bookings', id: 2, visible: true },
    { label: 'Google Marketing', id: '2', content:  <ServiceTab tabName='Google Marketing' tabServices={googleMarketingServices ?? []} hostelId={user?.hostelId} /> },
    { label: 'Employee', id: '3', content: <ServiceTab tabName='Employee' tabServices={employeeServices ?? []} hostelId={user?.hostelId} /> },
    {
      label: 'Furniture', id: '3', content: <ServiceTab tabName='Furniture' tabServices={furnitureServices ?? []} hostelId={user?.hostelId} />
    },
    {
      label: 'Real Estate', id: '3', content: <ServiceTab tabName='Real Estate' tabServices={realEstateServices ?? []} hostelId={user?.hostelId} />
    },
    {
      label: 'Other Services', id: '3', content: <ServiceTab tabName='Other' tabServices={otherServices ?? []} hostelId={user?.hostelId} />
    },
  ];
  const tabs = [...mobileTabs];

  return (
    <div className=" min-h-[90vh] w-full bg-white p-3 md:p-10">
      <div className=" mb-5">
        <h2 className=" text-xl font-semibold text-primary">Marketing Options</h2>
        {/* <p className=' text-gray-500 '>View your profile details</p> */}
      </div>

     
    
      <div className=" ">
        <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />
      </div>
    </div>
  );
}
