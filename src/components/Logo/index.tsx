import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <>
      <Link href="/">
        <div style={{ alignItems: 'center' }}>
          <Image src="/hslogo.png" alt="logo" height={80} width={80} className=" md:flex" />
        </div>
      </Link>
    </>
  );
};
