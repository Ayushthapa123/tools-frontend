import React from 'react'
import { DynamicPricingRule } from 'src/gql/graphql'
import { DynamicRulesModal } from './DynamicRulesModal'
import formatDate from 'src/utils/date'


export default function DynamicRulesCard({rule, roomId}: {rule: DynamicPricingRule, roomId: number}) {
  const getPriorityColor = (priority: number) => {
    if (priority >= 3) return 'bg-red-100 text-red-800'
    if (priority >= 2) return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
  }

  return (
    <div className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-6">
          <span className="text-gray-900 font-medium w-40">{rule.name}</span>
          <span className="text-gray-600 w-28">NPR {rule.amount}/night</span>
          <span className="text-gray-600 w-40">
            {formatDate(rule.startDate)} - {formatDate(rule.endDate)}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium w-16 text-center ${getPriorityColor(rule.priority)}`}>
            {rule.priority}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium w-20 text-center ${
            rule.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {rule.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
        <DynamicRulesModal roomId={roomId} rules={rule} />
      </div>
    </div>
  )
}
