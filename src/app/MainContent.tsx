'use client';

import React, { Suspense, useEffect } from 'react';

import { Drawer } from 'src/features/Drawer';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import {
  ListedAiToolData,
  SearchListedAiToolsQuery,
  SearchListedAiToolsQueryVariables,
  SearchListedAiTools,
} from 'src/gql/graphql';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useUserStore } from 'src/store/userStore';
import { ThemeProvider } from 'src/features/themes/ThemeProvider';
import { CommonNav } from 'src/features/NavBar/CommonNav';
import { ListedAiToolCardPublic } from 'src/features/ListedAiToolCardPublic';
import { useSearchParams } from 'next/navigation';
import LoadingSpinner from 'src/components/Loading';
import { extractEnums } from 'src/utils/extractEnums';
import { useFilterStore } from 'src/store/filterStore';




export default function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingSpinner color="primary" size="lg" />}>
    <Main>
      {children}
    </Main>
    </Suspense>
  );
}

 function Main({ children }: { children: React.ReactNode }) {
  const { user } = useUserStore();
  const {
    aiTypes,
    domains,
    productTypes,
    toolUserTypes,
    pricingTypes,
    aiCapabilities,
    modalities,
    platforms,
    deliveryMethods,
    integrationOptions,
    featuredOnly,
    verifiedOnly,
    minPopularityScore,
    maxPopularityScore,
    endDate,
    startDate,
    researchMode,


  } = useFilterStore();
  // Fetch user profile by userId
  const query = useSearchParams();
  const searchQuery = query.get('query');
  const x = extractEnums(searchQuery ?? '');
  const queryTools = useGraphqlClientRequest<
    SearchListedAiToolsQuery,
    SearchListedAiToolsQueryVariables
  >(SearchListedAiTools.loc?.source.body!);
  const fetchTools = async () => {
    const res = await queryTools({
      input: {
        aiTypes: [...aiTypes, ...x.aiType],
        productTypes: [...productTypes, ...x.productType],
        domains: [...x.domain, ...domains],
        toolUserTypes: [...x.toolUserType, ...toolUserTypes],
        pricingTypes: [...x.pricingType, ...pricingTypes],
        aiCapabilities: [...x.aiCapability, ...aiCapabilities],
        modalities: [...modalities],
        platforms: [...platforms],
        delivery: [...deliveryMethods],
        integrationOptions: [...integrationOptions],
        featured: featuredOnly, 
        verified: verifiedOnly,
        minPopularityScore: minPopularityScore,
        maxPopularityScore: maxPopularityScore,
        searchTerm: searchQuery,
        startDate: startDate,
        endDate: endDate,
        researchMode: researchMode,
        pageNumber: 1, 
        pageSize: 12,
        keywords: searchQuery?.split(" ").filter(word => word.length > 3),

      },
    });
    return res.searchListedAiTools;
  };
  const { data: tools, isLoading ,isFetching} = useQuery({
    queryKey: ['searchListedAiTools'],
    queryFn: fetchTools,
  });

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <ThemeProvider>
      <div className=" w-full p-3">
        <>
          <div className=" ">
            <div className={`  relative   bg-slate-50 `}>
              {children}
              {isFetching && (
                <div className="flex justify-center items-center h-full">
                  <LoadingSpinner />
                </div>
              )}
              {Number(tools?.data?.length) > 0 && (
                <div className="grid w-full grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3">
                  {tools?.data?.map(tool => (
                    <ListedAiToolCardPublic key={tool.id} tool={tool as ListedAiToolData} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      </div>
    </ThemeProvider>
  );
}
