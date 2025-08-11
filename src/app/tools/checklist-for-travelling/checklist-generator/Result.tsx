import React from 'react'
import { TcgData } from 'src/gql/graphql';

type ResultProps = {
   personalizedTravelGuide: string; 
   detailedResults: TcgData[];
}

export default function Result({ personalizedTravelGuide, detailedResults }: ResultProps) {
  return (
    <div className="w-full mx-auto p-4 space-y-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
        {/* Header Section - More Compact */}
     
        
        {/* Checklist Categories Section - More Compact */}
        <div className="mt-6"> 
            <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800">Travel Checklist Categories</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent ml-3"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {detailedResults?.map((category, index) => (
                    <div
                        key={`${category.category}-${index}`}
                        className="group bg-white rounded-xl shadow-lg p-4 border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                    >
                        {/* Gradient overlay */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                        
                        {/* Floating number badge */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg">
                            {index + 1}
                        </div>

                        {/* Category Header - Compact */}
                        <div className="mb-3">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                                <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                    {category.category}
                                </h3>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                                <div className="p-1 bg-gray-100 rounded group-hover:bg-blue-50 transition-colors duration-300">
                                    <svg className="w-3 h-3 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <span className="font-medium text-xs">{category.items.length} items to pack</span>
                            </div>
                        </div>

                        {/* Items Count Summary - Compact */}
                        <div className="mb-3 p-2 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200 group-hover:from-emerald-100 group-hover:to-green-100 transition-all duration-300">
                            <div className="flex items-center gap-2">
                                <div className="p-1 bg-emerald-100 rounded group-hover:bg-emerald-200 transition-colors duration-300">
                                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="text-xs font-semibold text-emerald-800">Checklist Items</span>
                                <span className="text-sm font-bold text-emerald-700 ml-auto">
                                    {category.items.length} Items
                                </span>
                            </div>
                        </div>

                        {/* Checklist Items - No Scroll, All Items Displayed, Clickable Labels */}
                        <div className="mb-3">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-1 bg-purple-100 rounded group-hover:bg-purple-200 transition-colors duration-300">
                                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                    </svg>
                                </div>
                                <span className="text-xs font-semibold text-gray-700">Items to Pack</span>
                            </div>
                            <div className="space-y-1 ml-6">
                                {category.items?.map((item: string, itemIndex: number) => {
                                    const checkboxId = `checkbox-${index}-${itemIndex}`;
                                    return (
                                        <label
                                            key={itemIndex}
                                            htmlFor={checkboxId}
                                            className="flex items-center gap-2 text-xs text-gray-600 p-1.5 rounded hover:bg-purple-50 transition-colors duration-200 group/item cursor-pointer"
                                        >
                                            <div className="relative">
                                                <input 
                                                    id={checkboxId}
                                                    type="checkbox" 
                                                    className="w-3 h-3 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-1 cursor-pointer"
                                                />
                                            </div>
                                            <span className="leading-tight group-hover/item:text-gray-800 transition-colors duration-200 cursor-pointer select-none">
                                                {item}
                                            </span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Card Footer - Compact */}
                        <div className="pt-2 border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-300">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-xs text-gray-500 font-medium">Essential</span>
                                </div>
                                <div className="px-2 py-0.5 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
                                    <span className="text-xs font-semibold text-blue-700">
                                        {category.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Travel Guide Section - More Compact */}
        <div className="mt-8 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 rounded-2xl shadow-xl p-6 border border-blue-100 relative overflow-hidden">
            {/* Background decoration - Smaller */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200/20 to-blue-200/20 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Your Personalized Travel Guide
                        </h2>
                        <p className="text-gray-600 text-sm">Crafted specifically for your travel preferences</p>
                    </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                        {personalizedTravelGuide}
                    </div>
                </div>
            </div>
        </div>

        {/* Simplified CSS - Removed scrollbar styles since we're not using scrolling */}
        <style jsx>{`
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `}</style>
    </div>
  )
}
