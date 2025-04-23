import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <>
      <Link href="/">
        <div style={{ alignItems: 'start' }}>
          <Image src="/hslogo.png" alt="logo" height={80} width={80} className=" md:flex md:-my-2" />
        </div>
      </Link>
    </>
  );
};
