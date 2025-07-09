'use client';

import React, { useState } from 'react';
// import { MapComponent } from './GoogleMap';
import { ActiveBlogs } from './ActiveBlogs';
import { MapProvider } from 'src/features/MapProvider';
import Button from 'src/components/Button';
import Link from 'next/link';
import { useUserStore } from 'src/store/userStore';
import { UserType } from 'src/gql/graphql';
import { notFound } from 'next/navigation';
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
    { title: 'Active Blogs', id: 1, comp: <ActiveBlogs setActiveRoomCount={setActiveRoomCount} /> },
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
        {activeTab == 1 && (
          <div>
            <div>
              <Link href="/app/blog/new">
                <Button label="Add New Blog"></Button>
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
