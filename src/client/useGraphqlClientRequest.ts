import axios from 'axios';
import { access } from 'fs';
// import { useSession } from 'next-auth/react';
import { useAccessTokenStore } from 'src/store/accessTokenStore';

// TODO: MAKE TS BETTER
// const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_OWN_API_URL ?? "";
const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_SERVER_ENDPOINT!;
//   process.env.NODE_ENV === "production"
//     ? "http://localhost:3000/api/graphql"
//     : "http://localhost:3000/api/graphql";

export const useGraphqlClientRequest = <TData, TVariables>(
  query: string,
  options?: RequestInit['headers'],
): ((variables?: TVariables) => Promise<TData>) => {
  // it is safe to call React Hooks here.
  // const { data: session } = useSession();

  const { accessToken } = useAccessTokenStore();

  return async (variables?: TVariables) => {
    // this is reset token from verify-reset page. response of OTP

    const res = await axios.post(
      GRAPHQL_ENDPOINT,
      JSON.stringify({
        query,
        variables,
      }),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken && {
            Authorization: accessToken ?? `Bearer ${accessToken}`,
          }),
        },
      },
    );

    if (res.data?.errors) {
      const { message } = res.data?.errors[0] || {};
      // throw new Error(message || 'Error…');
      //show snackbar
    }

    return res.data?.data ?? res.data;
  };
};
