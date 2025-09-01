'use client';

import React, { useEffect } from 'react';

import { Drawer } from 'src/features/Drawer';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import {
  ListedAiToolData,
  GetAllListedAiToolsQuery,
  GetAllListedAiToolsQueryVariables,
  GetAllListedAiTools,
} from 'src/gql/graphql';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useUserStore } from 'src/store/userStore';
import { ThemeProvider } from 'src/features/themes/ThemeProvider';
import { CommonNav } from 'src/features/NavBar/CommonNav';
import { ListedAiToolCardPublic } from 'src/features/ListedAiToolCardPublic';

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { user } = useUserStore();
  // Fetch user profile by userId
  const queryUser = useGraphqlClientRequest<
    GetAllListedAiToolsQuery,
    GetAllListedAiToolsQueryVariables
  >(GetAllListedAiTools.loc?.source.body!);
  const fetchUser = async () => {
    const res = await queryUser({ pageSize: 50, pageNumber: 1 });
    return res.getAllListedAiTools;
  };
  const { data: tools, isLoading } = useQuery({
    queryKey: ['tools'],
    queryFn: fetchUser,
  });

  return (
    <ThemeProvider>
      <div className=" w-full">
        <>
          <div className=" ">
            <div className={`  relative   bg-slate-50 `}>
              {children}
              <div className="grid w-full grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3">
                {tools?.data?.map(tool => (
                  <ListedAiToolCardPublic key={tool.id} tool={tool as ListedAiToolData} />
                ))}
              </div>
            </div>
          </div>
        </>
      </div>
    </ThemeProvider>
  );
}
