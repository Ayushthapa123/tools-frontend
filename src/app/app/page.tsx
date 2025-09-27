'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import Button from 'src/components/Button';

import { useUserStore } from 'src/store/userStore';
import MainContent from '../MainContent';
import {
  GetAllToolsQuery,
  GetGoogleOauthUrl,
  GetAllToolsQueryVariables,
  GetAllTools,
  ToolData,
  GetSavedToolsByUserTokenQuery,
  GetSavedToolsByUserTokenQueryVariables,
  GetSavedToolsByUserToken,
} from 'src/gql/graphql';
import { ToolCard } from 'src/components/ToolCard';

export default function Home() {
  const { user } = useUserStore();

  const queryTools = useGraphqlClientRequest<GetAllToolsQuery, GetAllToolsQueryVariables>(
    GetAllTools.loc?.source?.body!,
  );

  const fetchData = async () => {
    const res = await queryTools();
    return res.getAllTools;
  };

  const { data: tools } = useQuery({
    queryKey: ['getAllTools'],
    queryFn: fetchData,
  });

  const querySavedTools = useGraphqlClientRequest<
    GetSavedToolsByUserTokenQuery,
    GetSavedToolsByUserTokenQueryVariables
  >(GetSavedToolsByUserToken.loc?.source?.body!);

  const fetchDataSavedTools = async () => {
    const res = await querySavedTools();
    return res.getSavedToolsByUserToken;
  };

  const { data: savedTools } = useQuery({
    queryKey: ['getSavedToolsByUserToken'],
    queryFn: fetchDataSavedTools,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Saved Tools</h1>
      <div className=" grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3">
        {savedTools?.data?.map(tool => (
          <ToolCard
            key={tool.id}
            tool={tool.tool as ToolData}
            username={tool.user?.username ?? ''}
          />
        ))}
      </div>
      <h2 className="text-2xl font-bold text-gray-900">All Tools</h2>
      <div className=" grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3">
        {tools?.data?.map(tool => (
          <ToolCard key={tool.id} tool={tool as ToolData} username={tool.owner?.username ?? ''} />
        ))}
      </div>
    </div>
  );
}
