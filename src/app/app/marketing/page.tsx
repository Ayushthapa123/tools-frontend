'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useUserStore } from 'src/store/userStore';

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
    { label: 'Facebook Advertisement', id: ' 1', content: <div>Coming Soon 
      <p className=' text-gray-500 text-sm'>Please contact support: 9846793894</p>
    </div> },
    // { name: 'Bookings', id: 2, visible: true },
    { label: 'Instagram Advertisement', id: '3', content: <div>Coming Soon
      <p className=' text-gray-500 text-sm'>Please contact support: 9846793894</p>
    </div> },
    { label: 'Google Advertisement', id: '4', content: <div>Coming Soon
      <p className=' text-gray-500 text-sm'>Please contact support: 9846793894</p>
    </div> },
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
