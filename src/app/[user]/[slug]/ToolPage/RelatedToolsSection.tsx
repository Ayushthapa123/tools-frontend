
import React from 'react'
import { graphqlClient } from 'src/client/graphqlClient';
import { GetRelatedToolsBySlug, ToolStatus, ToolData } from 'src/gql/graphql';
import Link from 'next/link';
import Image from 'next/image';

export default async function RelatedToolsSection({ slug }: { slug: string }) {
  const data: any = await graphqlClient.request(GetRelatedToolsBySlug, { 
    slug, 
    toolStatus: ToolStatus.Published, 
    count: 6 
  });

  const toolData = data?.getRelatedToolsBySlug?.data;

  if (!toolData || toolData.length === 0) {
    return null;
  }

  return (
    <div className='mt-10 w-full'>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolData.map((tool: ToolData) => (
          <Link key={tool.id} href={`/${tool.owner?.username}/${tool.slug}`}>
            <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300 cursor-pointer w-full">
              {tool.thumbnailUrl && (
                <div className="relative h-[200px] overflow-hidden">
                  <Image
                    src={tool.thumbnailUrl}
                    alt={tool.name}
                    fill
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
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                  {tool.name}
                </h3>

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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
