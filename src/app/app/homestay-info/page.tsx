import React from 'react';
import { HostelInfo } from './HostelInfo';

export default function Home() {
  return (
    <div className=" w-full">
      <div className="  flex  w-full items-center   justify-center ">
        <div className="  w-full  max-w-[1400px] ">
          <h2 className=" mb-[1rem]">
            Homestay Related Informations
          </h2>

          <div className=" w-full ">
            <HostelInfo />
            <hr className=" divider" />
          </div>
        </div>
      </div>
    </div>
  );
}
