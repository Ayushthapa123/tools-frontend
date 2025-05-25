"use client";
import { hostelServices as hServices } from "../data/services"; 
import { Input } from "src/components/Input";
import { useState, useEffect } from "react";
import Button from "src/components/Button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useGraphqlClientRequest } from "src/client/useGraphqlClientRequest";
import { useRouter } from "next/navigation";
import LoadingSpinner from "src/components/Loading";
import { CreateService, CreateServiceMutation, CreateServiceMutationVariables, GetHostelByToken, GetHostelByTokenQuery, GetHostelByTokenQueryVariables, GetServiceByHostelId, GetServiceByHostelIdQuery, GetServiceByHostelIdQueryVariables, UpdateService, UpdateServiceMutation, UpdateServiceMutationVariables } from "src/gql/graphql";
import { enqueueSnackbar } from "notistack";

export default function ServicesPage() {
  const [ selectedServices, setSelectedServices ] = useState<string[]>([]);
  const router = useRouter();
  const queryClient = useQueryClient();

  // find hostel id
  const queryHostelData = useGraphqlClientRequest<
    GetHostelByTokenQuery,
    GetHostelByTokenQueryVariables
  >(GetHostelByToken.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryHostelData();
    return res.getHostelByToken;
  };

  const { data: hostel, isLoading: loadingHostel } = useQuery({
    queryKey: [ 'getHostelByToken' ],
    queryFn: fetchData,
  });

  // Fetch services
  const queryServicesData = useGraphqlClientRequest<
    GetServiceByHostelIdQuery,
    GetServiceByHostelIdQueryVariables
  >(GetServiceByHostelId.loc?.source?.body!);

  const fetchServicesData = async () => {
    const res = await queryServicesData({ hostelId: Number(hostel?.data?.id) });
    return res.findServiceByHostelId;
  };

  const { data: hostelServices, isLoading: loadingHostelServices } = useQuery({
    queryKey: [ 'getServiceByHostelId' ],
    queryFn: fetchServicesData,
    enabled: !!hostel?.data?.id
  });

  useEffect(() => {
    if (hostelServices?.data?.services) {
      setSelectedServices(hostelServices.data?.services.split(","));
    }
  }, [ hostelServices?.data?.services ]);

  // Create service mutation
  const createService = useGraphqlClientRequest<CreateServiceMutation, CreateServiceMutationVariables>(CreateService.loc?.source?.body!);

  const { mutateAsync: createServiceAsync } = useMutation({ mutationFn: createService });

  const handleToggle = (name: string) => {
    setSelectedServices((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [ ...prev, name ]
    );
  };

  // update service mutation
  const updateService = useGraphqlClientRequest<UpdateServiceMutation, UpdateServiceMutationVariables>(UpdateService.loc?.source?.body!);
  const { mutateAsync: updateServiceAsync } = useMutation({ mutationFn: updateService });

  const handleSave = () => {
    if (!hostelServices?.data?.id) {
      createServiceAsync({
        createServiceInput: {
          hostelId: Number(hostel?.data?.id),
          services: selectedServices.join(",")
        }
      }).then((res) => {
        if (res?.createService.data?.id) {
          router.push('/app/services');
          queryClient.invalidateQueries({ queryKey: [ 'getServices' ] });
          enqueueSnackbar('Services Created Successfully!',{variant:"success"})
        } else {
          enqueueSnackbar('Services Not Created!',{variant:"error"})
        }
      });
    } else {
      updateServiceAsync({
        updateServiceInput: {
          id: Number(hostelServices?.data?.id),
          hostelId: Number(hostel?.data?.id),
          services: selectedServices.join(",")
        }
      }).then((res) => {
        if (res?.updateService.data?.id) {
          router.push('/app/services');
          queryClient.invalidateQueries({ queryKey: [ 'getServices' ] });
          enqueueSnackbar('Services Updated Successfully!',{variant:'success'})
        } else {
          enqueueSnackbar('Services Not Updated!',{variant:"error"})
        }
      });
    }
  };
  if (loadingHostel || loadingHostelServices) {
    return <LoadingSpinner color="primary" size="lg" />;
  }

  return (
    <div className="mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100 mt-1">
      <h2 className="text-2xl font-bold mb-4 text-primary">Select Services</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 items-center">
        {hServices?.map((service) => (
          <label
            key={service.id}
            className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors border border-gray-200 hover:bg-blue-50 ${selectedServices.includes(service.name) ? "bg-blue-100 border-blue-400" : "bg-white"
              }`}
          >
            <div className="flex items-center gap-3">
              <div className="mb-6">
                <Input
                  type="checkbox"
                  checked={selectedServices.includes(service.name)}
                  onChange={() => handleToggle(service.name)}
                  className="w-5 h-5"
                />
              </div>
              <div>
                <span
                  className={`text-gray-700 ${selectedServices.includes(service.name) ? "font-semibold text-primary" : ""
                    }`}
                >
                  {service.name}
                </span>
              </div>
            </div>
          </label>
        ))}
      </div>
      <div className="flex justify-end">
        <div className="">
          <Button label="Save Services" variant="primary" onClick={handleSave} className="w-fit" />
        </div>
      </div>
    </div>
  );
}