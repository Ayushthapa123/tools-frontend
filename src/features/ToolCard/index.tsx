import Link from "next/link";
import React from "react";
import { ToolData } from "src/gql/graphql";

type ToolCardProps = {
  tool: ToolData;
};

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300 cursor-pointer w-full "
    >
      <Link href={`/@${tool.owner?.username}/${tool.slug}`}>
      {tool.thumbnailUrl && (
        <div className="relative h-[300px] overflow-hidden">
          <img
            src={tool.thumbnailUrl}
            alt={tool.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Overlay badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {tool.verifiedBySuperAdmin && (
              <div className="inline-flex items-center gap-1 rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                <span className="text-white">✓</span>
                Verified
              </div>
            )}
          </div>
          {tool.ranking !== null && (
            <div className="absolute top-3 right-3">
              <div className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                <span className="text-white">⭐</span>
                {tool.ranking}
              </div>
            </div>
            )}
          </div>
        )}


      <div className="flex flex-col flex-1 p-5">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {tool.name}
        </h2>

        {/* Short Description */}
        {tool.shortDescription && (
          <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
            {tool.shortDescription}
          </p>
        )}

        {/* Footer: Tool Type and Date */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              {tool.toolType}
            </span>
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              {tool.visibility}
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
      </Link>
    </div>
  );
};

export default ToolCard;
