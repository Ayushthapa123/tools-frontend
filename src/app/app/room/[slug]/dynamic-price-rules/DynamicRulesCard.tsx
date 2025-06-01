import React from 'react';
import { DynamicPricingRuleData } from 'src/gql/graphql';
import { AddDynamicRule } from './AddDynamicRule';
import formatDate from 'src/utils/date';

export default function DynamicRulesCard({
  rule,
  roomId,
}: {
  rule: DynamicPricingRuleData;
  roomId: number;
}) {
  const getPriorityColor = (priority: number) => {
    if (priority >= 3) return 'bg-red-100 text-red-800';
    if (priority >= 2) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="border-b border-gray-200 bg-white transition-colors hover:bg-gray-50">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-6">
          <span className="w-40 font-medium text-gray-900">{rule.name}</span>
          <span className="w-32 text-gray-600">NPR {rule.amount} / night</span>
          <span className="w-80 text-gray-600">
            {formatDate(rule.startDate)} - {formatDate(rule.endDate)}
          </span>
          <span
            className={`w-16 rounded-full px-2 py-1 text-center text-xs font-medium ${getPriorityColor(rule.priority)}`}
          >
            {rule.priority}
          </span>
          <span
            className={`w-8 rounded-full px-2 py-1 text-center text-xs font-medium ${
              rule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {rule.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
        <AddDynamicRule roomId={roomId} rules={rule} />
      </div>
    </div>
  );
}
