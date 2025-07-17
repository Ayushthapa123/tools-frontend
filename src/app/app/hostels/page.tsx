'use client';

import React, { useState } from 'react';
// import { Mapcontentonent } from './GoogleMap';
import { AllHostels } from './AllHostels';
import { MapProvider } from 'src/features/MapProvider';
import { useUserStore } from 'src/store/userStore';
import { UserType } from 'src/gql/graphql';
import { notFound } from 'next/navigation';
import { Tabs } from 'src/components/Tabs';
export default function Home() {
  const {user}=useUserStore()
  if(user.userType!==UserType.Superadmin){ 
    return notFound()
  }
  return (
    <div className="w-full ">
      <div className="flex w-full items-center justify-center ">
        <div className="  w-full  max-w-[1400px]">
          <div>
            <MapProvider>
              <LocationTabs />
            </MapProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

const LocationTabs = () => {
  const tabs = [
    { label: 'All Hostels', id: "1", content: <AllHostels /> },
    {
      label: 'Inactive Hostels',
      id: "2",
      content: <div>Inactive Hostels</div>,
    },
  ];

  return (
    <div className="w-full py-5 ">
      <div
        role="tablist"
        className="tabs-boxed tabs sticky top-0 z-[99] my-3 flex flex-wrap bg-transparent py-2"
      >
            <Tabs
              tabs={tabs}
            />
      </div>
    </div>
  );
};
