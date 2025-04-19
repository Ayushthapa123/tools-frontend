'use client';
import Link from 'next/link';

import { motion } from 'framer-motion';

export const TryDemoLink = () => {
  return (
    <div className=" w-min ">
      <Link href={'/#demo'}>
        <motion.div
          whileHover={{
            scale: 1.05,
          }}
          transition={{ duration: 0.3 }}
          className="rounded-[8px]  bg-secondary font-semibold shadow-lg  ">
          <div className=" flex  px-6 py-2 lg:py-3 text-[16px] text-white min-w-[120px] items-center align-middle  ">
            <span className=" flex w-full">Try Now</span>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};
