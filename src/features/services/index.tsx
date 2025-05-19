'use client';

import React, { useState } from 'react';
import { BiCheckCircle } from 'react-icons/bi';
import { GetServiceByHomestayIdQuery } from 'src/gql/graphql';
import { GetServiceByHomestayIdQueryVariables } from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';
import { GetServiceByHomestayId } from 'src/gql/graphql';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import LoadingSpinner from 'src/components/Loading';

interface ServicesProps {
  homestayId?: number;
}

export const Services: React.FC<ServicesProps> = ({ 
  homestayId,
}) => {
  
  // Get all services for counting
  const queryServicesData = useGraphqlClientRequest<
  GetServiceByHomestayIdQuery,
  GetServiceByHomestayIdQueryVariables
>(GetServiceByHomestayId.loc?.source?.body!);

const fetchServicesData = async () => {
  const res = await queryServicesData({ homestayId: Number(homestayId) });
  return res.findServiceByHomestayId;
};

const { data: homestayServices, isLoading: loadingHomestayServices } = useQuery({
  queryKey: [ 'getServiceByHomestayId' ],
  queryFn: fetchServicesData,
  enabled: !!homestayId
});
  
  if(loadingHomestayServices) return <LoadingSpinner color='primary' size='sm' />
  
  

  return (
    <div className="bg-white rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2">
            {homestayServices? homestayServices?.data?.service?.split(',').map((service) => (
              <div key={service} >
                <ul className="space-y-2">
                    <li key={service} className="flex items-start">
                      <BiCheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{service}</span>
                    </li>
                </ul>
              </div>
            )):<div>No services listed.</div>}
        </div>
    </div>
  );
};
