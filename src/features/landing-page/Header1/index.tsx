import { FaBusinessTime, FaClipboardList, FaSearch } from 'react-icons/fa';
import { MdAnalytics, MdBookOnline, MdSocialDistance } from 'react-icons/md';
import { IntegratedWith } from '../integrated-with';
import Link from 'next/link';
import LogIn from 'src/app/login/LogIn';
import { BsArrowRight } from 'react-icons/bs';

export const Header = () => {

  return (
    <div className=" grid  min-h-[90vh] w-full lg:grid-cols-2 flex-wrap-reverse ">
      <div className="p-3 py-10 lg:px-10">
        <div className=" min-h-[50vh] ">
          <div className="">
            <div className="max-w-screen-xl">
              <h1 className="capitalize ">All In one Hostel Management Software</h1>
              <p className="py-6">
                hosteladmin offers a comprehensive platform that allows you to seamlessly upload and
                manage all the details of your hostel online. By leveraging our user-friendly
                interface, you can ensure that potential guests can easily find your hostel, check
                availability, and reach out to you directly.
              </p>
              <Link href={'/signup'}>
                {' '}
                <span className="flex text-lg text-blue-500 hover:text-secondary ">
                  Get Started
                  <span className='relative top-1'>
                    <BsArrowRight />
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className=''>
        <IntegratedWith />
        </div>
      </div>
      <div className="flex">
        <LogIn />
      </div>
    </div>
  );
};
