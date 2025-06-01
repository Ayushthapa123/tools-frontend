'use client';
import { HostelPage } from './HostelPage';

import { useSearchParams } from 'next/navigation';

export default function Home({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const checkInDate = useSearchParams().get('checkInDate') ?? '';
  const checkOutDate = useSearchParams().get('checkOutDate') ?? '';

  return (
    <div className="w-full ">
      <HostelPage slug={slug} checkInDat={checkInDate} checkOutDat={checkOutDate} />
    </div>
  );
}
