import React from 'react';
import Link from 'next/link';

interface ToolCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
  category?: string;
  comingSoon?: boolean;
}

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    'SEO': 'bg-green-100 text-green-800',
    'Social Media': 'bg-blue-100 text-blue-800',
    'Affiliate': 'bg-purple-100 text-purple-800',
    'Blogging': 'bg-orange-100 text-orange-800',
    'Startup': 'bg-indigo-100 text-indigo-800',
    'Freelancing': 'bg-pink-100 text-pink-800',
    'Development': 'bg-gray-100 text-gray-800',
  };
  return colors[category] || 'bg-blue-100 text-blue-800';
};

const ToolCard: React.FC<ToolCardProps> = ({ title, description, icon, href, category, comingSoon }) => {
  return (
    <div className={`group relative flex flex-col items-start rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-md transition hover:shadow-xl min-h-[200px] sm:min-h-[240px] ${
      comingSoon ? 'opacity-75' : ''
    }`}>
      <div className={`mb-3 sm:mb-4 text-3xl sm:text-4xl ${comingSoon ? 'text-gray-400' : 'text-primary'}`}>
        {icon}
      </div>
      {category && (
        <div className={`mb-2 inline-flex items-center px-2 sm:px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(category)}`}>
          {category}
        </div>
      )}
      <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-bold text-gray-900">{title}</h3>
      <p className="mb-3 sm:mb-4 text-sm sm:text-base text-gray-600 flex-1 leading-relaxed">{description}</p>
      {href && !comingSoon && (
        <Link href={href} target="_blank" className="mt-auto inline-block rounded-md bg-primary px-3 sm:px-4 py-2 text-white font-semibold shadow hover:bg-primary/90 transition text-sm sm:text-base">
          Open Toolkit
        </Link>
      )}
      {comingSoon && (
        <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <div className="inline-block rounded-md bg-yellow-100 px-2 sm:px-3 py-1 text-yellow-800 text-xs font-medium">
            Coming Soon
          </div>
          <div className="inline-block rounded-md bg-gray-200 px-3 sm:px-4 py-2 text-gray-500 font-semibold cursor-not-allowed text-xs sm:text-sm">
            Not Available
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolCard; 