"use client"
import { useQuery } from '@tanstack/react-query';
import { GetApiTokenByUserToken, GetApiTokenByUserTokenQueryVariables, GetApiTokenByUserTokenQuery, UpdateToken, UpdateTokenMutationVariables, UpdateTokenMutation, CreateTokenMutation, CreateTokenMutationVariables, CreateToken } from 'src/gql/graphql';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { GeminiApiKeySection } from './GemenaiApiTokenSection';
import { GptApiKeySection } from './GptApiTokenSection';



export default function SettingsPage() {

  const queryApiToken = useGraphqlClientRequest<
    GetApiTokenByUserTokenQuery,
    GetApiTokenByUserTokenQueryVariables
  >(GetApiTokenByUserToken.loc?.source?.body!);
    // Fetch API tokens
    const fetchData = async () => {
      const res = await queryApiToken();
      return res.getTokenByUserToken.data;
    };
  
    const { data: apiToken } = useQuery({
      queryKey: ['getApiTokenByUserToken'],
      queryFn: fetchData,
    });

  
  

  return (
    <div className="relative mx-auto h-auto w-full max-w-[2100px] bg-base-100">
      <main className="relative p-2">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">API Settings</h1>
          
          <div className="space-y-4">
            <GeminiApiKeySection />
            <GptApiKeySection apiToken={apiToken} />
          </div>
        </div>
      </main>
    </div>
  );
} 


