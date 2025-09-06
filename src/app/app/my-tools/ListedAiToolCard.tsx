import { ListedAiToolData } from 'src/gql/graphql';
import Image from 'next/image';
import Link from 'next/link';

interface Iprops {
  tool: ListedAiToolData;
}

export const ListedAiToolCard = (props: Iprops) => {
  const { tool } = props;

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'WEB':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        );
      case 'MOBILE':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'DESKTOP':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Header with Logo and Title */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={tool?.logoUrl || '/default-image.png'}
              alt={tool?.name || 'AI Tool Logo'}
              fill
              className="object-cover rounded-lg border border-gray-200"
            />
            {tool?.featured && (
              <div className="absolute -top-2 -right-2">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                  ⭐ Featured
                </div>
              </div>
            )}
          </div>

          {/* Title and Basic Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {tool?.name || 'Unnamed Tool'}
              </h2>
              {tool?.verified && (
                <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Verified
                </div>
              )}
            </div>
            
            {/* Primary Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {tool?.pricingType?.map((pricing, index) => (
                <span key={index} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium border border-blue-200">
                  {pricing}
                </span>
              ))}
              {tool?.aiType?.slice(0, 2).map((type, index) => (
                <span key={index} className="bg-purple-50 text-purple-700 text-xs px-3 py-1 rounded-full font-medium border border-purple-200">
                  {type.replace(/_/g, ' ')}
                </span>
              ))}
            </div>

            {/* Popularity Score */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-semibold text-yellow-700">
                  {tool?.popularityScore || 0} Popularity
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {tool?.shortDescription && (
          <div className="mt-4">
            <p className="text-gray-600 text-sm leading-relaxed">
              {truncateText(tool.shortDescription, 250)}
            </p>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mx-6"></div>

      {/* Information Grid */}
      <div className="p-6 pt-4 space-y-5">
        {/* Platforms and Delivery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Platforms */}
          {tool?.platforms && tool.platforms.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Platforms
              </h4>
              <div className="flex flex-wrap gap-2">
                {tool.platforms.map((platform, index) => (
                  <div key={index} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-200">
                    {getPlatformIcon(platform)}
                    <span className="font-medium">{platform}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Delivery */}
          {tool?.delivery && tool.delivery.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Delivery
              </h4>
              <div className="flex flex-wrap gap-2">
                {tool.delivery.map((delivery, index) => (
                  <span key={index} className="bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-full font-medium border border-indigo-200">
                    {delivery}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Domains and Modalities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Domains */}
          {tool?.domains && tool.domains.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Domains
              </h4>
              <div className="flex flex-wrap gap-2">
                {tool.domains.slice(0, 4).map((domain, index) => (
                  <span key={index} className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1 rounded-full font-medium border border-emerald-200">
                    {domain.replace(/_/g, ' ')}
                  </span>
                ))}
                {tool.domains.length > 4 && (
                  <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
                    +{tool.domains.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Modalities */}
          {tool?.modalities && tool.modalities.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                </svg>
                Modalities
              </h4>
              <div className="flex flex-wrap gap-2">
                {tool.modalities.slice(0, 3).map((modality, index) => (
                  <span key={index} className="bg-rose-50 text-rose-700 text-xs px-3 py-1 rounded-full font-medium border border-rose-200">
                    {modality}
                  </span>
                ))}
                {tool.modalities.length > 3 && (
                  <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
                    +{tool.modalities.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Use Cases and User Types */}
        {((tool?.useCases && tool.useCases.length > 0) || (tool?.toolUserTypes && tool.toolUserTypes.length > 0)) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Use Cases */}
            {tool?.useCases && tool.useCases.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Use Cases
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tool.useCases.slice(0, 3).map((useCase, index) => (
                    <span key={index} className="bg-cyan-50 text-cyan-700 text-xs px-3 py-1 rounded-full font-medium border border-cyan-200">
                      {useCase}
                    </span>
                  ))}
                  {tool.useCases.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
                      +{tool.useCases.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* User Types */}
            {tool?.toolUserTypes && tool.toolUserTypes.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  Target Users
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tool.toolUserTypes.slice(0, 3).map((userType, index) => (
                    <span key={index} className="bg-violet-50 text-violet-700 text-xs px-3 py-1 rounded-full font-medium border border-violet-200">
                      {userType.replace(/_/g, ' ')}
                    </span>
                  ))}
                  {tool.toolUserTypes.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
                      +{tool.toolUserTypes.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* AI Capabilities */}
        {tool?.aiCapabilities && tool.aiCapabilities.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              AI Capabilities
            </h4>
            <div className="flex flex-wrap gap-2">
              {tool.aiCapabilities.slice(0, 5).map((capability, index) => (
                <span key={index} className="bg-orange-50 text-orange-700 text-xs px-3 py-1 rounded-full font-medium border border-orange-200">
                  {capability.replace(/_/g, ' ')}
                </span>
              ))}
              {tool.aiCapabilities.length > 5 && (
                <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
                  +{tool.aiCapabilities.length - 5} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Integration Options */}
        {tool?.integrationOptions && tool.integrationOptions.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-.758l1.102-1.101a4 4 0 00-5.656-5.656l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
              </svg>
              Integrations
            </h4>
            <div className="flex flex-wrap gap-2">
              {tool.integrationOptions.slice(0, 6).map((integration, index) => (
                <span key={index} className="bg-teal-50 text-teal-700 text-xs px-3 py-1 rounded-full font-medium border border-teal-200">
                  {integration.replace(/_/g, ' ')}
                </span>
              ))}
              {tool.integrationOptions.length > 6 && (
                <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
                  +{tool.integrationOptions.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Keywords */}
        {tool?.keywords && tool.keywords.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 11h.01m7-4h.01m7 4h.01m-7 4h.01m7-4h.01m-7 4h.01m7-4h.01" />
              </svg>
              Keywords
            </h4>
            <div className="flex flex-wrap gap-2">
              {tool.keywords.slice(0, 8).map((keyword, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                  #{keyword}
                </span>
              ))}
              {tool.keywords.length > 8 && (
                <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
                  +{tool.keywords.length - 8} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex  gap-2">
          {/* Website Link */}
          {tool?.websiteUrl && (
            <a 
              href={tool.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700  text-sm px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Visit Website
            </a>
          )}
             
            <Link
              href={`/app/my-tools/${tool.slug}`} 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700  text-sm px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Edit
            </Link>
          
          </div>

          {/* Timestamps */}
          <div className="flex gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Created: {formatDate(tool?.createdAt || '')}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Updated: {formatDate(tool?.updatedAt || '')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
