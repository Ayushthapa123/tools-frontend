import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { ServiceOptionCard } from './ServiceOptionCard';
import {
  AllServiceOptionsQuery,
  AllServiceOptionsQueryVariables,
  AllServiceOptions,
} from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';
import { useGraphQLQuery } from 'src/hooks/useGraphqlQuery';
import { ServiceOptionForm } from './ServiceOptionForm';

export const AllServices = () => {
  const { data: serviceData, isLoading } = useGraphQLQuery<
    AllServiceOptionsQuery,
    AllServiceOptionsQueryVariables
  >({
    queryKey: ['getServiceOptions'],
    query: AllServiceOptions.loc!.source.body,
    variables: {},
    enabled: true,
  });
  return (
    <div className="w-full ">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Services</h1>
        <ServiceOptionForm />
      </div>
      <hr className="divider w-full" />

      <div className="grid gap-[1rem]">
        {serviceData?.serviceOptions?.data?.map(service => (
          <div key={service.id} className="w-full">
            <ServiceOptionCard   service={service} />
          </div>
        ))}
      </div>
    </div>
  );
};
