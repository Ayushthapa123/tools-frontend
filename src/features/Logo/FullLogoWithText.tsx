import Image from 'next/image';
import Link from 'next/link';

export const FullLogo = () => {
  return (
    <div className=" flex h-[70px] w-full p-1 justify-center align-middle flex-col ">
      <Link href="/">
        {' '}
        <div className=" flex w-auto ">
          <div className="relative  flex   ">
            <div className=" relative inline-block h-12  w-72 align-middle ">
              <Image src="/full-logo.png" alt="toolsland.ai Logo"   fill/>
            </div>
         
          </div>
        </div>
      </Link>
    </div>
  );
};
