'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';

import {
  GetListedAiToolBySlugQuery,
  GetListedAiToolBySlug,
  GetListedAiToolBySlugQueryVariables,
  Tool,
  ListedAiToolData,
} from 'src/gql/graphql';

import { Suspense, useState } from 'react';
import Button from 'src/components/Button';
import { CreateListedAiForm } from '../CreateListedAiForm';


export default function ToolContainer({ params }: { params: { slug: string } }) {
  const isEdit = params?.slug !== 'new';

  const queryTool = useGraphqlClientRequest<GetListedAiToolBySlugQuery, GetListedAiToolBySlugQueryVariables>(
    GetListedAiToolBySlug.loc?.source?.body!,
  );

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryTool({ slug: params?.slug });
    return res.getListedAiToolBySlug;
  };

  const { data: tool, isLoading } = useQuery({
    queryKey: ['getListedAiToolBySlug', params.slug],
    queryFn: fetchData,
    enabled: isEdit,
  });
  return (
    <Suspense>
      <div>{!isLoading && <ToolForm params={params} tool={tool?.data as ListedAiToolData | undefined} />}</div>
    </Suspense>
  );
}

function ToolForm({  tool }: { params: { slug: string }; tool: ListedAiToolData | undefined | null }) {


  return (
    <div className="w-full">
      <div className="">
       <CreateListedAiForm tool={tool as ListedAiToolData | undefined} />

      </div>
    </div>
  );
}
