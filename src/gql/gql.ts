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
    "query BookingsByHomestay {\n  bookingsByHomestay {\n    id\n    bookingKey\n    startDate\n    endDate\n    status\n    createdAt\n    updatedAt\n    room {\n      id\n      caption\n      roomNumber\n      capacity\n      status\n      attachBathroom\n      maxOccupancy\n      price {\n        baseAmount\n        currency\n        discountAmount\n        discountType\n        isDiscountActive\n      }\n      image {\n        url\n        caption\n      }\n    }\n    guest {\n      id\n      email\n      fullName\n      phoneNumber\n    }\n  }\n}": types.BookingsByHomestayDocument,
    "query getHomestayDetailsBasic {\n  getHomestayByToken {\n    name\n    slug\n    moderatedBySuperAdmin\n    moderatedByCommunityOwner\n    address {\n      country\n      city\n      subCity\n      street\n    }\n  }\n}": types.GetHomestayDetailsBasicDocument,
    "mutation createAddress($input: CreateAddressInput!) {\n  createAddress(data: $input) {\n    id\n  }\n}": types.CreateAddressDocument,
    "mutation createContacts($input: CreateContactInput!) {\n  createContact(data: $input) {\n    id\n  }\n}": types.CreateContactsDocument,
    "mutation createHomestay($input: CreateHomestayInput!) {\n  createHomestay(data: $input) {\n    id\n    ownerId\n  }\n}": types.CreateHomestayDocument,
    "query getAddressByHomestayId($homestayId: Float!) {\n  getAddressByHomestayId(homestayId: $homestayId) {\n    id\n    country\n    city\n    subCity\n    street\n  }\n}": types.GetAddressByHomestayIdDocument,
    "query getContactsByHomestayId($homestayId: Float!) {\n  getContactByHomestayId(homestayId: $homestayId) {\n    id\n    email\n    phone\n    altPhone\n  }\n}": types.GetContactsByHomestayIdDocument,
    "query getHomestayByToken {\n  getHomestayByToken {\n    id\n    name\n    description\n    slug\n    moderatedBySuperAdmin\n    moderatedByCommunityOwner\n  }\n}": types.GetHomestayByTokenDocument,
    "mutation updateAddress($input: UpdateAddressInput!, $addressId: Float!) {\n  updateAddress(data: $input, addressId: $addressId) {\n    id\n  }\n}": types.UpdateAddressDocument,
    "mutation updateContact($input: UpdateContactInput!, $contactId: Float!) {\n  updateContact(data: $input, contactId: $contactId) {\n    id\n  }\n}": types.UpdateContactDocument,
    "mutation updateHomestay($input: UpdateHomestayInput!, $homestayId: Float!) {\n  updateHomestay(data: $input, homestayId: $homestayId) {\n    id\n  }\n}": types.UpdateHomestayDocument,
    "query GetAllHomestays($pageSize: Int, $pageNumber: Int) {\n  getAllHomestays(pageSize: $pageSize, pageNumber: $pageNumber) {\n    id\n    name\n    description\n    slug\n    moderatedByCommunityOwner\n    moderatedBySuperAdmin\n    ownerId\n    createdAt\n    updatedAt\n    address {\n      id\n      country\n      city\n      subCity\n      street\n      latitude\n      longitude\n    }\n    contact {\n      id\n      phone\n      altPhone\n      email\n    }\n    googleMapLocation {\n      id\n      description\n      lat\n      lng\n    }\n    rooms {\n      id\n      status\n      capacity\n      caption\n      description\n      roomNumber\n      maxOccupancy\n      attachBathroom\n      price {\n        id\n        baseAmount\n        currency\n        discountAmount\n        discountType\n        isDynamicPricing\n        isDiscountActive\n      }\n      image {\n        id\n        caption\n        url\n      }\n    }\n    image {\n      id\n      caption\n      url\n    }\n  }\n}": types.GetAllHomestaysDocument,
    "mutation VerifyHomestay($homestayId: Int!, $status: Boolean!) {\n  verifyHomestay(homestayId: $homestayId, status: $status) {\n    id\n    name\n  }\n}": types.VerifyHomestayDocument,
    "query MyBookings {\n  myBookings {\n    id\n    roomId\n    bookingKey\n    guestId\n    startDate\n    endDate\n    status\n    paymentPlatformName\n    createdAt\n    updatedAt\n    room {\n      id\n      roomNumber\n      capacity\n      caption\n      status\n      attachBathroom\n      maxOccupancy\n      price {\n        currency\n        baseAmount\n      }\n    }\n    guest {\n      id\n      fullName\n      email\n    }\n  }\n}": types.MyBookingsDocument,
    "mutation CreatePriceRule($createPriceRuleInput: CreateDynamicPriceRuleInput!) {\n  createPriceRule(createPriceRuleInput: $createPriceRuleInput) {\n    id\n    name\n    description\n    roomId\n    startDate\n    endDate\n    amount\n    isWeekend\n    isActive\n    priority\n    createdAt\n    updatedAt\n  }\n}": types.CreatePriceRuleDocument,
    "mutation RemovePriceRule($id: Int!) {\n  removePriceRule(id: $id) {\n    id\n    name\n  }\n}": types.RemovePriceRuleDocument,
    "query GetPriceRulesByRoom($roomId: Int!) {\n  priceRulesByRoom(roomId: $roomId) {\n    id\n    name\n    description\n    amount\n    startDate\n    endDate\n    isWeekend\n    isActive\n    priority\n  }\n}": types.GetPriceRulesByRoomDocument,
    "mutation UpdatePriceRule($updatePriceInput: UpdateDynamicPriceRuleInput!) {\n  updatePriceRule(updatePriceInput: $updatePriceInput) {\n    id\n    name\n    description\n    roomId\n    startDate\n    endDate\n    amount\n    isWeekend\n    isActive\n    priority\n    updatedAt\n  }\n}": types.UpdatePriceRuleDocument,
    "mutation CreateRoomImage($data: CreateRoomImageInput!) {\n  createRoomImage(data: $data) {\n    id\n    roomId\n    url\n    caption\n  }\n}": types.CreateRoomImageDocument,
    "mutation DeleteRoomImage($roomImageId: Int!) {\n  deleteRoomImage(roomImageId: $roomImageId) {\n    id\n    roomId\n    url\n    caption\n    createdAt\n    updatedAt\n  }\n}": types.DeleteRoomImageDocument,
    "query GetRoomImagesByRoomId($roomId: Int!) {\n  getRoomImagesByRoomId(roomId: $roomId) {\n    id\n    roomId\n    url\n    caption\n    createdAt\n    updatedAt\n  }\n}": types.GetRoomImagesByRoomIdDocument,
    "mutation UpdateRoomImage($roomImageId: Int!, $data: UpdateRoomImageInput!) {\n  updateRoomImage(roomImageId: $roomImageId, data: $data) {\n    id\n    roomId\n    url\n    caption\n    createdAt\n    updatedAt\n  }\n}": types.UpdateRoomImageDocument,
    "mutation CreatePrice($createPriceInput: CreatePriceInput!) {\n  createPrice(createPriceInput: $createPriceInput) {\n    id\n    baseAmount\n    currency\n    roomId\n    isDynamicPricing\n    discountAmount\n    discountType\n    isDiscountActive\n  }\n}": types.CreatePriceDocument,
    "mutation CreateRoom($createRoomInput: CreateRoomInput!) {\n  createRoom(createRoomInput: $createRoomInput) {\n    id\n    status\n  }\n}": types.CreateRoomDocument,
    "mutation deleteRoom($id: Int!) {\n  removeRoom(id: $id) {\n    id\n    status\n    capacity\n    caption\n    roomNumber\n    attachBathroom\n    homestayId\n    createdAt\n    updatedAt\n  }\n}": types.DeleteRoomDocument,
    "query GetRoomWithPriceAndGallery($id: Int!) {\n  room(id: $id) {\n    id\n    status\n    capacity\n    description\n    caption\n    maxOccupancy\n    roomNumber\n    attachBathroom\n    homestayId\n    createdAt\n    updatedAt\n    image {\n      id\n      caption\n      url\n      roomId\n      createdAt\n      updatedAt\n    }\n    price {\n      id\n      baseAmount\n      currency\n      discountAmount\n      discountType\n      isDiscountActive\n      isDynamicPricing\n      dynamicAmount\n      dynamicPriceStart\n      dynamicPriceEnd\n      isWeekend\n      createdAt\n      updatedAt\n    }\n  }\n}": types.GetRoomWithPriceAndGalleryDocument,
    "query GetRooms {\n  roomsByHomestay {\n    id\n    status\n    capacity\n    caption\n    roomNumber\n    attachBathroom\n    homestayId\n    image {\n      id\n      caption\n      url\n      roomId\n      createdAt\n      updatedAt\n    }\n    price {\n      currency\n      baseAmount\n      isDynamicPricing\n      dynamicAmount\n      dynamicPriceStart\n      dynamicPriceEnd\n      isWeekend\n      discountAmount\n      discountType\n    }\n    booking {\n      id\n      startDate\n      endDate\n      status\n      guestId\n    }\n    createdAt\n    updatedAt\n  }\n}": types.GetRoomsDocument,
    "mutation UpdatePrice($updatePriceInput: UpdatePriceInput!) {\n  updatePrice(updatePriceInput: $updatePriceInput) {\n    id\n    baseAmount\n    currency\n    isDynamicPricing\n    discountAmount\n    discountType\n    isDiscountActive\n  }\n}": types.UpdatePriceDocument,
    "mutation UpdateRoom($updateRoomInput: UpdateRoomInput!) {\n  updateRoom(updateRoomInput: $updateRoomInput) {\n    id\n    status\n    capacity\n    caption\n    roomNumber\n    attachBathroom\n    homestayId\n    createdAt\n    updatedAt\n  }\n}": types.UpdateRoomDocument,
    "mutation createRules($input: CreateRulesInput!) {\n  createRules(createRulesInput: $input) {\n    id\n    rules\n  }\n}": types.CreateRulesDocument,
    "query getRules {\n  getRulesByHomestay {\n    id\n    rules\n  }\n}": types.GetRulesDocument,
    "mutation updateRules($input: UpdateRulesInput!, $rulesId: Int!) {\n  updateRules(rulesId: $rulesId, updateRulesInput: $input) {\n    id\n    rules\n  }\n}": types.UpdateRulesDocument,
    "mutation ConfirmBooking($bookingKey: String!, $bookingId: String!) {\n  confirmBooking(bookingKey: $bookingKey, bookingId: $bookingId) {\n    id\n  }\n}": types.ConfirmBookingDocument,
    "query GetBookingByKey($bookingKey: String!) {\n  bookingWithKey(bookingKey: $bookingKey) {\n    id\n    roomId\n    bookingKey\n    guestId\n    startDate\n    endDate\n    status\n    createdAt\n    updatedAt\n    room {\n      id\n      status\n      capacity\n      caption\n      roomNumber\n      attachBathroom\n      homestayId\n      createdAt\n      updatedAt\n      image {\n        url\n        caption\n      }\n      price {\n        baseAmount\n        currency\n      }\n    }\n    guest {\n      id\n      email\n      fullName\n      phoneNumber\n      isVerified\n      userType\n      createdAt\n      updatedAt\n    }\n  }\n}": types.GetBookingByKeyDocument,
    "query CheckValidBooking($roomIds: [Int!]!, $startDate: DateTime!, $endDate: DateTime!) {\n  checkValidBooking(roomIds: $roomIds, startDate: $startDate, endDate: $endDate) {\n    isValid\n    message\n    status\n    bookingSummary\n  }\n}": types.CheckValidBookingDocument,
    "query getHomestayBySlug($slug: String!) {\n  getHomestayBySlug(slug: $slug) {\n    id\n    name\n    description\n    slug\n    moderatedBySuperAdmin\n    moderatedByCommunityOwner\n    address {\n      country\n      city\n      subCity\n      street\n    }\n    contact {\n      phone\n      altPhone\n      email\n    }\n    rooms {\n      id\n      caption\n      capacity\n      roomNumber\n      status\n      image {\n        url\n        id\n        caption\n      }\n      price {\n        baseAmount\n        currency\n        isDynamicPricing\n        dynamicAmount\n        dynamicPriceStart\n        dynamicPriceEnd\n        isWeekend\n        discountAmount\n        discountType\n      }\n    }\n  }\n}": types.GetHomestayBySlugDocument,
    "mutation logInUser($input: LoginInput!) {\n  loginUser(input: $input) {\n    email\n    id\n    userType\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}": types.LogInUserDocument,
    "query getSearchQueries($query: String!) {\n  searchQueries(query: $query) {\n    country\n    city\n    subCity\n  }\n}": types.GetSearchQueriesDocument,
    "query searchHomestay($input: SearchHomestayInput!) {\n  getHomestaysBySearch(input: $input) {\n    name\n    description\n    address {\n      city\n      country\n      subCity\n      street\n    }\n    contact {\n      phone\n      email\n      altPhone\n    }\n    image {\n      url\n    }\n    rooms {\n      caption\n      image {\n        url\n        caption\n      }\n      price {\n        baseAmount\n        currency\n      }\n    }\n    slug\n  }\n}": types.SearchHomestayDocument,
    "query getGoogleOauthUrl {\n  getGoogleAuthUrl {\n    url\n  }\n}": types.GetGoogleOauthUrlDocument,
    "mutation refreshToken($input: GetTokenInput!) {\n  refreshTokens(input: $input) {\n    user {\n      email\n      fullName\n      id\n      userType\n      homestayId\n    }\n    token {\n      refreshToken\n      accessToken\n    }\n  }\n}": types.RefreshTokenDocument,
    "mutation signupUser($input: SignupInput!) {\n  signupUser(input: $input) {\n    email\n    id\n    userType\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}": types.SignupUserDocument,
    "mutation signUpWithGoogle($input: SignupWithGoogleInput!) {\n  signUpWithGoogle(input: $input) {\n    id\n    email\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}": types.SignUpWithGoogleDocument,
    "query getUserByAccessToken($token: String!) {\n  getUserByAccessToken(accessToken: $token) {\n    email\n    fullName\n    id\n    isVerified\n    phoneNumber\n    profilePicture\n  }\n}": types.GetUserByAccessTokenDocument,
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
export function graphql(source: "query BookingsByHomestay {\n  bookingsByHomestay {\n    id\n    bookingKey\n    startDate\n    endDate\n    status\n    createdAt\n    updatedAt\n    room {\n      id\n      caption\n      roomNumber\n      capacity\n      status\n      attachBathroom\n      maxOccupancy\n      price {\n        baseAmount\n        currency\n        discountAmount\n        discountType\n        isDiscountActive\n      }\n      image {\n        url\n        caption\n      }\n    }\n    guest {\n      id\n      email\n      fullName\n      phoneNumber\n    }\n  }\n}"): (typeof documents)["query BookingsByHomestay {\n  bookingsByHomestay {\n    id\n    bookingKey\n    startDate\n    endDate\n    status\n    createdAt\n    updatedAt\n    room {\n      id\n      caption\n      roomNumber\n      capacity\n      status\n      attachBathroom\n      maxOccupancy\n      price {\n        baseAmount\n        currency\n        discountAmount\n        discountType\n        isDiscountActive\n      }\n      image {\n        url\n        caption\n      }\n    }\n    guest {\n      id\n      email\n      fullName\n      phoneNumber\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getHomestayDetailsBasic {\n  getHomestayByToken {\n    name\n    slug\n    moderatedBySuperAdmin\n    moderatedByCommunityOwner\n    address {\n      country\n      city\n      subCity\n      street\n    }\n  }\n}"): (typeof documents)["query getHomestayDetailsBasic {\n  getHomestayByToken {\n    name\n    slug\n    moderatedBySuperAdmin\n    moderatedByCommunityOwner\n    address {\n      country\n      city\n      subCity\n      street\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createAddress($input: CreateAddressInput!) {\n  createAddress(data: $input) {\n    id\n  }\n}"): (typeof documents)["mutation createAddress($input: CreateAddressInput!) {\n  createAddress(data: $input) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createContacts($input: CreateContactInput!) {\n  createContact(data: $input) {\n    id\n  }\n}"): (typeof documents)["mutation createContacts($input: CreateContactInput!) {\n  createContact(data: $input) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createHomestay($input: CreateHomestayInput!) {\n  createHomestay(data: $input) {\n    id\n    ownerId\n  }\n}"): (typeof documents)["mutation createHomestay($input: CreateHomestayInput!) {\n  createHomestay(data: $input) {\n    id\n    ownerId\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getAddressByHomestayId($homestayId: Float!) {\n  getAddressByHomestayId(homestayId: $homestayId) {\n    id\n    country\n    city\n    subCity\n    street\n  }\n}"): (typeof documents)["query getAddressByHomestayId($homestayId: Float!) {\n  getAddressByHomestayId(homestayId: $homestayId) {\n    id\n    country\n    city\n    subCity\n    street\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getContactsByHomestayId($homestayId: Float!) {\n  getContactByHomestayId(homestayId: $homestayId) {\n    id\n    email\n    phone\n    altPhone\n  }\n}"): (typeof documents)["query getContactsByHomestayId($homestayId: Float!) {\n  getContactByHomestayId(homestayId: $homestayId) {\n    id\n    email\n    phone\n    altPhone\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getHomestayByToken {\n  getHomestayByToken {\n    id\n    name\n    description\n    slug\n    moderatedBySuperAdmin\n    moderatedByCommunityOwner\n  }\n}"): (typeof documents)["query getHomestayByToken {\n  getHomestayByToken {\n    id\n    name\n    description\n    slug\n    moderatedBySuperAdmin\n    moderatedByCommunityOwner\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updateAddress($input: UpdateAddressInput!, $addressId: Float!) {\n  updateAddress(data: $input, addressId: $addressId) {\n    id\n  }\n}"): (typeof documents)["mutation updateAddress($input: UpdateAddressInput!, $addressId: Float!) {\n  updateAddress(data: $input, addressId: $addressId) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updateContact($input: UpdateContactInput!, $contactId: Float!) {\n  updateContact(data: $input, contactId: $contactId) {\n    id\n  }\n}"): (typeof documents)["mutation updateContact($input: UpdateContactInput!, $contactId: Float!) {\n  updateContact(data: $input, contactId: $contactId) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updateHomestay($input: UpdateHomestayInput!, $homestayId: Float!) {\n  updateHomestay(data: $input, homestayId: $homestayId) {\n    id\n  }\n}"): (typeof documents)["mutation updateHomestay($input: UpdateHomestayInput!, $homestayId: Float!) {\n  updateHomestay(data: $input, homestayId: $homestayId) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAllHomestays($pageSize: Int, $pageNumber: Int) {\n  getAllHomestays(pageSize: $pageSize, pageNumber: $pageNumber) {\n    id\n    name\n    description\n    slug\n    moderatedByCommunityOwner\n    moderatedBySuperAdmin\n    ownerId\n    createdAt\n    updatedAt\n    address {\n      id\n      country\n      city\n      subCity\n      street\n      latitude\n      longitude\n    }\n    contact {\n      id\n      phone\n      altPhone\n      email\n    }\n    googleMapLocation {\n      id\n      description\n      lat\n      lng\n    }\n    rooms {\n      id\n      status\n      capacity\n      caption\n      description\n      roomNumber\n      maxOccupancy\n      attachBathroom\n      price {\n        id\n        baseAmount\n        currency\n        discountAmount\n        discountType\n        isDynamicPricing\n        isDiscountActive\n      }\n      image {\n        id\n        caption\n        url\n      }\n    }\n    image {\n      id\n      caption\n      url\n    }\n  }\n}"): (typeof documents)["query GetAllHomestays($pageSize: Int, $pageNumber: Int) {\n  getAllHomestays(pageSize: $pageSize, pageNumber: $pageNumber) {\n    id\n    name\n    description\n    slug\n    moderatedByCommunityOwner\n    moderatedBySuperAdmin\n    ownerId\n    createdAt\n    updatedAt\n    address {\n      id\n      country\n      city\n      subCity\n      street\n      latitude\n      longitude\n    }\n    contact {\n      id\n      phone\n      altPhone\n      email\n    }\n    googleMapLocation {\n      id\n      description\n      lat\n      lng\n    }\n    rooms {\n      id\n      status\n      capacity\n      caption\n      description\n      roomNumber\n      maxOccupancy\n      attachBathroom\n      price {\n        id\n        baseAmount\n        currency\n        discountAmount\n        discountType\n        isDynamicPricing\n        isDiscountActive\n      }\n      image {\n        id\n        caption\n        url\n      }\n    }\n    image {\n      id\n      caption\n      url\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation VerifyHomestay($homestayId: Int!, $status: Boolean!) {\n  verifyHomestay(homestayId: $homestayId, status: $status) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation VerifyHomestay($homestayId: Int!, $status: Boolean!) {\n  verifyHomestay(homestayId: $homestayId, status: $status) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query MyBookings {\n  myBookings {\n    id\n    roomId\n    bookingKey\n    guestId\n    startDate\n    endDate\n    status\n    paymentPlatformName\n    createdAt\n    updatedAt\n    room {\n      id\n      roomNumber\n      capacity\n      caption\n      status\n      attachBathroom\n      maxOccupancy\n      price {\n        currency\n        baseAmount\n      }\n    }\n    guest {\n      id\n      fullName\n      email\n    }\n  }\n}"): (typeof documents)["query MyBookings {\n  myBookings {\n    id\n    roomId\n    bookingKey\n    guestId\n    startDate\n    endDate\n    status\n    paymentPlatformName\n    createdAt\n    updatedAt\n    room {\n      id\n      roomNumber\n      capacity\n      caption\n      status\n      attachBathroom\n      maxOccupancy\n      price {\n        currency\n        baseAmount\n      }\n    }\n    guest {\n      id\n      fullName\n      email\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreatePriceRule($createPriceRuleInput: CreateDynamicPriceRuleInput!) {\n  createPriceRule(createPriceRuleInput: $createPriceRuleInput) {\n    id\n    name\n    description\n    roomId\n    startDate\n    endDate\n    amount\n    isWeekend\n    isActive\n    priority\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["mutation CreatePriceRule($createPriceRuleInput: CreateDynamicPriceRuleInput!) {\n  createPriceRule(createPriceRuleInput: $createPriceRuleInput) {\n    id\n    name\n    description\n    roomId\n    startDate\n    endDate\n    amount\n    isWeekend\n    isActive\n    priority\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RemovePriceRule($id: Int!) {\n  removePriceRule(id: $id) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation RemovePriceRule($id: Int!) {\n  removePriceRule(id: $id) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetPriceRulesByRoom($roomId: Int!) {\n  priceRulesByRoom(roomId: $roomId) {\n    id\n    name\n    description\n    amount\n    startDate\n    endDate\n    isWeekend\n    isActive\n    priority\n  }\n}"): (typeof documents)["query GetPriceRulesByRoom($roomId: Int!) {\n  priceRulesByRoom(roomId: $roomId) {\n    id\n    name\n    description\n    amount\n    startDate\n    endDate\n    isWeekend\n    isActive\n    priority\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdatePriceRule($updatePriceInput: UpdateDynamicPriceRuleInput!) {\n  updatePriceRule(updatePriceInput: $updatePriceInput) {\n    id\n    name\n    description\n    roomId\n    startDate\n    endDate\n    amount\n    isWeekend\n    isActive\n    priority\n    updatedAt\n  }\n}"): (typeof documents)["mutation UpdatePriceRule($updatePriceInput: UpdateDynamicPriceRuleInput!) {\n  updatePriceRule(updatePriceInput: $updatePriceInput) {\n    id\n    name\n    description\n    roomId\n    startDate\n    endDate\n    amount\n    isWeekend\n    isActive\n    priority\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateRoomImage($data: CreateRoomImageInput!) {\n  createRoomImage(data: $data) {\n    id\n    roomId\n    url\n    caption\n  }\n}"): (typeof documents)["mutation CreateRoomImage($data: CreateRoomImageInput!) {\n  createRoomImage(data: $data) {\n    id\n    roomId\n    url\n    caption\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteRoomImage($roomImageId: Int!) {\n  deleteRoomImage(roomImageId: $roomImageId) {\n    id\n    roomId\n    url\n    caption\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["mutation DeleteRoomImage($roomImageId: Int!) {\n  deleteRoomImage(roomImageId: $roomImageId) {\n    id\n    roomId\n    url\n    caption\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetRoomImagesByRoomId($roomId: Int!) {\n  getRoomImagesByRoomId(roomId: $roomId) {\n    id\n    roomId\n    url\n    caption\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["query GetRoomImagesByRoomId($roomId: Int!) {\n  getRoomImagesByRoomId(roomId: $roomId) {\n    id\n    roomId\n    url\n    caption\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateRoomImage($roomImageId: Int!, $data: UpdateRoomImageInput!) {\n  updateRoomImage(roomImageId: $roomImageId, data: $data) {\n    id\n    roomId\n    url\n    caption\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["mutation UpdateRoomImage($roomImageId: Int!, $data: UpdateRoomImageInput!) {\n  updateRoomImage(roomImageId: $roomImageId, data: $data) {\n    id\n    roomId\n    url\n    caption\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreatePrice($createPriceInput: CreatePriceInput!) {\n  createPrice(createPriceInput: $createPriceInput) {\n    id\n    baseAmount\n    currency\n    roomId\n    isDynamicPricing\n    discountAmount\n    discountType\n    isDiscountActive\n  }\n}"): (typeof documents)["mutation CreatePrice($createPriceInput: CreatePriceInput!) {\n  createPrice(createPriceInput: $createPriceInput) {\n    id\n    baseAmount\n    currency\n    roomId\n    isDynamicPricing\n    discountAmount\n    discountType\n    isDiscountActive\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateRoom($createRoomInput: CreateRoomInput!) {\n  createRoom(createRoomInput: $createRoomInput) {\n    id\n    status\n  }\n}"): (typeof documents)["mutation CreateRoom($createRoomInput: CreateRoomInput!) {\n  createRoom(createRoomInput: $createRoomInput) {\n    id\n    status\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation deleteRoom($id: Int!) {\n  removeRoom(id: $id) {\n    id\n    status\n    capacity\n    caption\n    roomNumber\n    attachBathroom\n    homestayId\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["mutation deleteRoom($id: Int!) {\n  removeRoom(id: $id) {\n    id\n    status\n    capacity\n    caption\n    roomNumber\n    attachBathroom\n    homestayId\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetRoomWithPriceAndGallery($id: Int!) {\n  room(id: $id) {\n    id\n    status\n    capacity\n    description\n    caption\n    maxOccupancy\n    roomNumber\n    attachBathroom\n    homestayId\n    createdAt\n    updatedAt\n    image {\n      id\n      caption\n      url\n      roomId\n      createdAt\n      updatedAt\n    }\n    price {\n      id\n      baseAmount\n      currency\n      discountAmount\n      discountType\n      isDiscountActive\n      isDynamicPricing\n      dynamicAmount\n      dynamicPriceStart\n      dynamicPriceEnd\n      isWeekend\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["query GetRoomWithPriceAndGallery($id: Int!) {\n  room(id: $id) {\n    id\n    status\n    capacity\n    description\n    caption\n    maxOccupancy\n    roomNumber\n    attachBathroom\n    homestayId\n    createdAt\n    updatedAt\n    image {\n      id\n      caption\n      url\n      roomId\n      createdAt\n      updatedAt\n    }\n    price {\n      id\n      baseAmount\n      currency\n      discountAmount\n      discountType\n      isDiscountActive\n      isDynamicPricing\n      dynamicAmount\n      dynamicPriceStart\n      dynamicPriceEnd\n      isWeekend\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetRooms {\n  roomsByHomestay {\n    id\n    status\n    capacity\n    caption\n    roomNumber\n    attachBathroom\n    homestayId\n    image {\n      id\n      caption\n      url\n      roomId\n      createdAt\n      updatedAt\n    }\n    price {\n      currency\n      baseAmount\n      isDynamicPricing\n      dynamicAmount\n      dynamicPriceStart\n      dynamicPriceEnd\n      isWeekend\n      discountAmount\n      discountType\n    }\n    booking {\n      id\n      startDate\n      endDate\n      status\n      guestId\n    }\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["query GetRooms {\n  roomsByHomestay {\n    id\n    status\n    capacity\n    caption\n    roomNumber\n    attachBathroom\n    homestayId\n    image {\n      id\n      caption\n      url\n      roomId\n      createdAt\n      updatedAt\n    }\n    price {\n      currency\n      baseAmount\n      isDynamicPricing\n      dynamicAmount\n      dynamicPriceStart\n      dynamicPriceEnd\n      isWeekend\n      discountAmount\n      discountType\n    }\n    booking {\n      id\n      startDate\n      endDate\n      status\n      guestId\n    }\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdatePrice($updatePriceInput: UpdatePriceInput!) {\n  updatePrice(updatePriceInput: $updatePriceInput) {\n    id\n    baseAmount\n    currency\n    isDynamicPricing\n    discountAmount\n    discountType\n    isDiscountActive\n  }\n}"): (typeof documents)["mutation UpdatePrice($updatePriceInput: UpdatePriceInput!) {\n  updatePrice(updatePriceInput: $updatePriceInput) {\n    id\n    baseAmount\n    currency\n    isDynamicPricing\n    discountAmount\n    discountType\n    isDiscountActive\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateRoom($updateRoomInput: UpdateRoomInput!) {\n  updateRoom(updateRoomInput: $updateRoomInput) {\n    id\n    status\n    capacity\n    caption\n    roomNumber\n    attachBathroom\n    homestayId\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["mutation UpdateRoom($updateRoomInput: UpdateRoomInput!) {\n  updateRoom(updateRoomInput: $updateRoomInput) {\n    id\n    status\n    capacity\n    caption\n    roomNumber\n    attachBathroom\n    homestayId\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createRules($input: CreateRulesInput!) {\n  createRules(createRulesInput: $input) {\n    id\n    rules\n  }\n}"): (typeof documents)["mutation createRules($input: CreateRulesInput!) {\n  createRules(createRulesInput: $input) {\n    id\n    rules\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getRules {\n  getRulesByHomestay {\n    id\n    rules\n  }\n}"): (typeof documents)["query getRules {\n  getRulesByHomestay {\n    id\n    rules\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updateRules($input: UpdateRulesInput!, $rulesId: Int!) {\n  updateRules(rulesId: $rulesId, updateRulesInput: $input) {\n    id\n    rules\n  }\n}"): (typeof documents)["mutation updateRules($input: UpdateRulesInput!, $rulesId: Int!) {\n  updateRules(rulesId: $rulesId, updateRulesInput: $input) {\n    id\n    rules\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ConfirmBooking($bookingKey: String!, $bookingId: String!) {\n  confirmBooking(bookingKey: $bookingKey, bookingId: $bookingId) {\n    id\n  }\n}"): (typeof documents)["mutation ConfirmBooking($bookingKey: String!, $bookingId: String!) {\n  confirmBooking(bookingKey: $bookingKey, bookingId: $bookingId) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetBookingByKey($bookingKey: String!) {\n  bookingWithKey(bookingKey: $bookingKey) {\n    id\n    roomId\n    bookingKey\n    guestId\n    startDate\n    endDate\n    status\n    createdAt\n    updatedAt\n    room {\n      id\n      status\n      capacity\n      caption\n      roomNumber\n      attachBathroom\n      homestayId\n      createdAt\n      updatedAt\n      image {\n        url\n        caption\n      }\n      price {\n        baseAmount\n        currency\n      }\n    }\n    guest {\n      id\n      email\n      fullName\n      phoneNumber\n      isVerified\n      userType\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["query GetBookingByKey($bookingKey: String!) {\n  bookingWithKey(bookingKey: $bookingKey) {\n    id\n    roomId\n    bookingKey\n    guestId\n    startDate\n    endDate\n    status\n    createdAt\n    updatedAt\n    room {\n      id\n      status\n      capacity\n      caption\n      roomNumber\n      attachBathroom\n      homestayId\n      createdAt\n      updatedAt\n      image {\n        url\n        caption\n      }\n      price {\n        baseAmount\n        currency\n      }\n    }\n    guest {\n      id\n      email\n      fullName\n      phoneNumber\n      isVerified\n      userType\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CheckValidBooking($roomIds: [Int!]!, $startDate: DateTime!, $endDate: DateTime!) {\n  checkValidBooking(roomIds: $roomIds, startDate: $startDate, endDate: $endDate) {\n    isValid\n    message\n    status\n    bookingSummary\n  }\n}"): (typeof documents)["query CheckValidBooking($roomIds: [Int!]!, $startDate: DateTime!, $endDate: DateTime!) {\n  checkValidBooking(roomIds: $roomIds, startDate: $startDate, endDate: $endDate) {\n    isValid\n    message\n    status\n    bookingSummary\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getHomestayBySlug($slug: String!) {\n  getHomestayBySlug(slug: $slug) {\n    id\n    name\n    description\n    slug\n    moderatedBySuperAdmin\n    moderatedByCommunityOwner\n    address {\n      country\n      city\n      subCity\n      street\n    }\n    contact {\n      phone\n      altPhone\n      email\n    }\n    rooms {\n      id\n      caption\n      capacity\n      roomNumber\n      status\n      image {\n        url\n        id\n        caption\n      }\n      price {\n        baseAmount\n        currency\n        isDynamicPricing\n        dynamicAmount\n        dynamicPriceStart\n        dynamicPriceEnd\n        isWeekend\n        discountAmount\n        discountType\n      }\n    }\n  }\n}"): (typeof documents)["query getHomestayBySlug($slug: String!) {\n  getHomestayBySlug(slug: $slug) {\n    id\n    name\n    description\n    slug\n    moderatedBySuperAdmin\n    moderatedByCommunityOwner\n    address {\n      country\n      city\n      subCity\n      street\n    }\n    contact {\n      phone\n      altPhone\n      email\n    }\n    rooms {\n      id\n      caption\n      capacity\n      roomNumber\n      status\n      image {\n        url\n        id\n        caption\n      }\n      price {\n        baseAmount\n        currency\n        isDynamicPricing\n        dynamicAmount\n        dynamicPriceStart\n        dynamicPriceEnd\n        isWeekend\n        discountAmount\n        discountType\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation logInUser($input: LoginInput!) {\n  loginUser(input: $input) {\n    email\n    id\n    userType\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}"): (typeof documents)["mutation logInUser($input: LoginInput!) {\n  loginUser(input: $input) {\n    email\n    id\n    userType\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getSearchQueries($query: String!) {\n  searchQueries(query: $query) {\n    country\n    city\n    subCity\n  }\n}"): (typeof documents)["query getSearchQueries($query: String!) {\n  searchQueries(query: $query) {\n    country\n    city\n    subCity\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query searchHomestay($input: SearchHomestayInput!) {\n  getHomestaysBySearch(input: $input) {\n    name\n    description\n    address {\n      city\n      country\n      subCity\n      street\n    }\n    contact {\n      phone\n      email\n      altPhone\n    }\n    image {\n      url\n    }\n    rooms {\n      caption\n      image {\n        url\n        caption\n      }\n      price {\n        baseAmount\n        currency\n      }\n    }\n    slug\n  }\n}"): (typeof documents)["query searchHomestay($input: SearchHomestayInput!) {\n  getHomestaysBySearch(input: $input) {\n    name\n    description\n    address {\n      city\n      country\n      subCity\n      street\n    }\n    contact {\n      phone\n      email\n      altPhone\n    }\n    image {\n      url\n    }\n    rooms {\n      caption\n      image {\n        url\n        caption\n      }\n      price {\n        baseAmount\n        currency\n      }\n    }\n    slug\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getGoogleOauthUrl {\n  getGoogleAuthUrl {\n    url\n  }\n}"): (typeof documents)["query getGoogleOauthUrl {\n  getGoogleAuthUrl {\n    url\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation refreshToken($input: GetTokenInput!) {\n  refreshTokens(input: $input) {\n    user {\n      email\n      fullName\n      id\n      userType\n      homestayId\n    }\n    token {\n      refreshToken\n      accessToken\n    }\n  }\n}"): (typeof documents)["mutation refreshToken($input: GetTokenInput!) {\n  refreshTokens(input: $input) {\n    user {\n      email\n      fullName\n      id\n      userType\n      homestayId\n    }\n    token {\n      refreshToken\n      accessToken\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation signupUser($input: SignupInput!) {\n  signupUser(input: $input) {\n    email\n    id\n    userType\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}"): (typeof documents)["mutation signupUser($input: SignupInput!) {\n  signupUser(input: $input) {\n    email\n    id\n    userType\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation signUpWithGoogle($input: SignupWithGoogleInput!) {\n  signUpWithGoogle(input: $input) {\n    id\n    email\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}"): (typeof documents)["mutation signUpWithGoogle($input: SignupWithGoogleInput!) {\n  signUpWithGoogle(input: $input) {\n    id\n    email\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getUserByAccessToken($token: String!) {\n  getUserByAccessToken(accessToken: $token) {\n    email\n    fullName\n    id\n    isVerified\n    phoneNumber\n    profilePicture\n  }\n}"): (typeof documents)["query getUserByAccessToken($token: String!) {\n  getUserByAccessToken(accessToken: $token) {\n    email\n    fullName\n    id\n    isVerified\n    phoneNumber\n    profilePicture\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;