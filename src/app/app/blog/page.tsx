'use client';

import React, { useState } from 'react';
// import { MapComponent } from './GoogleMap';
import { CityBlogs } from './CityBlogs';
import { PlaceBlogs } from './PlaceBlogs';
import { MapProvider } from 'src/features/MapProvider';
import Button from 'src/components/Button';
import Link from 'next/link';
import { useUserStore } from 'src/store/userStore';
import { UserType } from 'src/gql/graphql';
import { notFound } from 'next/navigation';
import { Tabs } from 'src/components/Tabs';
export default function Home() {
  const {user}=useUserStore()
  if(user.userType!==UserType.Superadmin && user.userType!==UserType.Writer){ 
    return notFound()
  }
  return (
    <div className="w-full ">
      <div className="flex w-full items-center justify-center ">
        <div className="  w-full  max-w-[1400px]">
          <div>
            <MapProvider>
              <BlogTabs />
            </MapProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

const BlogTabs = () => {
  const [ activeRoomCount, setActiveRoomCount ] = useState(0);
  const tabs = [
      { label: 'City Blogs', id: "1", content: <CityBlogs setActiveRoomCount={setActiveRoomCount} /> },
    { label: 'Places Blogs', id: "2", content: <PlaceBlogs setActiveRoomCount={setActiveRoomCount} /> },

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
          <span className='text-lg font-medium text-gray-900'>{activeRoomCount} </span> Active Blogs
        </div>
        
          <div>
            <div>
              <Link href="/app/blog/new">
                <Button label="Add New Blog"></Button>
              </Link>
            </div>
          </div>
      
      </div>

  <div>
    <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />
  </div>
    </div>
  );
};
