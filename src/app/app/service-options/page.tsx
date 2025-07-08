'use client';

import React, { useState } from 'react';
// import { MapComponent } from './GoogleMap';
import { AllServices } from './AllServices';
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
            <AllServices />
          </div>
        </div>
      </div>
    </div>
  );
}
