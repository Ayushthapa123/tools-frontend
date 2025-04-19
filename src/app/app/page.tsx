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

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await querySignupUrl();
    return res.getHomestayByToken;
  };

  const { data } = useQuery({
    queryKey: ['getHomestayDetailsBasic'],
    queryFn: fetchData,
  });
  return (
    <div>
      <div className="   grid h-auto  w-full gap-[1rem] ">
        <div className="relative flex w-full bg-white card-body card card-bordered min-h-10">
          <div className="flex-grow w-[70%] ">
            <h3 className="">
              Welcome Back! <span className=" text-secondary">{user.userName}</span>
            </h3>
            <div className="relative ">
              <p className="">
                {data?.address?.subCity}
                {data?.address?.city},{data?.address?.country}
              </p>
            </div>
          </div>
          <div className="absolute right-6">
            <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/homestay/${data?.slug}`}>
              <Button
                label="See Your Profile"
                className="rounded-lg bg-secondary"
                variant="primary"
              />
            </Link>
          </div>
        </div>

        <div className="relative w-full bg-white card-body card card-bordered min-h-10">
          <h3>Homestay Profiles</h3>
        </div>
      </div>
    </div>
  );
}
