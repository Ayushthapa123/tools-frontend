import { Logo } from '../Logo';

export const DemoCard = () => {
  return (
    <div className="px-6 py-[64px] text-center md:px-[50px] lg:px-[100px] ">
      <div className="flex-grow px-6"></div>

      <div className="relative  z-[111]  mt-[48px]  shadow-sm lg:px-[90px] ">
        <div className="relative z-50 rounded-b-2xl pb-6 shadow-sm ">
          <div className="relative z-[51] h-full  w-full">
            <div className="h-auto w-full overflow-hidden ">
              <div className="relative h-auto w-full ">
                <div className="bg-colorBlueLightest flex h-[70px] w-full flex-col justify-center rounded-t-[8px] bg-opacity-40 ">
                  <div className="flex">
                    <div className="flex-shrink ">
                      <Logo />
                    </div>
                    <div className="flex-grow" />
                  </div>
                </div>

                <div className="text-colorWhite absolute right-[-40px] top-[30px] flex h-[35px] w-[180px] rotate-45  flex-col justify-center bg-[#ED4C5C] text-center align-middle text-[16px] font-bold uppercase">
                  <span>DEMO</span>
                </div>
              </div>
              <div className=" mx:px-[32px] relative z-[99] min-h-[400px] px-6 shadow-md lg:px-[64px]">
                ...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
