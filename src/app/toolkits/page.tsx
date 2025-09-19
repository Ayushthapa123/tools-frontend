import ToolCard from './ToolKitCard';
import { 
  FaGlobe, 
  FaSearch, 
  FaChartLine, 
  FaKeyboard, 
  FaLink, 
  FaRocket,
  FaShareAlt,
  FaDollarSign,
  FaPenFancy,
  FaRocket as FaStartup,
  FaUserTie,
  FaCode
} from 'react-icons/fa';

export const metadata = {
  title: 'Toolkits - Professional Tools Collection',
  description: 'Access a collection of professional tools and toolkits to enhance your productivity and workflow.',
  openGraph: {
    title: 'Toolkits - Professional Tools Collection',
    description: 'Access a collection of professional tools and toolkits to enhance your productivity and workflow.',
  },
  authors: [{ name: 'Ayush Thapa' }],
  manifest: '/manifest.json',
};

const toolkits = [
  {
    title: 'SEO Toolkit',
    description: 'Complete SEO tools including keyword research, content analysis, and optimization tools.',
    icon: <FaSearch />,
    href: '/toolkits/seo-toolkits',
    category: 'SEO',
  },
  {
    title: 'Social Media Toolkit',
    description: 'Tools for social media management, content creation, and analytics.',
    icon: <FaShareAlt />,
    href: '#',
    category: 'Social Media',
    comingSoon: true,
  },
  {
    title: 'Affiliate Marketing Toolkit',
    description: 'Tools for affiliate marketing, link tracking, and commission optimization.',
    icon: <FaDollarSign />,
    href: '#',
    category: 'Affiliate',
    comingSoon: true,
  },
  {
    title: 'Blogger Toolkit',
    description: 'Content creation, SEO, and monetization tools for bloggers.',
    icon: <FaPenFancy />,
    href: '#',
    category: 'Blogging',
    comingSoon: true,
  },
  {
    title: 'Startup Toolkit',
    description: 'Essential tools for startups including business planning and growth tracking.',
    icon: <FaStartup />,
    href: '#',
    category: 'Startup',
    comingSoon: true,
  },
  {
    title: 'Freelancer Toolkit',
    description: 'Client management, invoicing, and productivity tools for freelancers.',
    icon: <FaUserTie />,
    href: '#',
    category: 'Freelancing',
    comingSoon: true,
  },
  {
    title: 'App Development Toolkit',
    description: 'Development tools, testing utilities, and deployment resources.',
    icon: <FaCode />,
    href: '#',
    category: 'Development',
    comingSoon: true,
  },
];

const ToolsPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Toolkits</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A collection of professional tools and toolkits to enhance your productivity and workflow.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {toolkits.map((tool) => (
            <ToolCard key={tool.title} {...tool} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ToolsPage;
