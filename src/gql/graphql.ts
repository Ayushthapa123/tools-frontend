/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type CagData = {
  __typename?: 'CAGData';
  category: Scalars['String']['output'];
  items: Array<Scalars['String']['output']>;
};

export type CagList = {
  __typename?: 'CAGList';
  data?: Maybe<Array<CagData>>;
  error?: Maybe<GraphQlError>;
  pagination?: Maybe<Pagination>;
  personalizedCustomerAvatar?: Maybe<Scalars['String']['output']>;
};

export type ChangePasswordInput = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type CreateInputSchema = {
  schema: Scalars['String']['input'];
  toolId: Scalars['Float']['input'];
};

export type CreateToolInput = {
  description: Scalars['String']['input'];
  handle?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId?: InputMaybe<Scalars['Int']['input']>;
  ranking?: InputMaybe<Scalars['Int']['input']>;
  shortDescription: Scalars['String']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  toolType?: InputMaybe<Scalars['String']['input']>;
  verifiedBySuperAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  visibility?: InputMaybe<Scalars['String']['input']>;
};

export type CreateToolMetaDataDto = {
  description: Scalars['String']['input'];
  keywords: Scalars['String']['input'];
  ogDescription: Scalars['String']['input'];
  ogImageUrl: Scalars['String']['input'];
  ogTitle: Scalars['String']['input'];
  title: Scalars['String']['input'];
  toolId: Scalars['Float']['input'];
};

export type CreateUserInput = {
  altPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  gender?: InputMaybe<GenderType>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  userType?: UserType;
};

export type Ctx = {
  __typename?: 'Ctx';
  sub: Scalars['Float']['output'];
  userType: UserType;
};

export type CustomerAvatarGeneratorInput = {
  businessDescription: Scalars['String']['input'];
  businessName: Scalars['String']['input'];
};

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  id: Scalars['Float']['output'];
};

export enum GenderType {
  Boys = 'BOYS',
  Girls = 'GIRLS',
  Others = 'OTHERS'
}

export type GoogleOauthUrl = {
  __typename?: 'GoogleOauthUrl';
  url: Scalars['String']['output'];
};

export type GraphQlError = {
  __typename?: 'GraphQLError';
  code?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  path?: Maybe<Scalars['String']['output']>;
};

export type IoGeneric = {
  __typename?: 'IOGeneric';
  data?: Maybe<IoGenericData>;
  error?: Maybe<GraphQlError>;
  pagination?: Maybe<Pagination>;
};

export type IoGenericData = {
  __typename?: 'IOGenericData';
  htmlResponse: Scalars['String']['output'];
};

export type IoGenericInput = {
  data: Scalars['JSON']['input'];
  schema: Scalars['JSON']['input'];
};

export type InputSchema = {
  __typename?: 'InputSchema';
  data?: Maybe<InputSchemaData>;
  error?: Maybe<GraphQlError>;
  pagination?: Maybe<Pagination>;
};

export type InputSchemaData = {
  __typename?: 'InputSchemaData';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  schema: Scalars['JSON']['output'];
  toolId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: Scalars['String']['output'];
  createInputSchema: InputSchema;
  createTool: Tool;
  createToolMetaData: ToolMetadata;
  createUser: User;
  deleteTool: Tool;
  forgotPassword: ForgotPasswordResponse;
  getCustomerAvatar: CagList;
  getTravelBudget: TbcList;
  getTravelChecklist: TcgList;
  getTravelDestination: TdfList;
  loginUser: UsersAndToken;
  logout: LogoutResponse;
  processGenericIO: IoGeneric;
  refreshTokens: UsersHostelIdAndToken;
  removeInputSchema: InputSchema;
  removeToolMetaData: ToolMetadata;
  resendVerificationMail: Scalars['Boolean']['output'];
  resetPassword: UsersAndToken;
  sendCustomEmail: Scalars['Boolean']['output'];
  signUpWithGoogle: UsersAndToken;
  signupUser: UsersAndToken;
  updateInputSchema: InputSchema;
  updateTool: Tool;
  updateToolMetaData: ToolMetadata;
  updateUser: User;
  verifyEmail: VerifyEmailResponse;
  verifyTool: Tool;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
  userId: Scalars['Float']['input'];
};


export type MutationCreateInputSchemaArgs = {
  createInputSchemaInput: CreateInputSchema;
};


export type MutationCreateToolArgs = {
  data: CreateToolInput;
};


export type MutationCreateToolMetaDataArgs = {
  createToolMetaDataInput: CreateToolMetaDataDto;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteToolArgs = {
  toolId: Scalars['Float']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationGetCustomerAvatarArgs = {
  input: CustomerAvatarGeneratorInput;
};


export type MutationGetTravelBudgetArgs = {
  input: TravelBudgetCalculatorInput;
};


export type MutationGetTravelChecklistArgs = {
  input: TravelChecklistGeneratorInput;
};


export type MutationGetTravelDestinationArgs = {
  input: TravelDestinationFinderInput;
};


export type MutationLoginUserArgs = {
  input: LoginInput;
};


export type MutationProcessGenericIoArgs = {
  input: IoGenericInput;
};


export type MutationRemoveInputSchemaArgs = {
  id: Scalars['Float']['input'];
};


export type MutationRemoveToolMetaDataArgs = {
  id: Scalars['Float']['input'];
};


export type MutationResendVerificationMailArgs = {
  id: Scalars['Float']['input'];
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSendCustomEmailArgs = {
  email: Scalars['String']['input'];
  htmlContent: Scalars['String']['input'];
  name: Scalars['String']['input'];
  subject: Scalars['String']['input'];
};


export type MutationSignUpWithGoogleArgs = {
  input: SignupWithGoogleInput;
};


export type MutationSignupUserArgs = {
  input: SignupInput;
};


export type MutationUpdateInputSchemaArgs = {
  updateInputSchemaInput: UpdateInputSchema;
};


export type MutationUpdateToolArgs = {
  data: UpdateToolInput;
  toolId: Scalars['Float']['input'];
};


export type MutationUpdateToolMetaDataArgs = {
  updateToolMetaDataInput: UpdateToolMetaDataDto;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};


export type MutationVerifyToolArgs = {
  status: Scalars['Boolean']['input'];
  toolId: Scalars['Int']['input'];
};

export type OutputSchemaData = {
  __typename?: 'OutputSchemaData';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  schema: Scalars['String']['output'];
  toolId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Pagination = {
  __typename?: 'Pagination';
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  findInputSchemaByToolId: InputSchema;
  getAllTools: ToolArrayResponse;
  getGoogleAuthUrl: GoogleOauthUrl;
  getToolById?: Maybe<Tool>;
  getToolBySlug?: Maybe<Tool>;
  getToolMetaDataByToolId: ToolMetadata;
  getToolsByUserToken: ToolArrayResponse;
  getUserByAccessToken?: Maybe<User>;
  getUserById?: Maybe<User>;
  getUsers: Array<User>;
  sendVerificationEmail: Scalars['Boolean']['output'];
};


export type QueryFindInputSchemaByToolIdArgs = {
  toolId: Scalars['Float']['input'];
};


export type QueryGetAllToolsArgs = {
  isSuperAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  pageNumber?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
};


export type QueryGetToolByIdArgs = {
  toolId: Scalars['Float']['input'];
};


export type QueryGetToolBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryGetToolMetaDataByToolIdArgs = {
  toolId: Scalars['Float']['input'];
};


export type QueryGetToolsByUserTokenArgs = {
  pageNumber?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
};


export type QueryGetUserByAccessTokenArgs = {
  accessToken: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QuerySendVerificationEmailArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type ResetPasswordInput = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type SignupInput = {
  altPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  gender?: InputMaybe<GenderType>;
  password: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  userType?: InputMaybe<UserType>;
};

export type SignupWithGoogleInput = {
  token: Scalars['String']['input'];
};

export type TbcList = {
  __typename?: 'TBCList';
  data?: Maybe<Array<TbcData>>;
  error?: Maybe<GraphQlError>;
  pagination?: Maybe<Pagination>;
  personalizedTravelGuide?: Maybe<Scalars['String']['output']>;
};

export type TcgData = {
  __typename?: 'TCGData';
  category: Scalars['String']['output'];
  items: Array<Scalars['String']['output']>;
};

export type TcgList = {
  __typename?: 'TCGList';
  data?: Maybe<Array<TcgData>>;
  error?: Maybe<GraphQlError>;
  pagination?: Maybe<Pagination>;
  personalizedTravelGuide?: Maybe<Scalars['String']['output']>;
};

export type TdfData = {
  __typename?: 'TDFData';
  activitiesToDo: Array<Scalars['String']['output']>;
  destinationCountry: Scalars['String']['output'];
  destinationPlace: Scalars['String']['output'];
  expectedCost: Scalars['String']['output'];
  shortGuide: Scalars['String']['output'];
};

export type TdfList = {
  __typename?: 'TDFList';
  data?: Maybe<Array<TdfData>>;
  error?: Maybe<GraphQlError>;
  pagination?: Maybe<Pagination>;
  personalizedTravelGuide?: Maybe<Scalars['String']['output']>;
};

export type TbcData = {
  __typename?: 'TbcData';
  category: Scalars['String']['output'];
  cost: Scalars['Int']['output'];
  currency: Scalars['String']['output'];
  per: Scalars['String']['output'];
  shortGuide: Scalars['String']['output'];
};

export type Token = {
  __typename?: 'Token';
  accessToken: Scalars['ID']['output'];
  refreshToken: Scalars['String']['output'];
};

export type Tool = {
  __typename?: 'Tool';
  data?: Maybe<ToolData>;
  error?: Maybe<GraphQlError>;
  pagination?: Maybe<Pagination>;
};

export type ToolArrayResponse = {
  __typename?: 'ToolArrayResponse';
  data: Array<ToolData>;
  error?: Maybe<GraphQlError>;
};

export type ToolData = {
  __typename?: 'ToolData';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  handle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  inputSchema?: Maybe<InputSchemaData>;
  name: Scalars['String']['output'];
  outputSchema?: Maybe<OutputSchemaData>;
  owner?: Maybe<UserData>;
  ownerId: Scalars['Int']['output'];
  ranking?: Maybe<Scalars['Int']['output']>;
  shortDescription?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  thumbnailUrl?: Maybe<Scalars['String']['output']>;
  toolMetadata?: Maybe<ToolMetadataData>;
  toolType: ToolType;
  updatedAt: Scalars['DateTime']['output'];
  verifiedBySuperAdmin: Scalars['Boolean']['output'];
  visibility: VisibilityType;
};

export type ToolMetadata = {
  __typename?: 'ToolMetadata';
  data?: Maybe<ToolMetadataData>;
  error?: Maybe<GraphQlError>;
  pagination?: Maybe<Pagination>;
};

export type ToolMetadataData = {
  __typename?: 'ToolMetadataData';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  keywords?: Maybe<Scalars['String']['output']>;
  ogDescription?: Maybe<Scalars['String']['output']>;
  ogImageUrl?: Maybe<Scalars['String']['output']>;
  ogTitle?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  toolId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum ToolType {
  Curd = 'CURD',
  Io = 'IO'
}

export type TravelBudgetCalculatorInput = {
  accomodationType: Scalars['String']['input'];
  date: Scalars['DateTime']['input'];
  numberOfDays: Scalars['Float']['input'];
  purpose: Scalars['String']['input'];
  startCity: Scalars['String']['input'];
  startCountry: Scalars['String']['input'];
  travelCity: Scalars['String']['input'];
  travelCountry: Scalars['String']['input'];
  travelStyle: Scalars['String']['input'];
};

export type TravelChecklistGeneratorInput = {
  date: Scalars['DateTime']['input'];
  destinationCity: Scalars['String']['input'];
  destinationCountry: Scalars['String']['input'];
  purpose: Scalars['String']['input'];
  startCity: Scalars['String']['input'];
  startCountry: Scalars['String']['input'];
  travelActivities: Array<Scalars['String']['input']>;
  travelCompanionType: Scalars['String']['input'];
  travelDuration: Scalars['String']['input'];
  travelType: Scalars['String']['input'];
};

export type TravelDestinationFinderInput = {
  date: Scalars['DateTime']['input'];
  purpose: Scalars['String']['input'];
  startCity: Scalars['String']['input'];
  startCountry: Scalars['String']['input'];
  travelActivities: Array<Scalars['String']['input']>;
  travelBudgetUSD: Scalars['String']['input'];
  travelCompanionType: Scalars['String']['input'];
  travelDuration: Scalars['String']['input'];
  travelType: Scalars['String']['input'];
};

export type UpdateInputSchema = {
  id: Scalars['Float']['input'];
  schema: Scalars['String']['input'];
  toolId?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateToolInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  handle?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['Int']['input']>;
  ranking?: InputMaybe<Scalars['Int']['input']>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  thumbnailUrl?: InputMaybe<Scalars['String']['input']>;
  toolType?: InputMaybe<Scalars['String']['input']>;
  verifiedBySuperAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  visibility?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateToolMetaDataDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  keywords?: InputMaybe<Scalars['String']['input']>;
  ogDescription?: InputMaybe<Scalars['String']['input']>;
  ogImageUrl?: InputMaybe<Scalars['String']['input']>;
  ogTitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  toolId?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateUserInput = {
  altPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<GenderType>;
  id: Scalars['Int']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  userType?: InputMaybe<UserType>;
};

export type User = {
  __typename?: 'User';
  data?: Maybe<UserData>;
  error?: Maybe<GraphQlError>;
  pagination?: Maybe<Pagination>;
};

export type UserData = {
  __typename?: 'UserData';
  altPhoneNumber?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  gender?: Maybe<GenderType>;
  hashedRefreshToken?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isVerified: Scalars['Boolean']['output'];
  passwordHash?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  profilePicture?: Maybe<Scalars['String']['output']>;
  tools?: Maybe<Array<ToolData>>;
  updatedAt: Scalars['DateTime']['output'];
  userType: UserType;
};

export enum UserType {
  Admin = 'ADMIN',
  Creator = 'CREATOR',
  User = 'USER'
}

export type UsersAndToken = {
  __typename?: 'UsersAndToken';
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  token: Token;
  userType: Scalars['String']['output'];
};

export type UsersHostelIdAndToken = {
  __typename?: 'UsersHostelIdAndToken';
  token: Token;
  user: UserData;
};

export type VerifyEmailInput = {
  token: Scalars['String']['input'];
};

export type VerifyEmailResponse = {
  __typename?: 'VerifyEmailResponse';
  id: Scalars['Float']['output'];
};

export enum VisibilityType {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type ChangePasswordMutationVariables = Exact<{
  userId: Scalars['Float']['input'];
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: string };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById?: { __typename?: 'User', data?: { __typename?: 'UserData', id: string, isVerified: boolean, fullName: string, email: string, phoneNumber?: string | null, altPhoneNumber?: string | null, gender?: GenderType | null, dateOfBirth?: any | null, profilePicture?: string | null } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } | null };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', data?: { __typename?: 'UserData', id: string, fullName: string, email: string, phoneNumber?: string | null, altPhoneNumber?: string | null, gender?: GenderType | null, dateOfBirth?: any | null, profilePicture?: string | null } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type ProcessGenericIoMutationVariables = Exact<{
  input: IoGenericInput;
}>;


export type ProcessGenericIoMutation = { __typename?: 'Mutation', processGenericIO: { __typename?: 'IOGeneric', data?: { __typename?: 'IOGenericData', htmlResponse: string } | null, error?: { __typename?: 'GraphQLError', message: string } | null } };

export type CreateInputSchemaMutationVariables = Exact<{
  data: CreateInputSchema;
}>;


export type CreateInputSchemaMutation = { __typename?: 'Mutation', createInputSchema: { __typename?: 'InputSchema', data?: { __typename?: 'InputSchemaData', id: string } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null, path?: string | null } | null } };

export type CreateToolMutationVariables = Exact<{
  data: CreateToolInput;
}>;


export type CreateToolMutation = { __typename?: 'Mutation', createTool: { __typename?: 'Tool', data?: { __typename?: 'ToolData', id: string, name: string, slug: string } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null, path?: string | null } | null } };

export type CreateToolMetaDataMutationVariables = Exact<{
  createToolMetaDataInput: CreateToolMetaDataDto;
}>;


export type CreateToolMetaDataMutation = { __typename?: 'Mutation', createToolMetaData: { __typename?: 'ToolMetadata', data?: { __typename?: 'ToolMetadataData', id: string } | null } };

export type DeleteToolMutationVariables = Exact<{
  toolId: Scalars['Float']['input'];
}>;


export type DeleteToolMutation = { __typename?: 'Mutation', deleteTool: { __typename?: 'Tool', data?: { __typename?: 'ToolData', id: string } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null, path?: string | null } | null } };

export type GetAllToolsQueryVariables = Exact<{
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  isSuperAdmin?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetAllToolsQuery = { __typename?: 'Query', getAllTools: { __typename?: 'ToolArrayResponse', data: Array<{ __typename?: 'ToolData', id: string, name: string, description?: string | null, shortDescription?: string | null, slug: string, handle: string, thumbnailUrl?: string | null, ranking?: number | null, toolType: ToolType, visibility: VisibilityType, ownerId: number, verifiedBySuperAdmin: boolean, createdAt: any, updatedAt: any, deletedAt?: any | null, owner?: { __typename?: 'UserData', id: string, email: string, fullName: string, profilePicture?: string | null, userType: UserType, isVerified: boolean } | null, inputSchema?: { __typename?: 'InputSchemaData', id: string, schema: any, toolId: number, createdAt: any, updatedAt: any } | null, outputSchema?: { __typename?: 'OutputSchemaData', id: string, schema: string, toolId: number, createdAt: any, updatedAt: any } | null, toolMetadata?: { __typename?: 'ToolMetadataData', id: string, title: string, description: string, keywords?: string | null, ogTitle?: string | null, ogDescription?: string | null, ogImageUrl?: string | null, toolId: number, createdAt: any, updatedAt: any } | null }>, error?: { __typename?: 'GraphQLError', message: string, code?: string | null, path?: string | null } | null } };

export type GetToolsByUserTokenQueryVariables = Exact<{
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetToolsByUserTokenQuery = { __typename?: 'Query', getToolsByUserToken: { __typename?: 'ToolArrayResponse', data: Array<{ __typename?: 'ToolData', id: string, name: string, description?: string | null, shortDescription?: string | null, slug: string, handle: string, thumbnailUrl?: string | null, ranking?: number | null, toolType: ToolType, visibility: VisibilityType, ownerId: number, verifiedBySuperAdmin: boolean, createdAt: any, updatedAt: any, deletedAt?: any | null, owner?: { __typename?: 'UserData', id: string, email: string, fullName: string, profilePicture?: string | null, userType: UserType, isVerified: boolean } | null, inputSchema?: { __typename?: 'InputSchemaData', id: string, schema: any, toolId: number, createdAt: any, updatedAt: any } | null, outputSchema?: { __typename?: 'OutputSchemaData', id: string, schema: string, toolId: number, createdAt: any, updatedAt: any } | null, toolMetadata?: { __typename?: 'ToolMetadataData', id: string, title: string, description: string, keywords?: string | null, ogTitle?: string | null, ogDescription?: string | null, ogImageUrl?: string | null, toolId: number, createdAt: any, updatedAt: any } | null }>, error?: { __typename?: 'GraphQLError', message: string, code?: string | null, path?: string | null } | null } };

export type GetToolBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetToolBySlugQuery = { __typename?: 'Query', getToolBySlug?: { __typename?: 'Tool', data?: { __typename?: 'ToolData', id: string, name: string, description?: string | null, shortDescription?: string | null, slug: string, handle: string, thumbnailUrl?: string | null, ranking?: number | null, toolType: ToolType, visibility: VisibilityType, ownerId: number, verifiedBySuperAdmin: boolean, createdAt: any, updatedAt: any, deletedAt?: any | null, owner?: { __typename?: 'UserData', id: string, email: string, fullName: string, profilePicture?: string | null, userType: UserType, isVerified: boolean } | null, inputSchema?: { __typename?: 'InputSchemaData', id: string, schema: any, toolId: number, createdAt: any, updatedAt: any } | null, outputSchema?: { __typename?: 'OutputSchemaData', id: string, schema: string, toolId: number, createdAt: any, updatedAt: any } | null, toolMetadata?: { __typename?: 'ToolMetadataData', id: string, title: string, description: string, keywords?: string | null, ogTitle?: string | null, ogDescription?: string | null, ogImageUrl?: string | null, toolId: number, createdAt: any, updatedAt: any } | null } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null, path?: string | null } | null } | null };

export type GetToolMetaDataByToolIdQueryVariables = Exact<{
  toolId: Scalars['Float']['input'];
}>;


export type GetToolMetaDataByToolIdQuery = { __typename?: 'Query', getToolMetaDataByToolId: { __typename?: 'ToolMetadata', data?: { __typename?: 'ToolMetadataData', id: string } | null } };

export type UpdateInputSchemaMutationVariables = Exact<{
  data: UpdateInputSchema;
}>;


export type UpdateInputSchemaMutation = { __typename?: 'Mutation', updateInputSchema: { __typename?: 'InputSchema', data?: { __typename?: 'InputSchemaData', id: string } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null, path?: string | null } | null } };

export type UpdateToolMutationVariables = Exact<{
  toolId: Scalars['Float']['input'];
  data: UpdateToolInput;
}>;


export type UpdateToolMutation = { __typename?: 'Mutation', updateTool: { __typename?: 'Tool', data?: { __typename?: 'ToolData', id: string, name: string } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null, path?: string | null } | null } };

export type UpdateToolMetaDataMutationVariables = Exact<{
  updateToolMetaDataInput: UpdateToolMetaDataDto;
}>;


export type UpdateToolMetaDataMutation = { __typename?: 'Mutation', updateToolMetaData: { __typename?: 'ToolMetadata', data?: { __typename?: 'ToolMetadataData', id: string } | null } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ForgotPasswordResponse', id: number } };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'UsersAndToken', email: string, id: string, userType: string, token: { __typename?: 'Token', accessToken: string, refreshToken: string } } };

export type ResendVerificationMailMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type ResendVerificationMailMutation = { __typename?: 'Mutation', resendVerificationMail: boolean };

export type VerifyEmailMutationVariables = Exact<{
  token: VerifyEmailInput;
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename?: 'VerifyEmailResponse', id: number } };

export type LogInUserMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LogInUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'UsersAndToken', email: string, id: string, userType: string, token: { __typename?: 'Token', accessToken: string, refreshToken: string } } };

export type GetGoogleOauthUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGoogleOauthUrlQuery = { __typename?: 'Query', getGoogleAuthUrl: { __typename?: 'GoogleOauthUrl', url: string } };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutResponse', success: boolean, message: string } };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshTokens: { __typename?: 'UsersHostelIdAndToken', user: { __typename?: 'UserData', email: string, fullName: string, id: string, userType: UserType }, token: { __typename?: 'Token', refreshToken: string, accessToken: string } } };

export type SignupUserMutationVariables = Exact<{
  input: SignupInput;
}>;


export type SignupUserMutation = { __typename?: 'Mutation', signupUser: { __typename?: 'UsersAndToken', email: string, id: string, userType: string, token: { __typename?: 'Token', accessToken: string, refreshToken: string } } };

export type SignUpWithGoogleMutationVariables = Exact<{
  input: SignupWithGoogleInput;
}>;


export type SignUpWithGoogleMutation = { __typename?: 'Mutation', signUpWithGoogle: { __typename?: 'UsersAndToken', id: string, email: string, userType: string, token: { __typename?: 'Token', accessToken: string, refreshToken: string } } };

export type GetTravelChecklistMutationVariables = Exact<{
  input: TravelChecklistGeneratorInput;
}>;


export type GetTravelChecklistMutation = { __typename?: 'Mutation', getTravelChecklist: { __typename?: 'TCGList', personalizedTravelGuide?: string | null, data?: Array<{ __typename?: 'TCGData', category: string, items: Array<string> }> | null } };

export type GetTravelBudgetMutationVariables = Exact<{
  input: TravelBudgetCalculatorInput;
}>;


export type GetTravelBudgetMutation = { __typename?: 'Mutation', getTravelBudget: { __typename?: 'TBCList', personalizedTravelGuide?: string | null, data?: Array<{ __typename?: 'TbcData', category: string, cost: number, currency: string, per: string, shortGuide: string }> | null } };

export type GetTravelDestinationMutationVariables = Exact<{
  input: TravelDestinationFinderInput;
}>;


export type GetTravelDestinationMutation = { __typename?: 'Mutation', getTravelDestination: { __typename?: 'TDFList', personalizedTravelGuide?: string | null, data?: Array<{ __typename?: 'TDFData', activitiesToDo: Array<string>, destinationCountry: string, destinationPlace: string, expectedCost: string, shortGuide: string }> | null } };

export type SendCustomEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  subject: Scalars['String']['input'];
  htmlContent: Scalars['String']['input'];
}>;


export type SendCustomEmailMutation = { __typename?: 'Mutation', sendCustomEmail: boolean };


export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangePasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const GetUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"altPhoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"altPhoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const ProcessGenericIoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ProcessGenericIO"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IOGenericInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"processGenericIO"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"htmlResponse"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<ProcessGenericIoMutation, ProcessGenericIoMutationVariables>;
export const CreateInputSchemaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateInputSchema"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateInputSchema"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createInputSchema"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createInputSchemaInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]} as unknown as DocumentNode<CreateInputSchemaMutation, CreateInputSchemaMutationVariables>;
export const CreateToolDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTool"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateToolInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTool"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]} as unknown as DocumentNode<CreateToolMutation, CreateToolMutationVariables>;
export const CreateToolMetaDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateToolMetaData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createToolMetaDataInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateToolMetaDataDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createToolMetaData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createToolMetaDataInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createToolMetaDataInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateToolMetaDataMutation, CreateToolMetaDataMutationVariables>;
export const DeleteToolDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTool"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"toolId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTool"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"toolId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toolId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteToolMutation, DeleteToolMutationVariables>;
export const GetAllToolsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTools"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"200"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isSuperAdmin"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"defaultValue":{"kind":"BooleanValue","value":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTools"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"isSuperAdmin"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isSuperAdmin"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"ranking"}},{"kind":"Field","name":{"kind":"Name","value":"toolType"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"verifiedBySuperAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"inputSchema"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"schema"}},{"kind":"Field","name":{"kind":"Name","value":"toolId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"outputSchema"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"schema"}},{"kind":"Field","name":{"kind":"Name","value":"toolId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toolMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}},{"kind":"Field","name":{"kind":"Name","value":"ogTitle"}},{"kind":"Field","name":{"kind":"Name","value":"ogDescription"}},{"kind":"Field","name":{"kind":"Name","value":"ogImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"toolId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllToolsQuery, GetAllToolsQueryVariables>;
export const GetToolsByUserTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetToolsByUserToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"30"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getToolsByUserToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"ranking"}},{"kind":"Field","name":{"kind":"Name","value":"toolType"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"verifiedBySuperAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"inputSchema"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"schema"}},{"kind":"Field","name":{"kind":"Name","value":"toolId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"outputSchema"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"schema"}},{"kind":"Field","name":{"kind":"Name","value":"toolId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toolMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}},{"kind":"Field","name":{"kind":"Name","value":"ogTitle"}},{"kind":"Field","name":{"kind":"Name","value":"ogDescription"}},{"kind":"Field","name":{"kind":"Name","value":"ogImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"toolId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]} as unknown as DocumentNode<GetToolsByUserTokenQuery, GetToolsByUserTokenQueryVariables>;
export const GetToolBySlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetToolBySlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getToolBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"ranking"}},{"kind":"Field","name":{"kind":"Name","value":"toolType"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"verifiedBySuperAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"owner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"inputSchema"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"schema"}},{"kind":"Field","name":{"kind":"Name","value":"toolId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"outputSchema"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"schema"}},{"kind":"Field","name":{"kind":"Name","value":"toolId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"toolMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}},{"kind":"Field","name":{"kind":"Name","value":"ogTitle"}},{"kind":"Field","name":{"kind":"Name","value":"ogDescription"}},{"kind":"Field","name":{"kind":"Name","value":"ogImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"toolId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]} as unknown as DocumentNode<GetToolBySlugQuery, GetToolBySlugQueryVariables>;
export const GetToolMetaDataByToolIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetToolMetaDataByToolId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"toolId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getToolMetaDataByToolId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"toolId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toolId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetToolMetaDataByToolIdQuery, GetToolMetaDataByToolIdQueryVariables>;
export const UpdateInputSchemaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateInputSchema"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateInputSchema"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateInputSchema"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateInputSchemaInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateInputSchemaMutation, UpdateInputSchemaMutationVariables>;
export const UpdateToolDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTool"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"toolId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateToolInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTool"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"toolId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toolId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateToolMutation, UpdateToolMutationVariables>;
export const UpdateToolMetaDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateToolMetaData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateToolMetaDataInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateToolMetaDataDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateToolMetaData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateToolMetaDataInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateToolMetaDataInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateToolMetaDataMutation, UpdateToolMetaDataMutationVariables>;
export const ForgotPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ForgotPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgotPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const ResendVerificationMailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"resendVerificationMail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resendVerificationMail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<ResendVerificationMailMutation, ResendVerificationMailMutationVariables>;
export const VerifyEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const LogInUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logInUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]}}]} as unknown as DocumentNode<LogInUserMutation, LogInUserMutationVariables>;
export const GetGoogleOauthUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getGoogleOauthUrl"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGoogleAuthUrl"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<GetGoogleOauthUrlQuery, GetGoogleOauthUrlQueryVariables>;
export const LogOutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<LogOutMutation, LogOutMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const SignupUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signupUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signupUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]}}]} as unknown as DocumentNode<SignupUserMutation, SignupUserMutationVariables>;
export const SignUpWithGoogleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signUpWithGoogle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupWithGoogleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUpWithGoogle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]}}]} as unknown as DocumentNode<SignUpWithGoogleMutation, SignUpWithGoogleMutationVariables>;
export const GetTravelChecklistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"getTravelChecklist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TravelChecklistGeneratorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTravelChecklist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"personalizedTravelGuide"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"items"}}]}}]}}]}}]} as unknown as DocumentNode<GetTravelChecklistMutation, GetTravelChecklistMutationVariables>;
export const GetTravelBudgetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"getTravelBudget"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TravelBudgetCalculatorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTravelBudget"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"personalizedTravelGuide"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"cost"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"per"}},{"kind":"Field","name":{"kind":"Name","value":"shortGuide"}}]}}]}}]}}]} as unknown as DocumentNode<GetTravelBudgetMutation, GetTravelBudgetMutationVariables>;
export const GetTravelDestinationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"getTravelDestination"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TravelDestinationFinderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTravelDestination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"personalizedTravelGuide"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activitiesToDo"}},{"kind":"Field","name":{"kind":"Name","value":"destinationCountry"}},{"kind":"Field","name":{"kind":"Name","value":"destinationPlace"}},{"kind":"Field","name":{"kind":"Name","value":"expectedCost"}},{"kind":"Field","name":{"kind":"Name","value":"shortGuide"}}]}}]}}]}}]} as unknown as DocumentNode<GetTravelDestinationMutation, GetTravelDestinationMutationVariables>;
export const SendCustomEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendCustomEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subject"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"htmlContent"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendCustomEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"subject"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subject"}}},{"kind":"Argument","name":{"kind":"Name","value":"htmlContent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"htmlContent"}}}]}]}}]} as unknown as DocumentNode<SendCustomEmailMutation, SendCustomEmailMutationVariables>;

export const ChangePassword = gql`
    mutation ChangePassword($userId: Float!, $input: ChangePasswordInput!) {
  changePassword(userId: $userId, input: $input)
}
    `;
export const GetUserById = gql`
    query getUserById($id: Float!) {
  getUserById(id: $id) {
    data {
      id
      isVerified
      fullName
      email
      phoneNumber
      altPhoneNumber
      gender
      dateOfBirth
      profilePicture
    }
    error {
      message
      code
    }
  }
}
    `;
export const UpdateUser = gql`
    mutation updateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    data {
      id
      fullName
      email
      phoneNumber
      altPhoneNumber
      gender
      dateOfBirth
      profilePicture
    }
    error {
      message
      code
    }
  }
}
    `;
export const ProcessGenericIo = gql`
    mutation ProcessGenericIO($input: IOGenericInput!) {
  processGenericIO(input: $input) {
    data {
      htmlResponse
    }
    error {
      message
    }
  }
}
    `;
export const CreateInputSchema = gql`
    mutation CreateInputSchema($data: CreateInputSchema!) {
  createInputSchema(createInputSchemaInput: $data) {
    data {
      id
    }
    error {
      message
      code
      path
    }
  }
}
    `;
export const CreateTool = gql`
    mutation CreateTool($data: CreateToolInput!) {
  createTool(data: $data) {
    data {
      id
      name
      slug
    }
    error {
      message
      code
      path
    }
  }
}
    `;
export const CreateToolMetaData = gql`
    mutation CreateToolMetaData($createToolMetaDataInput: CreateToolMetaDataDto!) {
  createToolMetaData(createToolMetaDataInput: $createToolMetaDataInput) {
    data {
      id
    }
  }
}
    `;
export const DeleteTool = gql`
    mutation DeleteTool($toolId: Float!) {
  deleteTool(toolId: $toolId) {
    data {
      id
    }
    error {
      message
      code
      path
    }
  }
}
    `;
export const GetAllTools = gql`
    query GetAllTools($pageSize: Int = 200, $pageNumber: Int = 1, $isSuperAdmin: Boolean = false) {
  getAllTools(
    pageSize: $pageSize
    pageNumber: $pageNumber
    isSuperAdmin: $isSuperAdmin
  ) {
    data {
      id
      name
      description
      shortDescription
      slug
      handle
      thumbnailUrl
      ranking
      toolType
      visibility
      ownerId
      verifiedBySuperAdmin
      createdAt
      updatedAt
      deletedAt
      owner {
        id
        email
        fullName
        profilePicture
        userType
        isVerified
      }
      inputSchema {
        id
        schema
        toolId
        createdAt
        updatedAt
      }
      outputSchema {
        id
        schema
        toolId
        createdAt
        updatedAt
      }
      toolMetadata {
        id
        title
        description
        keywords
        ogTitle
        ogDescription
        ogImageUrl
        toolId
        createdAt
        updatedAt
      }
    }
    error {
      message
      code
      path
    }
  }
}
    `;
export const GetToolsByUserToken = gql`
    query GetToolsByUserToken($pageSize: Int = 30, $pageNumber: Int = 1) {
  getToolsByUserToken(pageSize: $pageSize, pageNumber: $pageNumber) {
    data {
      id
      name
      description
      shortDescription
      slug
      handle
      thumbnailUrl
      ranking
      toolType
      visibility
      ownerId
      verifiedBySuperAdmin
      createdAt
      updatedAt
      deletedAt
      owner {
        id
        email
        fullName
        profilePicture
        userType
        isVerified
      }
      inputSchema {
        id
        schema
        toolId
        createdAt
        updatedAt
      }
      outputSchema {
        id
        schema
        toolId
        createdAt
        updatedAt
      }
      toolMetadata {
        id
        title
        description
        keywords
        ogTitle
        ogDescription
        ogImageUrl
        toolId
        createdAt
        updatedAt
      }
    }
    error {
      message
      code
      path
    }
  }
}
    `;
export const GetToolBySlug = gql`
    query GetToolBySlug($slug: String!) {
  getToolBySlug(slug: $slug) {
    data {
      id
      name
      description
      shortDescription
      slug
      handle
      thumbnailUrl
      ranking
      toolType
      visibility
      ownerId
      verifiedBySuperAdmin
      createdAt
      updatedAt
      deletedAt
      owner {
        id
        email
        fullName
        profilePicture
        userType
        isVerified
      }
      inputSchema {
        id
        schema
        toolId
        createdAt
        updatedAt
      }
      outputSchema {
        id
        schema
        toolId
        createdAt
        updatedAt
      }
      toolMetadata {
        id
        title
        description
        keywords
        ogTitle
        ogDescription
        ogImageUrl
        toolId
        createdAt
        updatedAt
      }
    }
    error {
      message
      code
      path
    }
  }
}
    `;
export const GetToolMetaDataByToolId = gql`
    query GetToolMetaDataByToolId($toolId: Float!) {
  getToolMetaDataByToolId(toolId: $toolId) {
    data {
      id
    }
  }
}
    `;
export const UpdateInputSchema = gql`
    mutation UpdateInputSchema($data: UpdateInputSchema!) {
  updateInputSchema(updateInputSchemaInput: $data) {
    data {
      id
    }
    error {
      message
      code
      path
    }
  }
}
    `;
export const UpdateTool = gql`
    mutation UpdateTool($toolId: Float!, $data: UpdateToolInput!) {
  updateTool(toolId: $toolId, data: $data) {
    data {
      id
      name
    }
    error {
      message
      code
      path
    }
  }
}
    `;
export const UpdateToolMetaData = gql`
    mutation UpdateToolMetaData($updateToolMetaDataInput: UpdateToolMetaDataDto!) {
  updateToolMetaData(updateToolMetaDataInput: $updateToolMetaDataInput) {
    data {
      id
    }
  }
}
    `;
export const ForgotPassword = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    id
  }
}
    `;
export const ResetPassword = gql`
    mutation ResetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input) {
    email
    id
    userType
    token {
      accessToken
      refreshToken
    }
  }
}
    `;
export const ResendVerificationMail = gql`
    mutation resendVerificationMail($id: Float!) {
  resendVerificationMail(id: $id)
}
    `;
export const VerifyEmail = gql`
    mutation VerifyEmail($token: VerifyEmailInput!) {
  verifyEmail(input: $token) {
    id
  }
}
    `;
export const LogInUser = gql`
    mutation logInUser($input: LoginInput!) {
  loginUser(input: $input) {
    email
    id
    userType
    token {
      accessToken
      refreshToken
    }
  }
}
    `;
export const GetGoogleOauthUrl = gql`
    query getGoogleOauthUrl {
  getGoogleAuthUrl {
    url
  }
}
    `;
export const LogOut = gql`
    mutation logOut {
  logout {
    success
    message
  }
}
    `;
export const RefreshToken = gql`
    mutation refreshToken {
  refreshTokens {
    user {
      email
      fullName
      id
      userType
    }
    token {
      refreshToken
      accessToken
    }
  }
}
    `;
export const SignupUser = gql`
    mutation signupUser($input: SignupInput!) {
  signupUser(input: $input) {
    email
    id
    userType
    token {
      accessToken
      refreshToken
    }
  }
}
    `;
export const SignUpWithGoogle = gql`
    mutation signUpWithGoogle($input: SignupWithGoogleInput!) {
  signUpWithGoogle(input: $input) {
    id
    email
    userType
    token {
      accessToken
      refreshToken
    }
  }
}
    `;
export const GetTravelChecklist = gql`
    mutation getTravelChecklist($input: TravelChecklistGeneratorInput!) {
  getTravelChecklist(input: $input) {
    personalizedTravelGuide
    data {
      category
      items
    }
  }
}
    `;
export const GetTravelBudget = gql`
    mutation getTravelBudget($input: TravelBudgetCalculatorInput!) {
  getTravelBudget(input: $input) {
    personalizedTravelGuide
    data {
      category
      cost
      currency
      per
      shortGuide
    }
  }
}
    `;
export const GetTravelDestination = gql`
    mutation getTravelDestination($input: TravelDestinationFinderInput!) {
  getTravelDestination(input: $input) {
    personalizedTravelGuide
    data {
      activitiesToDo
      destinationCountry
      destinationPlace
      expectedCost
      shortGuide
    }
  }
}
    `;
export const SendCustomEmail = gql`
    mutation SendCustomEmail($email: String!, $name: String!, $subject: String!, $htmlContent: String!) {
  sendCustomEmail(
    email: $email
    name: $name
    subject: $subject
    htmlContent: $htmlContent
  )
}
    `;