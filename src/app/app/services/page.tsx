'use client';

import { Input } from 'src/components/Input';
import { useState, useEffect, useCallback } from 'react';
import Button from 'src/components/Button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { useRouter } from 'next/navigation';
import LoadingSpinner from 'src/components/Loading';
import { BiCheckSquare, BiSquare } from 'react-icons/bi';
import {
  AllServiceOptions,
  AllServiceOptionsQuery,
  AllServiceOptionsQueryVariables,
  CreateService,
  CreateServiceMutation,
  CreateServiceMutationVariables,
  GetHostelByToken,
  GetHostelByTokenQuery,
  GetHostelByTokenQueryVariables,
  GetServiceByHostelId,
  GetServiceByHostelIdQuery,
  GetServiceByHostelIdQueryVariables,
  UpdateService,
  UpdateServiceMutation,
  UpdateServiceMutationVariables,
  ServiceOptionData
} from 'src/gql/graphql';
import { enqueueSnackbar } from 'notistack';
import { useGraphQLQuery } from 'src/hooks/useGraphqlQuery';

export default function ServicesPage() {
  const [selectedServices, setSelectedServices] = useState<ServiceOptionData[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const queryClient = useQueryClient();

  // Initialize GraphQL requests
  const queryHostelData = useGraphqlClientRequest<
    GetHostelByTokenQuery,
    GetHostelByTokenQueryVariables
  >(GetHostelByToken.loc?.source?.body!);

  const queryServicesData = useGraphqlClientRequest<
    GetServiceByHostelIdQuery,
    GetServiceByHostelIdQueryVariables
  >(GetServiceByHostelId.loc?.source?.body!);

  const createServiceRequest = useGraphqlClientRequest<
    CreateServiceMutation,
    CreateServiceMutationVariables
  >(CreateService.loc?.source?.body!);

  const updateServiceRequest = useGraphqlClientRequest<
    UpdateServiceMutation,
    UpdateServiceMutationVariables
  >(UpdateService.loc?.source?.body!);

  // Fetch hostel data
  const { data: hostel, isLoading: loadingHostel } = useQuery({
    queryKey: ['getHostelByToken'],
    queryFn: async () => {
      const res = await queryHostelData();
      return res.getHostelByToken;
    },
  });

  // Fetch services data
  const { data: hostelServices, isLoading: loadingHostelServices } = useQuery({
    queryKey: ['getServiceByHostelId', hostel?.data?.id],
    queryFn: async () => {
      if (!hostel?.data?.id) throw new Error('Hostel ID not found');
      const res = await queryServicesData({ hostelId: Number(hostel.data.id) });
      return res.findServiceByHostelId;
    },
    enabled: !!hostel?.data?.id,
  });

  // Memoize service options query
  const { data: serviceOptions, isLoading: loadingServiceOptions } = useGraphQLQuery<
    AllServiceOptionsQuery,
    AllServiceOptionsQueryVariables
  >({
    queryKey: ['allServiceOptions'],
    query: AllServiceOptions.loc!.source.body,
    variables: {},
    enabled: true,
  });

  // Group services by category
  const formattedServiceOptions = serviceOptions?.serviceOptions?.data?.reduce(
    (acc, service) => {
      const category = 'General'; // Default category since ServiceOptionData doesn't have category field
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(service);
      return acc;
    },
    {} as Record<string, ServiceOptionData[]>
  );

  // Initialize expanded categories
  useEffect(() => {
    if (formattedServiceOptions) {
      const initialExpanded = Object.keys(formattedServiceOptions).reduce(
        (acc, category) => ({ ...acc, [category]: true }),
        {}
      );
      setExpandedCategories(initialExpanded);
    }
  }, [formattedServiceOptions]);

  // Mutations
  const { mutateAsync: createServiceAsync } = useMutation({
    mutationFn: createServiceRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getServices'] });
      enqueueSnackbar('Services Created Successfully!', { variant: 'success' });
      router.push('/app/services');
    },
    onError: () => {
      enqueueSnackbar('Services Not Created!', { variant: 'error' });
    },
  });

  const { mutateAsync: updateServiceAsync } = useMutation({
    mutationFn: updateServiceRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getServices'] });
      enqueueSnackbar('Services Updated Successfully!', { variant: 'success' });
      router.push('/app/services');
    },
    onError: () => {
      enqueueSnackbar('Services Not Updated!', { variant: 'error' });
    },
  });

  // Helper functions
  const getCategorySelectedCount = (category: string) => {
    const categoryServices = formattedServiceOptions?.[category] || [];
    return categoryServices.filter(service => 
      selectedServices.some(selected => selected.id === service.id)
    ).length;
  };

  const selectAllInCategory = (category: string) => {
    const categoryServices = formattedServiceOptions?.[category] || [];
    const newSelectedServices = [...selectedServices];
    
    categoryServices.forEach(service => {
      if (!newSelectedServices.some(selected => selected.id === service.id)) {
        newSelectedServices.push(service);
      }
    });
    
    setSelectedServices(newSelectedServices);
  };

  const deselectAllInCategory = (category: string) => {
    const categoryServices = formattedServiceOptions?.[category] || [];
    const categoryIds = categoryServices.map(service => service.id);
    
    setSelectedServices(prev => 
      prev.filter(service => !categoryIds.includes(service.id))
    );
  };

  const handleToggle = useCallback((service: ServiceOptionData) => {
    setSelectedServices(prev => {
      const existingService = prev.find(s => s.id === service.id);
      if (existingService) {
        return prev.filter(s => s.id !== service.id);
      }
      return [...prev, service];
    });
  }, []);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSave = useCallback(async () => {
    if (!hostel?.data?.id) {
      enqueueSnackbar('Hostel ID not found!', { variant: 'error' });
      return;
    }

    try {
      const servicesData = JSON.stringify(selectedServices);
      
      if (!hostelServices?.data?.id) {
        await createServiceAsync({
          createServiceInput: {
            hostelId: Number(hostel.data.id),
            services: servicesData,
          },
        });
      } else {
        await updateServiceAsync({
          updateServiceInput: {
            id: Number(hostelServices.data.id),
            hostelId: Number(hostel.data.id),
            services: servicesData,
          },
        });
      }
    } catch (error) {
      console.error('Error saving services:', error);
    }
  }, [hostel?.data?.id, hostelServices?.data?.id, selectedServices, createServiceAsync, updateServiceAsync]);

  // Update selected services when hostel services change
  useEffect(() => {
    if (hostelServices?.data?.services) {
      try {
        const parsedServices = JSON.parse(hostelServices.data.services) as ServiceOptionData[];
        setSelectedServices(parsedServices);
      } catch (error) {
        console.error('Error parsing services:', error);
        setSelectedServices([]);
      }
    }
  }, [hostelServices?.data?.services]);

  if (loadingHostel || loadingHostelServices || loadingServiceOptions) {
    return <LoadingSpinner color="primary" size="lg" />;
  }

  const allServices = Object.values(formattedServiceOptions || {}).flat();

  return (
    <div className="mx-auto w-full rounded-lg border border-gray-100 bg-white/80 p-6 shadow-md">
      <h1 className="mb-2 text-2xl font-bold text-gray-800">Hostel Services</h1>
      <p className="mb-6 text-gray-600">Select all services available at your property.</p>
      
      {Object.keys(formattedServiceOptions || {}).map((category) => (
        <div key={category} className="mb-6 border-b border-gray-100 pb-4 last:border-b-0">
          <div
            className="group mb-3 flex cursor-pointer items-center justify-between"
            onClick={() => toggleCategory(category)}
          >
            <div className="flex items-center">
              <h2 className="group-hover:text-blue-600 text-lg font-semibold text-gray-800 transition-colors">
                {category}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({getCategorySelectedCount(category)}/{formattedServiceOptions?.[category]?.length || 0})
                </span>
              </h2>
            </div>
            <div className="flex md:space-x-2">
              <button
                onClick={e => {
                  e.stopPropagation();
                  selectAllInCategory(category);
                }}
                className="text-nowrap rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-gray-700 underline transition-colors hover:bg-gray-50"
              >
                Select All
              </button>
              <button
                onClick={e => {
                  e.stopPropagation();
                  deselectAllInCategory(category);
                }}
                className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-gray-700 underline transition-colors hover:bg-gray-50"
              >
                Clear
              </button>
            </div>
          </div>

          {expandedCategories[category] && (
            <div className="mt-2 grid grid-cols-1 gap-3 pl-8 md:grid-cols-2">
              {formattedServiceOptions?.[category]?.map((service) => {
                const isSelected = selectedServices.some(selected => selected.id === service.id);

                return (
                  <div
                    key={service.id}
                    className={`flex items-center rounded-md p-2 transition-colors ${
                      isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleToggle(service)}
                  >
                    <div className="mr-3">
                      {isSelected ? (
                        <BiCheckSquare className="text-blue-600 h-5 w-5" />
                      ) : (
                        <BiSquare className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <label
                      htmlFor={`service-${service.id}`}
                      className={`cursor-pointer ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}
                    >
                      {service.name}
                    </label>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}

      <div className="mt-6 flex flex-col items-start justify-between border-t border-gray-100 pt-4 sm:flex-row sm:items-center">
        <div className="mb-4 text-sm text-gray-500 sm:mb-0">
          <span className="text-blue-600 font-medium">
            {selectedServices.length}
          </span>{' '}
          of {allServices.length} services selected
        </div>
        <div>
          <Button
            label="Save Services"
            onClick={handleSave}
            disabled={!selectedServices.length}
            className={`rounded-full px-4 py-2 font-medium ${
              !selectedServices.length
                ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
