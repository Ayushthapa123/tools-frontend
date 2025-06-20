'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { OwnProfile } from './OwnProfile';
import { useUserStore } from 'src/store/userStore';
import { OwnBookings } from './OwnBookings';
import ChangePassword from './ChangePassword';
import Button from 'src/components/Button';
import { Tabs } from 'src/components/Tabs';
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

  const [activeTab, setActiveTab] = useState(0);

  const mobileTabs = [
    { label: 'Own Profile', id: ' 1', content: <OwnProfile userType={user.userType} /> },
    // { name: 'Bookings', id: 2, visible: true },
    { label: 'Change Password', id: '3', content: <ChangePassword userId={Number(user.userId)} /> },
  ];
  const tabs = [...mobileTabs];

  return (
    <div className=" min-h-[90vh] w-full bg-white p-3 md:p-10 md:pt-4">
      <div className=" mb-5">
        <h1 className=" text-xl font-semibold text-primary">My Profile Details</h1>
        {/* <p className=' text-gray-500 '>View your profile details</p> */}
      </div>

     
    
      <div className=" ">
        <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />
      </div>
    </div>
  );
}
