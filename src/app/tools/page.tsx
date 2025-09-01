import ToolCard from './ToolCard';
import { FaCalculator, FaList, FaMapMarkerAlt, FaSearchLocation, FaTools, FaUser } from 'react-icons/fa';

export const metadata = {
  title: 'Online Software Tools For Hostel Travelers',
  description: 'Access useful online software tools for hostel travelers and managers: Travel Budget Calculator, Budget Calculator, Hostel Searching Tool, and Hostel Management Tool etc.',
  openGraph: {
    title: 'Online Software Tools For Hostel Travelers',
    description: 'Access useful online software tools for hostel travelers and managers: Travel Budget Calculator, Budget Calculator, Hostel Searching Tool, and Hostel Management Tool etc.',
    images: '/images/software-tools.png',
  },
  authors: [{ name: 'Ayush Thapa' }],
  manifest: '/manifest.json',
};

const tools = [
  {
    title: 'Travel Destination Finder',
    description: 'Find the best travel destination for your next trip, based on your preferences, budget, and interests.',
    icon: <FaMapMarkerAlt />,
    href: '/tools/travel-destination-finder',
  },
  {
    title: 'Travel Budget Calculator',
    description: 'Easily estimate your travel expenses for hostel trips, including transportation, accommodation, food, and more.',
    icon: <FaCalculator />,
    href: '/tools/travel-budget-calculator',
  },
  {
    title: 'Travel Checklist Generator',
    description: 'Generate a travel checklist for your next trip, based on your preferences, budget, and interests.',
    icon: <FaList />,
    href: '/tools/checklist-for-travelling',
  },
  {
    title: 'Hostel Searching Tool',
    description: 'Find the best hostels based on your preferences, location, budget, and amenities.',
    icon: <FaSearchLocation />,
    href: '/search',
  },
  {
    title: 'Hostel Management Software',
    description: 'Get Your Hostel Online and Manage hostel operations efficiently, including bookings, room assignments, and guest records.',
    icon: <FaTools />,
    href: 'https://hosteladmin.com',
  },
  {
    title: 'Customer Avatar Generator',
    description: 'Generate customer avatar for your startup business to understand your customers better.',
    icon: <FaUser />,
    href: 'https://www.customer-avatar.com',
  },
];

const ToolsPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-3xl font-bold text-center text-primary">Tools For Hostel Travelers</h1>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.title} {...tool} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ToolsPage;
