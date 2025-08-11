import { Metadata } from 'next';


import { isHostelAdmin, domainConfig } from 'src/config/domainConfig';
import { MdPhone, MdEmail } from 'react-icons/md';
export const metadata: Metadata = {
  title: `Contact Us | ${isHostelAdmin ? 'HostelAdmin' : 'HostelPilot'}`,
  description:
    `Contact ${isHostelAdmin ? 'HostelAdmin' : 'HostelPilot'} for support, inquiries, or feedback. Find our phone, email, and office address here.`,
  manifest: '/manifest.json',
  authors: [{ name: 'Ayush Thapa' }],
  openGraph: {
    images: domainConfig.logo,
    title: `Contact Us | ${isHostelAdmin ? 'HostelAdmin' : 'HostelPilot'}`,
    description: `Contact ${isHostelAdmin ? 'HostelAdmin' : 'HostelPilot'} for support, inquiries, or feedback. Find our phone, email, and office address here.`,
  },
};

export default function ContactUs() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-base-100 py-12 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl p-10 border border-gray-100">
        <h1 className="text-4xl font-extrabold text-primary mb-2 text-center">Contact HostelAdmin</h1>
        <p className="text-gray-700 mb-6 text-center text-lg">
          We&apos;re here to help! Please reach out to us for any inquiries, support, or feedback. Our team will get back to you as soon as possible.
        </p>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-primary mb-2">Office Address</h2>
          <div className="text-gray-600 text-base">
            {/* Replace with real address if available */}
            <span>Kalopul, Kathmandu, Nepal</span>
          </div>
        </div>
        <div className="border-t border-gray-200 my-6"></div>
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-center gap-4 bg-blue-50 rounded-lg p-4">
            <MdPhone className="text-2xl text-blue-600" />
            <div>
              <div className="text-lg font-semibold text-gray-800">Phone</div>
              <a href="tel:9846793894" className="text-blue-700 hover:underline text-base font-medium">9846793894</a>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-blue-50 rounded-lg p-4">
            <MdEmail className="text-2xl text-blue-600" />
            <div>
              <div className="text-lg font-semibold text-gray-800">Email</div>
              <a href="mailto:info@hosteladmin.com" className="text-blue-700 hover:underline text-base font-medium">info@hosteladmin.com</a>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-primary mb-1">Business Hours</h2>
          <div className="text-gray-600 text-base">Sunday - Saturday 24/7 Available</div>
        </div>
        <div className="mt-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} HostelAdmin. All rights reserved.
        </div>
      </div>
    </div>
  );
}

