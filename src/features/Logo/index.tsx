import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <>
      <Link href="/">
        <div style={{ alignItems: 'start' }}>
          <Image src="/logo.png" alt="logo" height={80} width={80} className=" md:-my-2 md:flex" />
        </div>
      </Link>
    </>
  );
};
