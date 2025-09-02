
import { CommonNav } from 'src/features/NavBar/CommonNav';
import Generator from './Generator';
import Footer from 'src/features/Footer';

export const metadata = {
  title: '.com Domain Names Generator - (Available Only)',
  description: 'The only domain generator that combines advanced AI technology with real-time domain availability checking. Generate creative .com domain names and instantly verify their availability through live API calls. Perfect for startups, businesses, and entrepreneurs.',
  keywords: 'domain generator, .com domains, domain availability checker, business domain names, startup domain generator, AI domain generator, real-time domain check, domain registration, business naming tool, professional domain finder',
  openGraph: {
    title: 'Professional .com Domain Names Generator - Real-Time Availability Checker',
    description: 'The only domain generator that combines advanced AI technology with real-time domain availability checking. Generate creative .com domain names and instantly verify their availability through live API calls.',
    images: '/images/domain-generator.png',
    type: 'website',
    url: 'https://toolsland.ai/tools/dot-com-domain-generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional .com Domain Names Generator - Real-Time Availability Checker',
    description: 'The only domain generator that combines advanced AI technology with real-time domain availability checking. Generate creative .com domain names instantly.',
    images: ['/images/domain-generator.png'],
  },
  authors: [{ name: 'Ayush Thapa' }],
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://toolsland.ai/tools/dot-com-domain-generator',
  },
};

const DotComDomainGeneratorPage = () => {
  return (
    <>
      <CommonNav/>

          <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Live Domain Availability Checking
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Professional .com Domain Names Generator
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                The only domain generator that combines advanced AI technology with real-time domain availability checking. 
                Generate creative .com domain names and instantly verify their availability through live API calls.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-gray-600">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  AI-Powered Generation
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Real-Time API Checking
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Instant Results
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Our Domain Names Generator is Different
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Unlike other domain generators that only provide suggestions, our tool actually checks domain availability 
                through live API calls to domain registrars, ensuring you get accurate, up-to-date information.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Advanced AI Technology</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our sophisticated AI algorithms analyze your business description and generate contextually relevant, 
                  brandable domain names that resonate with your target audience.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Live Domain Checking</h3>
                <p className="text-gray-600 leading-relaxed">
                  We make real-time API calls to domain registrars to check actual availability. 
                  No more guessing - you get instant, accurate results you can trust.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Lightning Fast Results</h3>
                <p className="text-gray-600 leading-relaxed">
                  Generate and verify multiple domain suggestions in seconds. Our optimized infrastructure 
                  ensures you get results quickly without compromising accuracy.
                </p>
              </div>
            </div>

            {/* Unique Value Proposition */}
            <div className="bg-gray-900 rounded-lg p-8 text-white">
              <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  The Only Domain Names Generator That Actually Works
                </h3>
                <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                  While other tools simply generate random suggestions, our platform integrates with real domain registrar APIs 
                  to provide you with verified, available domain names. This means no more wasted time checking domains that are already taken.
                </p>
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h4 className="font-semibold mb-4 text-gray-100">What Others Do:</h4>
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <span className="text-red-400 mr-2">✗</span>
                        Generate random suggestions
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-400 mr-2">✗</span>
                        No availability checking
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-400 mr-2">✗</span>
                        Outdated domain data
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-400 mr-2">✗</span>
                        Wasted time and effort
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h4 className="font-semibold mb-4 text-gray-100">What We Do:</h4>
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        AI-powered smart generation
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        Live API availability checking
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        Real-time domain data
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        Instant actionable results
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Generator Component */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <Generator />
          </div>
        </div>
      </main>
    <Footer/>
    </>
  );
};

export default DotComDomainGeneratorPage;
