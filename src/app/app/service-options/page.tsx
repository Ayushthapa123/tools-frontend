'use client';

import React, { useState } from 'react';
// import { MapComponent } from './GoogleMap';
import { AllServices } from './AllServices';

export default function Home() {
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
