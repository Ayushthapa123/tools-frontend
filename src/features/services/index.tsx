'use client';

import React, { useState } from 'react';
import { BiCheckCircle } from 'react-icons/bi';
import { GetServiceByHostelIdQuery } from 'src/gql/graphql';
import { GetServiceByHostelIdQueryVariables } from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';
import { GetServiceByHostelId } from 'src/gql/graphql';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import LoadingSpinner from 'src/components/Loading';

interface ServicesProps {
  hostelId?: number;
}

export const Services: React.FC<ServicesProps> = ({ hostelId }) => {
  // Get all services for counting
  const queryServicesData = useGraphqlClientRequest<
    GetServiceByHostelIdQuery,
    GetServiceByHostelIdQueryVariables
  >(GetServiceByHostelId.loc?.source?.body!);

  const fetchServicesData = async () => {
    const res = await queryServicesData({ hostelId: Number(hostelId) });
    return res.findServiceByHostelId;
  };

  const { data: hostelServices, isLoading: loadingHostelServices } = useQuery({
    queryKey: ['getServiceByHostelId'],
    queryFn: fetchServicesData,
    enabled: !!hostelId,
  });

  if (loadingHostelServices) return <LoadingSpinner color="primary" size="sm" />;

  return (
    <div className="rounded-lg bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {hostelServices ? (
          hostelServices?.data?.services?.split(',').map((service: string) => (
            <div key={service} className="flex items-center gap-2">
              <ul className="space-y-2">
                <li key={service} className="flex items-start">
                  <BiCheckCircle className="text-green-500 mr-2 mt-0.5 h-5 w-5 flex-shrink-0" />
                  <span className="text-gray-600">{service}</span>
                </li>
              </ul>
            </div>
          ))
        ) : (
          <div>No services listed.</div>
        )}
      </div>
    </div>
  );
};
