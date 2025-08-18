import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import {
  GetAllHostelSearchFormsQuery,
  GetAllHostelSearchForms,
  GetAllHostelSearchFormsQueryVariables,
  HostelSearchFormData,
  GetAllHostelSearchFormsByUserIdQuery,
  GetAllHostelSearchFormsByUserId,
  GetAllHostelSearchFormsByUserIdQueryVariables,
  GetAllHostelApplicationFormsByUserId,
  GetAllHostelApplicationFormsByUserIdQueryVariables,
  GetAllHostelApplicationFormsByUserIdQuery,
  HostelApplicationFormData,
} from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';
import { useGraphQLQuery } from 'src/hooks/useGraphqlQuery';
// import { ApplicationCard } from '../applications/ApplicationCard';

export const MyForms = () => {
  const queryForms = useGraphqlClientRequest<
    GetAllHostelSearchFormsByUserIdQuery,
    GetAllHostelSearchFormsByUserIdQueryVariables
  >(GetAllHostelSearchFormsByUserId.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryForms();
    return res.getHostelSearchFormsByUserId;
  };

  const { data: forms } = useQuery({
    queryKey: ['getAllHostelSearchFormsByUserId'],
    queryFn: fetchData,
  });

  const { data: applicationForms } = useGraphQLQuery<
    GetAllHostelApplicationFormsByUserIdQuery,
    GetAllHostelApplicationFormsByUserIdQueryVariables
  >({
    queryKey: ['getAllHostelApplicationFormsByUserId'],
    query: GetAllHostelApplicationFormsByUserId.loc?.source?.body!,

    variables: {},
  });
  console.log(applicationForms);
  return (
    <div className="w-full ">
      <hr className="divider w-full" />

      <h2>Hostel Application Forms</h2>

      <div className="grid gap-[1rem]  bg-slate-100 p-4">
        {applicationForms?.getHostelApplicationFormsByUserId?.data?.map(form => (
          <div key={form.id}>
            {/* <ApplicationCard form={form as HostelApplicationFormData} hostelOwnerAccess={false} /> */}
          </div>
        ))}
      </div>

      <h2>Hostel Search Forms</h2>

      <div className="grid gap-[1rem]  bg-slate-100">
        {forms?.data?.map(form => (
          <div key={form.id}>
            {/* <FormsCard form={form as HostelSearchFormData} /> */}
          </div>
        ))}
      </div>
    </div>
  );
};
