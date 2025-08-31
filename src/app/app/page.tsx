'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import Button from 'src/components/Button';

import { useUserStore } from 'src/store/userStore';
import MainContent from '../MainContent';

export default function Home() {
  const { user } = useUserStore();





  return (
    <div className="">
     <MainContent>
      <div/>
     </MainContent>
    </div>
  );
}
