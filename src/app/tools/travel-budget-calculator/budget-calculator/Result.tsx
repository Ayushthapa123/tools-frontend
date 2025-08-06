import React from 'react'
import { TbcData } from 'src/gql/graphql';

type ResultProps = {
   estimatedTotalBudget: number; 
   estimatedDailyBudget: number;
   personalizedTravelGuide: string; 
   detailedResults: TbcData[];
}

export default function Result({ estimatedTotalBudget, estimatedDailyBudget, personalizedTravelGuide, detailedResults }: ResultProps) {
  return (
    <div className=" w-full mx-auto p-6 space-y-8">
        <h3 className='text-2xl font-bold text-gray-800 mb-6'>Your Travel Budget Analysis</h3>
        
        {/* Budget Overview Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow'>
                <h4 className='text-gray-600 text-sm font-medium mb-2'>Total Estimated Budget</h4>
                <p className='text-3xl font-bold text-green-600'>${estimatedTotalBudget.toLocaleString()}</p>
            </div>
            <div className='bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow'>
                <h4 className='text-gray-600 text-sm font-medium mb-2'>Daily Budget Estimate</h4>
                <p className='text-3xl font-bold text-green-600'>${estimatedDailyBudget.toLocaleString()}</p>
            </div>
        </div>

        {/* Detailed Results Section */}
        <div className='mt-12'> 
            <h4 className='text-xl font-semibold text-gray-800 mb-6'>Detailed Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {detailedResults?.map((result) => (
                    <div
                        key={result.category}
                        className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-800 font-semibold text-lg">
                                {result.category}
                            </span>
                            <span className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                                {result.per}
                            </span>
                        </div>
                        <div className="text-gray-600 text-sm mb-4 min-h-[60px]">
                            {result.shortGuide}
                        </div>
                        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                            <span className="text-2xl font-bold text-green-600">
                                ${result.cost.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500">/ {result.per}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Travel Guide Section */}
        <div className='mt-12 bg-white rounded-xl shadow-md p-8 border border-gray-100'>
            <h4 className='text-xl font-semibold text-gray-800 mb-4'>Your Personalized Travel Guide</h4>
            <p className='text-gray-600 leading-relaxed whitespace-pre-line'>{personalizedTravelGuide}</p>
        </div>
    </div>
  )
}
