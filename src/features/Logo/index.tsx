import Image from 'next/image';
import Link from 'next/link';
import { domainConfig } from 'src/config/domainConfig';

export const Logo = () => {
  const isHostelpilot = domainConfig.appName === 'hostelpilot';
  return (
    <>
      <Link href="/">
        <div style={{ alignItems: 'start' }} className='flex justify-center items-center align-middle h-full flex-col'>
          <Image src={domainConfig.logo} alt="logo" height={50} width={50} className={`${isHostelpilot ? 'md:hidden block' : 'block'}`} />
          {isHostelpilot &&<Image src={domainConfig.fullLogo} alt="full logo" height={60} width={isHostelpilot ? 150 : 50} className="hidden md:block" />}
        </div>
      </Link>
    </>
  );
};
