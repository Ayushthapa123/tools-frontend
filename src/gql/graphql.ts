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
};

export type Address = {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']['output']>;
  country: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  homestayId: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  street?: Maybe<Scalars['String']['output']>;
  subCity?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Amenity = {
  __typename?: 'Amenity';
  amenity: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  homestayId: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Booking = {
  __typename?: 'Booking';
  bookingKey: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  endDate: Scalars['DateTime']['output'];
  guest: User;
  guestId: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  paymentPlatformName: PaymentPlatformName;
  room: Room;
  roomId: Scalars['Float']['output'];
  startDate: Scalars['DateTime']['output'];
  status: BookingStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export enum BookingStatus {
  Cancelled = 'CANCELLED',
  Confirmed = 'CONFIRMED',
  Pending = 'PENDING'
}

export type ChangePasswordInput = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type ContactDetails = {
  __typename?: 'ContactDetails';
  altPhone?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  homestayId: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  phone: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateAddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country: Scalars['String']['input'];
  homestayId: Scalars['Float']['input'];
  street?: InputMaybe<Scalars['String']['input']>;
  subCity?: InputMaybe<Scalars['String']['input']>;
};

export type CreateBookingInput = {
  bookingKey: Scalars['String']['input'];
  endDate: Scalars['DateTime']['input'];
  guestId: Scalars['Int']['input'];
  paymentPlatformName: Scalars['String']['input'];
  roomId: Scalars['Int']['input'];
  startDate: Scalars['DateTime']['input'];
  status: BookingStatus;
};

export type CreateContactInput = {
  altPhone?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  homestayId: Scalars['Float']['input'];
  phone: Scalars['String']['input'];
};

export type CreateHomestayInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreatePriceInput = {
  amount: Scalars['Int']['input'];
  currency: Currency;
  discountAmount?: InputMaybe<Scalars['Int']['input']>;
  discountType?: InputMaybe<DiscountType>;
  dynamicPrice?: Scalars['Boolean']['input'];
  isDiscountActive?: Scalars['Boolean']['input'];
  roomId: Scalars['Int']['input'];
};

export type CreateRoomImageInput = {
  caption: Scalars['String']['input'];
  roomId: Scalars['Float']['input'];
  url: Scalars['String']['input'];
};

export type CreateRoomInput = {
  attachBathroom?: InputMaybe<Scalars['Boolean']['input']>;
  capacity: RoomCapacity;
  caption: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  homestayId: Scalars['Int']['input'];
  images?: InputMaybe<Array<RoomImageInput>>;
  maxOccupancy?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<CreatePriceInput>;
  roomNumber?: InputMaybe<Scalars['String']['input']>;
  status: RoomStatus;
};

export type CreateSearchQueriesInput = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  subCity?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  createdAt: Scalars['DateTime']['input'];
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  passwordHash: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  updatedAt: Scalars['DateTime']['input'];
  userType: UserType;
};

export enum Currency {
  Npr = 'NPR',
  Usd = 'USD'
}

export enum DiscountType {
  Fixed = 'FIXED',
  Percentage = 'PERCENTAGE'
}

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  id: Scalars['Float']['output'];
};

export type GetTokenInput = {
  refreshToken: Scalars['String']['input'];
};

export type GoogleMapLocation = {
  __typename?: 'GoogleMapLocation';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  homestayId: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type GoogleOauthUrl = {
  __typename?: 'GoogleOauthUrl';
  url: Scalars['String']['output'];
};

export type Homestay = {
  __typename?: 'Homestay';
  address?: Maybe<Address>;
  amenities?: Maybe<Amenity>;
  contact?: Maybe<ContactDetails>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  googleMapLocation?: Maybe<GoogleMapLocation>;
  id: Scalars['ID']['output'];
  image?: Maybe<Array<HomestayImage>>;
  moderatedByCommunityOwner: Scalars['Boolean']['output'];
  moderatedBySuperAdmin: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  owner: User;
  ownerId: Scalars['Float']['output'];
  rooms?: Maybe<Array<Room>>;
  services?: Maybe<Services>;
  slug: Scalars['String']['output'];
  socials?: Maybe<Socials>;
  updatedAt: Scalars['DateTime']['output'];
};

export type HomestayImage = {
  __typename?: 'HomestayImage';
  caption?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  homestayId: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: Scalars['String']['output'];
  confirmBooking: Booking;
  createAddress: Address;
  createBooking: Booking;
  createContact: ContactDetails;
  createHomestay: Homestay;
  createPrice: Price;
  createRoom: Room;
  createRoomImage: RoomImage;
  createSearchQuery: SearchQueries;
  createUser: User;
  deleteHomestay: Homestay;
  deleteRoomImage: RoomImage;
  deleteSearchQuery: SearchQueries;
  forgotPassword: ForgotPasswordResponse;
  loginUser: UsersAndToken;
  refreshTokens: UsersHostelIdAndToken;
  removeBooking: Booking;
  removePrice: Price;
  removeRoom: Room;
  resetPassword: UsersAndToken;
  signUpWithGoogle: UsersAndToken;
  signupUser: UsersAndToken;
  updateAddress: Address;
  updateBooking: Booking;
  updateContact: ContactDetails;
  updateHomestay: Homestay;
  updatePrice: Price;
  updateRoom: Room;
  updateRoomImage: RoomImage;
  updateSearchQuery: SearchQueries;
  verifyEmail: VerifyEmailResponse;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationConfirmBookingArgs = {
  bookingId: Scalars['String']['input'];
  bookingKey: Scalars['String']['input'];
};


export type MutationCreateAddressArgs = {
  data: CreateAddressInput;
};


export type MutationCreateBookingArgs = {
  createBookingInput: CreateBookingInput;
};


export type MutationCreateContactArgs = {
  data: CreateContactInput;
};


export type MutationCreateHomestayArgs = {
  data: CreateHomestayInput;
};


export type MutationCreatePriceArgs = {
  createPriceInput: CreatePriceInput;
};


export type MutationCreateRoomArgs = {
  createRoomInput: CreateRoomInput;
};


export type MutationCreateRoomImageArgs = {
  data: CreateRoomImageInput;
};


export type MutationCreateSearchQueryArgs = {
  createSearchQueriesInput: CreateSearchQueriesInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteHomestayArgs = {
  homestayId: Scalars['Float']['input'];
};


export type MutationDeleteRoomImageArgs = {
  roomImageId: Scalars['Int']['input'];
};


export type MutationDeleteSearchQueryArgs = {
  searchQueryId: Scalars['Int']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginUserArgs = {
  input: LoginInput;
};


export type MutationRefreshTokensArgs = {
  input: GetTokenInput;
};


export type MutationRemoveBookingArgs = {
  id: Scalars['Float']['input'];
};


export type MutationRemovePriceArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveRoomArgs = {
  id: Scalars['Int']['input'];
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSignUpWithGoogleArgs = {
  input: SignupWithGoogleInput;
};


export type MutationSignupUserArgs = {
  input: SignupInput;
};


export type MutationUpdateAddressArgs = {
  addressId: Scalars['Float']['input'];
  data: UpdateAddressInput;
};


export type MutationUpdateBookingArgs = {
  id: Scalars['Float']['input'];
  updateBookingInput: UpdateBookingInput;
};


export type MutationUpdateContactArgs = {
  contactId: Scalars['Float']['input'];
  data: UpdateContactInput;
};


export type MutationUpdateHomestayArgs = {
  data: UpdateHomestayInput;
  homestayId: Scalars['Float']['input'];
};


export type MutationUpdatePriceArgs = {
  updatePriceInput: UpdatePriceInput;
};


export type MutationUpdateRoomArgs = {
  updateRoomInput: UpdateRoomInput;
};


export type MutationUpdateRoomImageArgs = {
  data: UpdateRoomImageInput;
  roomImageId: Scalars['Int']['input'];
};


export type MutationUpdateSearchQueryArgs = {
  searchQueryId: Scalars['Int']['input'];
  updateSearchQueriesInput: UpdateSearchQueriesInput;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

export enum PaymentPlatformName {
  Esewa = 'ESEWA',
  Khalti = 'KHALTI',
  Stripe = 'STRIPE'
}

export type Price = {
  __typename?: 'Price';
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  currency: Currency;
  discountAmount?: Maybe<Scalars['Float']['output']>;
  discountType?: Maybe<DiscountType>;
  dynamicPrice?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  isDiscountActive: Scalars['Boolean']['output'];
  roomId: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  booking: Booking;
  bookingWithKey: Booking;
  bookings: Array<Booking>;
  bookingsByHomestay: Array<Booking>;
  checkValidBooking: ValidInvalidBooking;
  getAddressByHomestayId?: Maybe<Address>;
  getAllHomestays: Array<Homestay>;
  getAllSearchQueries: Array<SearchQueries>;
  getCitySearchSuggestions?: Maybe<Array<SearchQueries>>;
  getContactByHomestayId?: Maybe<ContactDetails>;
  getGoogleAuthUrl: GoogleOauthUrl;
  getHomestayById?: Maybe<Homestay>;
  getHomestayBySlug?: Maybe<Homestay>;
  getHomestayByToken?: Maybe<Homestay>;
  getHomestaysBySearch: Array<Homestay>;
  getHostelSearchSuggestions?: Maybe<Array<SearchQueries>>;
  getRoomImagesByRoomId?: Maybe<Array<RoomImage>>;
  getToleSearchSuggestions?: Maybe<Array<SearchQueries>>;
  getUser?: Maybe<User>;
  getUserByAccessToken?: Maybe<User>;
  getUsers: Array<User>;
  myBookings: Array<Booking>;
  price: Price;
  priceByRoom: Price;
  prices: Array<Price>;
  room: Room;
  roomBookings: Array<Booking>;
  rooms: Array<Room>;
  roomsByHomestay: Array<Room>;
  searchQueries: Array<SearchQueries>;
  searchQuery: SearchQueries;
};


export type QueryBookingArgs = {
  id: Scalars['Float']['input'];
};


export type QueryBookingWithKeyArgs = {
  bookingKey: Scalars['String']['input'];
};


export type QueryCheckValidBookingArgs = {
  endDate: Scalars['DateTime']['input'];
  roomId: Scalars['Int']['input'];
  startDate: Scalars['DateTime']['input'];
};


export type QueryGetAddressByHomestayIdArgs = {
  homestayId: Scalars['Float']['input'];
};


export type QueryGetAllHomestaysArgs = {
  pageNumber?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
};


export type QueryGetCitySearchSuggestionsArgs = {
  query: Scalars['String']['input'];
};


export type QueryGetContactByHomestayIdArgs = {
  homestayId: Scalars['Float']['input'];
};


export type QueryGetHomestayByIdArgs = {
  homestayId: Scalars['Float']['input'];
};


export type QueryGetHomestayBySlugArgs = {
  checkInDate?: InputMaybe<Scalars['DateTime']['input']>;
  checkOutDate?: InputMaybe<Scalars['DateTime']['input']>;
  slug: Scalars['String']['input'];
};


export type QueryGetHomestaysBySearchArgs = {
  input: SearchHomestayInput;
};


export type QueryGetHostelSearchSuggestionsArgs = {
  query: Scalars['String']['input'];
};


export type QueryGetRoomImagesByRoomIdArgs = {
  roomId: Scalars['Int']['input'];
};


export type QueryGetToleSearchSuggestionsArgs = {
  query: Scalars['String']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetUserByAccessTokenArgs = {
  accessToken: Scalars['String']['input'];
};


export type QueryPriceArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPriceByRoomArgs = {
  roomId: Scalars['Int']['input'];
};


export type QueryRoomArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRoomBookingsArgs = {
  roomId: Scalars['Float']['input'];
};


export type QuerySearchQueriesArgs = {
  query: Scalars['String']['input'];
};


export type QuerySearchQueryArgs = {
  searchQueryId: Scalars['Int']['input'];
};

export type ResetPasswordInput = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type Room = {
  __typename?: 'Room';
  attachBathroom?: Maybe<Scalars['Boolean']['output']>;
  booking?: Maybe<Array<Booking>>;
  capacity: RoomCapacity;
  caption: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  homestayId: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Array<RoomImage>>;
  maxOccupancy?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Price>;
  roomNumber?: Maybe<Scalars['String']['output']>;
  status: RoomStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export enum RoomCapacity {
  OneBed = 'ONE_BED',
  TwoBed = 'TWO_BED'
}

export type RoomImage = {
  __typename?: 'RoomImage';
  caption?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  room: Room;
  roomId: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type RoomImageInput = {
  caption?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export enum RoomStatus {
  Available = 'AVAILABLE',
  Booked = 'BOOKED',
  Idle = 'IDLE',
  Inactive = 'INACTIVE'
}

export type SearchHomestayInput = {
  checkInDate?: InputMaybe<Scalars['DateTime']['input']>;
  checkOutDate?: InputMaybe<Scalars['DateTime']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  minRating?: InputMaybe<Scalars['Float']['input']>;
  pageNumber: Scalars['Float']['input'];
  subCity?: InputMaybe<Scalars['String']['input']>;
};

export type SearchQueries = {
  __typename?: 'SearchQueries';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  subCity?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Services = {
  __typename?: 'Services';
  createdAt: Scalars['DateTime']['output'];
  homestayId: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  service: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SignupInput = {
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  userType: Scalars['String']['input'];
};

export type SignupWithGoogleInput = {
  token: Scalars['String']['input'];
};

export type Socials = {
  __typename?: 'Socials';
  createdAt: Scalars['DateTime']['output'];
  facebook?: Maybe<Scalars['String']['output']>;
  homestayId: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  instaGram?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  youTube?: Maybe<Scalars['String']['output']>;
};

export type Token = {
  __typename?: 'Token';
  accessToken: Scalars['ID']['output'];
  refreshToken: Scalars['String']['output'];
};

export type UpdateAddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  subCity?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBookingInput = {
  bookingKey?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  guestId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  paymentPlatformName?: InputMaybe<Scalars['String']['input']>;
  roomId?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<BookingStatus>;
};

export type UpdateContactInput = {
  altPhone?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateHomestayInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  moderatedByCommunityOwner?: InputMaybe<Scalars['Boolean']['input']>;
  moderatedBySuperAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePriceInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  currency?: InputMaybe<Currency>;
  discountAmount?: InputMaybe<Scalars['Int']['input']>;
  discountType?: InputMaybe<DiscountType>;
  dynamicPrice?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
  isDiscountActive?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateRoomImageInput = {
  caption: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  url: Scalars['String']['input'];
};

export type UpdateRoomInput = {
  attachBathroom?: InputMaybe<Scalars['Boolean']['input']>;
  capacity?: InputMaybe<RoomCapacity>;
  caption?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  homestayId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  images?: InputMaybe<Array<RoomImageInput>>;
  maxOccupancy?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<CreatePriceInput>;
  roomNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<RoomStatus>;
};

export type UpdateSearchQueriesInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  subCity?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  hashedRefreshToken?: Maybe<Scalars['String']['output']>;
  homestayId?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  isVerified: Scalars['Boolean']['output'];
  passwordHash?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  profilePicture?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userType: UserType;
};

export enum UserType {
  CommunityOwner = 'COMMUNITY_OWNER',
  Guest = 'GUEST',
  HomestayOwner = 'HOMESTAY_OWNER',
  Superadmin = 'SUPERADMIN'
}

export type UsersAndToken = {
  __typename?: 'UsersAndToken';
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  token: Token;
  userType: UserType;
};

export type UsersHostelIdAndToken = {
  __typename?: 'UsersHostelIdAndToken';
  token: Token;
  user: User;
};

export type ValidInvalidBooking = {
  __typename?: 'ValidInvalidBooking';
  isValid: Scalars['Boolean']['output'];
  message?: Maybe<Scalars['String']['output']>;
  status?: Maybe<BookingStatus>;
};

export type VerifyEmailInput = {
  token: Scalars['String']['input'];
};

export type VerifyEmailResponse = {
  __typename?: 'VerifyEmailResponse';
  id: Scalars['Float']['output'];
};

export type BookingsByHomestayQueryVariables = Exact<{ [key: string]: never; }>;


export type BookingsByHomestayQuery = { __typename?: 'Query', bookingsByHomestay: Array<{ __typename?: 'Booking', id: string, bookingKey: string, startDate: any, endDate: any, status: BookingStatus, createdAt: any, updatedAt: any, room: { __typename?: 'Room', id: string, caption: string, roomNumber?: string | null, capacity: RoomCapacity, status: RoomStatus, attachBathroom?: boolean | null, maxOccupancy?: string | null, price?: { __typename?: 'Price', amount: number, currency: Currency, discountAmount?: number | null, discountType?: DiscountType | null, isDiscountActive: boolean } | null, image?: Array<{ __typename?: 'RoomImage', url: string, caption?: string | null }> | null }, guest: { __typename?: 'User', id: string, email: string, fullName: string, phoneNumber?: string | null } }> };

export type GetHomestayDetailsBasicQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHomestayDetailsBasicQuery = { __typename?: 'Query', getHomestayByToken?: { __typename?: 'Homestay', name: string, slug: string, moderatedBySuperAdmin: boolean, moderatedByCommunityOwner: boolean, address?: { __typename?: 'Address', country: string, city?: string | null, subCity?: string | null, street?: string | null } | null } | null };

export type CreateAddressMutationVariables = Exact<{
  input: CreateAddressInput;
}>;


export type CreateAddressMutation = { __typename?: 'Mutation', createAddress: { __typename?: 'Address', id: string } };

export type CreateContactsMutationVariables = Exact<{
  input: CreateContactInput;
}>;


export type CreateContactsMutation = { __typename?: 'Mutation', createContact: { __typename?: 'ContactDetails', id: string } };

export type CreateHomestayMutationVariables = Exact<{
  input: CreateHomestayInput;
}>;


export type CreateHomestayMutation = { __typename?: 'Mutation', createHomestay: { __typename?: 'Homestay', id: string, ownerId: number } };

export type GetAddressByHomestayIdQueryVariables = Exact<{
  homestayId: Scalars['Float']['input'];
}>;


export type GetAddressByHomestayIdQuery = { __typename?: 'Query', getAddressByHomestayId?: { __typename?: 'Address', id: string, country: string, city?: string | null, subCity?: string | null, street?: string | null } | null };

export type GetContactsByHomestayIdQueryVariables = Exact<{
  homestayId: Scalars['Float']['input'];
}>;


export type GetContactsByHomestayIdQuery = { __typename?: 'Query', getContactByHomestayId?: { __typename?: 'ContactDetails', id: string, email: string, phone: string, altPhone?: string | null } | null };

export type GetHomestayByTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHomestayByTokenQuery = { __typename?: 'Query', getHomestayByToken?: { __typename?: 'Homestay', id: string, name: string, description?: string | null, slug: string, moderatedBySuperAdmin: boolean, moderatedByCommunityOwner: boolean } | null };

export type UpdateAddressMutationVariables = Exact<{
  input: UpdateAddressInput;
  addressId: Scalars['Float']['input'];
}>;


export type UpdateAddressMutation = { __typename?: 'Mutation', updateAddress: { __typename?: 'Address', id: string } };

export type UpdateContactMutationVariables = Exact<{
  input: UpdateContactInput;
  contactId: Scalars['Float']['input'];
}>;


export type UpdateContactMutation = { __typename?: 'Mutation', updateContact: { __typename?: 'ContactDetails', id: string } };

export type UpdateHomestayMutationVariables = Exact<{
  input: UpdateHomestayInput;
  homestayId: Scalars['Float']['input'];
}>;


export type UpdateHomestayMutation = { __typename?: 'Mutation', updateHomestay: { __typename?: 'Homestay', id: string } };

export type MyBookingsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyBookingsQuery = { __typename?: 'Query', myBookings: Array<{ __typename?: 'Booking', id: string, roomId: number, bookingKey: string, guestId: number, startDate: any, endDate: any, status: BookingStatus, paymentPlatformName: PaymentPlatformName, createdAt: any, updatedAt: any, room: { __typename?: 'Room', id: string, roomNumber?: string | null, capacity: RoomCapacity, caption: string, status: RoomStatus, attachBathroom?: boolean | null, maxOccupancy?: string | null, price?: { __typename?: 'Price', currency: Currency, amount: number } | null }, guest: { __typename?: 'User', id: string, fullName: string, email: string } }> };

export type CreateRoomImageMutationVariables = Exact<{
  data: CreateRoomImageInput;
}>;


export type CreateRoomImageMutation = { __typename?: 'Mutation', createRoomImage: { __typename?: 'RoomImage', id: string, roomId: number, url: string, caption?: string | null } };

export type DeleteRoomImageMutationVariables = Exact<{
  roomImageId: Scalars['Int']['input'];
}>;


export type DeleteRoomImageMutation = { __typename?: 'Mutation', deleteRoomImage: { __typename?: 'RoomImage', id: string, roomId: number, url: string, caption?: string | null, createdAt: any, updatedAt: any } };

export type GetRoomImagesByRoomIdQueryVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type GetRoomImagesByRoomIdQuery = { __typename?: 'Query', getRoomImagesByRoomId?: Array<{ __typename?: 'RoomImage', id: string, roomId: number, url: string, caption?: string | null, createdAt: any, updatedAt: any }> | null };

export type UpdateRoomImageMutationVariables = Exact<{
  roomImageId: Scalars['Int']['input'];
  data: UpdateRoomImageInput;
}>;


export type UpdateRoomImageMutation = { __typename?: 'Mutation', updateRoomImage: { __typename?: 'RoomImage', id: string, roomId: number, url: string, caption?: string | null, createdAt: any, updatedAt: any } };

export type CreatePriceMutationVariables = Exact<{
  createPriceInput: CreatePriceInput;
}>;


export type CreatePriceMutation = { __typename?: 'Mutation', createPrice: { __typename?: 'Price', id: string, amount: number, currency: Currency, roomId: number, dynamicPrice?: boolean | null, discountAmount?: number | null, discountType?: DiscountType | null, isDiscountActive: boolean } };

export type CreateRoomMutationVariables = Exact<{
  createRoomInput: CreateRoomInput;
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createRoom: { __typename?: 'Room', id: string, status: RoomStatus } };

export type DeleteRoomMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteRoomMutation = { __typename?: 'Mutation', removeRoom: { __typename?: 'Room', id: string, status: RoomStatus, capacity: RoomCapacity, caption: string, roomNumber?: string | null, attachBathroom?: boolean | null, homestayId: number, createdAt: any, updatedAt: any } };

export type GetRoomWithPriceAndGalleryQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetRoomWithPriceAndGalleryQuery = { __typename?: 'Query', room: { __typename?: 'Room', id: string, status: RoomStatus, capacity: RoomCapacity, caption: string, maxOccupancy?: string | null, roomNumber?: string | null, attachBathroom?: boolean | null, homestayId: number, createdAt: any, updatedAt: any, image?: Array<{ __typename?: 'RoomImage', id: string, caption?: string | null, url: string, roomId: number, createdAt: any, updatedAt: any }> | null, price?: { __typename?: 'Price', id: string, amount: number, currency: Currency, discountAmount?: number | null, discountType?: DiscountType | null, isDiscountActive: boolean, dynamicPrice?: boolean | null, createdAt: any, updatedAt: any } | null } };

export type GetRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRoomsQuery = { __typename?: 'Query', roomsByHomestay: Array<{ __typename?: 'Room', id: string, status: RoomStatus, capacity: RoomCapacity, caption: string, roomNumber?: string | null, attachBathroom?: boolean | null, homestayId: number, createdAt: any, updatedAt: any, image?: Array<{ __typename?: 'RoomImage', id: string, caption?: string | null, url: string, roomId: number, createdAt: any, updatedAt: any }> | null, price?: { __typename?: 'Price', currency: Currency, amount: number } | null, booking?: Array<{ __typename?: 'Booking', id: string, startDate: any, endDate: any, status: BookingStatus, guestId: number }> | null }> };

export type UpdatePriceMutationVariables = Exact<{
  updatePriceInput: UpdatePriceInput;
}>;


export type UpdatePriceMutation = { __typename?: 'Mutation', updatePrice: { __typename?: 'Price', id: string, amount: number, currency: Currency, dynamicPrice?: boolean | null, discountAmount?: number | null, discountType?: DiscountType | null, isDiscountActive: boolean } };

export type UpdateRoomMutationVariables = Exact<{
  updateRoomInput: UpdateRoomInput;
}>;


export type UpdateRoomMutation = { __typename?: 'Mutation', updateRoom: { __typename?: 'Room', id: string, status: RoomStatus, capacity: RoomCapacity, caption: string, roomNumber?: string | null, attachBathroom?: boolean | null, homestayId: number, createdAt: any, updatedAt: any } };

export type ConfirmBookingMutationVariables = Exact<{
  bookingKey: Scalars['String']['input'];
  bookingId: Scalars['String']['input'];
}>;


export type ConfirmBookingMutation = { __typename?: 'Mutation', confirmBooking: { __typename?: 'Booking', id: string } };

export type GetBookingByKeyQueryVariables = Exact<{
  bookingKey: Scalars['String']['input'];
}>;


export type GetBookingByKeyQuery = { __typename?: 'Query', bookingWithKey: { __typename?: 'Booking', id: string, roomId: number, bookingKey: string, guestId: number, startDate: any, endDate: any, status: BookingStatus, createdAt: any, updatedAt: any, room: { __typename?: 'Room', id: string, status: RoomStatus, capacity: RoomCapacity, caption: string, roomNumber?: string | null, attachBathroom?: boolean | null, homestayId: number, createdAt: any, updatedAt: any, image?: Array<{ __typename?: 'RoomImage', url: string, caption?: string | null }> | null, price?: { __typename?: 'Price', amount: number, currency: Currency } | null }, guest: { __typename?: 'User', id: string, email: string, fullName: string, phoneNumber?: string | null, isVerified: boolean, userType: UserType, createdAt: any, updatedAt: any } } };

export type CheckValidBookingQueryVariables = Exact<{
  roomId: Scalars['Int']['input'];
  startDate: Scalars['DateTime']['input'];
  endDate: Scalars['DateTime']['input'];
}>;


export type CheckValidBookingQuery = { __typename?: 'Query', checkValidBooking: { __typename?: 'ValidInvalidBooking', isValid: boolean, message?: string | null, status?: BookingStatus | null } };

export type GetHomestayBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetHomestayBySlugQuery = { __typename?: 'Query', getHomestayBySlug?: { __typename?: 'Homestay', id: string, name: string, description?: string | null, slug: string, moderatedBySuperAdmin: boolean, moderatedByCommunityOwner: boolean, address?: { __typename?: 'Address', country: string, city?: string | null, subCity?: string | null, street?: string | null } | null, contact?: { __typename?: 'ContactDetails', phone: string, altPhone?: string | null, email: string } | null, rooms?: Array<{ __typename?: 'Room', id: string, caption: string, capacity: RoomCapacity, roomNumber?: string | null, status: RoomStatus, image?: Array<{ __typename?: 'RoomImage', url: string, id: string, caption?: string | null }> | null, price?: { __typename?: 'Price', amount: number, currency: Currency } | null }> | null } | null };

export type LogInUserMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LogInUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'UsersAndToken', email: string, id: string, userType: UserType, token: { __typename?: 'Token', accessToken: string, refreshToken: string } } };

export type GetSearchQueriesQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type GetSearchQueriesQuery = { __typename?: 'Query', searchQueries: Array<{ __typename?: 'SearchQueries', country: string, city: string, subCity?: string | null }> };

export type SearchHomestayQueryVariables = Exact<{
  input: SearchHomestayInput;
}>;


export type SearchHomestayQuery = { __typename?: 'Query', getHomestaysBySearch: Array<{ __typename?: 'Homestay', name: string, description?: string | null, slug: string, address?: { __typename?: 'Address', city?: string | null, country: string, subCity?: string | null, street?: string | null } | null, contact?: { __typename?: 'ContactDetails', phone: string, email: string, altPhone?: string | null } | null, image?: Array<{ __typename?: 'HomestayImage', url: string }> | null, rooms?: Array<{ __typename?: 'Room', caption: string, image?: Array<{ __typename?: 'RoomImage', url: string, caption?: string | null }> | null, price?: { __typename?: 'Price', amount: number, currency: Currency } | null }> | null }> };

export type GetGoogleOauthUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGoogleOauthUrlQuery = { __typename?: 'Query', getGoogleAuthUrl: { __typename?: 'GoogleOauthUrl', url: string } };

export type RefreshTokenMutationVariables = Exact<{
  input: GetTokenInput;
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshTokens: { __typename?: 'UsersHostelIdAndToken', user: { __typename?: 'User', email: string, fullName: string, id: string, userType: UserType, homestayId?: number | null }, token: { __typename?: 'Token', refreshToken: string, accessToken: string } } };

export type SignupUserMutationVariables = Exact<{
  input: SignupInput;
}>;


export type SignupUserMutation = { __typename?: 'Mutation', signupUser: { __typename?: 'UsersAndToken', email: string, id: string, userType: UserType, token: { __typename?: 'Token', accessToken: string, refreshToken: string } } };

export type SignUpWithGoogleMutationVariables = Exact<{
  input: SignupWithGoogleInput;
}>;


export type SignUpWithGoogleMutation = { __typename?: 'Mutation', signUpWithGoogle: { __typename?: 'UsersAndToken', id: string, email: string, token: { __typename?: 'Token', accessToken: string, refreshToken: string } } };

export type GetUserByAccessTokenQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type GetUserByAccessTokenQuery = { __typename?: 'Query', getUserByAccessToken?: { __typename?: 'User', email: string, fullName: string, id: string, isVerified: boolean, phoneNumber?: string | null, profilePicture?: string | null } | null };


export const BookingsByHomestayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BookingsByHomestay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookingsByHomestay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bookingKey"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"roomNumber"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"attachBathroom"}},{"kind":"Field","name":{"kind":"Name","value":"maxOccupancy"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"isDiscountActive"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"guest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}}]}}]}}]} as unknown as DocumentNode<BookingsByHomestayQuery, BookingsByHomestayQueryVariables>;
export const GetHomestayDetailsBasicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getHomestayDetailsBasic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getHomestayByToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"moderatedBySuperAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"moderatedByCommunityOwner"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"subCity"}},{"kind":"Field","name":{"kind":"Name","value":"street"}}]}}]}}]}}]} as unknown as DocumentNode<GetHomestayDetailsBasicQuery, GetHomestayDetailsBasicQueryVariables>;
export const CreateAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAddressInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateAddressMutation, CreateAddressMutationVariables>;
export const CreateContactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createContacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateContactInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateContactsMutation, CreateContactsMutationVariables>;
export const CreateHomestayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createHomestay"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateHomestayInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createHomestay"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}}]}}]}}]} as unknown as DocumentNode<CreateHomestayMutation, CreateHomestayMutationVariables>;
export const GetAddressByHomestayIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAddressByHomestayId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"homestayId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAddressByHomestayId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"homestayId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"homestayId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"subCity"}},{"kind":"Field","name":{"kind":"Name","value":"street"}}]}}]}}]} as unknown as DocumentNode<GetAddressByHomestayIdQuery, GetAddressByHomestayIdQueryVariables>;
export const GetContactsByHomestayIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getContactsByHomestayId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"homestayId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getContactByHomestayId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"homestayId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"homestayId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"altPhone"}}]}}]}}]} as unknown as DocumentNode<GetContactsByHomestayIdQuery, GetContactsByHomestayIdQueryVariables>;
export const GetHomestayByTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getHomestayByToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getHomestayByToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"moderatedBySuperAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"moderatedByCommunityOwner"}}]}}]}}]} as unknown as DocumentNode<GetHomestayByTokenQuery, GetHomestayByTokenQueryVariables>;
export const UpdateAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAddressInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addressId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"addressId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addressId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateAddressMutation, UpdateAddressMutationVariables>;
export const UpdateContactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateContact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateContactInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contactId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"contactId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contactId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateContactMutation, UpdateContactMutationVariables>;
export const UpdateHomestayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateHomestay"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateHomestayInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"homestayId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateHomestay"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"homestayId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"homestayId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateHomestayMutation, UpdateHomestayMutationVariables>;
export const MyBookingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyBookings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myBookings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"bookingKey"}},{"kind":"Field","name":{"kind":"Name","value":"guestId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"paymentPlatformName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roomNumber"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"attachBathroom"}},{"kind":"Field","name":{"kind":"Name","value":"maxOccupancy"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"guest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<MyBookingsQuery, MyBookingsQueryVariables>;
export const CreateRoomImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRoomImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRoomImageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRoomImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}}]}}]}}]} as unknown as DocumentNode<CreateRoomImageMutation, CreateRoomImageMutationVariables>;
export const DeleteRoomImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRoomImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomImageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRoomImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomImageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomImageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<DeleteRoomImageMutation, DeleteRoomImageMutationVariables>;
export const GetRoomImagesByRoomIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRoomImagesByRoomId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRoomImagesByRoomId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetRoomImagesByRoomIdQuery, GetRoomImagesByRoomIdQueryVariables>;
export const UpdateRoomImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRoomImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomImageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRoomImageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRoomImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomImageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomImageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateRoomImageMutation, UpdateRoomImageMutationVariables>;
export const CreatePriceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePrice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createPriceInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePriceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPrice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createPriceInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createPriceInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"dynamicPrice"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"isDiscountActive"}}]}}]}}]} as unknown as DocumentNode<CreatePriceMutation, CreatePriceMutationVariables>;
export const CreateRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createRoomInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRoomInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createRoomInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createRoomInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateRoomMutation, CreateRoomMutationVariables>;
export const DeleteRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"roomNumber"}},{"kind":"Field","name":{"kind":"Name","value":"attachBathroom"}},{"kind":"Field","name":{"kind":"Name","value":"homestayId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<DeleteRoomMutation, DeleteRoomMutationVariables>;
export const GetRoomWithPriceAndGalleryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRoomWithPriceAndGallery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"maxOccupancy"}},{"kind":"Field","name":{"kind":"Name","value":"roomNumber"}},{"kind":"Field","name":{"kind":"Name","value":"attachBathroom"}},{"kind":"Field","name":{"kind":"Name","value":"homestayId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"isDiscountActive"}},{"kind":"Field","name":{"kind":"Name","value":"dynamicPrice"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetRoomWithPriceAndGalleryQuery, GetRoomWithPriceAndGalleryQueryVariables>;
export const GetRoomsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomsByHomestay"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"roomNumber"}},{"kind":"Field","name":{"kind":"Name","value":"attachBathroom"}},{"kind":"Field","name":{"kind":"Name","value":"homestayId"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"booking"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"guestId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetRoomsQuery, GetRoomsQueryVariables>;
export const UpdatePriceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePrice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePriceInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePriceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePrice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updatePriceInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePriceInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"dynamicPrice"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"isDiscountActive"}}]}}]}}]} as unknown as DocumentNode<UpdatePriceMutation, UpdatePriceMutationVariables>;
export const UpdateRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateRoomInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRoomInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateRoomInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateRoomInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"roomNumber"}},{"kind":"Field","name":{"kind":"Name","value":"attachBathroom"}},{"kind":"Field","name":{"kind":"Name","value":"homestayId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateRoomMutation, UpdateRoomMutationVariables>;
export const ConfirmBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConfirmBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookingKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookingId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookingKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookingKey"}}},{"kind":"Argument","name":{"kind":"Name","value":"bookingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookingId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ConfirmBookingMutation, ConfirmBookingMutationVariables>;
export const GetBookingByKeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBookingByKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookingKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookingWithKey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookingKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookingKey"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"bookingKey"}},{"kind":"Field","name":{"kind":"Name","value":"guestId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"roomNumber"}},{"kind":"Field","name":{"kind":"Name","value":"attachBathroom"}},{"kind":"Field","name":{"kind":"Name","value":"homestayId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"guest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetBookingByKeyQuery, GetBookingByKeyQueryVariables>;
export const CheckValidBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckValidBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkValidBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isValid"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CheckValidBookingQuery, CheckValidBookingQueryVariables>;
export const GetHomestayBySlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getHomestayBySlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getHomestayBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"moderatedBySuperAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"moderatedByCommunityOwner"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"subCity"}},{"kind":"Field","name":{"kind":"Name","value":"street"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"altPhone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"roomNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetHomestayBySlugQuery, GetHomestayBySlugQueryVariables>;
export const LogInUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logInUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]}}]} as unknown as DocumentNode<LogInUserMutation, LogInUserMutationVariables>;
export const GetSearchQueriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSearchQueries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchQueries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"subCity"}}]}}]}}]} as unknown as DocumentNode<GetSearchQueriesQuery, GetSearchQueriesQueryVariables>;
export const SearchHomestayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchHomestay"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchHomestayInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getHomestaysBySearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"subCity"}},{"kind":"Field","name":{"kind":"Name","value":"street"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"altPhone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<SearchHomestayQuery, SearchHomestayQueryVariables>;
export const GetGoogleOauthUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getGoogleOauthUrl"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGoogleAuthUrl"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<GetGoogleOauthUrlQuery, GetGoogleOauthUrlQueryVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"refreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"homestayId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const SignupUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signupUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signupUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]}}]} as unknown as DocumentNode<SignupUserMutation, SignupUserMutationVariables>;
export const SignUpWithGoogleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signUpWithGoogle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupWithGoogleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUpWithGoogle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]}}]} as unknown as DocumentNode<SignUpWithGoogleMutation, SignUpWithGoogleMutationVariables>;
export const GetUserByAccessTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserByAccessToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserByAccessToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"accessToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}}]}}]} as unknown as DocumentNode<GetUserByAccessTokenQuery, GetUserByAccessTokenQueryVariables>;

export const BookingsByHomestay = gql`
    query BookingsByHomestay {
  bookingsByHomestay {
    id
    bookingKey
    startDate
    endDate
    status
    createdAt
    updatedAt
    room {
      id
      caption
      roomNumber
      capacity
      status
      attachBathroom
      maxOccupancy
      price {
        amount
        currency
        discountAmount
        discountType
        isDiscountActive
      }
      image {
        url
        caption
      }
    }
    guest {
      id
      email
      fullName
      phoneNumber
    }
  }
}
    `;
export const GetHomestayDetailsBasic = gql`
    query getHomestayDetailsBasic {
  getHomestayByToken {
    name
    slug
    moderatedBySuperAdmin
    moderatedByCommunityOwner
    address {
      country
      city
      subCity
      street
    }
  }
}
    `;
export const CreateAddress = gql`
    mutation createAddress($input: CreateAddressInput!) {
  createAddress(data: $input) {
    id
  }
}
    `;
export const CreateContacts = gql`
    mutation createContacts($input: CreateContactInput!) {
  createContact(data: $input) {
    id
  }
}
    `;
export const CreateHomestay = gql`
    mutation createHomestay($input: CreateHomestayInput!) {
  createHomestay(data: $input) {
    id
    ownerId
  }
}
    `;
export const GetAddressByHomestayId = gql`
    query getAddressByHomestayId($homestayId: Float!) {
  getAddressByHomestayId(homestayId: $homestayId) {
    id
    country
    city
    subCity
    street
  }
}
    `;
export const GetContactsByHomestayId = gql`
    query getContactsByHomestayId($homestayId: Float!) {
  getContactByHomestayId(homestayId: $homestayId) {
    id
    email
    phone
    altPhone
  }
}
    `;
export const GetHomestayByToken = gql`
    query getHomestayByToken {
  getHomestayByToken {
    id
    name
    description
    slug
    moderatedBySuperAdmin
    moderatedByCommunityOwner
  }
}
    `;
export const UpdateAddress = gql`
    mutation updateAddress($input: UpdateAddressInput!, $addressId: Float!) {
  updateAddress(data: $input, addressId: $addressId) {
    id
  }
}
    `;
export const UpdateContact = gql`
    mutation updateContact($input: UpdateContactInput!, $contactId: Float!) {
  updateContact(data: $input, contactId: $contactId) {
    id
  }
}
    `;
export const UpdateHomestay = gql`
    mutation updateHomestay($input: UpdateHomestayInput!, $homestayId: Float!) {
  updateHomestay(data: $input, homestayId: $homestayId) {
    id
  }
}
    `;
export const MyBookings = gql`
    query MyBookings {
  myBookings {
    id
    roomId
    bookingKey
    guestId
    startDate
    endDate
    status
    paymentPlatformName
    createdAt
    updatedAt
    room {
      id
      roomNumber
      capacity
      caption
      status
      attachBathroom
      maxOccupancy
      price {
        currency
        amount
      }
    }
    guest {
      id
      fullName
      email
    }
  }
}
    `;
export const CreateRoomImage = gql`
    mutation CreateRoomImage($data: CreateRoomImageInput!) {
  createRoomImage(data: $data) {
    id
    roomId
    url
    caption
  }
}
    `;
export const DeleteRoomImage = gql`
    mutation DeleteRoomImage($roomImageId: Int!) {
  deleteRoomImage(roomImageId: $roomImageId) {
    id
    roomId
    url
    caption
    createdAt
    updatedAt
  }
}
    `;
export const GetRoomImagesByRoomId = gql`
    query GetRoomImagesByRoomId($roomId: Int!) {
  getRoomImagesByRoomId(roomId: $roomId) {
    id
    roomId
    url
    caption
    createdAt
    updatedAt
  }
}
    `;
export const UpdateRoomImage = gql`
    mutation UpdateRoomImage($roomImageId: Int!, $data: UpdateRoomImageInput!) {
  updateRoomImage(roomImageId: $roomImageId, data: $data) {
    id
    roomId
    url
    caption
    createdAt
    updatedAt
  }
}
    `;
export const CreatePrice = gql`
    mutation CreatePrice($createPriceInput: CreatePriceInput!) {
  createPrice(createPriceInput: $createPriceInput) {
    id
    amount
    currency
    roomId
    dynamicPrice
    discountAmount
    discountType
    isDiscountActive
  }
}
    `;
export const CreateRoom = gql`
    mutation CreateRoom($createRoomInput: CreateRoomInput!) {
  createRoom(createRoomInput: $createRoomInput) {
    id
    status
  }
}
    `;
export const DeleteRoom = gql`
    mutation deleteRoom($id: Int!) {
  removeRoom(id: $id) {
    id
    status
    capacity
    caption
    roomNumber
    attachBathroom
    homestayId
    createdAt
    updatedAt
  }
}
    `;
export const GetRoomWithPriceAndGallery = gql`
    query GetRoomWithPriceAndGallery($id: Int!) {
  room(id: $id) {
    id
    status
    capacity
    caption
    maxOccupancy
    roomNumber
    attachBathroom
    homestayId
    createdAt
    updatedAt
    image {
      id
      caption
      url
      roomId
      createdAt
      updatedAt
    }
    price {
      id
      amount
      currency
      discountAmount
      discountType
      isDiscountActive
      dynamicPrice
      createdAt
      updatedAt
    }
  }
}
    `;
export const GetRooms = gql`
    query GetRooms {
  roomsByHomestay {
    id
    status
    capacity
    caption
    roomNumber
    attachBathroom
    homestayId
    image {
      id
      caption
      url
      roomId
      createdAt
      updatedAt
    }
    price {
      currency
      amount
    }
    booking {
      id
      startDate
      endDate
      status
      guestId
    }
    createdAt
    updatedAt
  }
}
    `;
export const UpdatePrice = gql`
    mutation UpdatePrice($updatePriceInput: UpdatePriceInput!) {
  updatePrice(updatePriceInput: $updatePriceInput) {
    id
    amount
    currency
    dynamicPrice
    discountAmount
    discountType
    isDiscountActive
  }
}
    `;
export const UpdateRoom = gql`
    mutation UpdateRoom($updateRoomInput: UpdateRoomInput!) {
  updateRoom(updateRoomInput: $updateRoomInput) {
    id
    status
    capacity
    caption
    roomNumber
    attachBathroom
    homestayId
    createdAt
    updatedAt
  }
}
    `;
export const ConfirmBooking = gql`
    mutation ConfirmBooking($bookingKey: String!, $bookingId: String!) {
  confirmBooking(bookingKey: $bookingKey, bookingId: $bookingId) {
    id
  }
}
    `;
export const GetBookingByKey = gql`
    query GetBookingByKey($bookingKey: String!) {
  bookingWithKey(bookingKey: $bookingKey) {
    id
    roomId
    bookingKey
    guestId
    startDate
    endDate
    status
    createdAt
    updatedAt
    room {
      id
      status
      capacity
      caption
      roomNumber
      attachBathroom
      homestayId
      createdAt
      updatedAt
      image {
        url
        caption
      }
      price {
        amount
        currency
      }
    }
    guest {
      id
      email
      fullName
      phoneNumber
      isVerified
      userType
      createdAt
      updatedAt
    }
  }
}
    `;
export const CheckValidBooking = gql`
    query CheckValidBooking($roomId: Int!, $startDate: DateTime!, $endDate: DateTime!) {
  checkValidBooking(roomId: $roomId, startDate: $startDate, endDate: $endDate) {
    isValid
    message
    status
  }
}
    `;
export const GetHomestayBySlug = gql`
    query getHomestayBySlug($slug: String!) {
  getHomestayBySlug(slug: $slug) {
    id
    name
    description
    slug
    moderatedBySuperAdmin
    moderatedByCommunityOwner
    address {
      country
      city
      subCity
      street
    }
    contact {
      phone
      altPhone
      email
    }
    rooms {
      id
      caption
      capacity
      roomNumber
      status
      image {
        url
        id
        caption
      }
      price {
        amount
        currency
      }
    }
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
export const GetSearchQueries = gql`
    query getSearchQueries($query: String!) {
  searchQueries(query: $query) {
    country
    city
    subCity
  }
}
    `;
export const SearchHomestay = gql`
    query searchHomestay($input: SearchHomestayInput!) {
  getHomestaysBySearch(input: $input) {
    name
    description
    address {
      city
      country
      subCity
      street
    }
    contact {
      phone
      email
      altPhone
    }
    image {
      url
    }
    rooms {
      caption
      image {
        url
        caption
      }
      price {
        amount
        currency
      }
    }
    slug
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
export const RefreshToken = gql`
    mutation refreshToken($input: GetTokenInput!) {
  refreshTokens(input: $input) {
    user {
      email
      fullName
      id
      userType
      homestayId
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
    token {
      accessToken
      refreshToken
    }
  }
}
    `;
export const GetUserByAccessToken = gql`
    query getUserByAccessToken($token: String!) {
  getUserByAccessToken(accessToken: $token) {
    email
    fullName
    id
    isVerified
    phoneNumber
    profilePicture
  }
}
    `;