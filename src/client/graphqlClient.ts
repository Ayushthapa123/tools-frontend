// TODO: GET ENDPOINT FROM ENV

import { GraphQLClient, gql } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_SERVER_ENDPOINT ; // Replace with your GraphQL endpoint

export const graphqlClient = new GraphQLClient(endpoint!, {
  headers: {
    authorization: 'Bearer YOUR_AUTH_TOKEN', // If your API requires authentication
  },
});
