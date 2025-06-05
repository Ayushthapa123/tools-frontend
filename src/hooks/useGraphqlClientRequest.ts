import axios from 'axios';

const GRAPHQL_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL!}/graphql`;

export const useGraphqlClientRequest = <TData, TVariables>(
  query: string,
  options?: RequestInit['headers'],
): ((variables?: TVariables) => Promise<TData>) => {
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
        },
        withCredentials: true,
      },
    );

    if (res.data?.errors) {
      const { message } = res.data?.errors[0] || {};
    }

    return res.data?.data ?? res.data;
  };
};
