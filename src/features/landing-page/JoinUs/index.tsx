'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export const JoinUs = () => {
  const [email, setEmail] = useState('');

  return (
    <div className=" relative h-[100vh] w-full">
      <div className=" relative  z-0 h-full w-full ">
        <Image src="/images/joinusbg.jpg" fill alt="join us background" />
      </div>
      <div className=" absolute top-0 z-10 h-auto  w-full  items-center py-[130px] text-center">
        <div className=" mx-auto lg:w-6/12">
          <h2 className=" text-[25px] font-bold text-primary lg:text-[50px]">
            Unlock your The Hostel Admin Account to Freedom!
          </h2>
          <h3 className=" text-lg font-medium text-primary md:text-2xl"></h3>
        </div>
        <div>
          <form className=" w-full px-5  ">
            <div className="mx-auto mt-10  flex max-w-xl flex-col items-center rounded-full border bg-gray-50 px-6 py-2 focus-within:border-gray-300">
              <input
                type="text"
                placeholder="Join with your email"
                className="w-full border-0 bg-transparent px-0 py-3 pr-4 text-xl font-semibold focus:outline-none focus:ring-0"
                name="topic"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className=" mx-auto  mt-10 flex max-w-xl cursor-pointer items-center justify-center rounded-lg border-b-[3px] border-b-primary bg-red-500 align-middle shadow-lg">
              <Link href={`/signup?email=${email}`}>
                <button className=" flex h-[px] max-w-xl flex-row items-center justify-center border border-transparent   px-4 py-4 text-xl font-medium  uppercase tracking-wide text-white transition duration-150 ease-in-out disabled:cursor-not-allowed disabled:opacity-50">
                  Join Now
                </button>
              </Link>
            </div>
            <p className=" mt-10 text-lg font-medium text-primary">
              Do you already have an account?
              <Link href={'/login'} className=" font-bold">
                {' '}
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
