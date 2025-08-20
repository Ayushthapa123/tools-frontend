/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation ChangePassword($userId: Float!, $input: ChangePasswordInput!) {\n  changePassword(userId: $userId, input: $input)\n}": types.ChangePasswordDocument,
    "query getUserById($id: Float!) {\n  getUserById(id: $id) {\n    data {\n      id\n      isVerified\n      fullName\n      email\n      phoneNumber\n      altPhoneNumber\n      gender\n      dateOfBirth\n      profilePicture\n    }\n    error {\n      message\n      code\n    }\n  }\n}": types.GetUserByIdDocument,
    "mutation updateUser($input: UpdateUserInput!) {\n  updateUser(input: $input) {\n    data {\n      id\n      fullName\n      email\n      phoneNumber\n      altPhoneNumber\n      gender\n      dateOfBirth\n      profilePicture\n    }\n    error {\n      message\n      code\n    }\n  }\n}": types.UpdateUserDocument,
    "mutation ProcessGenericIO($input: IOGenericInput!) {\n  processGenericIO(input: $input) {\n    data {\n      htmlResponse\n    }\n    error {\n      message\n    }\n  }\n}": types.ProcessGenericIoDocument,
    "mutation CreateInputSchema($data: CreateInputSchema!) {\n  createInputSchema(createInputSchemaInput: $data) {\n    data {\n      id\n    }\n    error {\n      message\n      code\n      path\n    }\n  }\n}": types.CreateInputSchemaDocument,
    "mutation CreateTool($data: CreateToolInput!) {\n  createTool(data: $data) {\n    data {\n      id\n      name\n      slug\n    }\n    error {\n      message\n      code\n      path\n    }\n  }\n}": types.CreateToolDocument,
    "mutation CreateToolMetaData($createToolMetaDataInput: CreateToolMetaDataDto!) {\n  createToolMetaData(createToolMetaDataInput: $createToolMetaDataInput) {\n    data {\n      id\n    }\n  }\n}": types.CreateToolMetaDataDocument,
    "mutation DeleteTool($toolId: Float!) {\n  deleteTool(toolId: $toolId) {\n    data {\n      id\n    }\n    error {\n      message\n      code\n      path\n    }\n  }\n}": types.DeleteToolDocument,
    "query GetAllTools($pageSize: Int = 200, $pageNumber: Int = 1, $isSuperAdmin: Boolean = false) {\n  getAllTools(\n    pageSize: $pageSize\n    pageNumber: $pageNumber\n    isSuperAdmin: $isSuperAdmin\n  ) {\n    data {\n      id\n      name\n      description\n      shortDescription\n      slug\n      handle\n      thumbnailUrl\n      ranking\n      toolType\n      visibility\n      ownerId\n      verifiedBySuperAdmin\n      createdAt\n      updatedAt\n      deletedAt\n      owner {\n        id\n        email\n        fullName\n        profilePicture\n        userType\n        isVerified\n      }\n      inputSchema {\n        id\n        schema\n        toolId\n        createdAt\n        updatedAt\n      }\n      outputSchema {\n        id\n        schema\n        toolId\n        createdAt\n        updatedAt\n      }\n      toolMetadata {\n        id\n        title\n        description\n        keywords\n        ogTitle\n        ogDescription\n        ogImageUrl\n        toolId\n        createdAt\n        updatedAt\n      }\n    }\n    error {\n      message\n      code\n      path\n    }\n  }\n}": types.GetAllToolsDocument,
    "query GetToolsByUserToken($pageSize: Int = 30, $pageNumber: Int = 1) {\n  getToolsByUserToken(pageSize: $pageSize, pageNumber: $pageNumber) {\n    data {\n      id\n      name\n      description\n      shortDescription\n      slug\n      handle\n      thumbnailUrl\n      ranking\n      toolType\n      visibility\n      ownerId\n      verifiedBySuperAdmin\n      createdAt\n      updatedAt\n      deletedAt\n      owner {\n        id\n        email\n        fullName\n        profilePicture\n        userType\n        isVerified\n      }\n      inputSchema {\n        id\n        schema\n        toolId\n        createdAt\n        updatedAt\n      }\n      outputSchema {\n        id\n        schema\n        toolId\n        createdAt\n        updatedAt\n      }\n      toolMetadata {\n        id\n        title\n        description\n        keywords\n        ogTitle\n        ogDescription\n        ogImageUrl\n        toolId\n        createdAt\n        updatedAt\n      }\n    }\n    error {\n      message\n      code\n      path\n    }\n  }\n}": types.GetToolsByUserTokenDocument,
    "query GetToolBySlug($slug: String!) {\n  getToolBySlug(slug: $slug) {\n    data {\n      id\n      name\n      description\n      shortDescription\n      slug\n      handle\n      thumbnailUrl\n      ranking\n      toolType\n      visibility\n      ownerId\n      verifiedBySuperAdmin\n      createdAt\n      updatedAt\n      deletedAt\n      owner {\n        id\n        email\n        fullName\n        profilePicture\n        userType\n        isVerified\n      }\n      inputSchema {\n        id\n        schema\n        toolId\n        createdAt\n        updatedAt\n      }\n      outputSchema {\n        id\n        schema\n        toolId\n        createdAt\n        updatedAt\n      }\n      toolMetadata {\n        id\n        title\n        description\n        keywords\n        ogTitle\n        ogDescription\n        ogImageUrl\n        toolId\n        createdAt\n        updatedAt\n      }\n    }\n    error {\n      message\n      code\n      path\n    }\n  }\n}": types.GetToolBySlugDocument,
    "query GetToolMetaDataByToolId($toolId: Float!) {\n  getToolMetaDataByToolId(toolId: $toolId) {\n    data {\n      id\n    }\n  }\n}": types.GetToolMetaDataByToolIdDocument,
    "mutation UpdateInputSchema($data: UpdateInputSchema!) {\n  updateInputSchema(updateInputSchemaInput: $data) {\n    data {\n      id\n    }\n    error {\n      message\n      code\n      path\n    }\n  }\n}": types.UpdateInputSchemaDocument,
    "mutation UpdateTool($toolId: Float!, $data: UpdateToolInput!) {\n  updateTool(toolId: $toolId, data: $data) {\n    data {\n      id\n      name\n    }\n    error {\n      message\n      code\n      path\n    }\n  }\n}": types.UpdateToolDocument,
    "mutation UpdateToolMetaData($updateToolMetaDataInput: UpdateToolMetaDataDto!) {\n  updateToolMetaData(updateToolMetaDataInput: $updateToolMetaDataInput) {\n    data {\n      id\n    }\n  }\n}": types.UpdateToolMetaDataDocument,
    "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email) {\n    id\n  }\n}": types.ForgotPasswordDocument,
    "mutation ResetPassword($input: ResetPasswordInput!) {\n  resetPassword(input: $input) {\n    email\n    id\n    userType\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}": types.ResetPasswordDocument,
    "mutation resendVerificationMail($id: Float!) {\n  resendVerificationMail(id: $id)\n}": types.ResendVerificationMailDocument,
    "mutation VerifyEmail($token: VerifyEmailInput!) {\n  verifyEmail(input: $token) {\n    id\n  }\n}": types.VerifyEmailDocument,
    "mutation logInUser($input: LoginInput!) {\n  loginUser(input: $input) {\n    email\n    id\n    userType\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}": types.LogInUserDocument,
    "query getGoogleOauthUrl {\n  getGoogleAuthUrl {\n    url\n  }\n}": types.GetGoogleOauthUrlDocument,
    "mutation logOut {\n  logout {\n    success\n    message\n  }\n}": types.LogOutDocument,
    "mutation refreshToken {\n  refreshTokens {\n    user {\n      email\n      fullName\n      id\n      userType\n    }\n    token {\n      refreshToken\n      accessToken\n    }\n  }\n}": types.RefreshTokenDocument,
    "mutation signupUser($input: SignupInput!) {\n  signupUser(input: $input) {\n    email\n    id\n    userType\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}": types.SignupUserDocument,
    "mutation signUpWithGoogle($input: SignupWithGoogleInput!) {\n  signUpWithGoogle(input: $input) {\n    id\n    email\n    userType\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}": types.SignUpWithGoogleDocument,
    "mutation getTravelChecklist($input: TravelChecklistGeneratorInput!) {\n  getTravelChecklist(input: $input) {\n    personalizedTravelGuide\n    data {\n      category\n      items\n    }\n  }\n}": types.GetTravelChecklistDocument,
    "mutation getTravelBudget($input: TravelBudgetCalculatorInput!) {\n  getTravelBudget(input: $input) {\n    personalizedTravelGuide\n    data {\n      category\n      cost\n      currency\n      per\n      shortGuide\n    }\n  }\n}": types.GetTravelBudgetDocument,
    "mutation getTravelDestination($input: TravelDestinationFinderInput!) {\n  getTravelDestination(input: $input) {\n    personalizedTravelGuide\n    data {\n      activitiesToDo\n      destinationCountry\n      destinationPlace\n      expectedCost\n      shortGuide\n    }\n  }\n}": types.GetTravelDestinationDocument,
    "mutation SendCustomEmail($email: String!, $name: String!, $subject: String!, $htmlContent: String!) {\n  sendCustomEmail(\n    email: $email\n    name: $name\n    subject: $subject\n    htmlContent: $htmlContent\n  )\n}": types.SendCustomEmailDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangePassword($userId: Float!, $input: ChangePasswordInput!) {\n  changePassword(userId: $userId, input: $input)\n}"): (typeof documents)["mutation ChangePassword($userId: Float!, $input: ChangePasswordInput!) {\n  changePassword(userId: $userId, input: $input)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getUserById($id: Float!) {\n  getUserById(id: $id) {\n    data {\n      id\n      isVerified\n      fullName\n      email\n      phoneNumber\n      altPhoneNumber\n      gender\n      dateOfBirth\n      profilePicture\n    }\n    error {\n      message\n      code\n    }\n  }\n}"): (typeof documents)["query getUserById($id: Float!) {\n  getUserById(id: $id) {\n    data {\n      id\n      isVerified\n      fullName\n      email\n      phoneNumber\n      altPhoneNumber\n      gender\n      dateOfBirth\n      profilePicture\n    }\n    error {\n      message\n      code\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updateUser($input: UpdateUserInput!) {\n  updateUser(input: $input) {\n    data {\n      id\n      fullName\n      email\n      phoneNumber\n      altPhoneNumber\n      gender\n      dateOfBirth\n      profilePicture\n    }\n    error {\n      message\n      code\n    }\n  }\n}"): (typeof documents)["mutation updateUser($input: UpdateUserInput!) {\n  updateUser(input: $input) {\n    data {\n      id\n      fullName\n      email\n      phoneNumber\n      altPhoneNumber\n      gender\n      dateOfBirth\n      profilePicture\n    }\n    error {\n      message\n      code\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ProcessGenericIO($input: IOGenericInput!) {\n  processGenericIO(input: $input) {\n    data {\n      htmlResponse\n    }\n    error {\n      message\n    }\n  }\n}"): (typeof documents)["mutation ProcessGenericIO($input: IOGenericInput!) {\n  processGenericIO(input: $input) {\n    data {\n      htmlResponse\n    }\n    error {\n      message\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateInputSchema($data: CreateInputSchema!) {\n  createInputSchema(createInputSchemaInput: $data) {\n    data {\n      id\n    }\n    error {\n      message\n      code\n      path\n    }\n  }\n}"): (typeof documents)["mutation CreateInputSchema($data: CreateInputSchema!) {\n  createInputSchema(createInputSchemaInput: $data) {\n    data {\n      id\n    }\n    error {\n      message\n      code\n      path\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateTool($data: CreateToolInput!) {\n  createTool(data: $data) {\n    data {\n      id\n      name\n      slug\n    }\n    error {\n      message\n      code\n      path\n    }\n  }\n}"): (typeof documents)["mutation CreateTool($data: CreateToolInput!) {\n  createTool(data: $data) {\n    data {\n      id\n      name\n      slug\n    }\n    error {\n      message\n      code\n      path\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateToolMetaData($createToolMetaDataInput: CreateToolMetaDataDto!) {\n  createToolMetaData(createToolMetaDataInput: $createToolMetaDataInput) {\n    data {\n      id\n    }\n  }\n}"): (typeof documents)["mutation CreateToolMetaData($createToolMetaDataInput: CreateToolMetaDataDto!) {\n  createToolMetaData(createToolMetaDataInput: $createToolMetaDataInput) {\n    data {\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteTool($toolId: Float!) {\n  deleteTool(toolId: $toolId) {\n    data {\n      id\n    }\n    error {\n      message\n      code\n      path\n    }\n  }\n}"): (typeof documents)["mutation DeleteTool($toolId: Float!) {\n  deleteTool(toolId: $toolId) {\n    data {\n      id\n    }\n    error {\n      message\n      code\n      path\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAllTools($pageSize: Int = 200, $pageNumber: Int = 1, $isSuperAdmin: Boolean = false) {\n  getAllTools(\n    pageSize: $pageSize\n    pageNumber: $pageNumber\n    isSuperAdmin: $isSuperAdmin\n  ) {\n    data {\n      id\n      name\n      description\n      shortDescription\n      slug\n      handle\n      thumbnailUrl\n      ranking\n      toolType\n      visibility\n      ownerId\n      verifiedBySuperAdmin\n      createdAt\n      updatedAt\n      deletedAt\n      owner {\n        id\n        email\n        fullName\n        profilePicture\n        userType\n        isVerified\n      }\n      inputSchema {\n        id\n        schema\n        toolId\n        createdAt\n        updatedAt\n      }\n      outputSchema {\n        id\n        schema\n        toolId\n        createdAt\n        updatedAt\n      }\n      toolMetadata {\n        id\n        title\n        description\n        keywords\n        ogTitle\n        ogDescription\n        ogImageUrl\n        toolId\n        createdAt\n        updatedAt\n      }\n    }\n    error {\n      message\n      code\n      path\n    }\n  }\n}"): (typeof documents)["query GetAllTools($pageSize: Int = 200, $pageNumber: Int = 1, $isSuperAdmin: Boolean = false) {\n  getAllTools(\n    pageSize: $pageSize\n    pageNumber: $pageNumber\n    isSuperAdmin: $isSuperAdmin\n  ) {\n    data {\n      id\n      name\n      description\n      shortDescription\n      slug\n      handle\n      thumbnailUrl\n      ranking\n      toolType\n      visibility\n      ownerId\n      verifiedBySuperAdmin\n      createdAt\n      updatedAt\n      deletedAt\n      owner {\n        id\n        email\n        fullName\n        profilePicture\n        userType\n        isVerified\n      }\n      inputSchema {\n        id\n        schema\n        toolId\n        createdAt\n        updatedAt\n      }\n      outputSchema {\n        id\n        schema\n        toolId\n        createdAt\n        updatedAt\n      }\n      toolMetadata {\n        id\n        title\n        description\n        keywords\n        ogTitle\n        ogDescription\n        ogImageUrl\n        toolId\n        createdAt\n        updatedAt\n      }\n    }\n    error {\n      message\n      code\n      path\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetToolsByUserToken($pageSize: Int = 30, $pageNumber: Int = 1) {\n  getToolsByUserToken(pageSize: $pageSize, pageNumber: $pageNumber) {\n    data {\n      id\n      name\n      description\n      shortDescription\n      slug\n      handle\n      thumbnailUrl\n      ranking\n      toolType\n      visibility\n      ownerId\n      verifiedBySuperAdmin\n      createdAt\n      updatedAt\n      deletedAt\n      owner {\n        id\n        email\n        fullName\n        profilePicture\n        userType\n        isVerified\n      }\n      inputSchema {\n        id\n        schema\n        toolId\n        createdAt\n        updatedAt\n      }\n      outputSchema {\n        id\n        schema\n        toolId\n        createdAt\n        updatedAt\n      }\n      toolMetadata {\n        id\n        title\n        description\n        keywords\n        ogTitle\n        ogDescription\n        ogImageUrl\n        toolId\n        createdAt\n        updatedAt\n      }\n    }\n    error {\n      message\n      code\n      path\n    }\n  }\n}"): (typeof documents)["query GetToolsByUserToken($pageSize: Int = 30, $pageNumber: Int = 1) {\n  getToolsByUserToken(pageSize: $pageSize, pageNumber: $pageNumber) {\n    data {\n      id\n      name\n      description\n      shortDescription\n      slug\n      handle\n      thumbnailUrl\n      ranking\n      toolType\n      visibility\n      ownerId\n      verifiedBySuperAdmin\n      createdAt\n      updatedAt\n      deletedAt\n      owner {\n        id\n        email\n        fullName\n        profilePicture\n        userType\n        isVerified\n      }\n      inputSchema {\n        id\n        schema\n        toolId\n        createdAt\n        updatedAt\n      }\n      outputSchema {\n        id\n        schema\n        toolId\n        createdAt\n        updatedAt\n      }\n      toolMetadata {\n        id\n        title\n        description\n        keywords\n        ogTitle\n        ogDescription\n        ogImageUrl\n        toolId\n        createdAt\n        updatedAt\n      }\n    }\n    error {\n      message\n      code\n      path\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetToolBySlug($slug: String!) {\n  getToolBySlug(slug: $slug) {\n    data {\n      id\n      name\n      description\n      shortDescription\n      slug\n      handle\n      thumbnailUrl\n      ranking\n      toolType\n      visibility\n      ownerId\n      verifiedBySuperAdmin\n      createdAt\n      updatedAt\n      deletedAt\n      owner {\n        id\n        email\n        fullName\n        profilePicture\n        userType\n        isVerified\n      }\n      inputSchema {\n        id\n        schema\n        toolId\n        createdAt\n        updatedAt\n      }\n      outputSchema {\n        id\n        schema\n        toolId\n        createdAt\n        updatedAt\n      }\n      toolMetadata {\n        id\n        title\n        description\n        keywords\n        ogTitle\n        ogDescription\n        ogImageUrl\n        toolId\n        createdAt\n        updatedAt\n      }\n    }\n    error {\n      message\n      code\n      path\n    }\n  }\n}"): (typeof documents)["query GetToolBySlug($slug: String!) {\n  getToolBySlug(slug: $slug) {\n    data {\n      id\n      name\n      description\n      shortDescription\n      slug\n      handle\n      thumbnailUrl\n      ranking\n      toolType\n      visibility\n      ownerId\n      verifiedBySuperAdmin\n      createdAt\n      updatedAt\n      deletedAt\n      owner {\n        id\n        email\n        fullName\n        profilePicture\n        userType\n        isVerified\n      }\n      inputSchema {\n        id\n        schema\n        toolId\n        createdAt\n        updatedAt\n      }\n      outputSchema {\n        id\n        schema\n        toolId\n        createdAt\n        updatedAt\n      }\n      toolMetadata {\n        id\n        title\n        description\n        keywords\n        ogTitle\n        ogDescription\n        ogImageUrl\n        toolId\n        createdAt\n        updatedAt\n      }\n    }\n    error {\n      message\n      code\n      path\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetToolMetaDataByToolId($toolId: Float!) {\n  getToolMetaDataByToolId(toolId: $toolId) {\n    data {\n      id\n    }\n  }\n}"): (typeof documents)["query GetToolMetaDataByToolId($toolId: Float!) {\n  getToolMetaDataByToolId(toolId: $toolId) {\n    data {\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateInputSchema($data: UpdateInputSchema!) {\n  updateInputSchema(updateInputSchemaInput: $data) {\n    data {\n      id\n    }\n    error {\n      message\n      code\n      path\n    }\n  }\n}"): (typeof documents)["mutation UpdateInputSchema($data: UpdateInputSchema!) {\n  updateInputSchema(updateInputSchemaInput: $data) {\n    data {\n      id\n    }\n    error {\n      message\n      code\n      path\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateTool($toolId: Float!, $data: UpdateToolInput!) {\n  updateTool(toolId: $toolId, data: $data) {\n    data {\n      id\n      name\n    }\n    error {\n      message\n      code\n      path\n    }\n  }\n}"): (typeof documents)["mutation UpdateTool($toolId: Float!, $data: UpdateToolInput!) {\n  updateTool(toolId: $toolId, data: $data) {\n    data {\n      id\n      name\n    }\n    error {\n      message\n      code\n      path\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateToolMetaData($updateToolMetaDataInput: UpdateToolMetaDataDto!) {\n  updateToolMetaData(updateToolMetaDataInput: $updateToolMetaDataInput) {\n    data {\n      id\n    }\n  }\n}"): (typeof documents)["mutation UpdateToolMetaData($updateToolMetaDataInput: UpdateToolMetaDataDto!) {\n  updateToolMetaData(updateToolMetaDataInput: $updateToolMetaDataInput) {\n    data {\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email) {\n    id\n  }\n}"): (typeof documents)["mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ResetPassword($input: ResetPasswordInput!) {\n  resetPassword(input: $input) {\n    email\n    id\n    userType\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}"): (typeof documents)["mutation ResetPassword($input: ResetPasswordInput!) {\n  resetPassword(input: $input) {\n    email\n    id\n    userType\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation resendVerificationMail($id: Float!) {\n  resendVerificationMail(id: $id)\n}"): (typeof documents)["mutation resendVerificationMail($id: Float!) {\n  resendVerificationMail(id: $id)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation VerifyEmail($token: VerifyEmailInput!) {\n  verifyEmail(input: $token) {\n    id\n  }\n}"): (typeof documents)["mutation VerifyEmail($token: VerifyEmailInput!) {\n  verifyEmail(input: $token) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation logInUser($input: LoginInput!) {\n  loginUser(input: $input) {\n    email\n    id\n    userType\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}"): (typeof documents)["mutation logInUser($input: LoginInput!) {\n  loginUser(input: $input) {\n    email\n    id\n    userType\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getGoogleOauthUrl {\n  getGoogleAuthUrl {\n    url\n  }\n}"): (typeof documents)["query getGoogleOauthUrl {\n  getGoogleAuthUrl {\n    url\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation logOut {\n  logout {\n    success\n    message\n  }\n}"): (typeof documents)["mutation logOut {\n  logout {\n    success\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation refreshToken {\n  refreshTokens {\n    user {\n      email\n      fullName\n      id\n      userType\n    }\n    token {\n      refreshToken\n      accessToken\n    }\n  }\n}"): (typeof documents)["mutation refreshToken {\n  refreshTokens {\n    user {\n      email\n      fullName\n      id\n      userType\n    }\n    token {\n      refreshToken\n      accessToken\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation signupUser($input: SignupInput!) {\n  signupUser(input: $input) {\n    email\n    id\n    userType\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}"): (typeof documents)["mutation signupUser($input: SignupInput!) {\n  signupUser(input: $input) {\n    email\n    id\n    userType\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation signUpWithGoogle($input: SignupWithGoogleInput!) {\n  signUpWithGoogle(input: $input) {\n    id\n    email\n    userType\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}"): (typeof documents)["mutation signUpWithGoogle($input: SignupWithGoogleInput!) {\n  signUpWithGoogle(input: $input) {\n    id\n    email\n    userType\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation getTravelChecklist($input: TravelChecklistGeneratorInput!) {\n  getTravelChecklist(input: $input) {\n    personalizedTravelGuide\n    data {\n      category\n      items\n    }\n  }\n}"): (typeof documents)["mutation getTravelChecklist($input: TravelChecklistGeneratorInput!) {\n  getTravelChecklist(input: $input) {\n    personalizedTravelGuide\n    data {\n      category\n      items\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation getTravelBudget($input: TravelBudgetCalculatorInput!) {\n  getTravelBudget(input: $input) {\n    personalizedTravelGuide\n    data {\n      category\n      cost\n      currency\n      per\n      shortGuide\n    }\n  }\n}"): (typeof documents)["mutation getTravelBudget($input: TravelBudgetCalculatorInput!) {\n  getTravelBudget(input: $input) {\n    personalizedTravelGuide\n    data {\n      category\n      cost\n      currency\n      per\n      shortGuide\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation getTravelDestination($input: TravelDestinationFinderInput!) {\n  getTravelDestination(input: $input) {\n    personalizedTravelGuide\n    data {\n      activitiesToDo\n      destinationCountry\n      destinationPlace\n      expectedCost\n      shortGuide\n    }\n  }\n}"): (typeof documents)["mutation getTravelDestination($input: TravelDestinationFinderInput!) {\n  getTravelDestination(input: $input) {\n    personalizedTravelGuide\n    data {\n      activitiesToDo\n      destinationCountry\n      destinationPlace\n      expectedCost\n      shortGuide\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SendCustomEmail($email: String!, $name: String!, $subject: String!, $htmlContent: String!) {\n  sendCustomEmail(\n    email: $email\n    name: $name\n    subject: $subject\n    htmlContent: $htmlContent\n  )\n}"): (typeof documents)["mutation SendCustomEmail($email: String!, $name: String!, $subject: String!, $htmlContent: String!) {\n  sendCustomEmail(\n    email: $email\n    name: $name\n    subject: $subject\n    htmlContent: $htmlContent\n  )\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;