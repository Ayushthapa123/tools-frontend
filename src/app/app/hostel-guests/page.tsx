'use client';

import React, { useState } from 'react';
// import { MapComponent } from './GoogleMap';
import { ActiveGuests } from './ActiveGuests';
import { MapProvider } from 'src/features/MapProvider';
import Button from 'src/components/Button';
import Link from 'next/link';
import UsersTable from 'src/components/ReactTable/UserTable';

export default function Home() {
  return (
    <div className="w-full ">
      <div className="flex w-full items-center justify-center ">
        <div className="  w-full  max-w-[1400px]">
          <div>
            <MapProvider>
              <GuestTabs />
            </MapProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

const GuestTabs = () => {
  const tabs = [
    { title: 'Active Students', id: 1, comp: <ActiveGuests /> },
    // {
    //   title: 'Inactive Rooms',
    //   id: 2,
    //   comp: <div>Inactive Rooms</div>,
    // },
  ];
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="w-full py-5 ">
      <div
        role="tablist"
        className="tabs-boxed tabs z-[99] my-3 flex flex-row flex-wrap justify-between bg-transparent py-2"
      >
        <div className="flex flex-row flex-wrap">
          {/* {tabs.map(tab => (
            <div key={tab.id}>
              <a
                role="tab"
                className={`  tab  text-base font-medium ${tab.id == activeTab ? 'tab-active text-white' : ' text-primary'}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.title}
              </a>
            </div>
          ))} */}
        </div>
       
          <div>
            <div>
              <Link href="/app/hostel-guests/new">
                <Button label="Add New Guest"></Button>
              </Link>
            </div>
          </div>
        
      </div>

      {tabs.map((tab, index) => (
        <div key={index}>{tab.id == activeTab && <div>{tab.comp}</div>}</div>
      ))}

      <div>
        {/* <UsersTable /> */}
      </div>
    </div>
  );
};
