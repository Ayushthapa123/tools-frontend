'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import Button from 'src/components/Button';
import {
  GetHomestayDetailsBasic,
  GetHomestayDetailsBasicQuery,
  GetHomestayDetailsBasicQueryVariables,
} from 'src/gql/graphql';
import { useUserStore } from 'src/store/userStore';

export default function Home() {
  const { user } = useUserStore();

  const querySignupUrl = useGraphqlClientRequest<
    GetHomestayDetailsBasicQuery,
    GetHomestayDetailsBasicQueryVariables
  >(GetHomestayDetailsBasic.loc?.source?.body!);

  const fetchData = async () => {
    const res = await querySignupUrl();
    return res.getHomestayByToken;
  };

  const { data } = useQuery({
    queryKey: ['getHomestayDetailsBasic'],
    queryFn: fetchData,
  });

  return (
    <div className="grid w-full gap-4">
      <div className="relative flex w-full p-4 card bg-base-100 border shadow text-base-content">
        <div className="flex-grow w-[70%]">
          <h3 className="text-lg font-semibold">
            Welcome Back!{' '}
            <span className="text-secondary font-bold">{user.userName}</span>
          </h3>
          <p>
            {data?.address?.subCity}
            {data?.address?.city}, {data?.address?.country}
          </p>
        </div>
        <div className="absolute right-6 top-4">
          <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/homestay/${data?.slug}`}>
            <Button
              label="See Your Profile"
              className="rounded-lg bg-secondary"
              variant="primary"
            />
          </Link>
        </div>
      </div>

      <div className="w-full p-4 card bg-base-100 border shadow text-base-content">
        <h3 className="text-lg font-semibold">Homestay Profiles</h3>
      </div>
    </div>
  );
}
