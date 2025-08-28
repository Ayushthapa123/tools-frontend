'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import Button from 'src/components/Button';

interface Iprops {
  slug: string;
}

export default function ApplyNow({ slug }: Iprops) {
  const router = useRouter();
  return (
    <div className='w-full'>
        <h2 className='text-2xl font-semibold text-gray-800'>Use This Tool</h2>
      <div>
        <Button label="Try Tool Now" onClick={() => router.push(`/tool/${slug}`)} />
      </div>
    </div>
  );
}
