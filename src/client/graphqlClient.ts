import { GraphQLClient } from 'graphql-request';

const endpoint = `${process.env.NEXT_PUBLIC_API_URL!}/graphql`;

// ! this is used for server request. Instead we have used axios because it is more flexible for resta and graphQL.
export const graphqlClient = new GraphQLClient(endpoint, {
  fetch: (input, init = {}) => {
    // Ensure cookies are included in requests
    return fetch(input, { ...init, credentials: 'include' });
  },
  headers: {
    // authorization: 'Bearer YOUR_AUTH_TOKEN',
  },
});
