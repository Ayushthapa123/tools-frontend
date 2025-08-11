import React from 'react'
import { TdfData } from 'src/gql/graphql';

type ResultProps = {
   personalizedTravelGuide: string; 
   detailedResults: TdfData[];
}

export default function Result({ personalizedTravelGuide, detailedResults }: ResultProps) {
  return (
    <div className=" w-full mx-auto md:p-6 space-y-8">
        <h3 className='text-2xl font-bold text-gray-800 mb-6'>Your Travel Destinations</h3>
        
        {/* Detailed Results Section */}
        <div className='mt-12'> 
            <h4 className='text-xl font-semibold text-gray-800 mb-6'>Destination Recommendations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {detailedResults?.map((result, index) => (
                    <div
                        key={`${result.destinationPlace}-${index}`}
                        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                        {/* Header with destination name and country */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <h5 className="text-xl font-bold text-gray-800">
                                    {result.destinationPlace}
                                </h5>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{result.destinationCountry}</span>
                            </div>
                        </div>

                        {/* Short Guide */}
                        <div className="mb-4">
                            <div className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                {result.shortGuide}
                            </div>
                        </div>

                        {/* Expected Cost */}
                        <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                                <span className="text-sm font-medium text-green-800">Expected Cost</span>
                            </div>
                            <div className="text-lg font-bold text-green-700 mt-1">
                                {result.expectedCost}
                            </div>
                        </div>

                        {/* Activities to Do */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-3">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <span className="text-sm font-medium text-gray-700">Top Activities</span>
                            </div>
                            <div className="space-y-2">
                                {result.activitiesToDo?.map((activity, actIndex) => (
                                    <div
                                        key={actIndex}
                                        className="flex items-start gap-2 text-sm text-gray-600"
                                    >
                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="leading-relaxed">{activity}</span>
                                    </div>
                                ))}
                          
                            </div>
                        </div>

                        {/* Card Footer */}
                        <div className="pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">
                                    Destination #{index + 1}
                                </span>
                                <div className="flex items-center gap-1">
                                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="text-xs text-gray-500">Recommended</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Travel Guide Section */}
        <div className='mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md p-8 border border-blue-100'>
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                <h4 className='text-xl font-semibold text-gray-800'>Your Personalized Travel Guide</h4>
            </div>
            <div className='text-gray-700 leading-relaxed whitespace-pre-line bg-white rounded-lg p-6 shadow-sm border border-gray-100'>
                {personalizedTravelGuide}
            </div>
        </div>
    </div>
  )
}
