'use client';

import React, { useState } from 'react';
// import { MapComponent } from './GoogleMap';
import { ActiveBookings } from './ActiveBooking';
import { MapProvider } from 'src/features/MapProvider';

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
    { title: 'Active Bookings', id: 1, comp: <ActiveBookings /> },
    // {
    //   title: 'Cancelled Bookings',
    //   id: 2,
    //   comp: <div>Cancelled Bookings</div>,
    // },
    // {
    //   title: 'Completed Bookings',
    //   id: 3,
    //   comp: <div>Completed Bookings</div>,
    // },
  
  ];
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="w-full py-5 ">
      <div role="tablist" className="tabs-boxed bg-transparent tabs sticky top-0 z-[99] my-3 flex flex-wrap py-2">
        {tabs.map(tab => (
          <div key={tab.id} className="flex flex-wrap ">
            <a
              role="tab"
              className={`  tab  text-base font-medium ${tab.id == activeTab ? 'tab-active text-white' : ' text-primary'}`}
              onClick={() => setActiveTab(tab.id)}>
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
