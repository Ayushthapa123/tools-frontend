'use client';

import React from 'react';

export default function Home() {
  return (
    <div className="w-full ">
      <div className="flex w-full items-center justify-center ">
        <div className="  w-full  max-w-[1400px]">
          <div>What kind of community does your homestay have ?</div>
          <div>Options with multiselect </div>
          <p>
            Stay community types: community types: tech, medical, engineering, sports, gym, entrance
            preperation,{' '}
          </p>
          <p>Travel community types: Hiking, fun, musical, </p>
          <div>
            <p>
              All Homestays will have community: community modal with name, communityTypes:string[],
              description etc.{' '}
            </p>
            <p>
              User will be able to signup for the community with the help of homestay. Once
              joined, he will be able to see the posts, activities etc. from that homestay and homestay.com. 
            </p>
            <p>
              In the case of travellers. This community feature can help homestays to get that
              traveller as regular customer.{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
