'use client';

import React, { useState } from 'react';
// import { MapComponent } from './GoogleMap';
import { AllForms } from './AllApplications';
import { useUserStore } from 'src/store/userStore';
import { UserType } from 'src/gql/graphql';
import { notFound } from 'next/navigation';
import { Tabs } from 'src/components/Tabs';
export default function Home() {
  const {user}=useUserStore()

  return (
    <div className="w-full ">
      <div className="flex w-full items-center justify-center ">
        <div className="  w-full  max-w-[1400px]">
          <div>
              <LocationTabs />
          </div>
        </div>
      </div>
    </div>
  );
}

const LocationTabs = () => {
  const tabs = [
    { label: 'All Applications', id: '1', content: <AllForms /> },
    // {
    //   label: 'Pending Applications',
    //   id: '2',
    //   content: <div>Pending Applications</div>,
    // },
  ];
   
  return (
    <div className="w-full py-5 ">
     <Tabs tabs={tabs}  />
    
    </div>
  );
};
