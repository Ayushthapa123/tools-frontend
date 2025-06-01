import Image from 'next/image';
import Link from 'next/link';

export const LogoIcon = () => {
  return (
    <div className=" flex h-[60px] w-full ">
      <Link href="/">
        {' '}
        <div className=" flex w-auto gap-3" style={{ alignItems: 'center' }}>
          <div className="relative mb-5 flex  gap-1 md:mb-5">
            <div className=" relative inline-block h-16  w-16">
              <Image src="/logo.png" alt="logo" fill />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
