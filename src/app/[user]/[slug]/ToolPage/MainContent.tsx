import { CiLocationOn } from 'react-icons/ci';
import { Tool } from 'src/gql/graphql';

import { Badge } from 'src/components/Badge';
import Image from 'next/image';
import { ToolCreateAndTestForm } from 'src/app/app/tool/[slug]/ToolCreateAndTestForm';

interface Iprops {
  tool: Tool | undefined | null;
}

export default function MainContent(props: Iprops) {
  const { tool } = props;

  // Tool data
  const toolData = tool?.data;

  // Handle case where tool data is not available
  if (!tool || !toolData) {
    return (
      <div className="bg-gray-50 pb-4">
        <div className="container mx-auto">
          <div className="rounded-xl bg-white p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tool Not Found</h2>
            <p className="text-gray-600">The requested tool could not be loaded or does not exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 pb-4">
      <div className="container mx-auto">
        <div className="box-border w-full lg:flex lg:gap-8 lg:px-10">
          <div className="box-border flex-grow overflow-x-hidden overflow-y-hidden rounded-xl bg-white p-3 shadow-sm md:p-4 md:px-4">
            <div className="mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{toolData?.name}</h1>
                  <div className="mt-2 flex items-center text-gray-600">
                    <CiLocationOn className="mr-1 text-2xl text-secondary" />
                    <span className="text-lg">
                      Created by {toolData?.owner?.fullName || toolData?.owner?.username || 'Unknown'}
                    </span>
                  </div>
                  {toolData?.shortDescription && (
                    <p className="mt-3 text-lg text-gray-600">{toolData.shortDescription}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-2">


         

              {/* Tool Type and Visibility */}
              <div className="mt-4 rounded-xl rounded-t-none border-t-2 border-gray-100 bg-white/70 pt-1">
                <div className="flex flex-wrap gap-3 mt-3">
                  <Badge className="bg-blue-500 text-white">
                    Type: {toolData?.toolType || 'N/A'}
                  </Badge>
                  <Badge className="bg-green-500 text-white">
                    Visibility: {toolData?.visibility || 'N/A'}
                  </Badge>
              
                  {toolData?.verifiedBySuperAdmin && (
                    <Badge className="bg-green-600 text-white">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
              </div>
              <div>
                <ToolCreateAndTestForm isEdit={true} tool={tool} viewOnly={true} />
                </div>
                     {/* Description section */}
              <div className="rounded-xl rounded-t-none border-t-2 border-gray-100 bg-white/70 pt-1">
                <h2 className="text-2xl font-semibold text-gray-800">Description</h2>
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: toolData?.description ?? '' }} />
                </div>
              </div>

              {/* AI Model Information */}
              <div className="mt-4 rounded-xl rounded-t-none border-t-2 border-gray-100 bg-white/70 pt-1">
                <h2 className="text-2xl font-semibold text-gray-800">AI Model Details</h2>
                <div className="mt-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white flex h-12 w-12 items-center justify-center rounded-full">
                      <span className="text-white font-bold text-lg">🤖</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Gemini 2.5 Flash</h3>
                      <p className="text-sm text-gray-600">Powered by Google&apos;s latest AI model</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span className="font-medium text-gray-700">Model Version:</span>
                        <span className="text-blue-600">2.5 Flash</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="font-medium text-gray-700">Provider:</span>
                        <span className="text-green-600">Google AI</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span className="font-medium text-gray-700">Capabilities:</span>
                        <span className="text-purple-600">Advanced reasoning</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                        <span className="font-medium text-gray-700">Performance:</span>
                        <span className="text-amber-600">High-speed processing</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      This tool leverages Gemini 2.5 Flash, Google&apos;s most advanced AI model, 
                      providing fast, accurate, and contextually aware responses for enhanced user experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sticky top-[100px] m-3 lg:m-0 lg:min-w-[380px] lg:max-w-[380px]">
            <div className="space-y-6">
              
              {/* Tool Owner Information */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 border-b border-gray-200 pb-2 text-lg font-semibold text-gray-800">
                  Tool Owner
                </h3>
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {toolData?.owner?.fullName || toolData?.owner?.username || 'Unknown Owner'}
                    </h4>
                    <p className="text-sm text-gray-600">{toolData?.owner?.email}</p>
                    {toolData?.owner?.isVerified && (
                      <Badge className="bg-green-500 text-white text-xs mt-1">
                        ✓ Verified User
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Tool Usage */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 border-b border-gray-200 pb-2 text-lg font-semibold text-gray-800">
                  Tool Usage
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 text-blue-600 flex h-10 w-10 items-center justify-center rounded-full">
                      <span className="text-blue-700 font-bold">📊</span>
                    </div>
                    <div>
                      <div className="text-gray-700 font-medium">Input Schema</div>
                      <div className="text-blue-700 text-sm">
                        {toolData?.inputSchema ? 'Available' : 'Not configured'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-50 text-green-600 flex h-10 w-10 items-center justify-center rounded-full">
                      <span className="text-green-700 font-bold">⚡</span>
                    </div>
                    <div>
                      <div className="text-gray-700 font-medium">Output Schema</div>
                      <div className="text-green-700 text-sm">
                        {toolData?.outputSchema ? 'Available' : 'Not configured'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tool Details */}
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 border-b border-gray-200 pb-2 text-lg font-semibold text-gray-800">
                  Tool Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 text-blue-600 flex h-10 w-10 items-center justify-center rounded-full">
                      <span className="text-blue-700 font-bold">📅</span>
                    </div>
                    <div>
                      <div className="text-gray-700 font-medium">Created</div>
                      <div className="text-blue-700 text-sm">
                        {toolData?.createdAt ? new Date(toolData.createdAt).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-50 text-green-600 flex h-10 w-10 items-center justify-center rounded-full">
                      <span className="text-green-700 font-bold">🔄</span>
                    </div>
                    <div>
                      <div className="text-gray-700 font-medium">Last Updated</div>
                      <div className="text-green-700 text-sm">
                        {toolData?.updatedAt ? new Date(toolData.updatedAt).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

       
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
