import React from "react";
import { MdHotel, MdEventAvailable, MdGroups, MdPerson, MdSearch, MdListAlt, MdMeetingRoom, MdContacts, MdWhatsapp, MdCampaign } from "react-icons/md";
import { FaGoogle, FaBlogger, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
const features = [
  {
    icon: <MdPerson className="text-5xl text-primary bg-primary/10 rounded-full p-2" />,
    title: "Instantly Create Digital Profile",
    description: (
      <div>
        Create a digital profile for your hostel instantly and manage your online presence with ease.
      </div>
    ),
    serviceType: "Free"
  },
  {
    icon: <FaGoogle className="text-5xl text-info bg-info/10 rounded-full p-2" />,
    title: "Get Listed in Google Search and Blogs",
    description: (
      <div>
        Boost your visibility by getting listed in Google search results and relevant blogs automatically.
      </div>
    ),
    serviceType: "Free"
  },
  {
    icon: <MdSearch className="text-5xl text-accent bg-accent/10 rounded-full p-2" />,
    title: "Get Listed in Hostel Search Engines",
    description: (
      <div>
        Appear in hostel search engines like <Link href="https://hostelpilot.com" target="_blank" className="text-info underline">HostelPilot</Link> and <Link href="https://hosteltrend.com" target="_blank" className="text-info underline">HostelTrend</Link> to attract more students.
      </div>
    ),
    serviceType: "Free"
  },
  {
    icon: <MdMeetingRoom className="text-5xl text-secondary bg-secondary/10 rounded-full p-2" />,
    title: "Room Management",
    description: (
      <div>
        Effortlessly manage rooms, availability, and reservations with our intuitive tools.
      </div>
    ),
    serviceType: "Free"
  },
  {
    icon: <MdListAlt className="text-5xl text-success bg-success/10 rounded-full p-2" />,
    title: "Student Record Management",
    description: (
      <div>
        Keep track of all student records, payments, and documents in one secure place.
      </div>
    ),
    serviceType: "Free"
  },
  {
    icon: <FaWhatsapp className="text-5xl text-success bg-success/10 rounded-full p-2" />,
    title: "Get Direct Booking Queries on WhatsApp/Phone",
    description: (
      <div>
        Receive direct booking queries from students via WhatsApp or phone for instant communication.
      </div>
    ),
    serviceType: "Free"
  },
  {
    icon: <MdCampaign className="text-5xl text-warning bg-warning/10 rounded-full p-2" />,
    title: "Digital Marketing",
    description: (
      <div>
        Boost your hostel's online presence with targeted digital marketing campaigns, social media management, and SEO optimization.
      </div>
    ),
    serviceType: "Paid"
  },
];

function Card({ icon, title, description, serviceType }: { icon: React.ReactNode; title: string; description: React.ReactNode; serviceType: string }) {
  return (
    <div className="card bg-white shadow-md h-full w-full">
      <div className="card-body flex flex-col items-center justify-start h-full">
        <div className="mb-4">{icon}</div>
        <h3 className="card-title text-center text-base font-semibold mb-2">{title}</h3>
        <div className="text-center text-gray-500 text-sm flex-1">{description}</div>
        <div className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${serviceType === "Paid" ? "bg-warning/20 text-warning" : "bg-success/20 text-success"}`}>
          {serviceType}
        </div>
      </div>
    </div>
  );
}

export function SoftwareFeatures() {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 md:px-10 py-10 px-3">
      {features.map((feature, idx) => (
        <div key={idx} className="flex-1  flex min-h-[250px]">
          <Card {...feature} />
        </div>
      ))}
    </div>
  );
}
