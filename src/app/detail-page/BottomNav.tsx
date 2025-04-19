import Link from 'next/link';

export const BottomNav = () => {
  const navItem = [
    { href: '#pricing', name: 'Pricing' },
    { href: '#location', name: 'Location' },

    { href: '#gallery', name: 'Gallery' },
  ];

  return (
    <div className=" flex h-[70px] w-full bg-blue-gray-50 lg:px-24 px-3 ">
      <div className="flex w-full">
        <div className="flex items-center flex-grow gap-5 text-lg font-semibold text-blue-900 align-middle ">
          {navItem.map(nav => (
            <div key={nav.name}>
              <Link href={nav.href}>{nav.name}</Link>
            </div>
          ))}
        </div>
        <div className="flex-col justify-center hidden align-middle md:flex">
          <form className="mx-auto  flex h-[50px] max-w-4xl  rounded-full border bg-gray-50 px-6  focus-within:border-gray-300">
            <Link href={'/search'}>
              {' '}
              <input
                type="text"
                placeholder="Search By Location"
                className="w-full px-0 py-3 pr-4 font-semibold bg-transparent border-0 focus:outline-none focus:ring-0"
                name="topic"
              />
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
