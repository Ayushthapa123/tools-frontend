'use client';

import React, { useState } from 'react';
// import { MapComponent } from './GoogleMap';
import { ActiveTools } from './ActiveRooms';
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
              <ToolTabs />
            </MapProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

const ToolTabs = () => {
  const [ activeToolCount, setActiveToolCount ] = useState(0);
  const tabs = [
    { title: 'Active Tools', id: 1, comp: <ActiveTools setActiveToolCount={setActiveToolCount} /> },
    // {
    //   title: 'Inactive Tools',
    //   id: 2,
    //   comp: <div>Inactive Tools</div>,
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
          <span className='text-lg font-medium text-gray-900'>{activeToolCount} </span> Active Tools
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
