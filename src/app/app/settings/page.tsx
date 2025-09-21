"use client"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { GetApiTokenByUserToken, GetApiTokenByUserTokenQueryVariables, GetApiTokenByUserTokenQuery, UpdateToken, UpdateTokenMutationVariables, UpdateTokenMutation, CreateTokenMutation, CreateTokenMutationVariables, CreateToken } from 'src/gql/graphql';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { useUserStore } from 'src/store/userStore';

export default function SettingsPage() {
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [gptApiKey, setGptApiKey] = useState('');
  const [geminiLoading, setGeminiLoading] = useState(false);
  const [gptLoading, setGptLoading] = useState(false);
  const [geminiMessage, setGeminiMessage] = useState('');
  const [gptMessage, setGptMessage] = useState('');

  const queryClient = useQueryClient(); 
  const { user } = useUserStore();

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

  const updateTokenMutation = useGraphqlClientRequest<
    UpdateTokenMutation,
    UpdateTokenMutationVariables
  >(UpdateToken.loc?.source?.body!);


  const createTokenMutation = useGraphqlClientRequest<
  CreateTokenMutation,
  CreateTokenMutationVariables
>(CreateToken.loc?.source?.body!); 

const {mutateAsync:mutateCreateTokenAsync}=useMutation({
  mutationFn: createTokenMutation,
});

const handleCreateToken = async () => {
 mutateCreateTokenAsync({
    createTokenInput: {
      gemenaiToken: geminiApiKey,
      gptToken: gptApiKey,
      userId: user?.userId ??0,
    },
  }).then((res) => {
    if (res.createToken.error) {
      setGeminiMessage(`Error: ${res.createToken.error.message}`);
    } else {
      setGeminiMessage('Gemini API key created successfully!');
      setGeminiApiKey('');
    }
  }).catch((error) => {
    setGeminiMessage('Failed to create Gemini API key');
  });
};

  // Update Gemini API key
  const handleUpdateGeminiKey = async () => {
    if (!geminiApiKey.trim()) {
      setGeminiMessage('Please enter a valid API key');
      return;
    }

    if (!apiToken?.id) {
      setGeminiMessage('No API token found. Please try again later.');
      return;
    }

    setGeminiLoading(true);
    setGeminiMessage('');

    try {
      const res = await updateTokenMutation({
        updateTokenInput: {
          id: parseFloat(apiToken.id),
          gemenaiToken: geminiApiKey,
        }
      });

      if (res.updateToken.error) {
        setGeminiMessage(`Error: ${res.updateToken.error.message}`);
      } else {
        setGeminiMessage('Gemini API key updated successfully!');
        setGeminiApiKey('');
        queryClient.invalidateQueries({ queryKey: ['getApiTokenByUserToken'] });
      }
    } catch (error) {
      setGeminiMessage('Failed to update Gemini API key');
    } finally {
      setGeminiLoading(false);
    }
  };

  // Update GPT API key
  const handleUpdateGptKey = async () => {
    if (!gptApiKey.trim()) {
      setGptMessage('Please enter a valid API key');
      return;
    }

    if (!apiToken?.id) {
      setGptMessage('No API token found. Please try again later.');
      return;
    }

    setGptLoading(true);
    setGptMessage('');

    try {
      const res = await updateTokenMutation({
        updateTokenInput: {
          id: parseFloat(apiToken.id),
          gptToken: gptApiKey,
        }
      });

      if (res.updateToken.error) {
        setGptMessage(`Error: ${res.updateToken.error.message}`);
      } else {
        setGptMessage('GPT API key updated successfully!');
        setGptApiKey('');
        queryClient.invalidateQueries({ queryKey: ['getApiTokenByUserToken'] });
      }
    } catch (error) {
      setGptMessage('Failed to update GPT API key');
    } finally {
      setGptLoading(false);
    }
  };

  return (
    <div className="relative mx-auto h-auto w-full max-w-[2100px] bg-base-100">
      <main className="relative p-2">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">API Settings</h1>
          
          <div className="space-y-4">
            {/* Gemini API Key Section */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-xl mb-2">Gemini API Key</h2>
                <p className="text-sm text-base-content/70 mb-2">
                  Enter your Google Gemini API key to enable Gemini-powered features.
                </p>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Current Gemini API Key</span>
                  </label>
                  <input 
                    type="text" 
                    value={apiToken?.gemenaiToken ? '••••••••••••••••' : 'Not set'} 
                    className="input input-bordered w-full" 
                    disabled 
                  />
                </div>

                <div className="form-control mt-2">
                  <label className="label">
                    <span className="label-text">New Gemini API Key</span>
                  </label>
                  <input 
                    type="password" 
                    placeholder="Enter your Gemini API key"
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                    className="input input-bordered w-full" 
                  />
                </div>

                {geminiMessage && (
                  <div className={`alert mt-4 ${geminiMessage.includes('Error') || geminiMessage.includes('Failed') ? 'alert-error' : 'alert-success'}`}>
                    <span>{geminiMessage}</span>
                  </div>
                )}

                <div className="card-actions justify-end mt-2">
                  <button 
                    className={`btn btn-primary ${geminiLoading ? 'loading' : ''}`}
                    onClick={apiToken?.id ? handleUpdateGeminiKey : handleCreateToken}
                    disabled={geminiLoading || !geminiApiKey.trim()}
                  >
                    {geminiLoading ? 'Updating...' : 'Update Gemini Key'}
                  </button>
                </div>
              </div>
            </div>

            {/* GPT API Key Section */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-xl mb-2">GPT API Key</h2>
                <p className="text-sm text-base-content/70 mb-4">
                  Enter your OpenAI GPT API key to enable GPT-powered features.
                </p>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Current GPT API Key</span>
                  </label>
                  <input 
                    type="text" 
                    value={apiToken?.gptToken ? '••••••••••••••••' : 'Not set'} 
                    className="input input-bordered w-full" 
                    disabled 
                  />
                </div>

                <div className="form-control mt-2">
                  <label className="label">
                    <span className="label-text">New GPT API Key</span>
                  </label>
                  <input 
                    type="password" 
                    placeholder="Enter your GPT API key"
                    value={gptApiKey}
                    onChange={(e) => setGptApiKey(e.target.value)}
                    className="input input-bordered w-full"  
                    disabled
                  />
                </div>

                {gptMessage && (
                  <div className={`alert mt-4 ${gptMessage.includes('Error') || gptMessage.includes('Failed') ? 'alert-error' : 'alert-success'}`}>
                    <span>{gptMessage}</span>
                  </div>
                )}

                <div className="card-actions justify-end mt-2">
                  <button 
                    className={`btn btn-primary ${gptLoading ? 'loading' : ''}`}
                    onClick={handleUpdateGptKey}
                    disabled={gptLoading || !gptApiKey.trim()}
                  >
                    {gptLoading ? 'Updating...' : 'Update GPT Key'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}