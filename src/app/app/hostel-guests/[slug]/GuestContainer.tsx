'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import {
  GetHostelGuests,
  GetHostelGuestsQuery,
  GetHostelGuestsQueryVariables,
} from 'src/gql/graphql';
import { Suspense, useEffect } from 'react';
import { GuestCreateForm } from './GuestCreateForm';

export default function GuestContainer({ params }: { params: { slug: string } }) {
  const isEdit = params?.slug !== 'new';
  const queryClient = useQueryClient();

  const queryGuest = useGraphqlClientRequest<
    GetHostelGuestsQuery,
    GetHostelGuestsQueryVariables
  >(GetHostelGuests.loc?.source?.body!);

  const fetchData = async () => {
    const res = await queryGuest();
    return res.hostelGuestsByHostelId.data?.find(guest => guest.id === params.slug);
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['getHostelGuests'] });
  }, [params.slug, queryClient]);

  const { data: guest, isLoading } = useQuery({
    queryKey: ['getHostelGuests'],
    queryFn: fetchData,
    enabled: isEdit,
  });

  return (
    <Suspense>
      <div className="w-full">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-6">
            <div className="mb-4 flex items-center justify-center">
            </div>
            <div className="flex justify-start">
              <h2 className="text-xl font-semibold">{guest?.fullName || 'New Guest'}</h2>
            </div>
          </div>

          {!isLoading && <GuestCreateForm guest={guest} isEdit={isEdit} />}
        </div>
      </div>
    </Suspense>
  );
}
