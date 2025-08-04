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
    <div>
        <h3 className='text-lg font-bold'>Results</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
                <h4>Estimated Budget</h4>
                <p>${estimatedTotalBudget}</p>
        </div>
        <div>
            <h4>Estimated Daily Budget</h4>
            <p>${estimatedDailyBudget}</p>
        </div>
      
        </div>
        <div> 
            <h4>Detailed Results</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {detailedResults?.map((result) => (
                    <div
                        key={result.category}
                        className="rounded-lg shadow-md bg-white p-5 border border-gray-100 flex flex-col gap-2 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-primary-700 font-semibold text-base">
                                {result.category}
                            </span>
                            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">
                                {result.per}
                            </span>
                        </div>
                        <div className="text-gray-700 text-sm mb-2">
                            {result.shortGuide}
                        </div>
                        <div className="flex items-center gap-2 mt-auto">
                            <span className="text-lg font-bold text-green-600">
                                ${result.cost}
                            </span>
                            <span className="text-xs text-gray-500"> {result.per}</span>
                        </div>
                    </div>
                ))}
            </div>
        <div className='mt-4'>
            <h4>Personalized Travel Guide</h4>
            <p>{personalizedTravelGuide}</p>
        </div>
    </div>
    </div>
  )
}
