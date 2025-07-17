import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

export default function CustomSearchFormCard() {
  return (
    <div className="card bg-white shadow-lg hover:shadow-2xl transition-all border border-gray-100 rounded-2xl p-8 flex flex-col items-center text-center gap-4">
      <div className="rounded-full bg-gradient-to-tr from-primary/20 to-primary/40 p-5 mb-3 flex items-center justify-center shadow-md">
        <FaSearch className="h-12 w-12 text-primary" />
      </div>
      <h2 className="card-title text-2xl font-extrabold text-gray-900 mb-1">Didn&apos;t Find Your Hostel?</h2>
      <p className="text-base text-gray-600 mb-4 max-w-xs">
        No worries! Let us know your requirements and we&apos;ll help you find the perfect hostel. For Free!
      </p>
      <div className="card-actions mt-2 w-full">
        <Link href="/forms/hostel-search-form" className="btn btn-primary btn-block rounded-full text-base font-semibold shadow-md hover:scale-[1.03] transition-transform">
          Request a Custom Hostel Search
        </Link>
      </div>
    </div>
  );
}
