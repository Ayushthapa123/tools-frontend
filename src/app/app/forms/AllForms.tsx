import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { FormsCard } from './FormsCard';
import {
  GetAllHostelSearchFormsQuery,
  GetAllHostelSearchForms,
  GetAllHostelSearchFormsQueryVariables,
  HostelSearchFormData,

} from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';

export const AllForms = () => {
  const queryForms = useGraphqlClientRequest<GetAllHostelSearchFormsQuery, GetAllHostelSearchFormsQueryVariables>(
    GetAllHostelSearchForms.loc?.source?.body!,
  );

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryForms();
    return res.getAllHostelSearchForms;
  };

  const { data: forms } = useQuery({
    queryKey: ['getAllHostelSearchForms'],
    queryFn: fetchData,
  });
  return (
    <div className="w-full ">
      <hr className="divider w-full" />

      <div className="grid gap-[1rem]  bg-slate-100">
        {forms?.data?.map(form => (
          <div key={form.id}>
            <FormsCard form={form as HostelSearchFormData} />
          </div>
        ))}
      </div>
    </div>
  );
};
