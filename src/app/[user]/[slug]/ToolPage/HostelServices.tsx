"use client"
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { FaLightbulb } from 'react-icons/fa';
import { Modal } from 'src/components/Modal';
import { GetHostelBySlug, GetHostelBySlugQuery, GetHostelBySlugQueryVariables } from 'src/gql/graphql'
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';

export default function HostelServices({slug}:{slug:string | null | undefined}) {
  const [ showAllServices, setShowAllServices ] = useState(false);

  const searchHostels = useGraphqlClientRequest<
      GetHostelBySlugQuery,
      GetHostelBySlugQueryVariables
    >(GetHostelBySlug.loc?.source?.body!);
  
    const fetchData = async () => {
      const res = await searchHostels({
        slug:slug ?? ""
      });
      return res.getHostelBySlug;
    };
  
    const { data: hostelData, isLoading } = useQuery({
      queryKey: ['getHostelBySlug', slug],
      queryFn: fetchData,
    });

  

    const firstServiceParse = hostelData?.data?.service?.services? JSON.parse(hostelData?.data?.service?.services):[];
    const servicesArray = firstServiceParse ? typeof firstServiceParse === 'string' ? JSON.parse(firstServiceParse):firstServiceParse : [];
  
  return (
    <>
    {
        servicesArray.length > 0 &&
        (
          <div className="rounded-xl bg-white p-6 pt-2 shadow-sm">
           <div className='flex items-start justify-between'>
          <h3 className="mb-4 text-lg font-semibold text-gray-800 ">
            Top Services
          </h3>
          {
            servicesArray.length > 6 && (
              <div className='text-sm text-gray-500 hover:text-gray-700 cursor-pointer' onClick={()=>setShowAllServices(true)}>
                Show All
              </div>
            )
          }
        </div>
            <div className="grid grid-cols-2 items-start justify-between gap-x-2 gap-y-5">
              {servicesArray.length > 0 ? servicesArray.map((service: any) => (
                <div className="flex items-start gap-2" key={service.title}>
                  <div className='flex items-center justify-start'>
                    <FaLightbulb className='text-xl text-secondary' />
                  </div>
                  <span className='text-base font-medium text-gray-600'>{service.name}</span>
                </div>
              )) : <div className='text-center text-gray-500'>No top amenities found</div>}
            </div>
          </div>
        )
      }
          <Modal title='All Services' open={showAllServices} actionLabel='Okay' key="all-services" onSave={() => setShowAllServices(false)} handleClose={() => setShowAllServices(false)} className='min-w-[70vw]'>
        <div className='border-t border-gray-300 py-4 grid grid-cols-2 gap-3'>
          {servicesArray && servicesArray.map((service: any) => (
            <div key={service.id} className='flex items-start gap-3 w-full'>
              <div className='flex items-center justify-start'>
                <FaLightbulb className='text-xl text-secondary' />
              </div>
              <span className='text-base font-semibold text-gray-600'>{service.name}</span>
            </div>
          ))
          }
        </div>
      </Modal>
    </>
  )
}
