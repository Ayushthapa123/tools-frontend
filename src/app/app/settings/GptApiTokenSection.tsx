"use client"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { GetApiTokenByUserToken, GetApiTokenByUserTokenQueryVariables, GetApiTokenByUserTokenQuery, UpdateToken, UpdateTokenMutationVariables, UpdateTokenMutation, CreateTokenMutation, CreateTokenMutationVariables, CreateToken } from 'src/gql/graphql';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { useUserStore } from 'src/store/userStore';

type ApiTokenData = GetApiTokenByUserTokenQuery['getTokenByUserToken']['data'];


export const GptApiKeySection = ({ apiToken }: { apiToken?: ApiTokenData }) => {
  const queryClient = useQueryClient();
  const [gptApiKey, setGptApiKey] = useState('');
  const [gptLoading, setGptLoading] = useState(false);
  const [gptMessage, setGptMessage] = useState('');

  const updateTokenMutation = useGraphqlClientRequest<
    UpdateTokenMutation,
    UpdateTokenMutationVariables
  >(UpdateToken.loc?.source?.body!);

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
        },
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
            onChange={e => setGptApiKey(e.target.value)}
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
  );
};