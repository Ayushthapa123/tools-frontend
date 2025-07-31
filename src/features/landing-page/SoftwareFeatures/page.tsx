import React from "react";
import { MdHotel, MdEventAvailable, MdGroups, MdPerson, MdSearch, MdListAlt, MdMeetingRoom, MdContacts, MdWhatsapp, MdCampaign } from "react-icons/md";
import { FaGoogle, FaBlogger, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
const features = [
  {
    icon: <MdPerson className="text-7xl text-primary hover:bg-primary/10 rounded-full p-2" />,
    title: "Instantly Create Digital Profile of your Hostel",
    description: (
      <div>
        Create and manage your hostel&apos;s professional digital profile with customizable branding, photos, and amenities showcase.
      </div>
    ),
    serviceType: "Free"
  },
  {
    icon: <FaGoogle className="text-7xl text-info hover:bg-info/10 rounded-full p-2" />,
    title: "Get Listed in Google Search and Blogs",
    description: (
      <div>
        Automatic Google Business Profile setup and blog integration to maximize your hostel&apos;s online visibility and reach.
      </div>
    ),
    serviceType: "Free"
  },
  {
    icon: <MdSearch className="text-7xl text-accent hover:bg-accent/10 rounded-full p-2" />,
    title: "Get Listed in Hostel Search Engines",
    description: (
      <div>
        Get featured on <Link href="https://hostelpilot.com" target="_blank" className="text-info">HostelPilot</Link> and <Link href="https://hosteltrend.com" target="_blank" className="text-info">HostelTrend</Link> for maximum exposure to students and travellers.
      </div>
    ),
    serviceType: "Free"
  },
  {
    icon: <MdMeetingRoom className="text-7xl text-secondary hover:bg-secondary/10 rounded-full p-2" />,
    title: "Smart Room Management System",
    description: (
      <div>
        Advanced room allocation, occupancy tracking, and automated booking management for optimal hostel operations.
      </div>
    ),
    serviceType: "Free"
  },
  {
    icon: <MdListAlt className="text-7xl text-success hover:bg-success/10 rounded-full p-2" />,
    title: "Comprehensive Student Record Management",
    description: (
      <div>
        Centralized student information management with automated payment tracking and digital document storage.
      </div>
    ),
    serviceType: "Free"
  },
  {
    icon: <FaWhatsapp className="text-7xl text-success hover:bg-success/10 rounded-full p-2" />,
    title: "Easy Hostel Booking Communication",
    description: (
      <div>
        Integrated WhatsApp and phone system for instant student inquiries and seamless booking confirmations.
      </div>
    ),
    serviceType: "Free"
  },
  {
    icon: <MdCampaign className="text-7xl text-warning hover:bg-warning/10 rounded-full p-2" />,
    title: "Premium Digital Marketing Suite",
    description: (
      <div>
        Expert-led digital marketing campaigns with social media management, SEO optimization, and targeted student outreach.
      </div>
    ),
    serviceType: "Paid"
  },
];

function Card({ icon, title, description, serviceType }: { icon: React.ReactNode; title: string; description: React.ReactNode; serviceType: string }) {
  return (
      <div className="card relative rounded-md hover:shadow-lg transition-shadow bg-white shadow-md h-full w-full">
      <div className="card-body flex flex-col items-center justify-start h-full">
        <div className="mb-4">{icon}</div>
        <h3 className="card-title text-center xl:text-lg text-2xl font-semibold mb-2">{title}</h3>
        <div className="text-center text-gray-500 text-sm flex-1 !tracking-wide">{description}</div>
        <div className={`absolute top-1 right-4 mt-2 px-3 py-1 rounded-lg text-sm font-medium ${serviceType === "Paid" ? "bg-warning/90 text-white" : "bg-success/90 text-white"}`}>
          {serviceType}
        </div>
      </div>
    </div>
  );
}

export function SoftwareFeatures() {
  return (
    <section>
      <div className="text-center mt-8" >
        <h1 className="md:text-4xl font-bold text-2xl">What can you do with Hostel Admin?</h1>
      </div>
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 md:px-10 md:mt-12 mt-6 px-3">
      {features.map((feature, idx) => (
        <div key={idx} className="flex-1  flex min-h-[250px]">
          <Card {...feature} />
        </div>
      ))}
    </div>
    </section>
  );
}