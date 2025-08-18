'use client';

import React, { useState } from 'react';
// import { MapComponent } from './GoogleMap';
import { ActiveRooms } from './ActiveRooms';
import { MapProvider } from 'src/features/MapProvider';
import Button from 'src/components/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full ">
      <div className="flex w-full items-center justify-center ">
        <div className="  w-full  max-w-[1400px]">
          <div>
            <MapProvider>
              <RoomTabs />
            </MapProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

const RoomTabs = () => {
  const [ activeRoomCount, setActiveRoomCount ] = useState(0);
  const tabs = [
    { title: 'Active Rooms', id: 1, comp: <ActiveRooms setActiveRoomCount={setActiveRoomCount} /> },
    // {
    //   title: 'Inactive Rooms',
    //   id: 2,
    //   comp: <div>Inactive Rooms</div>,
    // },
  ];
  const [ activeTab, setActiveTab ] = useState(1);

  return (
    <div className="w-full ">
      <div
        role="tablist"
        className="tabs-boxed tabs z-[99] flex flex-wrap items-center justify-between bg-transparent pb-2"
      >
        <div className='text-gray-500 text-base'>
          <span className='text-lg font-medium text-gray-900'>{activeRoomCount} </span> Active Rooms
        </div>
        {activeTab == 1 && (
          <div>
            <div>
              <Link href="/app/tool/new">
                <Button label="Add Tool"></Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {tabs.map((tab, index) => (
        <div key={index}>{tab.id == activeTab && <div>{tab.comp}</div>}</div>
      ))}
    </div>
  );
};
