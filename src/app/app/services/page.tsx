"use client";
import { homestayServices as hServices } from "../data/services"; 
import { Input } from "src/components/Input";
import { useState, useEffect } from "react";
import Button from "src/components/Button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useGraphqlClientRequest } from "src/client/useGraphqlClientRequest";
import { useToastStore } from "src/store/toastStore";
import { useRouter } from "next/navigation";
import LoadingSpinner from "src/components/Loading";
import { CreateService, CreateServiceMutation, CreateServiceMutationVariables, GetHomestayByToken, GetHomestayByTokenQuery, GetHomestayByTokenQueryVariables, GetServiceByHomestayId, GetServiceByHomestayIdQuery, GetServiceByHomestayIdQueryVariables, UpdateService, UpdateServiceMutation, UpdateServiceMutationVariables } from "src/gql/graphql";

export default function ServicesPage() {
  const [ selectedServices, setSelectedServices ] = useState<string[]>([]);
  const router = useRouter();
  const { setRole, setShowToast, setMessage } = useToastStore();
  const queryClient = useQueryClient();

  // find homestay id
  const queryHomestayData = useGraphqlClientRequest<
    GetHomestayByTokenQuery,
    GetHomestayByTokenQueryVariables
  >(GetHomestayByToken.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryHomestayData();
    return res.getHomestayByToken;
  };

  const { data: homestay, isLoading: loadingHomestay } = useQuery({
    queryKey: [ 'getHomestayByToken' ],
    queryFn: fetchData,
  });

  // Fetch services
  const queryServicesData = useGraphqlClientRequest<
    GetServiceByHomestayIdQuery,
    GetServiceByHomestayIdQueryVariables
  >(GetServiceByHomestayId.loc?.source?.body!);

  const fetchServicesData = async () => {
    const res = await queryServicesData({ homestayId: Number(homestay?.id) });
    return res.findServiceByHomestayId;
  };

  const { data: homestayServices, isLoading: loadingHomestayServices } = useQuery({
    queryKey: [ 'getServiceByHomestayId' ],
    queryFn: fetchServicesData,
    enabled: !!homestay?.id
  });

  useEffect(() => {
    if (homestayServices?.service) {
      setSelectedServices(homestayServices.service.split(","));
    }
  }, [ homestayServices?.service ]);

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
    if (!homestayServices?.id) {
      createServiceAsync({
        createServiceInput: {
          homestayId: Number(homestay?.id),
          service: selectedServices.join(",")
        }
      }).then((res) => {
        if (res?.createService.id) {
          setShowToast(true);
          router.push('/app/services');
          queryClient.invalidateQueries({ queryKey: [ 'getServices' ] });
          setMessage('Services Created Successfully!');
          setRole('success');
        } else {
          setShowToast(true);
          setMessage('Services Not Created!');
          setRole('error');
        }
      });
    } else {
      updateServiceAsync({
        updateServiceInput: {
          id: Number(homestayServices.id),
          service: selectedServices.join(",")
        }
      }).then((res) => {
        if (res?.updateService.id) {
          setShowToast(true);
          router.push('/app/services');
          queryClient.invalidateQueries({ queryKey: [ 'getServices' ] });
          setMessage('Services Updated Successfully!');
          setRole('success');
        } else {
          setShowToast(true);
          setMessage('Services Not Updated!');
          setRole('error');
        }
      });
    }
  };
  if (loadingHomestay || loadingHomestayServices) {
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