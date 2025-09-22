"use client"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { GetApiTokenByUserToken, GetApiTokenByUserTokenQueryVariables, GetApiTokenByUserTokenQuery, UpdateToken, UpdateTokenMutationVariables, UpdateTokenMutation, CreateTokenMutation, CreateTokenMutationVariables, CreateToken } from 'src/gql/graphql';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { useUserStore } from 'src/store/userStore';




type ApiTokenData = GetApiTokenByUserTokenQuery['getTokenByUserToken']['data'];

export const GeminiApiKeySection = () => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [geminiLoading, setGeminiLoading] = useState(false);
  const [geminiMessage, setGeminiMessage] = useState('');

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

  const { mutateAsync: mutateCreateTokenAsync } = useMutation({
    mutationFn: createTokenMutation,
  });

  const handleCreateToken = async () => {
    mutateCreateTokenAsync({
      createTokenInput: {
        gemenaiToken: geminiApiKey,
        gptToken: '',
        userId: user?.userId ?? 0,
      },
    })
      .then(res => {
        if (res.createToken.error) {
          setGeminiMessage(`Error: ${res.createToken.error.message}`);
        } else {
          setGeminiMessage('Gemini API key created successfully!');
          setGeminiApiKey('');
          queryClient.invalidateQueries({ queryKey: ['getApiTokenByUserToken'] });
        }
      })
      .catch(() => {
        setGeminiMessage('Failed to create Gemini API key');
      });
  };

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
        },
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

  return (
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
            onChange={e => setGeminiApiKey(e.target.value)}
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
  );
};