import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <>
      <Link href="/">
        <div style={{ alignItems: 'start' }} className='flex justify-center items-center align-middle h-full flex-col'>
          <Image src="/logo512.png" alt="logo" height={60} width={60} className="  md:flex" />
        </div>
      </Link>
    </>
  );
};
