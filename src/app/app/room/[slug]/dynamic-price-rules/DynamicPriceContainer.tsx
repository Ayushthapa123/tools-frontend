"use client"

import {  useQuery } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';

import {
  DynamicPricingRuleData,
  GetPriceRulesByRoom,
  GetPriceRulesByRoomQuery,
  GetPriceRulesByRoomQueryVariables,
} from 'src/gql/graphql';

import { Suspense } from 'react';
import { AddDynamicRule } from './AddDynamicRule';
import DynamicRulesCard from './DynamicRulesCard';

export default function DynamicPriceContainer({ roomId }: { roomId: number }) {

  const isEdit = Boolean(roomId);

  const queryDynamicPriceRules = useGraphqlClientRequest<
  GetPriceRulesByRoomQuery,
  GetPriceRulesByRoomQueryVariables
>(GetPriceRulesByRoom.loc?.source?.body!);

//initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
const fetchData = async () => {
  const res = await queryDynamicPriceRules({roomId: Number(roomId)});
  return res.priceRulesByRoom;
};

const { data: rules ,isLoading} = useQuery({
  queryKey: ['getPriceRulesByRoom'],
  queryFn: fetchData,
  enabled: isEdit,
});
  return <Suspense><div>{!isLoading &&<RulesForm rules={rules as DynamicPricingRuleData[] | undefined} roomId={roomId} />}</div></Suspense>;
}

  function RulesForm({ roomId, rules }: { roomId: number, rules: DynamicPricingRuleData[] | undefined | null }) {

  return (
    <div className="w-full h-fit ">
      <div className="bg-white  rounded-lg shadow">
     <div className='flex justify-end '><AddDynamicRule roomId={roomId} rules={undefined} /></div>
     <div className='overflow-y-auto h-fit'>
     {rules?.map((rule: DynamicPricingRuleData) => (
      <div key={rule.id}>
      <DynamicRulesCard rule={rule} roomId={roomId}/>
      </div>
     )) }
     </div>
   
      </div>
    </div>
  );
}



  