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
import { useToastStore } from 'src/store/toastStore';
import { useUserStore } from 'src/store/userStore';
import Button from 'src/components/Button';
import RichTextEditor from 'src/components/RichTextEditor';

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
  const { setMessage, setRole, setShowToast } = useToastStore();
  const { user } = useUserStore();
  const editorRef = useRef(rulesData?.rules ?? '');
  console.log("txt",editorRef.current)



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
    if (rulesData?.id) {
      updateRules({
        input: { rules: editorRef.current },
        rulesId: Number(rulesData?.id),
      }).then(res => {
        if (res.updateRules.id) {
          setShowToast(true);
          setRole('success');
          setMessage('Rules Updated');
          queryClient.invalidateQueries({ queryKey: ['getRules'] });
        } else {
          setShowToast(false);
          setRole('error');
          setMessage('Something went wrong!');
        }
      });
    } else {
      createRules({
        input: { rules: editorRef.current, homestayId: Number(user.homestayId) }, 
      }).then(res => {
        if (res.createRules.id) {
          setShowToast(true);
          setRole('success');
          setMessage('Rules Created');
          queryClient.invalidateQueries({ queryKey: ['getRules'] });
        } else {
          setShowToast(false);
          setRole('error');
          setMessage('Something went wrong!');
        }
      });
    }
  };
  const [rules,setRules] = useState<string|null>(null)
  return (
    <div>
      <div className="">
         <RichTextEditor 
          editorRef={editorRef}
          onChange={(value) => {
            setRules(value);
          editorRef.current = value;
          }}
        />
        {rules  &&  
          <div className="flex justify-end w-full mt-5 relative">
          <Button
            label={rulesData?.id ? 'Update Rules' : 'Create Rules'}
            loading={isCreating || isUpdating}
            className=" w-min"
            onClick={() => handleSubmit()}
          />
        </div>
        }
      </div>
    </div>
  );
};