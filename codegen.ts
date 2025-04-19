import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3003/graphql',

  documents: ['src/**/*.graphql'],
  // "documents: ['components/**/*.tsx', 'app/**/*.tsx'],"
  ignoreNoDocuments: true,
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [
        'typescript-document-nodes',
        // "typescript",
        // "typescript-operations",
      ],
      config: {
        nameSuffix: 'Query',
        // noGraphQLTag: true,
        // noExport: true,
      },
    },
  },
};

export default config;
