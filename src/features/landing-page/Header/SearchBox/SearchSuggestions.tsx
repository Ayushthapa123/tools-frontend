import { useQuery } from '@tanstack/react-query';
import { BiBuilding } from 'react-icons/bi';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
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
      <div className="card card-body absolute w-full max-w-xs sm:max-w-sm  h-[350px] min-w-[250px] overflow-y-auto bg-white border-slate-400 border z-10">
        {searchQueries?.map((q, index) => (
          <div key={index}>
            <div
              className="relative flex min-w-60 cursor-pointer gap-1 p-1 shadow-sm"
              onClick={() => {
                handleCountry(q.country);
                handleCity(q.city);
                handleSubCity(q.subCity ?? '');
                handleQuery(q.subCity ? q.subCity : q.city);
                handleClose();
                
              }}>
              <div className="flex flex-col justify-center">
                <BiBuilding className="text-lg" />
              </div>
              <div className="flex flex-col">
                <p className="m-0 p-0 text-primary capitalize">
                  <span>{q.subCity ? `${q.subCity},` : ''}</span> <span>{q.city}</span>
                </p>
                <p className="text-sm text-gray-500 capitalize  text-start">{q.country}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
