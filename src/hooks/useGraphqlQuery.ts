import { useQuery } from '@tanstack/react-query';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';

type UseGraphQLQueryOptions<TData, TVariables> = {
  queryKey: any[];
  query: string;
  variables: TVariables;
  enabled?: boolean;
  select?: (data: TData) => any;
};

export const useGraphQLQuery = <TData, TVariables>({
  queryKey,
  query,
  variables,
  enabled = true,
  select,
}: UseGraphQLQueryOptions<TData, TVariables>) => {
  const graphqlRequest = useGraphqlClientRequest<TData, TVariables>(query);

  const fetchFn = async (): Promise<TData> => {
    return graphqlRequest(variables);
  };

  return useQuery<TData, Error, TData>({
    queryKey,
    queryFn: fetchFn,
    enabled,
    select,
  });
};
