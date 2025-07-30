import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { ApplicationCard } from './ApplicationCard';
import {

  GetAllHostelApplicationFormsByHostelIdQuery,
  GetAllHostelApplicationFormsByHostelIdQueryVariables,
  GetAllHostelApplicationFormsByHostelId,
  HostelApplicationFormData,
  UserType,
  GetAllHostelApplicationFormsQuery,
  GetAllHostelApplicationForms,
  GetAllHostelApplicationFormsQueryVariables,
} from 'src/gql/graphql';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from 'src/store/userStore';
export const AllForms = () => {
  const { user } = useUserStore();
  const queryHostelApplicationForms = useGraphqlClientRequest<GetAllHostelApplicationFormsByHostelIdQuery, GetAllHostelApplicationFormsByHostelIdQueryVariables>(
    GetAllHostelApplicationForms.loc?.source?.body!,
  );
  const fetchHostelData = async () => {
    const res = await queryHostelApplicationForms();
    return res.getAllHostelApplicationFormsByHostelId;
  };

  const queryAllApplicationForms = useGraphqlClientRequest<GetAllHostelApplicationFormsQuery, GetAllHostelApplicationFormsQueryVariables>(
    GetAllHostelApplicationForms.loc?.source?.body!,
  );
  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchAllData = async () => {
    const res = await queryAllApplicationForms();
    return res.getAllHostelApplicationForms;
  };

 

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app


  const { data: forms } = useQuery({
    queryKey: ['getAllHostelApplicationFormsByHostelId'],
    queryFn: user.userType===UserType.HostelOwner?fetchHostelData:fetchAllData,
  });
  return (
    <div className="w-full ">
      <hr className="divider w-full" />

      <div className="grid gap-[1rem]  bg-slate-100">
        {forms?.data?.map(form => (
          <div key={form.id}>
            <ApplicationCard form={form as HostelApplicationFormData} />
          </div>
        ))}
      </div>
    </div>
  );
};
