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
import LoadingSpinner from 'src/components/Loading';
import { CommonNav } from 'src/features/NavBar/CommonNav';
import { useRouter } from 'next/navigation';
import ToolCard from 'src/features/ToolCard';
import { ListedAiToolCardPublic } from 'src/features/ListedAiToolCardPublic';

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { user } = useUserStore();
  // Fetch user profile by userId
  const queryUser = useGraphqlClientRequest<GetAllListedAiToolsQuery, GetAllListedAiToolsQueryVariables>(
    GetAllListedAiTools.loc?.source.body!,
  );
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
      <div className=" w-full ">
        <>
          <div className=" relative  z-[999] h-[70px] shadow-sm">
            <CommonNav />
          </div>

          <div className=" pt-15    h-[calc(100vh-70px)] w-full  md:flex">
            {user.userId && (
              <div className="fixed z-50 hidden  lg:relative lg:flex">
                <Drawer />
              </div>
            )}

            <div
              className={`  relative h-[calc(100vh-70px)] w-full overflow-y-scroll   bg-slate-50 p-3 md:p-5`}>
              {children}
              <div className="grid grid-cols-1 md:grid-cols-2  gap-4 w-full">
                {tools?.data?.map((tool) => (
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
