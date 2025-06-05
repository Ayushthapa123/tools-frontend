import { useQuery } from '@tanstack/react-query';
import { BiBuilding } from 'react-icons/bi';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import {
  GetSearchQueries,
  GetSearchQueriesQuery,
  GetSearchQueriesQueryVariables,
} from 'src/gql/graphql';

interface Iprops {
  handleClose: () => void;
  handleCountry: (c: string) => void;
  handleSubCity: (c: string) => void;
  handleCity: (c: string) => void;
  handleQuery: (c: string) => void;
  query: string;
}
export const SearchSuggestions = (props: Iprops) => {
  const { handleClose, handleCity, handleCountry, handleSubCity, handleQuery, query } = props;

  const getSearchQueries = useGraphqlClientRequest<
    GetSearchQueriesQuery,
    GetSearchQueriesQueryVariables
  >(GetSearchQueries.loc?.source?.body!);

  const fetchData = async () => {
    const res = await getSearchQueries({ query });
    return res.searchQueries;
  };

  const { data: searchQueries } = useQuery({
    queryKey: ['getSearchQueries', query],
    queryFn: fetchData,
  });
  return (
    <div>
      <div className="fixed left-0 top-0 h-[100vh] w-full ">
        <div onClick={() => handleClose()} className="relative h-[100vh] w-full  "></div>
      </div>
      <div className="card card-body absolute z-10 h-[350px] w-full  min-w-[250px] max-w-xs overflow-y-auto border border-slate-400 bg-white sm:max-w-sm">
        {searchQueries?.map((q, index) => (
          <div key={index}>
            <div
              className="relative flex min-w-60 cursor-pointer gap-1 p-1 shadow-sm"
              onClick={() => {
                handleCountry(q.data?.[0]?.country ?? '');
                handleCity(q.data?.[0]?.city ?? '');
                handleSubCity(q.data?.[0]?.subCity ?? '');
                handleQuery(q.data?.[0]?.subCity ? q.data?.[0]?.subCity : q.data?.[0]?.city ?? '');
                handleClose();
              }}
            >
              <div className="flex flex-col justify-center">
                <BiBuilding className="text-lg" />
              </div>
              <div className="flex flex-col">
                <p className="m-0 p-0 text-primary">
                  <span>{q.data?.[0]?.subCity ? `${q.data?.[0]?.subCity},` : ''}</span>{' '}
                  <span>{q.data?.[0]?.city}</span>
                </p>
                <p className="text-sm text-gray-500">{q.data?.[0]?.country}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
