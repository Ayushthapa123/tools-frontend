'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  GetRules,
  GetRulesQuery,
  GetRulesQueryVariables,
  CreateRules,
  CreateRulesMutation,
  CreateRulesMutationVariables,
  UpdateRules,
  UpdateRulesMutation,
  UpdateRulesMutationVariables,
  HomestayRules,

} from 'src/gql/graphql';
import { useUserStore } from 'src/store/userStore';
import Button from 'src/components/Button';
import RichTextEditor from 'src/components/RichTextEditor';
import { enqueueSnackbar } from 'notistack';

const Home: React.FC = () => {
 
  const queryGetRules = useGraphqlClientRequest<GetRulesQuery, GetRulesQueryVariables>(
    GetRules.loc?.source?.body!,
  );

  const fetchRules = async () => {
    const res = await queryGetRules();
    return res.getRulesByHomestay;
  };

  const { data: rulesData , isLoading} = useQuery({
    queryKey: ['getRules'],
    queryFn: fetchRules,
  });

  

  return (
    <div className="w-full">
    {!isLoading&&<div>
      <FormContent rulesData={rulesData as HomestayRules} />
      </div>}
    </div>
  );
};

export default Home;


const FormContent = ({rulesData}: {rulesData: HomestayRules | undefined}) => {
  const { user } = useUserStore();
  const editorRef = useRef<string>(rulesData?.data?.rules ?? "<p><br></p>");
  editorRef.current = rulesData?.data?.rules == "<p><br></p>" || rulesData?.data?.rules == null ? "<ol><li> </li></ol>" : rulesData?.data?.rules;
  const [ rules, setRules ] = useState<string | null>(editorRef.current)
  
  const mutateCreateRules = useGraphqlClientRequest<
    CreateRulesMutation,
    CreateRulesMutationVariables
  >(CreateRules.loc?.source.body!);

  const { mutateAsync: createRules, isPending: isCreating } = useMutation({
    mutationFn: mutateCreateRules,
  });

  const mutateUpdateRules = useGraphqlClientRequest<
    UpdateRulesMutation,
    UpdateRulesMutationVariables
  >(UpdateRules.loc?.source.body!);

  const { mutateAsync: updateRules, isPending: isUpdating } = useMutation({
    mutationFn: mutateUpdateRules,
  });

  const queryClient = useQueryClient();
  const handleSubmit = () => {
    if (rulesData?.data?.id) {
      updateRules({
        input: { rules: rules },
        rulesId: Number(rulesData?.data?.id),
      }).then(res => {
        if (res.updateRules.data?.id) {
          enqueueSnackbar('Rules Updated',{variant:"success"})
          queryClient.invalidateQueries({ queryKey: ['getRules'] });
        } else {
          enqueueSnackbar('Something went wrong!',{variant:"error"})
        }
      });
    } else {
      createRules({
        input: { rules:rules ?? "", homestayId: Number(user.homestayId) }, 
      }).then(res => {
        if (res.createRules.data?.id) {
         enqueueSnackbar('Rules Created successfully.',{variant:"success"})
          queryClient.invalidateQueries({ queryKey: ['getRules'] });
        } else {
          enqueueSnackbar('Something went wrong!',{variant:'error'})
        }
      });
    }
  };
  return (
    <div>
      <div className="">
        <RichTextEditor 
          editorRef={editorRef}
          onChange={(value) => {
            setRules(value)
            editorRef.current = value; 
          }}
        />
        { rules  &&  
          <div className="flex justify-end w-full mt-5 relative">
          <Button
            label={rulesData?.data?.id ? 'Update Rules' : 'Create Rules'}
            loading={isCreating || isUpdating}
              className=" w-min"
              disabled={rules === "<ol><li><br></li></ol>" || rulesData?.data?.rules == rules }
            onClick={() => handleSubmit()}
          />
        </div>
        }
      </div>
    </div>
  );
};