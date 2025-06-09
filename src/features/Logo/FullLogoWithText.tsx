import Image from 'next/image';
import Link from 'next/link';
import { domainConfig } from 'src/config/domainConfig';

export const FullLogo = () => {
  return (
    <div className=" flex h-[70px] w-full ">
      <Link href="/">
        {' '}
        <div className=" flex w-auto gap-3" style={{ alignItems: 'center' }}>
          <div className="relative mb-5 flex  gap-1 md:mb-5">
            {/* <div className=" relative inline-block h-16  w-16">
              <Image src="/logo512.png" alt="logo" fill />
            </div> */}
            <div className=" relative top-4 text-4xl font-medium text-primary">
              {' '}
              <h1 className="capitalize text-5xl">
                {' '}
                {domainConfig.appName}
              </h1>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
