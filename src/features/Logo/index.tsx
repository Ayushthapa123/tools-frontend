import Image from 'next/image';
import Link from 'next/link';
import { domainConfig } from 'src/config/domainConfig';

export const Logo = () => {
  return (
    <>
      <Link href="/">
        <div style={{ alignItems: 'start' }} className='flex justify-center items-center align-middle h-full flex-col'>
          <Image src={domainConfig.logo} alt="logo" height={50} width={50} className="  md:flex" />
        </div>
      </Link>
    </>
  );
};
