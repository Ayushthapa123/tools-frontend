'use client';

import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import {

  GetUserByAccessToken,
  GetUserByAccessTokenQuery,
  GetUserByAccessTokenQueryVariables,
} from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';
import { useAccessTokenStore } from 'src/store/accessTokenStore';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { OwnProfile } from './OwnProfile';
import { useUserStore } from 'src/store/userStore';
import { OwnBookings } from './OwnBookings';

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
  // const router = useRouter();
  // const asPath = router.asPath;
  const searchParams = useSearchParams();
  const param = searchParams.get('id');

  const { accessToken } = useAccessTokenStore();
  const { user } = useUserStore();

  const queryUser = useGraphqlClientRequest<
    GetUserByAccessTokenQuery,
    GetUserByAccessTokenQueryVariables
  >(GetUserByAccessToken.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryUser({ token: accessToken });
    return res.getUserByAccessToken;
  };

  const { data: userData } = useQuery({
    queryKey: ['getUserByToken'],
    queryFn: fetchData,
    staleTime: 900000, //slate time for 15 minute
  });

  //get the payment profile


  const [activeTab, setActiveTab] = useState(param == 'plans' ? 2 : param == 'payment-info' ? 3 : 1);


  const mobileTabs = [
    { name: 'Own Profile', id: 1 ,visible:true},
    { name: 'Bookings', id: 2,visible:true},
    { name: 'Change Password', id: 3,visible:true },

  ];
  const tabs = [
   ...mobileTabs,
  ];

  return (
    <div className=" min-h-[90vh] w-full bg-white p-3 md:p-10">
      <div className=" mb-5">
        <h2 className=" text-xl font-semibold text-primary">My Profile Details</h2>
        {/* <p className=' text-gray-500 '>View your profile details</p> */}
      </div>
      <div role="tablist" className="tabs tabs-boxed  mb-10 hidden w-auto md:block ">
        {tabs?.filter(tab => tab.visible).map(tab => (
          <a
            role="tab"
            className={`tab text-xl font-bold text-primary ${activeTab == tab.id ? '  tab-active' : ''}`}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}>
            {tab.name}
          </a>
        ))}
      </div>

      <div role="tablist" className="tabs tabs-lifted  mb-10 w-auto md:hidden">
        {mobileTabs?.map(tab => (
          <a
            role="tab"
            className={`tab text-xl font-bold text-primary ${activeTab == tab.id ? '  tab-active' : ''}`}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}>
            {tab.name}
          </a>
        ))}
      </div>
      {activeTab == 1 && <OwnProfile userType={user.userType} />}
      {activeTab == 2 && <OwnBookings userType={user.userType} />}


      <div className=" py-10"></div>
    </div>
  );
}
