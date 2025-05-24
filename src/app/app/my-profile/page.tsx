'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { OwnProfile } from './OwnProfile';
import { useUserStore } from 'src/store/userStore';
import { OwnBookings } from './OwnBookings';
import ChangePassword from './ChangePassword';

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
      <div role="tablist" className="tabs tabs-boxed  mb-10 hidden w-auto md:block bg-transparent">
        {tabs?.filter(tab => tab.visible).map(tab => (
          <a
            role="tab"
            className={`tab text-xl mx-1 px-2 font-bold text-primary ${activeTab == tab.id ? '  tab-active' : 'border border-slate-300'}`}
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
            className={`tab text-sm lg:text-xl font-bold text-primary ${activeTab == tab.id ? '  tab-active' : ''}`}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}>
            {tab.name}
          </a>
        ))}
      </div>
      {activeTab == 1 && <OwnProfile userType={user.userType} />}
      {activeTab == 2 && <OwnBookings userType={user.userType} />}
      {activeTab == 3 && <ChangePassword userId={Number(user.userId)} />}


      <div className=" py-10"></div>
    </div>
  );
}
