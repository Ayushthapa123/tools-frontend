'use client';

import React, { useState } from 'react';
// import { MapComponent } from './GoogleMap';
import { ActiveRooms } from './ActiveRooms';
import { MapProvider } from 'src/features/MapProvider';
import Button from 'src/components/Button';
import { CreateRoomModal } from './CreateRoomModal';

export default function Home() {
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
    { title: 'Active Rooms', id: 1, comp: <ActiveRooms /> },
    {
      title: 'Inactive Rooms',
      id: 2,
      comp: <div>Inactive Rooms</div>,
    },
  ];
  const [ activeTab, setActiveTab ] = useState(1);

  return (
    <div className="w-full py-5 ">
      <div role="tablist" className="tabs-boxed bg-transparent justify-between tabs z-[99] my-3 flex flex-row flex-wrap py-2">
        <div className="flex flex-wrap flex-row">
          {tabs.map(tab => (
            <div key={tab.id} >
              <a
                role="tab"
                className={`  tab  text-base font-medium ${tab.id == activeTab ? 'tab-active text-white' : ' text-primary'}`}
                onClick={() => setActiveTab(tab.id)}>
                {tab.title}
              </a>
            </div>
          ))}
        </div>
        {
          activeTab == 1 && (
            <div>
              <CreateRoomModal />
            </div>
          )
        }
      </div>

      {tabs.map((tab, index) => (
        <div key={index}>
          {tab.id == activeTab && (
            <div>
              {tab.comp}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
