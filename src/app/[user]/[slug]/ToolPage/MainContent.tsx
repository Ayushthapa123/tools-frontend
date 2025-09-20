import { CiLocationOn } from 'react-icons/ci';
import { Tool, ToolType } from 'src/gql/graphql';

import { Badge } from 'src/components/Badge';
import Image from 'next/image';
import { ToolCreateAndTestForm } from 'src/app/app/tool/[slug]/ToolCreateAndTestForm';
import { ToolExecuteForm } from 'src/app/app/tool/[slug]/ToolExecuteForm';
import { FaBookmark } from 'react-icons/fa';
import CommentSection from './CommentSection';

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
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Tool Not Found</h2>
            <p className="text-gray-600">
              The requested tool could not be loaded or does not exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleBookmark = () => {
  // will add to bookmark
  }

  return (
    <div className=" pb-4">
      <div className="">
        <div className="box-border w-full lg:flex lg:gap-8">
          <div className="box-border flex-grow overflow-x-hidden overflow-y-hidden rounded-xl ">
            <div className="mb-2">
              <div className="mb-10  p-5 ">
                <div className=" mx-auto max-w-4xl">
            
                  <div className="flex items-start justify-between">
                    {/* <div>
                      <h1 className="text-center text-5xl  font-bold text-primary">
                        {toolData?.name}
                      </h1>

                      {toolData?.shortDescription && (
                        <p className="mt-3 text-center  text-lg text-gray-500">
                          {toolData.shortDescription}
                        </p>
                      )}
                    </div> */}
                  </div>
                </div>
                <div className="">
                  <ToolExecuteForm isEdit={true} tool={tool} viewOnly={true} />
                </div>
              </div>
              {/* Description section */}
              <div className="mt-10 rounded-xl rounded-t-none border-t-2 border-gray-100 bg-white/70 pt-1">
                {/* <h2 className="text-2xl font-semibold text-gray-800">Description</h2> */}
                <div className="prose mx-auto max-w-6xl p-3 ">
                  <div dangerouslySetInnerHTML={{ __html: toolData?.description ?? '' }} />
                </div>
              </div>

              {/* AI Model Information */}
              <div className="mx-auto mt-4 max-w-6xl rounded-xl rounded-t-none border-t-2 border-gray-100 bg-white/70 pt-1">
                <h2 className="text-2xl font-semibold text-gray-800">AI Model Details</h2>
                <div className="from-blue-50 border-blue-200 mt-3 rounded-lg border bg-gradient-to-r to-purple-50 p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="from-blue-500 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r to-purple-600 text-white">
                      <span className="text-lg font-bold text-white">🤖</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Gemini 2.5 Flash</h3>
                      <p className="text-sm text-gray-600">
                        Powered by Google&apos;s latest AI model
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-500 h-2 w-2 rounded-full"></span>
                        <span className="font-medium text-gray-700">Model Version:</span>
                        <span className="text-blue-600">2.5 Flash</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-green-500 h-2 w-2 rounded-full"></span>
                        <span className="font-medium text-gray-700">Provider:</span>
                        <span className="text-green-600">Google AI</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                        <span className="font-medium text-gray-700">Capabilities:</span>
                        <span className="text-purple-600">Advanced reasoning</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                        <span className="font-medium text-gray-700">Performance:</span>
                        <span className="text-amber-600">High-speed processing</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 rounded border border-gray-200 bg-white p-3">
                    <p className="text-xs leading-relaxed text-gray-600">
                      This tool leverages Gemini 2.5 Flash, Google&apos;s most advanced AI model,
                      providing fast, accurate, and contextually aware responses for enhanced user
                      experience.
                    </p>
                  </div>
                </div>
              </div>
              <div className='mx-auto max-w-6xl mt-10'>
                {/* comments section */}
                <CommentSection comments={toolData?.comment || undefined} toolId={Number(toolData?.id ?? 0)} toolType={toolData?.toolType ?? ToolType.Io} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
