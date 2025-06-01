import Link from 'next/link';

export const BottomNav = () => {
  const navItem = [
    { href: '#pricing', name: 'Pricing' },
    { href: '#location', name: 'Location' },

    { href: '#gallery', name: 'Gallery' },
  ];

  return (
    <div className=" bg-blue-gray-50 flex h-[70px] w-full px-3 lg:px-24 ">
      <div className="flex w-full">
        <div className="text-blue-900 flex flex-grow items-center gap-5 align-middle text-lg font-semibold ">
          {navItem.map(nav => (
            <div key={nav.name}>
              <Link href={nav.href}>{nav.name}</Link>
            </div>
          ))}
        </div>
        <div className="hidden flex-col justify-center align-middle md:flex">
          <form className="mx-auto  flex h-[50px] max-w-4xl  rounded-full border bg-gray-50 px-6  focus-within:border-gray-300">
            <Link href={'/search'}>
              {' '}
              <input
                type="text"
                placeholder="Search By Location"
                className="w-full border-0 bg-transparent px-0 py-3 pr-4 font-semibold focus:outline-none focus:ring-0"
                name="topic"
              />
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
