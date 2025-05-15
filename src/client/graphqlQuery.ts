import axios, { AxiosError } from 'axios';

const GRAPHQL_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL!}/graphql`;

  // ! this is not used anymore. Instead we have used axios because it is more flexible for resta and graphQL.
export const graphqlQuery = <TData, TVariables>(
  query: string,
  options?: { [key: string]: any },
): ((variables?: TVariables) => Promise<TData>) => {
  // it is safe to call React Hooks here.

  const headers: HeadersInit = {};
  if (options?.accessToken) {
    // headers.Authorization = `Bearer ${options?.accessToken}`;
  }

  return async (variables?: TVariables) => {
    try {
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
            ...headers,
            ...(options as any),
          },
          withCredentials: true,
        },
      );

      if (res.data?.errors) {
        const { message } = res.data?.errors[0] || {};
        throw new Error(message || 'Error…');
      }
      return res.data?.data ?? res.data;
    } catch (e: any) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data?.errors[0].message || 'Something went wrong');
      }
      throw new Error(e?.message || 'Something went wrong');
    }
  };
};
