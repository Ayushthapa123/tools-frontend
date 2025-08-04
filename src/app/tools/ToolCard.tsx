import React from 'react';
import Link from 'next/link';

interface ToolCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, description, icon, href }) => {
  return (
    <div className="group relative flex flex-col items-start rounded-xl border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-xl min-h-[220px]">
      <div className="mb-4 text-4xl text-primary">{icon}</div>
      <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
      <p className="mb-4 text-gray-600 flex-1">{description}</p>
      {href && (
        <Link href={href} className="mt-auto inline-block rounded-md bg-primary px-4 py-2 text-white font-semibold shadow hover:bg-primary/90 transition">
          Open Tool
        </Link>
      )}
    </div>
  );
};

export default ToolCard; 