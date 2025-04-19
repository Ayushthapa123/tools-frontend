import Link from 'next/link';
import { SearchBox } from './SearchBox';
import { Suspense } from 'react';

export const Header = () => {
  return (
    <div className="w-full ">
      <div
        className=" min-h-[290px] w-full  rounded-lg   pt-10 md:h-[100vh] "
        style={{
          backgroundImage: `

            linear-gradient(
  45deg,
  hsl(313deg 82% 96%) 0%,
  hsl(313deg 82% 96%) 14%,
  hsl(313deg 82% 97%) 25%,
  hsl(314deg 82% 98%) 34%,
  hsl(314deg 81% 99%) 43%,
  hsl(314deg 81% 99%) 50%,
  hsl(0deg 0% 100%) 57%,
  hsl(201deg 71% 97%) 64%,
  hsl(200deg 72% 95%) 70%,
  hsl(200deg 72% 92%) 77%,
  hsl(200deg 73% 88%) 83%,
  hsl(199deg 74% 85%) 91%,
  hsl(199deg 74% 82%) 100%
)
`,
        }}>
        {/* <div className="relative z-50 pt-[64px] ">
            <div className="px-[50px] text-center">
              <div className="relative">
                <div className=" text-[32px] font-bold text-primary md:text-[36px] lg:text-[48px]">
                  <h1> Find Boys/Girls Hostels In your city</h1>
                </div>
              </div>
              <div className="mt-4 ">
                <p className=" font-medium leading-[32px] tracking-[0.25px] text-secondary md:text-[16px] lg:text-[20px]">
                  Find affordable boys/girls hostels in your city for students and young
                  professionals on monthly basic.
                </p>
              </div>
            </div>
          </div> */}

        <div className="relative flex h-[200px] w-full items-center justify-center text-center">
          <h1 className="relative px-4 text-[42px]  font-light leading-[1.1] sm:text-5xl sm:leading-[1.1] md:text-6xl md:leading-[1.1]">
            Your Homestay Search, Simplified - <br /> Explore with Us!
          </h1>
        </div>

        <div className="h-full w-full px-3 ">
          <Suspense>
            <SearchBox />
          </Suspense>
          <div>
            <div className="flex h-[35vh] w-full flex-col items-center justify-center">
              <div className="mt-4 w-full max-w-7xl px-2 ">
                <p className="text-center text-2xl text-[#78B7D0] sm:text-3xl md:text-4xl">
                  Welcome to HostelTrend, your go-to platform for finding the perfect hostel.
                  Whether it is a cozy stay or a shared space, we make your search quick and easy!
                </p>
              </div>
              <div>
                <h3 className="mt-8 font-light ">
                  ASSOCIATED WITH{' '}
                  <Link href={'https://hosteladmin.com'}>
                    <span className="font-semibold">HOSTELADMIN.COM</span>
                  </Link>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div />
    </div>
  );
};
