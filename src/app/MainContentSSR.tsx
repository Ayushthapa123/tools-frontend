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
  AiCapability,
} from 'src/gql/graphql';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useUserStore } from 'src/store/userStore';
import { ThemeProvider } from 'src/features/themes/ThemeProvider';
import { CommonNav } from 'src/features/NavBar/CommonNav';
import { ListedAiToolCardPublic } from 'src/features/ListedAiToolCardPublic';
import { graphqlClient } from 'src/client/graphqlClient';
import { ListedAiToolCardPublicSSR } from 'src/features/ListedAiToolCardPublicSSR';
import Link from 'next/link';
import EnumLister from 'src/features/EnumLister';
import { enumToOptions } from 'src/utils/enumToArray';

export default async function MainContentSSR({ children }: { children: React.ReactNode }) {
  // Fetch user profile by userId

  const data: any = await graphqlClient.request(GetListedAiToolsWithHighPopularityScore, {
    pageSize: 6,
    page: 1,
  });

  const bestAiTools = data?.getListedAiToolsWithHighPopularityScore;

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
      <div className="via-blue-50 relative min-h-screen w-full bg-gradient-to-br from-slate-50 to-indigo-50 ">
        {/* Background decorative elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="from-blue-400/20 absolute -right-40 -top-40 h-80 w-80 rounded-full bg-gradient-to-br to-purple-400/20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 blur-3xl"></div>
          <div className="to-blue-400/10 absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-cyan-400/10 blur-3xl"></div>
        </div>

        <>
          <div className="relative  h-[70px] border-b border-gray-200/50 bg-white/90 shadow-xl backdrop-blur-md">
            <CommonNav />
          </div>

          <div className="relative z-10 w-full p-4 pt-8 md:p-6 lg:p-8">
            {/* Hero Section */}
            <div className="mb-16 text-center">
              <div className="mx-auto max-w-5xl">
                <div className="from-blue-600/10 border-blue-200/50 mb-8 inline-flex items-center gap-2 rounded-full border bg-gradient-to-r to-purple-600/10 px-6 py-3">
                  <span className="bg-blue-500 h-2 w-2 animate-pulse rounded-full"></span>
                  <span className="text-blue-700 font-medium">
                    Discover the future of AI-powered productivity
                  </span>
                </div>

                <h1 className="via-blue-800 mb-8 bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-5xl font-black leading-tight text-transparent md:text-7xl">
                  Discover the Best{' '}
                  <span className="from-blue-600 bg-gradient-to-r to-purple-600 bg-clip-text text-transparent">
                    AI Tools
                  </span>
                </h1>

                <p className="mx-auto mb-10 max-w-4xl text-xl leading-relaxed text-gray-700 md:text-2xl">
                  Explore thousands of cutting-edge AI tools designed to boost your productivity,
                  streamline workflows, and unlock new possibilities for business, marketing, and
                  learning - toolsland AI.
                </p>

                <div className="mb-12 flex flex-wrap justify-center gap-4">
                  <div className="group cursor-pointer rounded-2xl border border-gray-200/50 bg-white/80 px-8 py-4 font-semibold text-gray-800 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <span className="mr-3 text-2xl">🚀</span>
                    10,000+ AI Tools
                  </div>
                  <div className="group cursor-pointer rounded-2xl border border-gray-200/50 bg-white/80 px-8 py-4 font-semibold text-gray-800 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <span className="mr-3 text-2xl">💼</span>
                    Business Focused
                  </div>
                  <div className="group cursor-pointer rounded-2xl border border-gray-200/50 bg-white/80 px-8 py-4 font-semibold text-gray-800 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <span className="mr-3 text-2xl">🎯</span>
                    Expert Curated
                  </div>
                </div>

                {/* Stats Section */}
                <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
                  <div className="text-center">
                    <div className="text-blue-600 mb-2 text-3xl font-bold md:text-4xl">5K+</div>
                    <div className="text-sm text-gray-600">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-2 text-3xl font-bold text-purple-600 md:text-4xl">100+</div>
                    <div className="text-sm text-gray-600">Categories</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-2 text-3xl font-bold text-indigo-600 md:text-4xl">24/7</div>
                    <div className="text-sm text-gray-600">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-2 text-3xl font-bold text-cyan-600 md:text-4xl">99%</div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Children Content */}
            {children}

            {/* Most Popular AI Tools Section */}
            <div className="mb-20">
              <div className="mb-12 text-center">
                <div className="to-red-500/10 mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200/50 bg-gradient-to-r from-orange-500/10 px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-orange-500"></span>
                  <span className="text-sm font-medium text-orange-700">Trending Now</span>
                </div>
                <h2 className="mb-6 text-4xl font-bold text-gray-800 md:text-5xl">
                  Most Popular AI Tools
                </h2>
                <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
                  Discover the most sought-after AI tools that are transforming industries and
                  helping professionals achieve remarkable results in their daily tasks.
                </p>
              </div>

              <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {bestAiTools?.data?.map((tool: any) => (
                  <div
                    key={tool.id}
                    className="group transition-transform duration-300 hover:scale-105">
                    <ListedAiToolCardPublicSSR tool={tool as ListedAiToolData} />
                  </div>
                ))}
              </div>
            </div>

            {/* Business AI Tools Section */}
            <div className="mb-20">
              <div className="mb-12 text-center">
                <div className="from-green-500/10 border-green-200/50 mb-6 inline-flex items-center gap-2 rounded-full border bg-gradient-to-r to-emerald-500/10 px-4 py-2">
                  <span className="bg-green-500 h-2 w-2 rounded-full"></span>
                  <span className="text-green-700 text-sm font-medium">Business Solutions</span>
                </div>
                <h2 className="mb-6 text-4xl font-bold text-gray-800 md:text-5xl">
                  Best AI Tools For Business Owners
                </h2>
                <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
                  Streamline operations, enhance decision-making, and scale your business with
                  AI-powered solutions designed specifically for entrepreneurs and business leaders.
                </p>
              </div>

              <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {bestBusinessAiTools?.data?.map((tool: any) => (
                  <div
                    key={tool.id}
                    className="group transition-transform duration-300 hover:scale-105">
                    <ListedAiToolCardPublicSSR tool={tool as ListedAiToolData} />
                  </div>
                ))}
              </div>
            </div>

            {/* Marketing AI Tools Section */}
            <div className="mb-20">
              <div className="mb-12 text-center">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-200/50 bg-gradient-to-r from-pink-500/10 to-rose-500/10 px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-pink-500"></span>
                  <span className="text-sm font-medium text-pink-700">Marketing Excellence</span>
                </div>
                <h2 className="mb-6 text-4xl font-bold text-gray-800 md:text-5xl">
                  Best AI Tools For Marketing
                </h2>
                <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
                  Supercharge your marketing campaigns with AI tools that create compelling content,
                  optimize campaigns, and deliver data-driven insights for better ROI.
                </p>
              </div>

              <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {bestMarketingAiTools?.data?.map((tool: any) => (
                  <div
                    key={tool.id}
                    className="group transition-transform duration-300 hover:scale-105">
                    <ListedAiToolCardPublicSSR tool={tool as ListedAiToolData} />
                  </div>
                ))}
              </div>
            </div>

            {/* Student AI Tools Section */}
            <div className="mb-20">
              <div className="mb-12 text-center">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200/50 bg-gradient-to-r from-violet-500/10 to-purple-500/10 px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-violet-500"></span>
                  <span className="text-sm font-medium text-violet-700">Learning & Education</span>
                </div>
                <h2 className="mb-6 text-4xl font-bold text-gray-800 md:text-5xl">
                  Best AI Tools For Students
                </h2>
                <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
                  Accelerate your learning journey with AI tools that help with research, writing,
                  problem-solving, and understanding complex concepts across all subjects.
                </p>
              </div>

              <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {bestStudentAiTools?.data?.map((tool: any) => (
                  <div
                    key={tool.id}
                    className="group transition-transform duration-300 hover:scale-105">
                    <ListedAiToolCardPublicSSR tool={tool as ListedAiToolData} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <EnumLister enums={enumToOptions(ToolUserType)} />
            </div>

            {/* Call to Action Section */}
            <div className="from-blue-600/10 relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r via-purple-600/10 to-indigo-600/10 py-20 text-center">
              <div className="from-blue-500/5 absolute inset-0 bg-gradient-to-r to-purple-500/5"></div>
              <div className="relative z-10">
                <h3 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">
                  Ready to Explore More?
                </h3>
                <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-600">
                  Discover thousands more AI tools in our comprehensive directory. Find the perfect
                  solution for your specific needs and take your projects to the next level.
                </p>
                <Link
                  href="/search"
                  className="from-blue-600 hover:from-blue-700 hover:shadow-blue-500/25 group transform rounded-2xl bg-gradient-to-r to-purple-600 px-10 py-5 text-xl font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:to-purple-700">
                  <button>
                    <span className="mr-3">🚀</span>
                    Browse All AI Tools
                    <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
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
