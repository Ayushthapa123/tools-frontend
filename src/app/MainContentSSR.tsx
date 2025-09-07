import { Drawer } from 'src/features/Drawer';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import {
  ListedAiToolData,
  GetAllListedAiToolsQuery,
  GetAllListedAiToolsQueryVariables,
  GetAllListedAiTools,
  GetListedAiToolsByUserType,
  ToolUserType,
  GetListedAiToolsWithHighPopularityScore,
} from 'src/gql/graphql';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useUserStore } from 'src/store/userStore';
import { ThemeProvider } from 'src/features/themes/ThemeProvider';
import { CommonNav } from 'src/features/NavBar/CommonNav';
import { ListedAiToolCardPublic } from 'src/features/ListedAiToolCardPublic';
import { graphqlClient } from 'src/client/graphqlClient';
import { ListedAiToolCardPublicSSR } from 'src/features/ListedAiToolCardPublicSSR';
import Link from 'next/link';

export default async function MainContentSSR({ children }: { children: React.ReactNode }) {
  // Fetch user profile by userId

  const data: any = await graphqlClient.request(GetListedAiToolsWithHighPopularityScore, { pageSize: 6, page: 1 });

  const bestAiTools = data?.getListedAiToolsWithHighPopularityScore;
  console.log('bestAiTools', bestAiTools);

  const businessData: any = await graphqlClient.request(GetListedAiToolsByUserType, {
    pageSize: 3,
    page: 1,
    userType: ToolUserType.BusinessOwner,
  });

  const bestBusinessAiTools = businessData?.getListedAiToolsByUserType;

  const marketingData: any = await graphqlClient.request(GetListedAiToolsByUserType, {
    pageSize: 3,
    page: 1,
    userType: ToolUserType.Marketer,
  });

  const bestMarketingAiTools = marketingData?.getListedAiToolsByUserType;

  const studentData: any = await graphqlClient.request(GetListedAiToolsByUserType, {
    pageSize: 3,
    page: 1,
    userType: ToolUserType.Student,
  });

  const bestStudentAiTools = studentData?.getListedAiToolsByUserType;

  return (
    <ThemeProvider>
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        </div>

        <>
          <div className="relative z-[999] h-[70px] shadow-xl bg-white/90 backdrop-blur-md border-b border-gray-200/50">
            <CommonNav />
          </div>

          <div className="pt-8 w-full p-4 md:p-6 lg:p-8 relative z-10">
            {/* Hero Section */}
            <div className="mb-16 text-center">
              <div className="max-w-5xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-6 py-3 rounded-full border border-blue-200/50 mb-8">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  <span className="text-blue-700 font-medium">Discover the future of AI-powered productivity</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-8 leading-tight">
                  Discover the Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI Tools</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed max-w-4xl mx-auto">
                  Explore thousands of cutting-edge AI tools designed to boost your productivity, 
                  streamline workflows, and unlock new possibilities for business, marketing, and learning.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  <div className="group bg-white/80 backdrop-blur-sm text-gray-800 px-8 py-4 rounded-2xl font-semibold shadow-lg border border-gray-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                    <span className="text-2xl mr-3">🚀</span>
                    10,000+ AI Tools
                  </div>
                  <div className="group bg-white/80 backdrop-blur-sm text-gray-800 px-8 py-4 rounded-2xl font-semibold shadow-lg border border-gray-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                    <span className="text-2xl mr-3">💼</span>
                    Business Focused
                  </div>
                  <div className="group bg-white/80 backdrop-blur-sm text-gray-800 px-8 py-4 rounded-2xl font-semibold shadow-lg border border-gray-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                    <span className="text-2xl mr-3">🎯</span>
                    Expert Curated
                  </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">5K+</div>
                    <div className="text-gray-600 text-sm">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">100+</div>
                    <div className="text-gray-600 text-sm">Categories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">24/7</div>
                    <div className="text-gray-600 text-sm">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-cyan-600 mb-2">99%</div>
                    <div className="text-gray-600 text-sm">Uptime</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Children Content */}
            {children}

            {/* Most Popular AI Tools Section */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 px-4 py-2 rounded-full border border-orange-200/50 mb-6">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span className="text-orange-700 font-medium text-sm">Trending Now</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  Most Popular AI Tools
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                  Discover the most sought-after AI tools that are transforming industries and helping 
                  professionals achieve remarkable results in their daily tasks.
                </p>
              </div>

              <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {bestAiTools?.data?.map((tool: any) => (
                  <div key={tool.id} className="group hover:scale-105 transition-transform duration-300">
                    <ListedAiToolCardPublicSSR tool={tool as ListedAiToolData} />
                  </div>
                ))}
              </div>
            </div>

            {/* Business AI Tools Section */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 px-4 py-2 rounded-full border border-green-200/50 mb-6">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-green-700 font-medium text-sm">Business Solutions</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  Best AI Tools For Business Owners
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                  Streamline operations, enhance decision-making, and scale your business with 
                  AI-powered solutions designed specifically for entrepreneurs and business leaders.
                </p>
              </div>
              
              <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {bestBusinessAiTools?.data?.map((tool: any) => (
                  <div key={tool.id} className="group hover:scale-105 transition-transform duration-300">
                    <ListedAiToolCardPublicSSR tool={tool as ListedAiToolData} />
                  </div>
                ))}
              </div>
            </div>

            {/* Marketing AI Tools Section */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/10 to-rose-500/10 px-4 py-2 rounded-full border border-pink-200/50 mb-6">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span className="text-pink-700 font-medium text-sm">Marketing Excellence</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  Best AI Tools For Marketing
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                  Supercharge your marketing campaigns with AI tools that create compelling content, 
                  optimize campaigns, and deliver data-driven insights for better ROI.
                </p>
              </div>
              
              <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {bestMarketingAiTools?.data?.map((tool: any) => (
                  <div key={tool.id} className="group hover:scale-105 transition-transform duration-300">
                    <ListedAiToolCardPublicSSR tool={tool as ListedAiToolData} />
                  </div>
                ))}
              </div>
            </div>

            {/* Student AI Tools Section */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/10 to-purple-500/10 px-4 py-2 rounded-full border border-violet-200/50 mb-6">
                  <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                  <span className="text-violet-700 font-medium text-sm">Learning & Education</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  Best AI Tools For Students
                </h2>
                <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                  Accelerate your learning journey with AI tools that help with research, 
                  writing, problem-solving, and understanding complex concepts across all subjects.
                </p>
              </div>
              
              <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {bestStudentAiTools?.data?.map((tool: any) => (
                  <div key={tool.id} className="group hover:scale-105 transition-transform duration-300">
                    <ListedAiToolCardPublicSSR tool={tool as ListedAiToolData} />
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action Section */}
            <div className="text-center py-20 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 rounded-3xl mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  Ready to Explore More?
                </h3>
                <p className="text-gray-600 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
                  Discover thousands more AI tools in our comprehensive directory. 
                  Find the perfect solution for your specific needs and take your projects to the next level.
                </p>
                <Link href="/search" className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25">
                  <button>
                  <span className="mr-3">🚀</span>
                  Browse All AI Tools
                  <span className="ml-3 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      </div>
    </ThemeProvider>
  );
}
