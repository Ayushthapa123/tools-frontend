import Image from 'next/image';
import Link from 'next/link';
import { ToolData } from 'src/gql/graphql';

interface ToolCardProps {
  tool: ToolData;
  username: string;
}

export const ToolCard = ({ tool, username }: ToolCardProps) => {
  return (
    <Link href={`/${username}/${tool.slug}`}>
      <div className="group relative flex h-[230px] w-full cursor-pointer gap-4 rounded-3xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300">
        {/* Image Section */}
        <div className="relative h-full w-[350px] rounded-3xl overflow-hidden">
          <Image 
            src={tool.thumbnailUrl || '/images/default-image.png'} 
            alt={tool.name} 
            fill 
            className="object-cover transition-transform duration-300 group-hover:scale-105" 
          />
        </div>
        
        {/* Content Section */}
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <h3 className="card-title line-clamp-1 text-3xl text-primary group-hover:text-blue-600 transition-colors duration-200">
              {tool.name}
            </h3>
            
            {tool.shortDescription && (
              <div className="my-3">
                <p className="line-clamp-2 text-sm text-gray-600">
                  {tool.shortDescription}
                </p>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                AI Tool
              </span>
            </div>
            <span className="text-xs text-gray-400">
              {new Date(tool.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
