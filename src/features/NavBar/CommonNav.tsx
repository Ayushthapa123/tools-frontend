'use client';
import Link from 'next/link';
import { Logo } from '../Logo';
import { useUserStore } from 'src/store/userStore';
// import { MobileNav } from './MobileNav';

import { motion } from 'framer-motion';
import { domainConfig } from 'src/config/domainConfig';
import { UserProfile } from '../UserProfile';
import { CreateHostelModal } from 'src/app/app/hostel-info/CreateHostelModal';
import { AllAmenitiesOption, GetHostelByToken, GetHostelByTokenQuery, GetHostelByTokenQueryVariables, UserType } from 'src/gql/graphql';
import { Drawer } from '../Drawer';
import { useGraphQLQuery } from 'src/hooks/useGraphqlQuery';

export const CommonNav = () => {
  const { user } = useUserStore();

  const { data: hostelData, isLoading } = useGraphQLQuery<
  GetHostelByTokenQuery,
  GetHostelByTokenQueryVariables
>({
  queryKey: ['getHostelByToken'],
  query: GetHostelByToken.loc!.source.body,
  variables: {},
  enabled: !!user.userId,
});

  return (
    <div
      className="sticky top-0 z-[999] flex h-[70px] w-full  flex-col  justify-center bg-white px-3 align-middle  shadow-sm md:h-[70px] md:px-[30px]"
      id="common-nav">
      <div className="flex w-full justify-between overflow-hidden ">
        <div className=" flex-shrink-0 flex ">
          <div className="relative ">
            <Logo />
          </div>
          <div className=' flex-col justify-center mt-2 hidden md:flex'>
            <h3 className='font-bold'>{hostelData?.getHostelByToken?.data?.name}</h3>
          </div>
        </div>
        <div className="flex  flex-1" />

        <div className=" flex flex-shrink-0 flex-col justify-center ">
          <div className="flex flex-row-reverse gap-2 md:gap-4">
            {!user.userId && domainConfig.appName === 'hosteladmin' && (
              <>
                <div className="flex gap-1 md:gap-2">
                  <Link href={'/login'}>
                    <motion.div className="  font-semibold " transition={{ duration: 0.3 }}>
                      <div className="p1-1 py-3 text-[1rem] hover:underline">Login</div>
                    </motion.div>
                  </Link>
                </div>

                <button className="flex flex-row items-center justify-center rounded-full border border-transparent bg-primary py-0 font-medium tracking-wide transition duration-150 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 lg:min-w-fit">
                  <motion.div className="  font-semibold " transition={{ duration: 0.3 }}>
                    <Link href={'/signup'}>
                      <span className="block text-white md:block">Signup</span>
                    </Link>
                  </motion.div>
                </button>
              </>
            )}

            <div className="flex flex-row-reverse gap-3">
            <div className=" flex gap-3 ">
              {user.userId && (
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 md:gap-4 bg-gray-50 rounded-lg px-3 py-2 shadow-sm transition hover:bg-gray-100">
                    <Link href={'/app/my-listings'}>
                      <button className="flex items-center gap-2 px-3 py-1 rounded-md bg-primary text-white font-semibold text-base md:text-lg shadow hover:bg-primary/90 transition">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3v4M8 3v4m-5 4h18" />
                        </svg>
                        My Listings
                      </button>
                    </Link>
                    <div className="ml-2">
                      <UserProfile />
                    </div>
                  </div>
                </div>
              )}
              <div className=" mt-2 ">
                {user.userType !== UserType.Student && user.userId && (
                  <div className="left-0 top-[70px]  lg:hidden ">
                    <Drawer />
                  </div>
                )}
              </div>
            </div>
            {user.userType === UserType.HostelOwner && !user.hostelId && <CreateHostelModal />}
          </div>
          <div className=" flex gap-1 md:gap-2">
            {domainConfig.appName === 'hostelpilot' && !user.userEmail && (
              <button className="flex flex-row items-center justify-center rounded-full border border-transparent bg-primary  font-medium tracking-wide transition duration-150 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 lg:min-w-fit">
                <motion.div className="  font-semibold " transition={{ duration: 0.3 }}>
                  <Link href={'https://hosteladmin.com/signup'}>
                    <span className="block text-white md:block">List My Hostel <b className='text-xs  bg-neutral p-1 rounded text-gray-600 px-1'> FREE</b></span>
                  </Link>
                </motion.div>
              </button>
            )}
          </div>
            </div>
        </div>
      </div>
    </div>
  );
};
