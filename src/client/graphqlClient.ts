import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_SERVER_ENDPOINT!;

// ! this is not used anymore. Instead we have used axios because it is more flexible for resta and graphQL.
export const graphqlClient = new GraphQLClient(endpoint, {
  fetch: (input, init = {}) => {
    // Ensure cookies are included in requests
    return fetch(input, { ...init, credentials: 'include' });
  },
  headers: {
    // authorization: 'Bearer YOUR_AUTH_TOKEN',
  },
});