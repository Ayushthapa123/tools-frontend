'use client';

import React, { useState } from 'react';
// import { Mapcontentonent } from './GoogleMap';
import { AllListings } from './AllListings';
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
    { label: 'Active Listings', id: "1", content: <AllListings /> },
    {
      label: 'Inactive Listings',
      id: "2",
      content: <div>Inactive Listings</div>,
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
