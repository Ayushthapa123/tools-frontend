'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import Button from 'src/components/Button';
import HostelProfiles from 'src/features/HostelProfiles';
import {
  GetHostelDetailsBasic,
  GetHostelDetailsBasicQuery,
  GetHostelDetailsBasicQueryVariables,
} from 'src/gql/graphql';
import { useUserStore } from 'src/store/userStore';

export default function Home() {
  const { user } = useUserStore();

  const querySignupUrl = useGraphqlClientRequest<
    GetHostelDetailsBasicQuery,
    GetHostelDetailsBasicQueryVariables
  >(GetHostelDetailsBasic.loc?.source?.body!);

  const fetchData = async () => {
    const res = await querySignupUrl();
    return res.getHostelByToken;
  };

  const { data,isLoading } = useQuery({
    queryKey: ['getHostelDetailsBasic'],
    queryFn: fetchData,
  });

  return (
    <div className="grid w-full gap-4">
      <div className="card relative flex w-full flex-col border bg-base-100 p-4 text-base-content shadow lg:flex-row">
        <div className="w-[70%] flex-grow">
          <h3 className="text-2xl  font-semibold mt-2">
            Welcome Back! <span className="font-bold text-secondary">{user.userName}</span>
          </h3>
          <p>
            {/* {data?.address?.subCity} */}
            {/* {data?.address?.city}, {data?.address?.country} */}
          </p>
        </div>
        <div className="">
          <Link href={`https://hostelpilot.com/hostel/${data?.data?.slug}`}>
            <Button
              label="See Digital Profile"
              className="rounded-lg bg-primary"
              variant="primary"
            />
          </Link>
        </div>
      </div>

      <div className="card w-full border bg-base-100 p-4 text-base-content shadow">
        <h1 className="!text-xl font-semibold">Hostel Profiles</h1>
        {isLoading ? <div>Loading...</div> : <HostelProfiles hasOnboardingComplete={data?.data?.hasOnboardingComplete || false} />}
      </div>
     
    </div>
  );
}
