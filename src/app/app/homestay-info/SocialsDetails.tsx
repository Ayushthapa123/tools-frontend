// 'use client';
// import React, { FC } from 'react';

// import Button from 'src/components/Button';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { useForm } from 'react-hook-form';
// import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
// import TextInput from 'src/features/react-hook-form/TextField';

// import { useToastStore } from 'src/store/toastStore';

// import {
//   CreateSocials,
//   CreateSocialsMutation,
//   CreateSocialsMutationVariables,
//   GetSocialsByHostelId,
//   GetSocialsByHostelIdQuery,
//   GetSocialsByHostelIdQueryVariables,
//   UpdateSocials,
//   UpdateSocialsMutation,
//   UpdateSocialsMutationVariables,
// } from 'src/gql/graphql';
// import LoadingSpinner from 'src/components/Loading';

// interface Iprops {
//   hostelId: number;
// }
// export const SocialsDetails = (props: Iprops) => {
//   const { hostelId } = props;
//   const querySocialData = useGraphqlClientRequest<
//     GetSocialsByHostelIdQuery,
//     GetSocialsByHostelIdQueryVariables
//   >(GetSocialsByHostelId.loc?.source?.body!);

//   //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
//   const fetchData = async () => {
//     const res = await querySocialData({ hostelId: hostelId });
//     return res.getSocialsByHostelId;
//   };

//   const { data: hostelData, isLoading } = useQuery({
//     queryKey: ['getSocials'],
//     queryFn: fetchData,
//   });

//   return (
//     <div className="    w-full">
//       {!isLoading ? (
//         <HostelInfoForm
//           hostelId={hostelId}
//           socialsId={hostelData?.socialsId}
//           facebook={hostelData?.facebook}
//           instagram={hostelData?.instaGram}
//           tiktok={hostelData?.tiktok}
//           youtube={hostelData?.youTube}
//           map={hostelData?.map}
//         />
//       ) : (
//         <div className=" h-[50vh] w-full">
//           <LoadingSpinner color='primary' size='lg' />
//         </div>
//       )}
//     </div>
//   );
// };

// interface IProps {
//   hostelId: number;
//   socialsId?: string | null;

//   facebook?: string | null;

//   instagram?: string | null;
//   tiktok?: string | null;
//   youtube?: string | null;
//   map?: string | null;
// }

// const HostelInfoForm: FC<IProps> = props => {
//   const { hostelId, facebook, instagram, map, socialsId, tiktok, youtube } = props;

//   const queryClient = useQueryClient();

//   const { setMessage, setRole, setShowToast } = useToastStore();
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<IProps>({
//     defaultValues: {
//       facebook,
//       instagram,
//       map,
//       tiktok,
//       youtube,
//     },
//   });

//   const mutateCreateSocial = useGraphqlClientRequest<
//     CreateSocialsMutation,
//     CreateSocialsMutationVariables
//   >(CreateSocials.loc?.source.body!);

//   const { mutateAsync: createSocials, isPending: isCreating } = useMutation({
//     mutationFn: mutateCreateSocial,
//   });

//   const mutateUpdateSocials = useGraphqlClientRequest<
//     UpdateSocialsMutation,
//     UpdateSocialsMutationVariables
//   >(UpdateSocials.loc?.source.body!);

//   const { mutateAsync: updateAddress, isPending: isUpdating } = useMutation({
//     mutationFn: mutateUpdateSocials,
//   });

//   const handleSubmitForm = (data: IProps) => {
//     const facebook = data.facebook;
//     const instagram = data.instagram;
//     const tiktok = data.tiktok;
//     const youtube = data.youtube;

//     const map = data.map;

//     if (socialsId) {
//       //
//       updateAddress({
//         socialsId: Number(socialsId),
//         input: {
//           ...(facebook && {
//             facebook,
//           }),
//           ...(instagram && {
//             instaGram: instagram,
//           }),
//           ...(tiktok && {
//             tiktok,
//           }),
//           ...(youtube && {
//             youtube,
//           }),
//           ...(map && {
//             map,
//           }),
//         },
//       }).then(res => {
//         if (res?.updateSocials?.socialsId) {
//           setShowToast(true);
//           setMessage('Socials Updated');
//           setRole('success');
//         } else {
//           setShowToast(true);
//           setMessage('Something went wrong!');
//           setRole('error');
//         }
//       });
//     } else {
//       createSocials({
//         input: {
//           hostelId: hostelId,
//           facebook: facebook ?? '',
//           instaGram: instagram ?? '',
//           map,
//           tiktok,
//           youtube,
//         },
//       }).then(res => {
//         if (res?.createSocials?.socialsId) {
//           setShowToast(true);
//           setMessage('Socials created');
//           setRole('success');
//           //
//           queryClient.invalidateQueries({ queryKey: ['getSocials'] });
//           queryClient.invalidateQueries({ queryKey: ['getHostelByToken'] });
//         } else {
//           setShowToast(true);
//           setMessage('Something Went Wrong!');
//           setRole('error');
//         }
//       });
//     }
//   };

//   return (
//     <form className=" w-full" onSubmit={handleSubmit(handleSubmitForm)}>
//       <div className=" grid w-full gap-[1rem] md:grid-cols-2">
//         <div>
//           <TextInput
//             name="facebook"
//             type="url"
//             placeholder="Facebook Url"
//             control={control}
//             label="Facebook Url"
//             error={!!errors.facebook}
//           />
//         </div>
//         <div>
//           <TextInput
//             name="instagram"
//             type="url"
//             placeholder="Instagram Url"
//             control={control}
//             label="Instagram Url"
//             error={!!errors.instagram}
//           />
//         </div>
//         <div>
//           <TextInput
//             name="tiktok"
//             type="url"
//             placeholder="Tiktok Url"
//             control={control}
//             label="Tiktok Url"
//             error={!!errors.tiktok}
//           />
//         </div>
//         <div>
//           <TextInput
//             name="youtube"
//             type="url"
//             placeholder="Youtube Url"
//             control={control}
//             label="Youtube Url"
//             error={!!errors.youtube}
//           />
//         </div>
//         <div>
//           <TextInput
//             name="map"
//             type="url"
//             placeholder="Google map Url"
//             control={control}
//             label="Google Map"
//             error={!!errors.map}
//           />
//         </div>
//       </div>

//       <div className=" flex w-full justify-end">
//         <div className=" mt-10 w-[200px]">
//           <Button
//             label={`${socialsId ? 'Update Socials Info' : 'Create Socials'}`}
//             type="submit"
//             loading={isCreating || isUpdating}
//           />
//         </div>
//       </div>
//     </form>
//   );
// };
