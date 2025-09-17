import ToolCard from './ToolCard';
import { FaCalculator, FaGlobe, FaList, FaMapMarkerAlt, FaSearchLocation, FaTools, FaUser } from 'react-icons/fa';

export const metadata = {
  title: 'Custom ai Software Tools',
  description: 'Access useful custom ai software tools for your business, marketing, coding, design, and more.',
  openGraph: {
    title: 'Custom ai Software Tools',
    description: 'Access useful custom ai software tools for your business, marketing, coding, design, and more.',
    images: '/images/software-tools.png',
  },
  authors: [{ name: 'Ayush Thapa' }],
  manifest: '/manifest.json',
};

const tools = [
  {
    title: '.com Domain Name Generator',
    description: 'Generate a .com domain name for your business, blog, or project. Available only.',
    icon: <FaGlobe />,
    href: 'https://www.toolsland.ai/tools/dot-com-domain-generator',
  },
  {
    title: 'Travel Destination Finder',
    description: 'Find the best travel destination for your next trip, based on your preferences, budget, and interests.',
    icon: <FaMapMarkerAlt />,
    href: 'https://www.hostelpilot.com/tools/travel-destination-finder',
  },
  {
    title: 'Travel Budget Calculator',
    description: 'Easily estimate your travel expenses for hostel trips, including transportation, accommodation, food, and more.',
    icon: <FaCalculator />,
    href: 'https://www.hostelpilot.com/tools/travel-budget-calculator',
  },
  {
    title: 'Travel Checklist Generator',
    description: 'Generate a travel checklist for your next trip, based on your preferences, budget, and interests.',
    icon: <FaList />,
    href: 'https://www.hostelpilot.com/tools/checklist-for-travelling',
  },
  {
    title: 'Hostel Searching Tool',
    description: 'Find the best hostels based on your preferences, location, budget, and amenities.',
    icon: <FaSearchLocation />,
    href: 'https://www.hostelpilot.com/search',
  },
  {
    title: 'Hostel Management Software',
    description: 'Get Your Hostel Online and Manage hostel operations efficiently, including bookings, room assignments, and guest records.',
    icon: <FaTools />,
    href: 'https://www.hostelpilot.com',
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
        <h1 className="mb-8 text-3xl font-bold text-center text-primary">AI Tools</h1>
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
