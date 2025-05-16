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
    "mutation selectHomestayImage($selectHomestayImageId: Float!, $homestayId: Float!) {\n  selectHomestayImage(\n    selectHomestayImageId: $selectHomestayImageId\n    homestayId: $homestayId\n  ) {\n    id\n    caption\n    url\n    isSelected\n  }\n}": types.SelectHomestayImageDocument,
    "query getHomestayDetailsBasic {\n  getHomestayByToken {\n    name\n    slug\n    moderatedBySuperAdmin\n    moderatedByCommunityOwner\n    address {\n      country\n      city\n      subCity\n      street\n    }\n  }\n}": types.GetHomestayDetailsBasicDocument,
    "mutation CreateHomestayImage($data: CreateHomestayWallpaperInput!) {\n  createHomestayImage(data: $data) {\n    id\n    homestayId\n    url\n    caption\n  }\n}": types.CreateHomestayImageDocument,
    "mutation DeleteHomestayImage($homestayImageId: Int!) {\n  deleteHomestayImage(homestayImageId: $homestayImageId) {\n    id\n    homestayId\n    url\n    caption\n    createdAt\n    updatedAt\n  }\n}": types.DeleteHomestayImageDocument,
    "query GetHomestayWallpaperByHomestayId($homestayId: Int!) {\n  getHomestayWallpaperByHomestayId(homestayId: $homestayId) {\n    id\n    homestayId\n    url\n    caption\n    isSelected\n    createdAt\n    updatedAt\n  }\n}": types.GetHomestayWallpaperByHomestayIdDocument,
    "mutation UpdateHomestayImage($homestayImageId: Int!, $data: UpdateHomestayWallpaperInput!) {\n  updateHomestayImage(homestayImageId: $homestayImageId, data: $data) {\n    id\n    homestayId\n    url\n    isSelected\n    caption\n    createdAt\n    updatedAt\n  }\n}": types.UpdateHomestayImageDocument,
    "mutation createAddress($input: CreateAddressInput!) {\n  createAddress(data: $input) {\n    id\n  }\n}": types.CreateAddressDocument,
    "mutation createContacts($input: CreateContactInput!) {\n  createContact(data: $input) {\n    id\n  }\n}": types.CreateContactsDocument,
    "mutation createHomestay($input: CreateHomestayInput!) {\n  createHomestay(data: $input) {\n    id\n    ownerId\n  }\n}": types.CreateHomestayDocument,
    "query getAddressByHomestayId($homestayId: Float!) {\n  getAddressByHomestayId(homestayId: $homestayId) {\n    id\n    country\n    city\n    subCity\n    street\n    latitude\n    longitude\n  }\n}": types.GetAddressByHomestayIdDocument,
    "query getContactsByHomestayId($homestayId: Float!) {\n  getContactByHomestayId(homestayId: $homestayId) {\n    id\n    email\n    phone\n    altPhone\n  }\n}": types.GetContactsByHomestayIdDocument,
    "query getHomestayByToken {\n  getHomestayByToken {\n    id\n    name\n    description\n    slug\n    moderatedBySuperAdmin\n    moderatedByCommunityOwner\n  }\n}": types.GetHomestayByTokenDocument,
    "mutation updateAddress($input: UpdateAddressInput!, $addressId: Float!) {\n  updateAddress(data: $input, addressId: $addressId) {\n    id\n  }\n}": types.UpdateAddressDocument,
    "mutation updateContact($input: UpdateContactInput!, $contactId: Float!) {\n  updateContact(data: $input, contactId: $contactId) {\n    id\n  }\n}": types.UpdateContactDocument,
    "mutation updateHomestay($input: UpdateHomestayInput!, $homestayId: Float!) {\n  updateHomestay(data: $input, homestayId: $homestayId) {\n    id\n  }\n}": types.UpdateHomestayDocument,
    "query GetAllHomestays($pageSize: Int, $pageNumber: Int) {\n  getAllHomestays(pageSize: $pageSize, pageNumber: $pageNumber) {\n    id\n    name\n    description\n    slug\n    moderatedByCommunityOwner\n    moderatedBySuperAdmin\n    ownerId\n    createdAt\n    updatedAt\n    address {\n      id\n      country\n      city\n      subCity\n      street\n      latitude\n      longitude\n    }\n    contact {\n      id\n      phone\n      altPhone\n      email\n    }\n    rooms {\n      id\n      status\n      capacity\n      caption\n      description\n      roomNumber\n      maxOccupancy\n      attachBathroom\n      price {\n        id\n        baseAmount\n        currency\n        discountAmount\n        discountType\n        isDynamicPricing\n        isDiscountActive\n      }\n      image {\n        id\n        caption\n        url\n      }\n    }\n    image {\n      id\n      caption\n      url\n    }\n  }\n}": types.GetAllHomestaysDocument,
    "mutation VerifyHomestay($homestayId: Int!, $status: Boolean!) {\n  verifyHomestay(homestayId: $homestayId, status: $status) {\n    id\n    name\n  }\n}": types.VerifyHomestayDocument,
    "mutation ChangePassword($userId: Float!, $input: ChangePasswordInput!) {\n  changePassword(userId: $userId, input: $input)\n}": types.ChangePasswordDocument,
    "query getUserById($id: Float!) {\n  getUserById(id: $id) {\n    id\n    isVerified\n    fullName\n    email\n    phoneNumber\n    altPhoneNumber\n    city\n    gender\n    dateOfBirth\n    profilePicture\n    homestayId\n  }\n}": types.GetUserByIdDocument,
    "query MyBookings {\n  myBookings {\n    id\n    roomId\n    bookingKey\n    guestId\n    startDate\n    endDate\n    status\n    paymentPlatformName\n    createdAt\n    updatedAt\n    room {\n      id\n      roomNumber\n      capacity\n      caption\n      status\n      attachBathroom\n      maxOccupancy\n      price {\n        currency\n        baseAmount\n      }\n    }\n    guest {\n      id\n      fullName\n      email\n    }\n  }\n}": types.MyBookingsDocument,
    "mutation updateUser($input: UpdateUserInput!) {\n  updateUser(input: $input) {\n    id\n    fullName\n    email\n    phoneNumber\n    altPhoneNumber\n    city\n    gender\n    dateOfBirth\n    profilePicture\n  }\n}": types.UpdateUserDocument,
    "mutation CreatePriceRule($createPriceRuleInput: CreateDynamicPriceRuleInput!) {\n  createPriceRule(createPriceRuleInput: $createPriceRuleInput) {\n    data {\n      id\n      name\n      description\n      roomId\n      startDate\n      endDate\n      amount\n      isWeekend\n      isActive\n      priority\n      createdAt\n      updatedAt\n    }\n    error {\n      message\n    }\n  }\n}": types.CreatePriceRuleDocument,
    "mutation RemovePriceRule($id: Int!) {\n  removePriceRule(id: $id) {\n    id\n    name\n  }\n}": types.RemovePriceRuleDocument,
    "query GetPriceRulesByRoom($roomId: Int!) {\n  priceRulesByRoom(roomId: $roomId) {\n    id\n    name\n    description\n    amount\n    startDate\n    endDate\n    isWeekend\n    isActive\n    priority\n  }\n}": types.GetPriceRulesByRoomDocument,
    "mutation UpdatePriceRule($updatePriceInput: UpdateDynamicPriceRuleInput!) {\n  updatePriceRule(updatePriceInput: $updatePriceInput) {\n    id\n    name\n    description\n    roomId\n    startDate\n    endDate\n    amount\n    isWeekend\n    isActive\n    priority\n    updatedAt\n  }\n}": types.UpdatePriceRuleDocument,
    "mutation CreateRoomImage($data: CreateRoomImageInput!) {\n  createRoomImage(data: $data) {\n    id\n    roomId\n    url\n    caption\n  }\n}": types.CreateRoomImageDocument,
    "mutation DeleteRoomImage($roomImageId: Int!) {\n  deleteRoomImage(roomImageId: $roomImageId) {\n    id\n    roomId\n    url\n    caption\n    createdAt\n    updatedAt\n  }\n}": types.DeleteRoomImageDocument,
    "query GetRoomImagesByRoomId($roomId: Int!) {\n  getRoomImagesByRoomId(roomId: $roomId) {\n    id\n    roomId\n    url\n    caption\n    createdAt\n    updatedAt\n  }\n}": types.GetRoomImagesByRoomIdDocument,
    "mutation UpdateRoomImage($roomImageId: Int!, $data: UpdateRoomImageInput!) {\n  updateRoomImage(roomImageId: $roomImageId, data: $data) {\n    id\n    roomId\n    url\n    caption\n    createdAt\n    updatedAt\n  }\n}": types.UpdateRoomImageDocument,
    "mutation CreatePrice($createPriceInput: CreatePriceInput!) {\n  createPrice(createPriceInput: $createPriceInput) {\n    id\n    baseAmount\n    currency\n    roomId\n    isDynamicPricing\n    discountAmount\n    discountType\n    isDiscountActive\n  }\n}": types.CreatePriceDocument,
    "mutation CreateRoom($createRoomInput: CreateRoomInput!) {\n  createRoom(createRoomInput: $createRoomInput) {\n    id\n    status\n  }\n}": types.CreateRoomDocument,
    "mutation CreateRoomAmenity($createAmenityInput: CreateRoomAmenityInput!) {\n  createRoomAmenity(createAmenityInput: $createAmenityInput) {\n    roomAmenityId\n    roomId\n    amenity\n  }\n}": types.CreateRoomAmenityDocument,
    "mutation deleteRoom($id: Int!) {\n  removeRoom(id: $id) {\n    id\n    createdAt\n    updatedAt\n  }\n}": types.DeleteRoomDocument,
    "query FindAllAmenities {\n  findAllAmenities {\n    roomAmenityId\n    roomId\n    amenity\n  }\n}": types.FindAllAmenitiesDocument,
    "query FindAnAmenityById($id: Int!) {\n  findAnAmenityById(id: $id) {\n    roomAmenityId\n    roomId\n    amenity\n  }\n}": types.FindAnAmenityByIdDocument,
    "query FindAmenityByRoomId($roomId: Int!) {\n  findAmenityByRoomId(roomId: $roomId) {\n    roomAmenityId\n    roomId\n    amenity\n  }\n}": types.FindAmenityByRoomIdDocument,
    "query GetRoomWithPriceAndGallery($id: Int!) {\n  room(id: $id) {\n    id\n    status\n    capacity\n    description\n    caption\n    maxOccupancy\n    roomNumber\n    attachBathroom\n    homestayId\n    createdAt\n    updatedAt\n    image {\n      id\n      caption\n      url\n      roomId\n      createdAt\n      updatedAt\n    }\n    price {\n      id\n      baseAmount\n      currency\n      discountAmount\n      discountType\n      isDiscountActive\n      isDynamicPricing\n      createdAt\n      updatedAt\n    }\n  }\n}": types.GetRoomWithPriceAndGalleryDocument,
    "query GetRooms {\n  roomsByHomestay {\n    id\n    status\n    capacity\n    caption\n    roomNumber\n    attachBathroom\n    homestayId\n    image {\n      id\n      caption\n      url\n      roomId\n      createdAt\n      updatedAt\n    }\n    price {\n      currency\n      baseAmount\n      isDynamicPricing\n      discountAmount\n      discountType\n    }\n    booking {\n      id\n      startDate\n      endDate\n      status\n      guestId\n    }\n    createdAt\n    updatedAt\n  }\n}": types.GetRoomsDocument,
    "mutation RemoveRoomAmenity($roomAmenityId: Int!) {\n  removeRoomAmenity(roomAmenityId: $roomAmenityId) {\n    roomAmenityId\n    roomId\n    amenity\n  }\n}": types.RemoveRoomAmenityDocument,
    "mutation UpdatePrice($updatePriceInput: UpdatePriceInput!) {\n  updatePrice(updatePriceInput: $updatePriceInput) {\n    id\n    baseAmount\n    currency\n    isDynamicPricing\n    discountAmount\n    discountType\n    isDiscountActive\n  }\n}": types.UpdatePriceDocument,
    "mutation UpdateRoom($updateRoomInput: UpdateRoomInput!) {\n  updateRoom(updateRoomInput: $updateRoomInput) {\n    id\n    status\n    capacity\n    caption\n    roomNumber\n    attachBathroom\n    homestayId\n    createdAt\n    updatedAt\n  }\n}": types.UpdateRoomDocument,
    "mutation UpdateRoomAmenity($updateAmenityInput: UpdateRoomAmenityInput!) {\n  updateRoomAmenity(updateAmenityInput: $updateAmenityInput) {\n    roomAmenityId\n    roomId\n    amenity\n  }\n}": types.UpdateRoomAmenityDocument,
    "mutation createRules($input: CreateRulesInput!) {\n  createRules(createRulesInput: $input) {\n    id\n    rules\n  }\n}": types.CreateRulesDocument,
    "query getRules {\n  getRulesByHomestay {\n    id\n    rules\n  }\n}": types.GetRulesDocument,
    "mutation updateRules($input: UpdateRulesInput!, $rulesId: Int!) {\n  updateRules(rulesId: $rulesId, updateRulesInput: $input) {\n    id\n    rules\n  }\n}": types.UpdateRulesDocument,
    "query GetServiceByHomestayId($homestayId: Float!) {\n  findServiceByHomestayId(homestayId: $homestayId) {\n    id\n    service\n    homestayId\n    createdAt\n    updatedAt\n  }\n}": types.GetServiceByHomestayIdDocument,
    "mutation CreateService($createServiceInput: CreateServiceDto!) {\n  createService(createServiceInput: $createServiceInput) {\n    id\n    service\n    homestayId\n    createdAt\n    updatedAt\n  }\n}": types.CreateServiceDocument,
    "mutation RemoveService($id: Float!) {\n  removeService(id: $id) {\n    id\n    service\n    homestayId\n  }\n}": types.RemoveServiceDocument,
    "mutation UpdateService($updateServiceInput: UpdateServiceDto!) {\n  updateService(updateServiceInput: $updateServiceInput) {\n    id\n    service\n    homestayId\n    createdAt\n    updatedAt\n  }\n}": types.UpdateServiceDocument,
    "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email) {\n    id\n  }\n}": types.ForgotPasswordDocument,
    "mutation ResetPassword($input: ResetPasswordInput!) {\n  resetPassword(input: $input) {\n    email\n    id\n    userType\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}": types.ResetPasswordDocument,
    "mutation resendVerificationMail($id: Float!) {\n  resendVerificationMail(id: $id)\n}": types.ResendVerificationMailDocument,
    "mutation VerifyEmail($token: VerifyEmailInput!) {\n  verifyEmail(input: $token) {\n    id\n  }\n}": types.VerifyEmailDocument,
    "mutation ConfirmBooking($bookingKey: String!) {\n  confirmBooking(bookingKey: $bookingKey) {\n    count\n  }\n}": types.ConfirmBookingDocument,
    "query GetBookingByKey($bookingKey: String!) {\n  bookingsWithKey(bookingKey: $bookingKey) {\n    id\n    roomId\n    bookingKey\n    guestId\n    startDate\n    endDate\n    status\n    createdAt\n    updatedAt\n    room {\n      id\n      status\n      capacity\n      caption\n      roomNumber\n      attachBathroom\n      homestayId\n      createdAt\n      updatedAt\n      image {\n        url\n        caption\n      }\n      price {\n        baseAmount\n        currency\n      }\n    }\n    guest {\n      id\n      email\n      fullName\n      phoneNumber\n      isVerified\n      userType\n      createdAt\n      updatedAt\n    }\n  }\n}": types.GetBookingByKeyDocument,
    "query CheckValidBooking($roomIds: [Int!]!, $startDate: DateTime!, $endDate: DateTime!) {\n  checkValidBooking(roomIds: $roomIds, startDate: $startDate, endDate: $endDate) {\n    isValid\n    message\n    totalPrice\n    totalDays\n    bookingSummary {\n      roomId\n      price\n      totalPriceOfRoom\n      priceType\n    }\n  }\n}": types.CheckValidBookingDocument,
    "query FindRoomsByRoomIds($roomIds: [Int!]!) {\n  findRoomsByRoomIds(roomIds: $roomIds) {\n    roomNumbers\n    name\n  }\n}": types.FindRoomsByRoomIdsDocument,
    "mutation SendMmailAfterBooking($email: String!, $data: BookingConfirmationEmailDto!) {\n  sendMailAfterBooking(email: $email, data: $data)\n}": types.SendMmailAfterBookingDocument,
    "query getHomestayBySlug($slug: String!) {\n  getHomestayBySlug(slug: $slug) {\n    id\n    name\n    description\n    slug\n    moderatedBySuperAdmin\n    moderatedByCommunityOwner\n    image {\n      url\n      isSelected\n    }\n    address {\n      country\n      city\n      subCity\n      street\n      latitude\n      longitude\n    }\n    contact {\n      phone\n      altPhone\n      email\n    }\n    rooms {\n      id\n      caption\n      capacity\n      roomNumber\n      description\n      status\n      roomAmenity {\n        amenity\n      }\n      image {\n        url\n        id\n        caption\n      }\n      price {\n        baseAmount\n        currency\n        isDynamicPricing\n        discountAmount\n        discountType\n      }\n    }\n  }\n}": types.GetHomestayBySlugDocument,
    "mutation logInUser($input: LoginInput!) {\n  loginUser(input: $input) {\n    email\n    id\n    userType\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}": types.LogInUserDocument,
    "query getSearchQueries($query: String!) {\n  searchQueries(query: $query) {\n    country\n    city\n    subCity\n  }\n}": types.GetSearchQueriesDocument,
    "query searchHomestay($input: SearchHomestayInput!) {\n  getHomestaysBySearch(input: $input) {\n    name\n    description\n    address {\n      city\n      country\n      subCity\n      street\n    }\n    contact {\n      phone\n      email\n      altPhone\n    }\n    image {\n      url\n    }\n    rooms {\n      caption\n      image {\n        url\n        caption\n      }\n      price {\n        baseAmount\n        currency\n      }\n    }\n    slug\n  }\n}": types.SearchHomestayDocument,
    "query getGoogleOauthUrl {\n  getGoogleAuthUrl {\n    url\n  }\n}": types.GetGoogleOauthUrlDocument,
    "mutation logOut {\n  logout {\n    success\n    message\n  }\n}": types.LogOutDocument,
    "mutation refreshToken {\n  refreshTokens {\n    user {\n      email\n      fullName\n      id\n      userType\n      homestayId\n    }\n    token {\n      refreshToken\n      accessToken\n    }\n  }\n}": types.RefreshTokenDocument,
    "mutation signupUser($input: SignupInput!) {\n  signupUser(input: $input) {\n    email\n    id\n    userType\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}": types.SignupUserDocument,
    "mutation signUpWithGoogle($input: SignupWithGoogleInput!) {\n  signUpWithGoogle(input: $input) {\n    id\n    email\n    token {\n      accessToken\n      refreshToken\n    }\n  }\n}": types.SignUpWithGoogleDocument,
    "query getUserByAccessToken($token: String!) {\n  getUserByAccessToken(accessToken: $token) {\n    email\n    fullName\n    id\n    isVerified\n    phoneNumber\n    profilePicture\n  }\n}": types.GetUserByAccessTokenDocument,
    "mutation CreateAmenity($createAmenityInput: CreateAmenityInput!) {\n  createAmenity(createAmenityInput: $createAmenityInput) {\n    id\n    amenity\n    homestayId\n  }\n}": types.CreateAmenityDocument,
    "query FindAmenityByHomestayId($homestayId: Int!) {\n  findAmenityByHomestayId(homestayId: $homestayId) {\n    id\n    amenity\n    homestayId\n  }\n}": types.FindAmenityByHomestayIdDocument,
    "mutation RemoveAmenity($id: Int!) {\n  removeAmenity(id: $id) {\n    id\n    amenity\n    homestayId\n  }\n}": types.RemoveAmenityDocument,
    "mutation UpdateAmenity($updateAmenityInput: UpdateAmenityInput!) {\n  updateAmenity(updateAmenityInput: $updateAmenityInput) {\n    id\n    amenity\n    homestayId\n  }\n}": types.UpdateAmenityDocument,
    "query GetFeaturedHomestays($pageSize: Int!) {\n  getAllHomestays(pageSize: $pageSize) {\n    id\n    name\n    description\n    slug\n    address {\n      country\n      city\n      subCity\n      street\n      latitude\n      longitude\n    }\n    image {\n      url\n      caption\n      isSelected\n    }\n    rooms {\n      id\n      caption\n      capacity\n      roomNumber\n      status\n      createdAt\n      updatedAt\n      homestayId\n      image {\n        url\n        id\n        caption\n        createdAt\n        updatedAt\n        roomId\n      }\n      price {\n        baseAmount\n        currency\n        isDynamicPricing\n        discountAmount\n        discountType\n      }\n    }\n    services {\n      service\n    }\n  }\n}": types.GetFeaturedHomestaysDocument,
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
export function graphql(source: "mutation selectHomestayImage($selectHomestayImageId: Float!, $homestayId: Float!) {\n  selectHomestayImage(\n    selectHomestayImageId: $selectHomestayImageId\n    homestayId: $homestayId\n  ) {\n    id\n    caption\n    url\n    isSelected\n  }\n}"): (typeof documents)["mutation selectHomestayImage($selectHomestayImageId: Float!, $homestayId: Float!) {\n  selectHomestayImage(\n    selectHomestayImageId: $selectHomestayImageId\n    homestayId: $homestayId\n  ) {\n    id\n    caption\n    url\n    isSelected\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getHomestayDetailsBasic {\n  getHomestayByToken {\n    name\n    slug\n    moderatedBySuperAdmin\n    moderatedByCommunityOwner\n    address {\n      country\n      city\n      subCity\n      street\n    }\n  }\n}"): (typeof documents)["query getHomestayDetailsBasic {\n  getHomestayByToken {\n    name\n    slug\n    moderatedBySuperAdmin\n    moderatedByCommunityOwner\n    address {\n      country\n      city\n      subCity\n      street\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateHomestayImage($data: CreateHomestayWallpaperInput!) {\n  createHomestayImage(data: $data) {\n    id\n    homestayId\n    url\n    caption\n  }\n}"): (typeof documents)["mutation CreateHomestayImage($data: CreateHomestayWallpaperInput!) {\n  createHomestayImage(data: $data) {\n    id\n    homestayId\n    url\n    caption\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteHomestayImage($homestayImageId: Int!) {\n  deleteHomestayImage(homestayImageId: $homestayImageId) {\n    id\n    homestayId\n    url\n    caption\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["mutation DeleteHomestayImage($homestayImageId: Int!) {\n  deleteHomestayImage(homestayImageId: $homestayImageId) {\n    id\n    homestayId\n    url\n    caption\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetHomestayWallpaperByHomestayId($homestayId: Int!) {\n  getHomestayWallpaperByHomestayId(homestayId: $homestayId) {\n    id\n    homestayId\n    url\n    caption\n    isSelected\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["query GetHomestayWallpaperByHomestayId($homestayId: Int!) {\n  getHomestayWallpaperByHomestayId(homestayId: $homestayId) {\n    id\n    homestayId\n    url\n    caption\n    isSelected\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateHomestayImage($homestayImageId: Int!, $data: UpdateHomestayWallpaperInput!) {\n  updateHomestayImage(homestayImageId: $homestayImageId, data: $data) {\n    id\n    homestayId\n    url\n    isSelected\n    caption\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["mutation UpdateHomestayImage($homestayImageId: Int!, $data: UpdateHomestayWallpaperInput!) {\n  updateHomestayImage(homestayImageId: $homestayImageId, data: $data) {\n    id\n    homestayId\n    url\n    isSelected\n    caption\n    createdAt\n    updatedAt\n  }\n}"];
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
export function graphql(source: "query getAddressByHomestayId($homestayId: Float!) {\n  getAddressByHomestayId(homestayId: $homestayId) {\n    id\n    country\n    city\n    subCity\n    street\n    latitude\n    longitude\n  }\n}"): (typeof documents)["query getAddressByHomestayId($homestayId: Float!) {\n  getAddressByHomestayId(homestayId: $homestayId) {\n    id\n    country\n    city\n    subCity\n    street\n    latitude\n    longitude\n  }\n}"];
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
export function graphql(source: "query GetAllHomestays($pageSize: Int, $pageNumber: Int) {\n  getAllHomestays(pageSize: $pageSize, pageNumber: $pageNumber) {\n    id\n    name\n    description\n    slug\n    moderatedByCommunityOwner\n    moderatedBySuperAdmin\n    ownerId\n    createdAt\n    updatedAt\n    address {\n      id\n      country\n      city\n      subCity\n      street\n      latitude\n      longitude\n    }\n    contact {\n      id\n      phone\n      altPhone\n      email\n    }\n    rooms {\n      id\n      status\n      capacity\n      caption\n      description\n      roomNumber\n      maxOccupancy\n      attachBathroom\n      price {\n        id\n        baseAmount\n        currency\n        discountAmount\n        discountType\n        isDynamicPricing\n        isDiscountActive\n      }\n      image {\n        id\n        caption\n        url\n      }\n    }\n    image {\n      id\n      caption\n      url\n    }\n  }\n}"): (typeof documents)["query GetAllHomestays($pageSize: Int, $pageNumber: Int) {\n  getAllHomestays(pageSize: $pageSize, pageNumber: $pageNumber) {\n    id\n    name\n    description\n    slug\n    moderatedByCommunityOwner\n    moderatedBySuperAdmin\n    ownerId\n    createdAt\n    updatedAt\n    address {\n      id\n      country\n      city\n      subCity\n      street\n      latitude\n      longitude\n    }\n    contact {\n      id\n      phone\n      altPhone\n      email\n    }\n    rooms {\n      id\n      status\n      capacity\n      caption\n      description\n      roomNumber\n      maxOccupancy\n      attachBathroom\n      price {\n        id\n        baseAmount\n        currency\n        discountAmount\n        discountType\n        isDynamicPricing\n        isDiscountActive\n      }\n      image {\n        id\n        caption\n        url\n      }\n    }\n    image {\n      id\n      caption\n      url\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation VerifyHomestay($homestayId: Int!, $status: Boolean!) {\n  verifyHomestay(homestayId: $homestayId, status: $status) {\n    id\n    name\n  }\n}"): (typeof documents)["mutation VerifyHomestay($homestayId: Int!, $status: Boolean!) {\n  verifyHomestay(homestayId: $homestayId, status: $status) {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangePassword($userId: Float!, $input: ChangePasswordInput!) {\n  changePassword(userId: $userId, input: $input)\n}"): (typeof documents)["mutation ChangePassword($userId: Float!, $input: ChangePasswordInput!) {\n  changePassword(userId: $userId, input: $input)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getUserById($id: Float!) {\n  getUserById(id: $id) {\n    id\n    isVerified\n    fullName\n    email\n    phoneNumber\n    altPhoneNumber\n    city\n    gender\n    dateOfBirth\n    profilePicture\n    homestayId\n  }\n}"): (typeof documents)["query getUserById($id: Float!) {\n  getUserById(id: $id) {\n    id\n    isVerified\n    fullName\n    email\n    phoneNumber\n    altPhoneNumber\n    city\n    gender\n    dateOfBirth\n    profilePicture\n    homestayId\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query MyBookings {\n  myBookings {\n    id\n    roomId\n    bookingKey\n    guestId\n    startDate\n    endDate\n    status\n    paymentPlatformName\n    createdAt\n    updatedAt\n    room {\n      id\n      roomNumber\n      capacity\n      caption\n      status\n      attachBathroom\n      maxOccupancy\n      price {\n        currency\n        baseAmount\n      }\n    }\n    guest {\n      id\n      fullName\n      email\n    }\n  }\n}"): (typeof documents)["query MyBookings {\n  myBookings {\n    id\n    roomId\n    bookingKey\n    guestId\n    startDate\n    endDate\n    status\n    paymentPlatformName\n    createdAt\n    updatedAt\n    room {\n      id\n      roomNumber\n      capacity\n      caption\n      status\n      attachBathroom\n      maxOccupancy\n      price {\n        currency\n        baseAmount\n      }\n    }\n    guest {\n      id\n      fullName\n      email\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updateUser($input: UpdateUserInput!) {\n  updateUser(input: $input) {\n    id\n    fullName\n    email\n    phoneNumber\n    altPhoneNumber\n    city\n    gender\n    dateOfBirth\n    profilePicture\n  }\n}"): (typeof documents)["mutation updateUser($input: UpdateUserInput!) {\n  updateUser(input: $input) {\n    id\n    fullName\n    email\n    phoneNumber\n    altPhoneNumber\n    city\n    gender\n    dateOfBirth\n    profilePicture\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreatePriceRule($createPriceRuleInput: CreateDynamicPriceRuleInput!) {\n  createPriceRule(createPriceRuleInput: $createPriceRuleInput) {\n    data {\n      id\n      name\n      description\n      roomId\n      startDate\n      endDate\n      amount\n      isWeekend\n      isActive\n      priority\n      createdAt\n      updatedAt\n    }\n    error {\n      message\n    }\n  }\n}"): (typeof documents)["mutation CreatePriceRule($createPriceRuleInput: CreateDynamicPriceRuleInput!) {\n  createPriceRule(createPriceRuleInput: $createPriceRuleInput) {\n    data {\n      id\n      name\n      description\n      roomId\n      startDate\n      endDate\n      amount\n      isWeekend\n      isActive\n      priority\n      createdAt\n      updatedAt\n    }\n    error {\n      message\n    }\n  }\n}"];
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
export function graphql(source: "mutation CreateRoomAmenity($createAmenityInput: CreateRoomAmenityInput!) {\n  createRoomAmenity(createAmenityInput: $createAmenityInput) {\n    roomAmenityId\n    roomId\n    amenity\n  }\n}"): (typeof documents)["mutation CreateRoomAmenity($createAmenityInput: CreateRoomAmenityInput!) {\n  createRoomAmenity(createAmenityInput: $createAmenityInput) {\n    roomAmenityId\n    roomId\n    amenity\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation deleteRoom($id: Int!) {\n  removeRoom(id: $id) {\n    id\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["mutation deleteRoom($id: Int!) {\n  removeRoom(id: $id) {\n    id\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FindAllAmenities {\n  findAllAmenities {\n    roomAmenityId\n    roomId\n    amenity\n  }\n}"): (typeof documents)["query FindAllAmenities {\n  findAllAmenities {\n    roomAmenityId\n    roomId\n    amenity\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FindAnAmenityById($id: Int!) {\n  findAnAmenityById(id: $id) {\n    roomAmenityId\n    roomId\n    amenity\n  }\n}"): (typeof documents)["query FindAnAmenityById($id: Int!) {\n  findAnAmenityById(id: $id) {\n    roomAmenityId\n    roomId\n    amenity\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FindAmenityByRoomId($roomId: Int!) {\n  findAmenityByRoomId(roomId: $roomId) {\n    roomAmenityId\n    roomId\n    amenity\n  }\n}"): (typeof documents)["query FindAmenityByRoomId($roomId: Int!) {\n  findAmenityByRoomId(roomId: $roomId) {\n    roomAmenityId\n    roomId\n    amenity\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetRoomWithPriceAndGallery($id: Int!) {\n  room(id: $id) {\n    id\n    status\n    capacity\n    description\n    caption\n    maxOccupancy\n    roomNumber\n    attachBathroom\n    homestayId\n    createdAt\n    updatedAt\n    image {\n      id\n      caption\n      url\n      roomId\n      createdAt\n      updatedAt\n    }\n    price {\n      id\n      baseAmount\n      currency\n      discountAmount\n      discountType\n      isDiscountActive\n      isDynamicPricing\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["query GetRoomWithPriceAndGallery($id: Int!) {\n  room(id: $id) {\n    id\n    status\n    capacity\n    description\n    caption\n    maxOccupancy\n    roomNumber\n    attachBathroom\n    homestayId\n    createdAt\n    updatedAt\n    image {\n      id\n      caption\n      url\n      roomId\n      createdAt\n      updatedAt\n    }\n    price {\n      id\n      baseAmount\n      currency\n      discountAmount\n      discountType\n      isDiscountActive\n      isDynamicPricing\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetRooms {\n  roomsByHomestay {\n    id\n    status\n    capacity\n    caption\n    roomNumber\n    attachBathroom\n    homestayId\n    image {\n      id\n      caption\n      url\n      roomId\n      createdAt\n      updatedAt\n    }\n    price {\n      currency\n      baseAmount\n      isDynamicPricing\n      discountAmount\n      discountType\n    }\n    booking {\n      id\n      startDate\n      endDate\n      status\n      guestId\n    }\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["query GetRooms {\n  roomsByHomestay {\n    id\n    status\n    capacity\n    caption\n    roomNumber\n    attachBathroom\n    homestayId\n    image {\n      id\n      caption\n      url\n      roomId\n      createdAt\n      updatedAt\n    }\n    price {\n      currency\n      baseAmount\n      isDynamicPricing\n      discountAmount\n      discountType\n    }\n    booking {\n      id\n      startDate\n      endDate\n      status\n      guestId\n    }\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RemoveRoomAmenity($roomAmenityId: Int!) {\n  removeRoomAmenity(roomAmenityId: $roomAmenityId) {\n    roomAmenityId\n    roomId\n    amenity\n  }\n}"): (typeof documents)["mutation RemoveRoomAmenity($roomAmenityId: Int!) {\n  removeRoomAmenity(roomAmenityId: $roomAmenityId) {\n    roomAmenityId\n    roomId\n    amenity\n  }\n}"];
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
export function graphql(source: "mutation UpdateRoomAmenity($updateAmenityInput: UpdateRoomAmenityInput!) {\n  updateRoomAmenity(updateAmenityInput: $updateAmenityInput) {\n    roomAmenityId\n    roomId\n    amenity\n  }\n}"): (typeof documents)["mutation UpdateRoomAmenity($updateAmenityInput: UpdateRoomAmenityInput!) {\n  updateRoomAmenity(updateAmenityInput: $updateAmenityInput) {\n    roomAmenityId\n    roomId\n    amenity\n  }\n}"];
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
export function graphql(source: "query GetServiceByHomestayId($homestayId: Float!) {\n  findServiceByHomestayId(homestayId: $homestayId) {\n    id\n    service\n    homestayId\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["query GetServiceByHomestayId($homestayId: Float!) {\n  findServiceByHomestayId(homestayId: $homestayId) {\n    id\n    service\n    homestayId\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateService($createServiceInput: CreateServiceDto!) {\n  createService(createServiceInput: $createServiceInput) {\n    id\n    service\n    homestayId\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["mutation CreateService($createServiceInput: CreateServiceDto!) {\n  createService(createServiceInput: $createServiceInput) {\n    id\n    service\n    homestayId\n    createdAt\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RemoveService($id: Float!) {\n  removeService(id: $id) {\n    id\n    service\n    homestayId\n  }\n}"): (typeof documents)["mutation RemoveService($id: Float!) {\n  removeService(id: $id) {\n    id\n    service\n    homestayId\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateService($updateServiceInput: UpdateServiceDto!) {\n  updateService(updateServiceInput: $updateServiceInput) {\n    id\n    service\n    homestayId\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["mutation UpdateService($updateServiceInput: UpdateServiceDto!) {\n  updateService(updateServiceInput: $updateServiceInput) {\n    id\n    service\n    homestayId\n    createdAt\n    updatedAt\n  }\n}"];
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
export function graphql(source: "mutation ConfirmBooking($bookingKey: String!) {\n  confirmBooking(bookingKey: $bookingKey) {\n    count\n  }\n}"): (typeof documents)["mutation ConfirmBooking($bookingKey: String!) {\n  confirmBooking(bookingKey: $bookingKey) {\n    count\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetBookingByKey($bookingKey: String!) {\n  bookingsWithKey(bookingKey: $bookingKey) {\n    id\n    roomId\n    bookingKey\n    guestId\n    startDate\n    endDate\n    status\n    createdAt\n    updatedAt\n    room {\n      id\n      status\n      capacity\n      caption\n      roomNumber\n      attachBathroom\n      homestayId\n      createdAt\n      updatedAt\n      image {\n        url\n        caption\n      }\n      price {\n        baseAmount\n        currency\n      }\n    }\n    guest {\n      id\n      email\n      fullName\n      phoneNumber\n      isVerified\n      userType\n      createdAt\n      updatedAt\n    }\n  }\n}"): (typeof documents)["query GetBookingByKey($bookingKey: String!) {\n  bookingsWithKey(bookingKey: $bookingKey) {\n    id\n    roomId\n    bookingKey\n    guestId\n    startDate\n    endDate\n    status\n    createdAt\n    updatedAt\n    room {\n      id\n      status\n      capacity\n      caption\n      roomNumber\n      attachBathroom\n      homestayId\n      createdAt\n      updatedAt\n      image {\n        url\n        caption\n      }\n      price {\n        baseAmount\n        currency\n      }\n    }\n    guest {\n      id\n      email\n      fullName\n      phoneNumber\n      isVerified\n      userType\n      createdAt\n      updatedAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CheckValidBooking($roomIds: [Int!]!, $startDate: DateTime!, $endDate: DateTime!) {\n  checkValidBooking(roomIds: $roomIds, startDate: $startDate, endDate: $endDate) {\n    isValid\n    message\n    totalPrice\n    totalDays\n    bookingSummary {\n      roomId\n      price\n      totalPriceOfRoom\n      priceType\n    }\n  }\n}"): (typeof documents)["query CheckValidBooking($roomIds: [Int!]!, $startDate: DateTime!, $endDate: DateTime!) {\n  checkValidBooking(roomIds: $roomIds, startDate: $startDate, endDate: $endDate) {\n    isValid\n    message\n    totalPrice\n    totalDays\n    bookingSummary {\n      roomId\n      price\n      totalPriceOfRoom\n      priceType\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FindRoomsByRoomIds($roomIds: [Int!]!) {\n  findRoomsByRoomIds(roomIds: $roomIds) {\n    roomNumbers\n    name\n  }\n}"): (typeof documents)["query FindRoomsByRoomIds($roomIds: [Int!]!) {\n  findRoomsByRoomIds(roomIds: $roomIds) {\n    roomNumbers\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SendMmailAfterBooking($email: String!, $data: BookingConfirmationEmailDto!) {\n  sendMailAfterBooking(email: $email, data: $data)\n}"): (typeof documents)["mutation SendMmailAfterBooking($email: String!, $data: BookingConfirmationEmailDto!) {\n  sendMailAfterBooking(email: $email, data: $data)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getHomestayBySlug($slug: String!) {\n  getHomestayBySlug(slug: $slug) {\n    id\n    name\n    description\n    slug\n    moderatedBySuperAdmin\n    moderatedByCommunityOwner\n    image {\n      url\n      isSelected\n    }\n    address {\n      country\n      city\n      subCity\n      street\n      latitude\n      longitude\n    }\n    contact {\n      phone\n      altPhone\n      email\n    }\n    rooms {\n      id\n      caption\n      capacity\n      roomNumber\n      description\n      status\n      roomAmenity {\n        amenity\n      }\n      image {\n        url\n        id\n        caption\n      }\n      price {\n        baseAmount\n        currency\n        isDynamicPricing\n        discountAmount\n        discountType\n      }\n    }\n  }\n}"): (typeof documents)["query getHomestayBySlug($slug: String!) {\n  getHomestayBySlug(slug: $slug) {\n    id\n    name\n    description\n    slug\n    moderatedBySuperAdmin\n    moderatedByCommunityOwner\n    image {\n      url\n      isSelected\n    }\n    address {\n      country\n      city\n      subCity\n      street\n      latitude\n      longitude\n    }\n    contact {\n      phone\n      altPhone\n      email\n    }\n    rooms {\n      id\n      caption\n      capacity\n      roomNumber\n      description\n      status\n      roomAmenity {\n        amenity\n      }\n      image {\n        url\n        id\n        caption\n      }\n      price {\n        baseAmount\n        currency\n        isDynamicPricing\n        discountAmount\n        discountType\n      }\n    }\n  }\n}"];
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
export function graphql(source: "mutation logOut {\n  logout {\n    success\n    message\n  }\n}"): (typeof documents)["mutation logOut {\n  logout {\n    success\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation refreshToken {\n  refreshTokens {\n    user {\n      email\n      fullName\n      id\n      userType\n      homestayId\n    }\n    token {\n      refreshToken\n      accessToken\n    }\n  }\n}"): (typeof documents)["mutation refreshToken {\n  refreshTokens {\n    user {\n      email\n      fullName\n      id\n      userType\n      homestayId\n    }\n    token {\n      refreshToken\n      accessToken\n    }\n  }\n}"];
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
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateAmenity($createAmenityInput: CreateAmenityInput!) {\n  createAmenity(createAmenityInput: $createAmenityInput) {\n    id\n    amenity\n    homestayId\n  }\n}"): (typeof documents)["mutation CreateAmenity($createAmenityInput: CreateAmenityInput!) {\n  createAmenity(createAmenityInput: $createAmenityInput) {\n    id\n    amenity\n    homestayId\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FindAmenityByHomestayId($homestayId: Int!) {\n  findAmenityByHomestayId(homestayId: $homestayId) {\n    id\n    amenity\n    homestayId\n  }\n}"): (typeof documents)["query FindAmenityByHomestayId($homestayId: Int!) {\n  findAmenityByHomestayId(homestayId: $homestayId) {\n    id\n    amenity\n    homestayId\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RemoveAmenity($id: Int!) {\n  removeAmenity(id: $id) {\n    id\n    amenity\n    homestayId\n  }\n}"): (typeof documents)["mutation RemoveAmenity($id: Int!) {\n  removeAmenity(id: $id) {\n    id\n    amenity\n    homestayId\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateAmenity($updateAmenityInput: UpdateAmenityInput!) {\n  updateAmenity(updateAmenityInput: $updateAmenityInput) {\n    id\n    amenity\n    homestayId\n  }\n}"): (typeof documents)["mutation UpdateAmenity($updateAmenityInput: UpdateAmenityInput!) {\n  updateAmenity(updateAmenityInput: $updateAmenityInput) {\n    id\n    amenity\n    homestayId\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetFeaturedHomestays($pageSize: Int!) {\n  getAllHomestays(pageSize: $pageSize) {\n    id\n    name\n    description\n    slug\n    address {\n      country\n      city\n      subCity\n      street\n      latitude\n      longitude\n    }\n    image {\n      url\n      caption\n      isSelected\n    }\n    rooms {\n      id\n      caption\n      capacity\n      roomNumber\n      status\n      createdAt\n      updatedAt\n      homestayId\n      image {\n        url\n        id\n        caption\n        createdAt\n        updatedAt\n        roomId\n      }\n      price {\n        baseAmount\n        currency\n        isDynamicPricing\n        discountAmount\n        discountType\n      }\n    }\n    services {\n      service\n    }\n  }\n}"): (typeof documents)["query GetFeaturedHomestays($pageSize: Int!) {\n  getAllHomestays(pageSize: $pageSize) {\n    id\n    name\n    description\n    slug\n    address {\n      country\n      city\n      subCity\n      street\n      latitude\n      longitude\n    }\n    image {\n      url\n      caption\n      isSelected\n    }\n    rooms {\n      id\n      caption\n      capacity\n      roomNumber\n      status\n      createdAt\n      updatedAt\n      homestayId\n      image {\n        url\n        id\n        caption\n        createdAt\n        updatedAt\n        roomId\n      }\n      price {\n        baseAmount\n        currency\n        isDynamicPricing\n        discountAmount\n        discountType\n      }\n    }\n    services {\n      service\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;