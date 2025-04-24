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
      <div className="card relative flex w-full border bg-base-100 p-4 text-base-content shadow">
        <div className="w-[70%] flex-grow">
          <h3 className="text-lg font-semibold">
            Welcome Back! <span className="font-bold text-secondary">{user.userName}</span>
          </h3>
          <p>
            {/* {data?.address?.subCity} */}
            {/* {data?.address?.city}, {data?.address?.country} */}
          </p>
        </div>
        <div className="absolute right-6 top-4">
          <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/homestay/${data?.slug}`}>
            <Button
              label="See Homestay Profile"
              className="rounded-lg bg-secondary"
              variant="primary"
            />
          </Link>
        </div>
      </div>

      <div className="card w-full border bg-base-100 p-4 text-base-content shadow">
        <h3 className="text-lg font-semibold">Homestay Profiles</h3>
      </div>
    </div>
  );
}
