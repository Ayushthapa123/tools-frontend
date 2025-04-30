import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_SERVER_ENDPOINT!;

export const graphqlClient = new GraphQLClient(endpoint, {
  fetch: (input, init = {}) => {
    // Ensure cookies are included in requests
    return fetch(input, { ...init, credentials: 'include' });
  },
  headers: {
    // authorization: 'Bearer YOUR_AUTH_TOKEN',
  },
});