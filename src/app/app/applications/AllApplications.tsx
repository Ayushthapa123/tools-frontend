import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { FormsCard } from './ApplicationCard';
import {

  GetAllHostelApplicationFormsByHostelIdQuery,
  GetAllHostelApplicationFormsByHostelIdQueryVariables,
  GetAllHostelApplicationFormsByHostelId,
  HostelApplicationFormData,
} from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';

export const AllForms = () => {
  const queryForms = useGraphqlClientRequest<GetAllHostelApplicationFormsByHostelIdQuery, GetAllHostelApplicationFormsByHostelIdQueryVariables>(
    GetAllHostelApplicationFormsByHostelId.loc?.source?.body!,
  );

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryForms();
    return res.getAllHostelApplicationFormsByHostelId;
  };

  const { data: forms } = useQuery({
    queryKey: ['getAllHostelApplicationFormsByHostelId'],
    queryFn: fetchData,
  });
  return (
    <div className="w-full ">
      <hr className="divider w-full" />

      <div className="grid gap-[1rem]  bg-slate-100">
        {forms?.data?.map(form => (
          <div key={form.id}>
            <FormsCard form={form as HostelApplicationFormData} />
          </div>
        ))}
      </div>
    </div>
  );
};
