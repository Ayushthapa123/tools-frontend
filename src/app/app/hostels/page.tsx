'use client';

import React, { useState } from 'react';
// import { MapComponent } from './GoogleMap';
import { AllHostels } from './AllHostels';
import { MapProvider } from 'src/features/MapProvider';
import { useUserStore } from 'src/store/userStore';
import { UserType } from 'src/gql/graphql';
import { notFound } from 'next/navigation';
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
    { title: 'All Hostels', id: 1, comp: <AllHostels /> },
    {
      title: 'Inactive Hostels',
      id: 2,
      comp: <div>Inactive Hostels</div>,
    },
  ];
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="w-full py-5 ">
      <div
        role="tablist"
        className="tabs-boxed tabs sticky top-0 z-[99] my-3 flex flex-wrap bg-transparent py-2"
      >
        {tabs.map(tab => (
          <div key={tab.id} className="flex flex-wrap ">
            <a
              role="tab"
              className={`  tab  text-base font-medium ${tab.id == activeTab ? 'tab-active text-white' : ' text-primary'}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </a>
          </div>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div key={index}>
          {tab.id == activeTab && (
            <div>
              {tab.comp}
              <hr className=" divider" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
