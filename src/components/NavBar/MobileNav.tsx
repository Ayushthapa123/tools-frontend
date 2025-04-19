/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { MdExpandMore } from 'react-icons/md';
// import { Socials } from '../Socials';
import Link from 'next/link';
import { useState } from 'react';


import { motion } from 'framer-motion';

export const MobileNav = () => {
  const [showResources, setShowResources] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const howItWorksLists = [
    {
      title: 'Centralized Health',
      subtitle: 'All Your Health Records In One Place',
      link: '/features/centralize-health-data',
    },
    {
      title: 'Easy Health Management',
      subtitle: 'Transform your fragmented health data into a coherent story',
      link: '/features/easy-health-management',
    },

    {
      title: 'Tailored AI Guidance',
      subtitle: 'Unlock Health Guidance Tailored for You',
      link: '/features/tailored-ai-guidance',
    },
  ];

  const resourcesLists = [
    {
      title: 'Blogs',
      subtitle: 'Discover insights, tips, and inspiration',
      link: '',
    },
   

    {
      title: 'Privacy',
      subtitle: 'Explore to learn how we protect your data and ensure online safety',
      link: '/company/legal/privacy-policy',
    },
    {
      title: 'Contact Us',
      subtitle: 'Get in touch for inquiries, assistance, or to simply say hello!',
      link: '',
    },
  ];


  return (
    <div className="fixed left-0 top-[90px]  h-[100vh] w-full  overflow-y-scroll bg-[#Fff] px-[50px] pt-3">
        <div className=" text-text-black-default gap-10  border-y border-y-[#E5EBED] text-[16px] font-medium">
          <p
            className="my-6 flex cursor-pointer "
            onClick={() => setShowHowItWorks(!showHowItWorks)}>
            How It Works{' '}
            <span className="relative text-[25px]">
              <MdExpandMore className={`${showHowItWorks ? ' rotate-180' : ''}`} />
            </span>
          </p>
          {showHowItWorks && (
            <motion.div
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.1, ease: [0.04, 0.62, 0.23, 0.98] }}>
              <div className="mb-6 flex flex-col gap-4">
                {howItWorksLists.map((list, index) => (
                  <div key={index} className="text-[16px]  font-medium text-[#1a1a1a]">
                    <Link href={list.link}>{list.title}</Link>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
        <div className="text-text-black-default flex gap-10  border-b border-b-[#E5EBED] text-[16px] font-medium">
          <Link href="/pricing">
            {' '}
            <p className="my-6 flex ">Pricing </p>
          </Link>
        </div>

        <div className=" text-text-black-default gap-10  border-b border-b-[#E5EBED] text-[16px] font-medium">
          <p className="my-6 flex cursor-pointer " onClick={() => setShowResources(!showResources)}>
            Resources{' '}
            <span className="relative text-[25px]">
              <MdExpandMore className={`${showResources ? ' rotate-180' : ''}`} />
            </span>
          </p>
          {showResources && (
            <motion.div
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.1, ease: [0.04, 0.62, 0.23, 0.98] }}>
              <div className="mb-6 flex flex-col gap-4">
                {resourcesLists.map((list, index) => (
                  <div key={index} className="text-[16px]  font-medium text-[#1a1a1a]">
                    <Link href={list.link}>{list.title}</Link>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <div className=" mt-[48px] flex w-full flex-col items-center justify-center align-middle">
          <div className="w-min  rounded-[8px] border-[1px] bg-[#fff] font-medium ">
            <Link href="/signin">
              {' '}
              <div className="w-auto  px-6 py-3 text-[20px]  text-[#1a1a1a]">Login</div>
            </Link>
          </div>
          <div className=" mt-[16px]  bg-[#fff] font-medium ">
            <div className="w-auto  px-6 py-3 text-[16px]  text-[#1a1a1a] underline">
              
            </div>
          </div>
        </div>
        <div className="mt-[100px] flex items-center justify-center">
          {/* <Socials /> */}
        </div>
    </div>
  );
};
