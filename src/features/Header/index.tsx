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
        }}
      >
        <div className="relative flex h-[200px] w-full items-center justify-center text-center">
          <h1 className="relative px-4 text-[42px]  font-light leading-[1.1] sm:text-5xl sm:leading-[1.1] md:text-6xl md:leading-[1.1]">
            Your Hostel Search, Simplified - <br /> Explore with Us!
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
                  Welcome to Hostel.com, your go-to platform for finding the perfect hostel. Whether
                  it is a cozy stay or a shared space, we make your search quick and easy!
                </p>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div />
    </div>
  );
};
