import Image from 'next/image';
import Link from 'next/link';
import { ToolData } from 'src/gql/graphql';

interface ToolCardProps {
  tool: ToolData;
  username: string;
}

export const ToolCard = ({ tool, username }: ToolCardProps) => {
  const isNew = (() => {
    try {
      const created = new Date(tool.createdAt).getTime();
      const days30 = 30 * 24 * 60 * 60 * 1000;
      return Date.now() - created < days30;
    } catch {
      return false;
    }
  })();

  return (
    <Link href={`/${username}/${tool.slug}`}>
      <div className="group relative flex w-full cursor-pointer gap-3 rounded-3xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:-translate-y-0.5 flex-col">
        {/* Image Section */}
        <div className="relative w-full h-[220px] md:h-[260px] lg:h-[300px] rounded-2xl overflow-hidden">
          <Image 
            src={tool.thumbnailUrl || '/images/default-image.png'} 
            alt={tool.name} 
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {isNew && (
            <span className="absolute left-2 top-2 rounded-full bg-green-600/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
              New
            </span>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-black/0 group-hover:to-black/5 transition-colors duration-300" />
        </div>
        
        {/* Content Section */}
        <div className="flex-grow flex flex-col">
          <div className="mt-1">
            <h3 className="card-title line-clamp-1 text-2xl md:text-3xl text-primary transition-colors duration-200 group-hover:text-blue-600">
              {tool.name}
            </h3>
            
            {tool.shortDescription && (
              <div className="my-3">
                <p className="line-clamp-2 text-sm md:text-base text-gray-600">
                  {tool.shortDescription}
                </p>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="mt-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                AI Tool
              </span>
              {isNew && (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                  Just added
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-xs text-gray-400">
                {new Date(tool.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white transition-colors duration-200 group-hover:bg-blue-700">
                View details →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
