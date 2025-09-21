import ToolCard from '../ToolKitCard';
import { FaGlobe, FaSearch, FaChartLine, FaKeyboard, FaLink, FaRocket } from 'react-icons/fa';
import Link from 'next/link';
import { CommonNav } from 'src/features/NavBar/CommonNav';
import Footer from 'src/features/Footer';

export const metadata = {
  title: 'SEO Toolkits – Best Free SEO Toolkits for 2025 | ToolsLand',
  description:
    'Explore the best SEO toolkits to generate images,research keywords, optimize content, generate meta tags, check backlinks, and improve rankings. Free, fast, and easy SEO tools.',
  keywords: [
    'seo toolkits',
    'seo toolkit',
    'free seo tools',
    'keyword research tools',
    'seo content optimizer',
    'meta tags generator',
    'backlink checker',
    'technical seo tools',
  ],
  alternates: {
    canonical: 'https://toolsland.ai/toolkits/seo-toolkits',
  },
  openGraph: {
    title: 'SEO Toolkits – Free & Powerful SEO Tools | ToolsLand',
    description:
      'Boost your organic traffic with our SEO toolkits: keyword research, content analysis, meta tags generator, backlink checker, and more.',
    url: 'https://toolsland.ai/toolkits/seo-toolkits',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Toolkits – Free & Powerful SEO Tools | ToolsLand',
    description:
      'All-in-one SEO toolkits to plan keywords, optimize content, and grow rankings.',
  },
  authors: [{ name: 'Ayush Thapa' }],
  manifest: '/manifest.json',
};

const seoToolkits = [
  {
    title: 'OG Image Generator',
    description: 'Generate professional OG images for your website.',
    icon: <FaGlobe />,
    href: 'https://www.toolsland.ai/aitools/og-image-generator',
    category: 'SEO',
  },
  // HERE ADD MORE LIKE  FAQ GENERATOR,AI THUMBNAIL GENERATOR,  AI META TAGS GENERATOR, AI BLOG OUTLINE GENERATOR
  {
    title: 'FAQ Generator',
    description: 'Create SEO-friendly FAQ content and JSON-LD schema markup for rich results.',
    icon: <FaKeyboard />,
    href: 'https://www.toolsland.ai/aitools/ai-faq-generator',
    category: 'SEO',
  },
  {
    title: 'AI Thumbnail Generator',
    description: 'Generate eye-catching blog and social thumbnails optimized for CTR.',
    icon: <FaRocket />,
    href: 'https://www.toolsland.ai/aitools/ai-thumbnail-generator',
    category: 'SEO',
  },
  {
    title: 'AI Meta Tags Generator',
    description: 'Instantly generate SEO titles and meta descriptions aligned with search intent.',
    icon: <FaKeyboard />,
    href: 'https://www.toolsland.ai/aitools/meta-tag-generator-ai',
    category: 'On-Page SEO',
  },
  {
    title: 'AI Blog Outline Generator',
    description: 'Create comprehensive, SEO-optimized outlines based on a target keyword.',
    icon: <FaChartLine />,
    href: 'https://www.toolsland.ai/aitools/ai-blog-outline-generator',
    category: 'Content Optimization',
  },
  {
    title: 'Keyword Research Tool',
    description: 'Discover high-value keywords for your content strategy and improve your search engine rankings.',
    icon: <FaSearch />,
    href: '#',
    category: 'Keyword Research',
    comingSoon: true,
  },
  {
    title: 'SEO Content Analyzer',
    description: 'Analyze your content for SEO optimization opportunities and get actionable improvement suggestions.',
    icon: <FaChartLine />,
    href: '#',
    category: 'Content Optimization',
    comingSoon: true,
  },
  {
    title: 'Meta Tags Generator',
    description: 'Generate optimized meta titles and descriptions for better search engine visibility.',
    icon: <FaKeyboard />,
    href: '#',
    category: 'On-Page SEO',
    comingSoon: true,
  },
  {
    title: 'Backlink Checker',
    description: 'Analyze your backlink profile and discover new link building opportunities.',
    icon: <FaLink />,
    href: '#',
    category: 'Link Building',
    comingSoon: true,
  },
  {
    title: 'Site Speed Optimizer',
    description: 'Optimize your website speed for better user experience and search rankings.',
    icon: <FaRocket />,
    href: '#',
    category: 'Technical SEO',
    comingSoon: true,
  },
];

const categoryCounts = seoToolkits.reduce((acc: Record<string, number>, tool) => {
  const key = tool.category || 'Other';
  acc[key] = (acc[key] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const categories = [
  { name: 'All', count: seoToolkits.length, active: true },
  ...Object.entries(categoryCounts).map(([name, count]) => ({ name, count, active: false })),
];

const ToolsPage = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are SEO toolkits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'It is a collections of tools that help you research keywords, optimize content, generate meta tags, analyze backlinks, and improve search rankings.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are these SEO toolkits free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Yes, many of our these toolkits are free to use. Some advanced features may be added over time.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who should use an SEO toolkit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Bloggers, marketers, startups, and developers who want to improve organic traffic and on-page SEO should use an SEO toolkit.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I choose the right keywords?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Focus on search intent, difficulty, and potential traffic. Start with long-tail keywords, then expand to broader terms as your site gains authority.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need structured data for SEO?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Structured data (schema) helps search engines understand your content and can enable rich results. Use FAQ, Article, and Breadcrumb schema where relevant.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are these SEO toolkits beginner-friendly?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Yes. Each toolkit focuses on a single task with clear guidance so beginners and pros can get value quickly.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I measure SEO success?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Track impressions, clicks, and positions in Google Search Console. Monitor organic sessions, conversions, and Core Web Vitals for a complete picture.',
        },
      },
    ],
  } as const;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Toolkits',
        item: 'https://www.toolsland.ai/toolkits',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'SEO Toolkits',
        item: 'https://www.toolsland.ai/toolkits/seo-toolkits',
      },
    ],
  } as const;

  const tocLinks = [
    { id: 'features', label: 'Features' },
    { id: 'available-tools', label: 'Available tools' },
    { id: 'coming-soon', label: 'Coming soon' },
    { id: 'recommended-tools', label: 'Recommended tools' },
    { id: 'how-to', label: 'How to use' },
    { id: 'faqs', label: 'FAQs' },
  ];

  return (
    <main className="min-h-screen ">
      <CommonNav/>
      <div className="container mx-auto px-4 max-w-7xl py-10">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm">
          <ol className="flex items-center gap-2 text-gray-600">
            <li>
              <Link href="/toolkits" className="hover:text-gray-900">Toolkits</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">SEO Toolkits</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-10">
          <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">SEO Toolkits</h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Discover free and powerful SEO toolkits to plan keywords, optimize content,
            generate meta tags, analyze backlinks, and improve your search engine rankings.
          </p>
        </div>

            {/* Category Filter */}
            <div className="mb-6 md:mb-8">
          <div className="flex flex-wrap justify-center gap-2 px-4">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  category.active
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
                aria-pressed={category.active}
                type="button"
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

            {/* Available Tools Section */}
            <section aria-labelledby="available-tools" className="mb-8 md:mb-12">
              <h2 id="available-tools" className="mb-4 md:mb-6 text-xl md:text-2xl font-semibold text-gray-900 px-4">Available SEO Toolkits</h2>
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
                {seoToolkits
                  .filter(tool => !tool.comingSoon)
                  .map((tool) => (
                    <ToolCard key={tool.title} {...tool} />
                  ))}
              </div>
            </section>

            {/* Coming Soon Section */}
            <section aria-labelledby="coming-soon" className="mb-8 md:mb-12">
              <h2 id="coming-soon" className="mb-4 md:mb-6 text-xl md:text-2xl font-semibold text-gray-900 px-4">Coming soon</h2>
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
                {seoToolkits
                  .filter(tool => tool.comingSoon)
                  .map((tool) => (
                    <div key={tool.title} className="group relative flex flex-col items-start rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-md opacity-75 min-h-[200px] sm:min-h-[240px]">
                      <div className="mb-4 text-3xl sm:text-4xl text-gray-400">{tool.icon}</div>
                      <div className="mb-2 inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                        Coming Soon
                      </div>
                      <h3 className="mb-2 text-lg sm:text-xl font-bold text-gray-900">{tool.title}</h3>
                      <p className="mb-4 text-sm sm:text-base text-gray-600 flex-1 leading-relaxed">{tool.description}</p>
                      <div className="mt-auto inline-block rounded-md bg-gray-300 px-3 sm:px-4 py-2 text-gray-500 font-semibold cursor-not-allowed text-sm">
                        Coming Soon
                      </div>
                    </div>
                  ))}
              </div>
            </section>

        {/* Layout with sticky ToC */}
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-12">
  

          <div className="lg:col-span-9">
            {/* Feature Highlights */}
            <section aria-labelledby="features" className="mb-8 md:mb-12">
              <h2 id="features" className="mb-4 text-xl md:text-2xl font-semibold text-gray-900 px-4">Why use our SEO toolkits?</h2>
              <ul className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-gray-700 px-4">
                <li className="rounded-lg bg-white p-3 sm:p-4 border border-gray-200 text-sm sm:text-base">Actionable keyword research insights</li>
                <li className="rounded-lg bg-white p-3 sm:p-4 border border-gray-200 text-sm sm:text-base">On-page SEO checks and recommendations</li>
                <li className="rounded-lg bg-white p-3 sm:p-4 border border-gray-200 text-sm sm:text-base">Meta tags and schema helpers</li>
                <li className="rounded-lg bg-white p-3 sm:p-4 border border-gray-200 text-sm sm:text-base">Backlink and authority planning</li>
                <li className="rounded-lg bg-white p-3 sm:p-4 border border-gray-200 text-sm sm:text-base">Technical SEO tips for speed and UX</li>
                <li className="rounded-lg bg-white p-3 sm:p-4 border border-gray-200 text-sm sm:text-base">No login required for core tools</li>
              </ul>
            </section>

            {/* Deep Content: What's included */}
            <section aria-labelledby="whats-included" className="mb-8 md:mb-12">
              <h2 id="whats-included" className="mb-4 text-xl md:text-2xl font-semibold text-gray-900 px-4">What&apos;s inside our SEO toolkits</h2>
              <div className="prose max-w-none text-gray-700 px-4">
                <p className="text-sm sm:text-base">
                  Our SEO toolkits bring together focused utilities designed to solve the most important SEO jobs-to-be-done:
                  discovery, optimization, and measurement. Use them individually or as a workflow to plan, create, and refine
                  content that ranks.
                </p>
                <h3 className="mt-4 sm:mt-6 text-lg sm:text-xl font-semibold text-gray-900">Keyword discovery</h3>
                <p className="text-sm sm:text-base">Uncover topics, search intent, and long-tail opportunities to build content that matches demand.</p>
                <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-gray-900">On-page optimization</h3>
                <p className="text-sm sm:text-base">Craft compelling titles and meta descriptions, improve readability, and cover user intent thoroughly.</p>
                <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-gray-900">Enhance SERP appearance</h3>
                <p className="text-sm sm:text-base">Add structured data like FAQ and Breadcrumb to improve visibility and potential rich results.</p>
                <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-gray-900">Performance and UX</h3>
                <p className="text-sm sm:text-base">Optimize speed and Core Web Vitals—key signals that support better rankings and engagement.</p>
              </div>
            </section>


            {/* How to use */}
            <section aria-labelledby="how-to" className="mb-8 md:mb-12">
              <h2 id="how-to" className="mb-4 text-xl md:text-2xl font-semibold text-gray-900 px-4">How to use these Tools</h2>
              <ol className="list-decimal pl-4 sm:pl-6 text-gray-700 space-y-2 px-4">
                <li className="text-sm sm:text-base">Start with keyword research to discover search demand and intent.</li>
                <li className="text-sm sm:text-base">Use the meta tags generator to craft compelling titles and descriptions.</li>
                <li className="text-sm sm:text-base">Run the content analyzer to improve readability and keyword coverage.</li>
                <li className="text-sm sm:text-base">Plan internal links and monitor backlinks to build authority.</li>
                <li className="text-sm sm:text-base">Optimize images and performance for better Core Web Vitals.</li>
              </ol>
            </section>

    

            {/* Recommended Tools from Other Sites */}
            <section aria-labelledby="recommended-tools" className="mb-8 md:mb-12">
              <h2 id="recommended-tools" className="mb-4 md:mb-6 text-xl md:text-2xl font-semibold text-gray-900 px-4">Recommended SEO Tools from Other Sites</h2>
              <p className="mb-4 md:mb-6 text-sm sm:text-base text-gray-600 px-4">
                While our tools cover the essentials, here are some additional highly-rated SEO tools from other platforms that can complement your workflow:
              </p>
              
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
                {/* Keyword Research Tools */}
                <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-blue-100">
                      <FaSearch className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">Ubersuggest</h3>
                      <p className="text-xs sm:text-sm text-gray-500">by Neil Patel</p>
                    </div>
                  </div>
                  <p className="mb-4 text-sm sm:text-base text-gray-600">Free keyword research tool with search volume, difficulty scores, and content ideas.</p>
                  <a 
                    href="https://neilpatel.com/ubersuggest/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
                  >
                    Visit Ubersuggest
                    <svg className="ml-1 h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-green-100">
                      <FaChartLine className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">Answer The Public</h3>
                      <p className="text-xs sm:text-sm text-gray-500">Visual keyword research</p>
                    </div>
                  </div>
                  <p className="mb-4 text-sm sm:text-base text-gray-600">Discover questions people ask about your keywords with visual search data.</p>
                  <a 
                    href="https://answerthepublic.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
                  >
                    Visit Answer The Public
                    <svg className="ml-1 h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                {/* On-Page SEO Tools */}
                <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-purple-100">
                      <FaKeyboard className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">Yoast SEO</h3>
                      <p className="text-xs sm:text-sm text-gray-500">WordPress Plugin</p>
                    </div>
                  </div>
                  <p className="mb-4 text-sm sm:text-base text-gray-600">Popular WordPress plugin for on-page SEO optimization and readability analysis.</p>
                  <a 
                    href="https://yoast.com/wordpress/plugins/seo/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
                  >
                    Visit Yoast SEO
                    <svg className="ml-1 h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-orange-100">
                      <FaRocket className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">PageSpeed Insights</h3>
                      <p className="text-xs sm:text-sm text-gray-500">by Google</p>
                    </div>
                  </div>
                  <p className="mb-4 text-sm sm:text-base text-gray-600">Free tool to analyze your page speed and get optimization recommendations.</p>
                  <a 
                    href="https://pagespeed.web.dev/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
                  >
                    Visit PageSpeed Insights
                    <svg className="ml-1 h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                {/* Link Building Tools */}
                <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-red-100">
                      <FaLink className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">Ahrefs</h3>
                      <p className="text-xs sm:text-sm text-gray-500">SEO Suite</p>
                    </div>
                  </div>
                  <p className="mb-4 text-sm sm:text-base text-gray-600">Comprehensive SEO tool for backlink analysis, keyword research, and competitor analysis.</p>
                  <a 
                    href="https://ahrefs.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
                  >
                    Visit Ahrefs
                    <svg className="ml-1 h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-indigo-100">
                      <FaGlobe className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">SEMrush</h3>
                      <p className="text-xs sm:text-sm text-gray-500">Marketing Toolkit</p>
                    </div>
                  </div>
                  <p className="mb-4 text-sm sm:text-base text-gray-600">All-in-one marketing toolkit for SEO, PPC, social media, and content marketing.</p>
                  <a 
                    href="https://www.semrush.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
                  >
                    Visit SEMrush
                    <svg className="ml-1 h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                {/* Technical SEO Tools */}
                <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-teal-100">
                      <FaChartLine className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">Screaming Frog</h3>
                      <p className="text-xs sm:text-sm text-gray-500">SEO Spider</p>
                    </div>
                  </div>
                  <p className="mb-4 text-sm sm:text-base text-gray-600">Website crawler for technical SEO audits, broken links, and site structure analysis.</p>
                  <a 
                    href="https://www.screamingfrog.co.uk/seo-spider/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
                  >
                    Visit Screaming Frog
                    <svg className="ml-1 h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-pink-100">
                      <FaRocket className="h-5 w-5 sm:h-6 sm:w-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">GTmetrix</h3>
                      <p className="text-xs sm:text-sm text-gray-500">Performance Analysis</p>
                    </div>
                  </div>
                  <p className="mb-4 text-sm sm:text-base text-gray-600">Website performance testing tool with detailed recommendations for speed optimization.</p>
                  <a 
                    href="https://gtmetrix.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
                  >
                    Visit GTmetrix
                    <svg className="ml-1 h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-yellow-100">
                      <FaKeyboard className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">Google Search Console</h3>
                      <p className="text-xs sm:text-sm text-gray-500">Free by Google</p>
                    </div>
                  </div>
                  <p className="mb-4 text-sm sm:text-base text-gray-600">Essential free tool for monitoring search performance, indexing issues, and search analytics.</p>
                  <a 
                    href="https://search.google.com/search-console/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
                  >
                    Visit Search Console
                    <svg className="ml-1 h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </section>


            {/* FAQs */}
            <section aria-labelledby="faqs" className="mb-8 md:mb-12">
              <h2 id="faqs" className="mb-4 text-xl md:text-2xl font-semibold text-gray-900 px-4"> FAQs</h2>
              <div className="space-y-3 sm:space-y-4 px-4">
                <details className="rounded-lg bg-white p-3 sm:p-4 border border-gray-200">
                  <summary className="font-medium text-gray-900 cursor-pointer text-sm sm:text-base">What are SEO toolkits?</summary>
                  <p className="mt-2 text-gray-700 text-sm sm:text-base">Collections of tools that help with keyword research, on-page optimization, meta tags, backlinks, and technical SEO.</p>
                </details>
                <details className="rounded-lg bg-white p-3 sm:p-4 border border-gray-200">
                  <summary className="font-medium text-gray-900 cursor-pointer text-sm sm:text-base">Are these free?</summary>
                  <p className="mt-2 text-gray-700 text-sm sm:text-base">Yes, core tools are free. We may add advanced features over time.</p>
                </details>
                <details className="rounded-lg bg-white p-3 sm:p-4 border border-gray-200">
                  <summary className="font-medium text-gray-900 cursor-pointer text-sm sm:text-base">Do I need to sign up?</summary>
                  <p className="mt-2 text-gray-700 text-sm sm:text-base">No sign-up is required for the available tools. but you can sign up to get more features.</p>
                </details>
                <details className="rounded-lg bg-white p-3 sm:p-4 border border-gray-200">
                  <summary className="font-medium text-gray-900 cursor-pointer text-sm sm:text-base">How do I choose the right keywords?</summary>
                  <p className="mt-2 text-gray-700 text-sm sm:text-base">Start with long-tail keywords that match intent and have achievable difficulty. Expand to broader terms as your site gains authority.</p>
                </details>
                <details className="rounded-lg bg-white p-3 sm:p-4 border border-gray-200">
                  <summary className="font-medium text-gray-900 cursor-pointer text-sm sm:text-base">Should I add structured data?</summary>
                  <p className="mt-2 text-gray-700 text-sm sm:text-base">Yes—FAQ, Article, and Breadcrumb schema help search engines understand your content and can enable rich results.</p>
                </details>
                <details className="rounded-lg bg-white p-3 sm:p-4 border border-gray-200">
                  <summary className="font-medium text-gray-900 cursor-pointer text-sm sm:text-base">How do I measure success?</summary>
                  <p className="mt-2 text-gray-700 text-sm sm:text-base">Track impressions, clicks, and positions in Search Console and pair with analytics conversions and Core Web Vitals.</p>
                </details>
              </div>
            </section>

            {/* CTA */}
            <section aria-labelledby="get-started" className="mb-2">
              <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 text-center shadow-sm mx-4">
                <h2 id="get-started" className="mb-3 text-xl sm:text-2xl font-semibold text-gray-900">Start using our tools</h2>
                <p className="mb-4 text-sm sm:text-base text-gray-700">No sign-up needed. Jump right in and optimize your site today.</p>
                <Link href="/toolkits" className="inline-block rounded-md bg-primary px-4 sm:px-5 py-2 text-white font-semibold shadow hover:bg-primary/90 transition text-sm sm:text-base">Explore all toolkits</Link>
              </div>
            </section>
          </div>
        </div>

        {/* Internal links */}
        <div className="mt-6 sm:mt-8 text-center px-4">
          <Link href="/toolkits" className="text-primary font-semibold hover:underline text-sm sm:text-base">Explore all toolkits</Link>
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Footer/>
    </main>
  );
};

export default ToolsPage;
