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

export type Address = {
  __typename?: 'Address';
  data?: Maybe<AddressData>;
  error?: Maybe<GraphQlError>;
};

export type AddressData = {
  __typename?: 'AddressData';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  hostelId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  subCity?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Amenities = {
  __typename?: 'Amenities';
  data?: Maybe<AmenitiesData>;
  error?: Maybe<GraphQlError>;
};

export type AmenitiesData = {
  __typename?: 'AmenitiesData';
  amenities: Scalars['JSON']['output'];
  hostelId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
};

export type AmenityOption = {
  __typename?: 'AmenityOption';
  data?: Maybe<AmenityOptionData>;
  error?: Maybe<GraphQlError>;
};

export type AmenityOptionData = {
  __typename?: 'AmenityOptionData';
  description?: Maybe<Scalars['String']['output']>;
  hostelAmenityType: HostelAmenityType;
  iconUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type AmenityOptionList = {
  __typename?: 'AmenityOptionList';
  data?: Maybe<Array<AmenityOptionData>>;
  error?: Maybe<GraphQlError>;
};

export enum Badges {
  Famous = 'FAMOUS',
  GoodFood = 'GOOD_FOOD',
  GoodLocation = 'GOOD_LOCATION',
  New = 'NEW',
  PeopleChoice = 'PEOPLE_CHOICE',
  SocialButterfly = 'SOCIAL_BUTTERFLY',
  TechSavvy = 'TECH_SAVVY'
}

export type Booking = {
  __typename?: 'Booking';
  data?: Maybe<BookingData>;
  error?: Maybe<GraphQlError>;
};

export type BookingConfirmationEmailDto = {
  checkInDate: Scalars['String']['input'];
  checkOutDate: Scalars['String']['input'];
  guestName: Scalars['String']['input'];
  hostelName: Scalars['String']['input'];
  paidAmount: Scalars['Float']['input'];
  roomName: Array<Scalars['Int']['input']>;
};

export type BookingConfirmationMailData = {
  __typename?: 'BookingConfirmationMailData';
  name: Scalars['String']['output'];
  roomNumbers: Array<Scalars['Int']['output']>;
};

export type BookingData = {
  __typename?: 'BookingData';
  bookingKey: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  endDate: Scalars['DateTime']['output'];
  guest: UserData;
  guestId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  paymentPlatformName: PaymentPlatformName;
  room: RoomData;
  roomId: Scalars['Int']['output'];
  startDate: Scalars['DateTime']['output'];
  status: BookingStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type BookingList = {
  __typename?: 'BookingList';
  data?: Maybe<Array<BookingData>>;
  error?: Maybe<GraphQlError>;
};

export enum BookingStatus {
  Cancelled = 'CANCELLED',
  Confirmed = 'CONFIRMED',
  Pending = 'PENDING'
}

export type BookingSummary = {
  __typename?: 'BookingSummary';
  price?: Maybe<Scalars['Float']['output']>;
  priceType?: Maybe<Scalars['String']['output']>;
  roomId: Scalars['Float']['output'];
  totalPriceOfRoom?: Maybe<Scalars['Float']['output']>;
};

export type ChangePasswordInput = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type ConfirmBooking = {
  __typename?: 'ConfirmBooking';
  count: Scalars['String']['output'];
};

export type ContactDetail = {
  __typename?: 'ContactDetail';
  data?: Maybe<ContactDetailData>;
  error?: Maybe<GraphQlError>;
};

export type ContactDetailData = {
  __typename?: 'ContactDetailData';
  altPhone?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  hostelId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  phone: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateAddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country: Scalars['String']['input'];
  hostelId: Scalars['Float']['input'];
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  subCity?: InputMaybe<Scalars['String']['input']>;
};

export type CreateAmenityInput = {
  amenity: Scalars['String']['input'];
  hostelId: Scalars['Int']['input'];
};

export type CreateAmenityOptionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hostelAmenityType?: InputMaybe<Scalars['String']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
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
  hostelId: Scalars['Float']['input'];
  phone: Scalars['String']['input'];
};

export type CreateDynamicPriceRuleInput = {
  amount: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  endDate: Scalars['DateTime']['input'];
  isActive?: Scalars['Boolean']['input'];
  isWeekend?: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  priority?: Scalars['Int']['input'];
  roomId: Scalars['Int']['input'];
  startDate: Scalars['DateTime']['input'];
};

export type CreateGalleryInput = {
  caption: Scalars['String']['input'];
  hostelId: Scalars['Float']['input'];
  url: Scalars['String']['input'];
};

export type CreateHostelGuestInput = {
  checkinDate?: InputMaybe<Scalars['String']['input']>;
  checkoutDate?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  emergencyContact?: InputMaybe<Scalars['String']['input']>;
  fullName: Scalars['String']['input'];
  gender?: InputMaybe<Gender>;
  hostelId: Scalars['Int']['input'];
  nationality?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  occupation?: InputMaybe<Scalars['String']['input']>;
  permanentAddress?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  religion?: InputMaybe<Scalars['String']['input']>;
  roomId?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateHostelInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  genderType?: InputMaybe<Scalars['String']['input']>;
  hostelType?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateHostelSettingsInput = {
  active?: Scalars['Boolean']['input'];
  allowBooking?: Scalars['Boolean']['input'];
  allowComments?: Scalars['Boolean']['input'];
  allowMessages?: Scalars['Boolean']['input'];
  allowPrivateFeedbacks?: Scalars['Boolean']['input'];
  allowRating?: Scalars['Boolean']['input'];
  currency?: InputMaybe<Scalars['String']['input']>;
  deActivate?: Scalars['Boolean']['input'];
  fontSize?: Scalars['Float']['input'];
  visibility?: Scalars['String']['input'];
};

export type CreatePriceInput = {
  baseAmountPerDay?: InputMaybe<Scalars['Int']['input']>;
  baseAmountPerMonth: Scalars['Int']['input'];
  currency: Currency;
  discountAmount?: InputMaybe<Scalars['Int']['input']>;
  discountType?: InputMaybe<DiscountType>;
  isDiscountActive?: Scalars['Boolean']['input'];
  isDynamicPricing?: Scalars['Boolean']['input'];
  roomId: Scalars['Int']['input'];
};

export type CreateRoomAmenityInput = {
  amenity: Scalars['JSON']['input'];
  roomId: Scalars['Int']['input'];
};

export type CreateRoomAmenityOptionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hostelAmenityType?: InputMaybe<Scalars['String']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
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
  hostelId: Scalars['Int']['input'];
  images?: InputMaybe<Array<RoomImageInput>>;
  maxOccupancy?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<CreatePriceInput>;
  roomNumber?: InputMaybe<Scalars['String']['input']>;
  status: RoomStatus;
};

export type CreateRulesInput = {
  hostelId: Scalars['Int']['input'];
  rules: Scalars['JSON']['input'];
};

export type CreateSearchQueriesInput = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  subCity?: InputMaybe<Scalars['String']['input']>;
};

export type CreateServiceDto = {
  hostelId: Scalars['Float']['input'];
  services: Scalars['JSON']['input'];
};

export type CreateServiceOptionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  altPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  gender?: InputMaybe<Gender>;
  hostelId?: InputMaybe<Scalars['Float']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  userType?: UserType;
};

export type Ctx = {
  __typename?: 'Ctx';
  hostelId?: Maybe<Scalars['Float']['output']>;
  sub: Scalars['Float']['output'];
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

export type DynamicPricingRule = {
  __typename?: 'DynamicPricingRule';
  data?: Maybe<DynamicPricingRuleData>;
  error?: Maybe<GraphQlError>;
};

export type DynamicPricingRuleData = {
  __typename?: 'DynamicPricingRuleData';
  amount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  endDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isWeekend: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  priority: Scalars['Int']['output'];
  roomId: Scalars['Int']['output'];
  startDate: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DynamicPricingRuleList = {
  __typename?: 'DynamicPricingRuleList';
  data?: Maybe<Array<DynamicPricingRuleData>>;
  error?: Maybe<GraphQlError>;
};

export type FoodMenuData = {
  __typename?: 'FoodMenuData';
  createdAt: Scalars['DateTime']['output'];
  day: WeekDays;
  dinner?: Maybe<Scalars['String']['output']>;
  dinnerTime?: Maybe<Scalars['String']['output']>;
  hostelId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  lunch?: Maybe<Scalars['String']['output']>;
  lunchTime?: Maybe<Scalars['String']['output']>;
  snacks?: Maybe<Scalars['String']['output']>;
  snacksTime?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  id: Scalars['Float']['output'];
};

export type Gallery = {
  __typename?: 'Gallery';
  data?: Maybe<GalleryData>;
  error?: Maybe<GraphQlError>;
};

export type GalleryData = {
  __typename?: 'GalleryData';
  caption?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  hostelId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  isSelected?: Maybe<Scalars['Boolean']['output']>;
  type: GalleryType;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type GalleryList = {
  __typename?: 'GalleryList';
  data?: Maybe<Array<GalleryData>>;
  error?: Maybe<GraphQlError>;
};

export enum GalleryType {
  Bathroom = 'BATHROOM',
  Building = 'BUILDING',
  Celebrations = 'CELEBRATIONS',
  Cover = 'COVER',
  Food = 'FOOD',
  Kitchen = 'KITCHEN',
  Logo = 'LOGO',
  Other = 'OTHER',
  Profile = 'PROFILE',
  Review = 'REVIEW',
  Room = 'ROOM'
}

export enum Gender {
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

export type Hostel = {
  __typename?: 'Hostel';
  data?: Maybe<HostelData>;
  error?: Maybe<GraphQlError>;
};

export enum HostelAmenityType {
  BathroomEssentials = 'BATHROOM_ESSENTIALS',
  KitchenEssentials = 'KITCHEN_ESSENTIALS',
  Other = 'OTHER',
  PropertyEssentials = 'PROPERTY_ESSENTIALS',
  RoomEssentials = 'ROOM_ESSENTIALS',
  SafetyAndHygeneEssentials = 'SAFETY_AND_HYGENE_ESSENTIALS'
}

export type HostelArrayResponse = {
  __typename?: 'HostelArrayResponse';
  data: Array<HostelData>;
  error?: Maybe<GraphQlError>;
};

export type HostelData = {
  __typename?: 'HostelData';
  address?: Maybe<AddressData>;
  amenities?: Maybe<AmenitiesData>;
  contact?: Maybe<ContactDetailData>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  foodMenu: Array<FoodMenuData>;
  gallery: Array<GalleryData>;
  genderType: HostelGenderType;
  hasOnboardingComplete: Scalars['Boolean']['output'];
  hostelRules?: Maybe<HostelRulesData>;
  hostelSettings?: Maybe<HostelSettingData>;
  hostelType: HostelType;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  nearbyPlaces: Array<NearbyPlaceData>;
  owner?: Maybe<UserData>;
  ownerId: Scalars['Int']['output'];
  ranking?: Maybe<Scalars['Int']['output']>;
  rooms: Array<RoomData>;
  service?: Maybe<ServiceData>;
  slug: Scalars['String']['output'];
  social?: Maybe<SocialData>;
  telegramId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  verifiedByCommunityOwner: Scalars['Boolean']['output'];
  verifiedBySuperAdmin: Scalars['Boolean']['output'];
  whatsappId?: Maybe<Scalars['String']['output']>;
};

export enum HostelGenderType {
  Both = 'BOTH',
  Boys = 'BOYS',
  Girls = 'GIRLS'
}

export type HostelGuest = {
  __typename?: 'HostelGuest';
  data?: Maybe<HostelGuestData>;
  error?: Maybe<GraphQlError>;
};

export type HostelGuestData = {
  __typename?: 'HostelGuestData';
  checkinDate?: Maybe<Scalars['DateTime']['output']>;
  checkoutDate?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  emergencyContact?: Maybe<Scalars['String']['output']>;
  fullName: Scalars['String']['output'];
  gender?: Maybe<Gender>;
  hostelId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  nationality?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  occupation?: Maybe<Scalars['String']['output']>;
  permanentAddress?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  profilePicture?: Maybe<Scalars['String']['output']>;
  religion?: Maybe<Scalars['String']['output']>;
  roomId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type HostelGuestList = {
  __typename?: 'HostelGuestList';
  data?: Maybe<Array<HostelGuestData>>;
  error?: Maybe<GraphQlError>;
};

export type HostelList = {
  __typename?: 'HostelList';
  data?: Maybe<Array<HostelData>>;
  error?: Maybe<GraphQlError>;
};

export type HostelRules = {
  __typename?: 'HostelRules';
  data?: Maybe<HostelRulesData>;
  error?: Maybe<GraphQlError>;
};

export type HostelRulesData = {
  __typename?: 'HostelRulesData';
  hostelId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  rules: Scalars['JSON']['output'];
};

export type HostelSetting = {
  __typename?: 'HostelSetting';
  data?: Maybe<HostelSettingData>;
  error?: Maybe<GraphQlError>;
};

export type HostelSettingData = {
  __typename?: 'HostelSettingData';
  active: Scalars['Boolean']['output'];
  allowBooking: Scalars['Boolean']['output'];
  allowComments: Scalars['Boolean']['output'];
  allowMessages: Scalars['Boolean']['output'];
  allowPrivateFeedbacks: Scalars['Boolean']['output'];
  allowRating: Scalars['Boolean']['output'];
  badges: Array<Badges>;
  createdAt: Scalars['DateTime']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  deActivate: Scalars['Boolean']['output'];
  fontSize: Scalars['Int']['output'];
  hostelId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  visibility: VisibilityType;
};

export enum HostelType {
  Both = 'BOTH',
  Pg = 'PG',
  Stay = 'STAY',
  Travel = 'TRAVEL'
}

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
  completeOnboarding: Hostel;
  confirmBooking: ConfirmBooking;
  createAddress: Address;
  createAmenity: Amenities;
  createAmenityOption: AmenityOption;
  createBooking: Booking;
  createContact: ContactDetail;
  createGallery: Gallery;
  createHostel: Hostel;
  createHostelGuest: HostelGuest;
  createPrice: Price;
  createPriceRule: DynamicPricingRule;
  createRoom: Room;
  createRoomAmenity: RoomAmenity;
  createRoomAmenityOption: RoomAmenityOption;
  createRoomImage: RoomImage;
  createRules: HostelRules;
  createSearchQuery: SearchQuery;
  createService: Service;
  createServiceOption: ServiceOption;
  createSettings: HostelSetting;
  createUser: User;
  deleteAmenityOption: AmenityOption;
  deleteGallery: Gallery;
  deleteHostel: Hostel;
  deleteRoomAmenityOption: RoomAmenityOption;
  deleteRoomImage: RoomImage;
  deleteRules: HostelRules;
  deleteSearchQuery: SearchQuery;
  deleteServiceOption: ServiceOption;
  deleteSettings: HostelSetting;
  forgotPassword: ForgotPasswordResponse;
  loginUser: UsersAndToken;
  logout: LogoutResponse;
  refreshTokens: UsersHostelIdAndToken;
  removeAmenity: Amenities;
  removeBooking: Booking;
  removeHostelGuest: HostelGuest;
  removePrice: Price;
  removePriceRule: DynamicPricingRule;
  removeRoom: Room;
  removeRoomAmenity: RoomAmenity;
  removeService: Service;
  resendVerificationMail: Scalars['Boolean']['output'];
  resetPassword: UsersAndToken;
  selectGallery: Gallery;
  sendMailAfterBooking: Scalars['Boolean']['output'];
  signUpWithGoogle: UsersAndToken;
  signupUser: UsersAndToken;
  updateAddress: Address;
  updateAmenity: Amenities;
  updateAmenityOption: AmenityOption;
  updateBooking: Booking;
  updateContact: ContactDetail;
  updateGallery: Gallery;
  updateHostel: Hostel;
  updateHostelGuest: HostelGuest;
  updatePrice: Price;
  updatePriceRule: DynamicPricingRule;
  updateRoom: Room;
  updateRoomAmenity: RoomAmenity;
  updateRoomAmenityOption: RoomAmenityOption;
  updateRoomImage: RoomImage;
  updateRules: HostelRules;
  updateSearchQuery: SearchQuery;
  updateService: Service;
  updateServiceOption: ServiceOption;
  updateSettings: HostelSetting;
  updateUser: User;
  verifyEmail: VerifyEmailResponse;
  verifyHostel: Hostel;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
  userId: Scalars['Float']['input'];
};


export type MutationConfirmBookingArgs = {
  bookingKey: Scalars['String']['input'];
};


export type MutationCreateAddressArgs = {
  data: CreateAddressInput;
};


export type MutationCreateAmenityArgs = {
  createAmenityInput: CreateAmenityInput;
};


export type MutationCreateAmenityOptionArgs = {
  createAmenityOptionInput: CreateAmenityOptionInput;
};


export type MutationCreateBookingArgs = {
  createBookingInput: CreateBookingInput;
};


export type MutationCreateContactArgs = {
  data: CreateContactInput;
};


export type MutationCreateGalleryArgs = {
  data: CreateGalleryInput;
};


export type MutationCreateHostelArgs = {
  data: CreateHostelInput;
};


export type MutationCreateHostelGuestArgs = {
  createHostelGuestInput: CreateHostelGuestInput;
  withEmail: Scalars['Boolean']['input'];
};


export type MutationCreatePriceArgs = {
  createPriceInput: CreatePriceInput;
};


export type MutationCreatePriceRuleArgs = {
  createPriceRuleInput: CreateDynamicPriceRuleInput;
};


export type MutationCreateRoomArgs = {
  createRoomInput: CreateRoomInput;
};


export type MutationCreateRoomAmenityArgs = {
  createAmenityInput: CreateRoomAmenityInput;
};


export type MutationCreateRoomAmenityOptionArgs = {
  createRoomAmenityOptionInput: CreateRoomAmenityOptionInput;
};


export type MutationCreateRoomImageArgs = {
  data: CreateRoomImageInput;
};


export type MutationCreateRulesArgs = {
  createRulesInput: CreateRulesInput;
};


export type MutationCreateSearchQueryArgs = {
  createSearchQueriesInput: CreateSearchQueriesInput;
};


export type MutationCreateServiceArgs = {
  createServiceInput: CreateServiceDto;
};


export type MutationCreateServiceOptionArgs = {
  createServiceOptionInput: CreateServiceOptionInput;
};


export type MutationCreateSettingsArgs = {
  data: CreateHostelSettingsInput;
  hostelId: Scalars['Float']['input'];
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteAmenityOptionArgs = {
  amenityOptionId: Scalars['Int']['input'];
};


export type MutationDeleteGalleryArgs = {
  galleryId: Scalars['Int']['input'];
};


export type MutationDeleteHostelArgs = {
  hostelId: Scalars['Float']['input'];
};


export type MutationDeleteRoomAmenityOptionArgs = {
  roomAmenityOptionId: Scalars['Int']['input'];
};


export type MutationDeleteRoomImageArgs = {
  roomImageId: Scalars['Int']['input'];
};


export type MutationDeleteRulesArgs = {
  rulesId: Scalars['Int']['input'];
};


export type MutationDeleteSearchQueryArgs = {
  searchQueryId: Scalars['Int']['input'];
};


export type MutationDeleteServiceOptionArgs = {
  serviceOptionId: Scalars['Int']['input'];
};


export type MutationDeleteSettingsArgs = {
  hostelSettingId: Scalars['Float']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginUserArgs = {
  input: LoginInput;
};


export type MutationRemoveAmenityArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveBookingArgs = {
  id: Scalars['Float']['input'];
};


export type MutationRemoveHostelGuestArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemovePriceArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemovePriceRuleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveRoomArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveRoomAmenityArgs = {
  roomAmenityId: Scalars['Int']['input'];
};


export type MutationRemoveServiceArgs = {
  id: Scalars['Float']['input'];
};


export type MutationResendVerificationMailArgs = {
  id: Scalars['Float']['input'];
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSelectGalleryArgs = {
  galleryId: Scalars['Int']['input'];
  hostelId: Scalars['Int']['input'];
};


export type MutationSendMailAfterBookingArgs = {
  data: BookingConfirmationEmailDto;
  email: Scalars['String']['input'];
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


export type MutationUpdateAmenityArgs = {
  updateAmenityInput: UpdateAmenityInput;
};


export type MutationUpdateAmenityOptionArgs = {
  amenityOptionId: Scalars['Int']['input'];
  updateAmenityOptionInput: UpdateAmenityOptionInput;
};


export type MutationUpdateBookingArgs = {
  id: Scalars['Float']['input'];
  updateBookingInput: UpdateBookingInput;
};


export type MutationUpdateContactArgs = {
  contactId: Scalars['Float']['input'];
  data: UpdateContactInput;
};


export type MutationUpdateGalleryArgs = {
  data: UpdateGalleryInput;
  galleryId: Scalars['Int']['input'];
};


export type MutationUpdateHostelArgs = {
  data: UpdateHostelInput;
  hostelId: Scalars['Float']['input'];
};


export type MutationUpdateHostelGuestArgs = {
  updateHostelGuestInput: UpdateHostelGuestInput;
};


export type MutationUpdatePriceArgs = {
  updatePriceInput: UpdatePriceInput;
};


export type MutationUpdatePriceRuleArgs = {
  updatePriceInput: UpdateDynamicPriceRuleInput;
};


export type MutationUpdateRoomArgs = {
  updateRoomInput: UpdateRoomInput;
};


export type MutationUpdateRoomAmenityArgs = {
  updateAmenityInput: UpdateRoomAmenityInput;
};


export type MutationUpdateRoomAmenityOptionArgs = {
  roomAmenityOptionId: Scalars['Int']['input'];
  updateRoomAmenityOptionInput: UpdateRoomAmenityOptionInput;
};


export type MutationUpdateRoomImageArgs = {
  data: UpdateRoomImageInput;
  roomImageId: Scalars['Int']['input'];
};


export type MutationUpdateRulesArgs = {
  rulesId: Scalars['Int']['input'];
  updateRulesInput: UpdateRulesInput;
};


export type MutationUpdateSearchQueryArgs = {
  searchQueryId: Scalars['Int']['input'];
  updateSearchQueriesInput: UpdateSearchQueriesInput;
};


export type MutationUpdateServiceArgs = {
  updateServiceInput: UpdateServiceDto;
};


export type MutationUpdateServiceOptionArgs = {
  serviceOptionId: Scalars['Int']['input'];
  updateServiceOptionInput: UpdateServiceOptionInput;
};


export type MutationUpdateSettingsArgs = {
  data: UpdateHostelSettingsInput;
  hostelSettingId: Scalars['Float']['input'];
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};


export type MutationVerifyHostelArgs = {
  hostelId: Scalars['Int']['input'];
  status: Scalars['Boolean']['input'];
};

export type NearbyPlaceData = {
  __typename?: 'NearbyPlaceData';
  description: Scalars['String']['output'];
  hostelId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export enum PaymentPlatformName {
  Esewa = 'ESEWA',
  Khalti = 'KHALTI',
  Stripe = 'STRIPE'
}

export type Price = {
  __typename?: 'Price';
  data?: Maybe<PriceData>;
  error?: Maybe<GraphQlError>;
};

export type PriceData = {
  __typename?: 'PriceData';
  baseAmountPerDay?: Maybe<Scalars['Int']['output']>;
  baseAmountPerMonth: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  currency: Currency;
  discountAmount?: Maybe<Scalars['Int']['output']>;
  discountType?: Maybe<DiscountType>;
  id: Scalars['ID']['output'];
  isDiscountActive: Scalars['Boolean']['output'];
  isDynamicPricing: Scalars['Boolean']['output'];
  roomId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  amenityOptionById: AmenityOption;
  amenityOptions: AmenityOptionList;
  booking: Booking;
  bookings: BookingList;
  bookingsByHostel: BookingList;
  bookingsWithKey: BookingList;
  checkValidBooking: ValidInvalidBooking;
  findAllAmenities: Array<RoomAmenity>;
  findAmenityByHostelId: Amenities;
  findAmenityByRoomId: RoomAmenity;
  findAnAmenityById: RoomAmenity;
  findHostelGuestsByHostelRoomId: BookingConfirmationMailData;
  findRoomsByRoomIds: BookingConfirmationMailData;
  findServiceByHostelId: Service;
  getAddressByHostelId?: Maybe<Address>;
  getAllHostels: HostelArrayResponse;
  getAllSearchQueries: Array<SearchQuery>;
  getCitySearchSuggestions?: Maybe<Array<SearchQuery>>;
  getContactByHostelId?: Maybe<ContactDetail>;
  getGalleryByHostelId?: Maybe<GalleryList>;
  getGoogleAuthUrl: GoogleOauthUrl;
  getHostelById?: Maybe<Hostel>;
  getHostelBySlug?: Maybe<Hostel>;
  getHostelByToken?: Maybe<Hostel>;
  getHostelSearchSuggestions?: Maybe<Array<SearchQuery>>;
  getHostelsBySearch: HostelList;
  getOnboardingData: Hostel;
  getRoomImagesByRoomId?: Maybe<RoomImageList>;
  getRulesByHostel: HostelRules;
  getRulesById: HostelRules;
  getSettingsByHostelId?: Maybe<HostelSetting>;
  getToleSearchSuggestions?: Maybe<Array<SearchQuery>>;
  getUserByAccessToken?: Maybe<User>;
  getUserById?: Maybe<User>;
  getUsers: Array<User>;
  hostelGuest: HostelGuest;
  hostelGuestsByHostelId: HostelGuestList;
  hostelGuestsByToken: HostelGuestList;
  myBookings: BookingList;
  price: Price;
  priceByRoom: Price;
  priceRule: DynamicPricingRule;
  priceRulesByRoom: DynamicPricingRuleList;
  prices: Array<Price>;
  pricesRules: DynamicPricingRuleList;
  room: Room;
  roomAmenityOptionById: RoomAmenityOption;
  roomAmenityOptions: RoomAmenityOptionList;
  roomBookings: BookingList;
  rooms: RoomList;
  roomsByHostel: RoomList;
  searchQueries: Array<SearchQuery>;
  searchQuery: SearchQuery;
  sendVerificationEmail: Scalars['Boolean']['output'];
  serviceOptionById: ServiceOption;
  serviceOptions: ServiceOptionList;
};


export type QueryAmenityOptionByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryBookingArgs = {
  id: Scalars['Float']['input'];
};


export type QueryBookingsWithKeyArgs = {
  bookingKey: Scalars['String']['input'];
};


export type QueryCheckValidBookingArgs = {
  endDate: Scalars['DateTime']['input'];
  roomIds: Array<Scalars['Int']['input']>;
  startDate: Scalars['DateTime']['input'];
};


export type QueryFindAmenityByHostelIdArgs = {
  hostelId: Scalars['Int']['input'];
};


export type QueryFindAmenityByRoomIdArgs = {
  roomId: Scalars['Int']['input'];
};


export type QueryFindAnAmenityByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindHostelGuestsByHostelRoomIdArgs = {
  hostelRoomId: Scalars['Int']['input'];
};


export type QueryFindRoomsByRoomIdsArgs = {
  roomIds: Array<Scalars['Int']['input']>;
};


export type QueryFindServiceByHostelIdArgs = {
  hostelId: Scalars['Float']['input'];
};


export type QueryGetAddressByHostelIdArgs = {
  hostelId: Scalars['Float']['input'];
};


export type QueryGetAllHostelsArgs = {
  pageNumber?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
};


export type QueryGetCitySearchSuggestionsArgs = {
  query: Scalars['String']['input'];
};


export type QueryGetContactByHostelIdArgs = {
  hostelId: Scalars['Float']['input'];
};


export type QueryGetGalleryByHostelIdArgs = {
  hostelId: Scalars['Int']['input'];
};


export type QueryGetHostelByIdArgs = {
  hostelId: Scalars['Float']['input'];
};


export type QueryGetHostelBySlugArgs = {
  checkInDate?: InputMaybe<Scalars['DateTime']['input']>;
  checkOutDate?: InputMaybe<Scalars['DateTime']['input']>;
  slug: Scalars['String']['input'];
};


export type QueryGetHostelSearchSuggestionsArgs = {
  query: Scalars['String']['input'];
};


export type QueryGetHostelsBySearchArgs = {
  input: SearchHostelInput;
};


export type QueryGetRoomImagesByRoomIdArgs = {
  roomId: Scalars['Int']['input'];
};


export type QueryGetRulesByIdArgs = {
  rulesId: Scalars['Int']['input'];
};


export type QueryGetSettingsByHostelIdArgs = {
  hostelId: Scalars['Float']['input'];
};


export type QueryGetToleSearchSuggestionsArgs = {
  query: Scalars['String']['input'];
};


export type QueryGetUserByAccessTokenArgs = {
  accessToken: Scalars['String']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryHostelGuestArgs = {
  id: Scalars['Int']['input'];
};


export type QueryHostelGuestsByTokenArgs = {
  token: Scalars['String']['input'];
};


export type QueryPriceArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPriceByRoomArgs = {
  roomId: Scalars['Int']['input'];
};


export type QueryPriceRuleArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPriceRulesByRoomArgs = {
  roomId: Scalars['Int']['input'];
};


export type QueryRoomArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRoomAmenityOptionByIdArgs = {
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


export type QuerySendVerificationEmailArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type QueryServiceOptionByIdArgs = {
  id: Scalars['Int']['input'];
};

export type ResetPasswordInput = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type Room = {
  __typename?: 'Room';
  data?: Maybe<RoomData>;
  error?: Maybe<GraphQlError>;
};

export type RoomAmenity = {
  __typename?: 'RoomAmenity';
  data?: Maybe<RoomAmenityData>;
  error?: Maybe<GraphQlError>;
};

export type RoomAmenityData = {
  __typename?: 'RoomAmenityData';
  amenity: Scalars['JSON']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  roomId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type RoomAmenityOption = {
  __typename?: 'RoomAmenityOption';
  data?: Maybe<RoomAmenityOptionData>;
  error?: Maybe<GraphQlError>;
};

export type RoomAmenityOptionData = {
  __typename?: 'RoomAmenityOptionData';
  description?: Maybe<Scalars['String']['output']>;
  iconUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type RoomAmenityOptionList = {
  __typename?: 'RoomAmenityOptionList';
  data?: Maybe<Array<RoomAmenityOptionData>>;
  error?: Maybe<GraphQlError>;
};

export enum RoomCapacity {
  EightBed = 'EIGHT_BED',
  FiveBed = 'FIVE_BED',
  FourBed = 'FOUR_BED',
  MultiBed = 'MULTI_BED',
  OneBed = 'ONE_BED',
  SevenBed = 'SEVEN_BED',
  SixBed = 'SIX_BED',
  ThreeBed = 'THREE_BED',
  TwoBed = 'TWO_BED'
}

export type RoomData = {
  __typename?: 'RoomData';
  attachBathroom?: Maybe<Scalars['Boolean']['output']>;
  capacity: RoomCapacity;
  caption: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  dynamicPricingRule?: Maybe<Array<DynamicPricingRuleData>>;
  hostelId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  image: Array<RoomImageData>;
  maxOccupancy?: Maybe<Scalars['String']['output']>;
  price?: Maybe<PriceData>;
  roomAmenity?: Maybe<RoomAmenityData>;
  roomAmenityId?: Maybe<Scalars['Int']['output']>;
  roomNumber?: Maybe<Scalars['String']['output']>;
  status: RoomStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type RoomImage = {
  __typename?: 'RoomImage';
  data?: Maybe<RoomImageData>;
  error?: Maybe<GraphQlError>;
};

export type RoomImageData = {
  __typename?: 'RoomImageData';
  caption?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  roomId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type RoomImageInput = {
  caption?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export type RoomImageList = {
  __typename?: 'RoomImageList';
  data?: Maybe<Array<RoomImageData>>;
  error?: Maybe<GraphQlError>;
};

export type RoomList = {
  __typename?: 'RoomList';
  data?: Maybe<Array<RoomData>>;
  error?: Maybe<GraphQlError>;
};

export enum RoomStatus {
  Available = 'AVAILABLE',
  Booked = 'BOOKED',
  Idle = 'IDLE',
  Inactive = 'INACTIVE'
}

export type SearchHostelInput = {
  checkInDate?: InputMaybe<Scalars['DateTime']['input']>;
  checkOutDate?: InputMaybe<Scalars['DateTime']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  minRating?: InputMaybe<Scalars['Float']['input']>;
  pageNumber: Scalars['Float']['input'];
  subCity?: InputMaybe<Scalars['String']['input']>;
};

export type SearchQuery = {
  __typename?: 'SearchQuery';
  data?: Maybe<Array<SearchQueryData>>;
  error?: Maybe<GraphQlError>;
};

export type SearchQueryData = {
  __typename?: 'SearchQueryData';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  subCity?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Service = {
  __typename?: 'Service';
  data?: Maybe<ServiceData>;
  error?: Maybe<GraphQlError>;
};

export type ServiceData = {
  __typename?: 'ServiceData';
  hostelId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  services: Scalars['JSON']['output'];
};

export type ServiceOption = {
  __typename?: 'ServiceOption';
  data?: Maybe<ServiceOptionData>;
  error?: Maybe<GraphQlError>;
};

export type ServiceOptionData = {
  __typename?: 'ServiceOptionData';
  description?: Maybe<Scalars['String']['output']>;
  iconUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ServiceOptionList = {
  __typename?: 'ServiceOptionList';
  data?: Maybe<Array<ServiceOptionData>>;
  error?: Maybe<GraphQlError>;
};

export type SignupInput = {
  altPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  gender?: InputMaybe<Gender>;
  hostelId?: InputMaybe<Scalars['Float']['input']>;
  password: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  userType: Scalars['String']['input'];
};

export type SignupWithGoogleInput = {
  token: Scalars['String']['input'];
};

export type SocialData = {
  __typename?: 'SocialData';
  createdAt: Scalars['DateTime']['output'];
  facebook?: Maybe<Scalars['String']['output']>;
  hostelId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  instaGram?: Maybe<Scalars['String']['output']>;
  map?: Maybe<Scalars['String']['output']>;
  tiktok?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  youTube?: Maybe<Scalars['String']['output']>;
};

export type Token = {
  __typename?: 'Token';
  accessToken: Scalars['ID']['output'];
  refreshToken: Scalars['String']['output'];
};

export type UpdateAddressInput = {
  id: Scalars['Float']['input'];
};

export type UpdateAmenityInput = {
  amenity?: InputMaybe<Scalars['String']['input']>;
  hostelId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdateAmenityOptionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hostelAmenityType?: InputMaybe<Scalars['String']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
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

export type UpdateDynamicPriceRuleInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['Int']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isWeekend?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  roomId?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateGalleryInput = {
  caption?: InputMaybe<Scalars['String']['input']>;
  hostelId?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Float']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateHostelGuestInput = {
  checkinDate?: InputMaybe<Scalars['String']['input']>;
  checkoutDate?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  emergencyContact?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  hostelId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  nationality?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  occupation?: InputMaybe<Scalars['String']['input']>;
  permanentAddress?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  religion?: InputMaybe<Scalars['String']['input']>;
  roomId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateHostelInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  moderatedByCommunityOwner?: InputMaybe<Scalars['Boolean']['input']>;
  moderatedBySuperAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateHostelSettingsInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  allowBooking?: InputMaybe<Scalars['Boolean']['input']>;
  allowComments?: InputMaybe<Scalars['Boolean']['input']>;
  allowMessages?: InputMaybe<Scalars['Boolean']['input']>;
  allowPrivateFeedbacks?: InputMaybe<Scalars['Boolean']['input']>;
  allowRating?: InputMaybe<Scalars['Boolean']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  deActivate?: InputMaybe<Scalars['Boolean']['input']>;
  fontSize?: InputMaybe<Scalars['Float']['input']>;
  hostelSettingId: Scalars['Int']['input'];
  visibility?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePriceInput = {
  baseAmountPerDay?: InputMaybe<Scalars['Int']['input']>;
  baseAmountPerMonth?: InputMaybe<Scalars['Int']['input']>;
  currency?: InputMaybe<Currency>;
  discountAmount?: InputMaybe<Scalars['Int']['input']>;
  discountType?: InputMaybe<DiscountType>;
  id: Scalars['Int']['input'];
  isDiscountActive?: InputMaybe<Scalars['Boolean']['input']>;
  isDynamicPricing?: InputMaybe<Scalars['Boolean']['input']>;
  roomId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateRoomAmenityInput = {
  amenity?: InputMaybe<Scalars['JSON']['input']>;
  id: Scalars['Int']['input'];
  roomId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateRoomAmenityOptionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hostelAmenityType?: InputMaybe<Scalars['String']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
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
  hostelId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  images?: InputMaybe<Array<RoomImageInput>>;
  maxOccupancy?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<CreatePriceInput>;
  roomNumber?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<RoomStatus>;
};

export type UpdateRulesInput = {
  rules?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSearchQueriesInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  subCity?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateServiceDto = {
  hostelId: Scalars['Float']['input'];
  id: Scalars['Float']['input'];
  services: Scalars['JSON']['input'];
};

export type UpdateServiceOptionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  altPhoneNumber?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Gender>;
  hostelId?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Int']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  userType?: InputMaybe<UserType>;
};

export type User = {
  __typename?: 'User';
  data?: Maybe<UserData>;
  error?: Maybe<GraphQlError>;
};

export type UserData = {
  __typename?: 'UserData';
  altPhoneNumber?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  gender?: Maybe<Gender>;
  hashedRefreshToken?: Maybe<Scalars['String']['output']>;
  hostelId?: Maybe<Scalars['Int']['output']>;
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
  HostelOwner = 'HOSTEL_OWNER',
  Others = 'OTHERS',
  Student = 'STUDENT',
  Superadmin = 'SUPERADMIN',
  Suppliers = 'SUPPLIERS'
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
  user: UserData;
};

export type ValidInvalidBooking = {
  __typename?: 'ValidInvalidBooking';
  bookingSummary?: Maybe<Array<BookingSummary>>;
  isValid: Scalars['Boolean']['output'];
  message?: Maybe<Scalars['String']['output']>;
  totalDays?: Maybe<Scalars['Float']['output']>;
  totalPrice?: Maybe<Scalars['Float']['output']>;
};

export type VerifyEmailInput = {
  token: Scalars['String']['input'];
};

export type VerifyEmailResponse = {
  __typename?: 'VerifyEmailResponse';
  id: Scalars['Float']['output'];
};

export enum VisibilityType {
  All = 'ALL',
  OnlyMe = 'ONLY_ME',
  StudentsOnly = 'STUDENTS_ONLY'
}

export enum WeekDays {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export type CreateAmenityOptionMutationVariables = Exact<{
  createAmenityOptionInput: CreateAmenityOptionInput;
}>;


export type CreateAmenityOptionMutation = { __typename?: 'Mutation', createAmenityOption: { __typename?: 'AmenityOption', data?: { __typename?: 'AmenityOptionData', id: string } | null, error?: { __typename?: 'GraphQLError', message: string } | null } };

export type DeleteAmenityOptionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteAmenityOptionMutation = { __typename?: 'Mutation', deleteAmenityOption: { __typename?: 'AmenityOption', data?: { __typename?: 'AmenityOptionData', id: string } | null, error?: { __typename?: 'GraphQLError', message: string } | null } };

export type AllAmenitiesOptionQueryVariables = Exact<{ [key: string]: never; }>;


export type AllAmenitiesOptionQuery = { __typename?: 'Query', amenityOptions: { __typename?: 'AmenityOptionList', data?: Array<{ __typename?: 'AmenityOptionData', id: string, name: string, description?: string | null, iconUrl?: string | null, hostelAmenityType: HostelAmenityType }> | null, error?: { __typename?: 'GraphQLError', code?: string | null } | null } };

export type UpdateAmenityOptionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  updateAmenityOptionInput: UpdateAmenityOptionInput;
}>;


export type UpdateAmenityOptionMutation = { __typename?: 'Mutation', updateAmenityOption: { __typename?: 'AmenityOption', data?: { __typename?: 'AmenityOptionData', id: string } | null, error?: { __typename?: 'GraphQLError', message: string } | null } };

export type BookingsByHostelQueryVariables = Exact<{ [key: string]: never; }>;


export type BookingsByHostelQuery = { __typename?: 'Query', bookingsByHostel: { __typename?: 'BookingList', data?: Array<{ __typename?: 'BookingData', id: string, bookingKey: string, startDate: any, endDate: any, status: BookingStatus, createdAt: any, updatedAt: any, room: { __typename?: 'RoomData', id: string, caption: string, roomNumber?: string | null, capacity: RoomCapacity, status: RoomStatus, attachBathroom?: boolean | null, maxOccupancy?: string | null, price?: { __typename?: 'PriceData', baseAmountPerDay?: number | null, currency: Currency, discountAmount?: number | null, discountType?: DiscountType | null, isDiscountActive: boolean } | null, image: Array<{ __typename?: 'RoomImageData', url: string, caption?: string | null }> }, guest: { __typename?: 'UserData', id: string, email: string, fullName: string, phoneNumber?: string | null } }> | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null, path?: string | null } | null } };

export type SelectGalleryMutationVariables = Exact<{
  galleryId: Scalars['Int']['input'];
  hostelId: Scalars['Int']['input'];
}>;


export type SelectGalleryMutation = { __typename?: 'Mutation', selectGallery: { __typename?: 'Gallery', data?: { __typename?: 'GalleryData', id: string, caption?: string | null, url: string, isSelected?: boolean | null } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type GetHostelDetailsBasicQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHostelDetailsBasicQuery = { __typename?: 'Query', getHostelByToken?: { __typename?: 'Hostel', data?: { __typename?: 'HostelData', name: string, slug: string, verifiedBySuperAdmin: boolean, verifiedByCommunityOwner: boolean, hasOnboardingComplete: boolean, address?: { __typename?: 'AddressData', country: string, city: string, subCity?: string | null, street?: string | null } | null } | null } | null };

export type CreateGalleryMutationVariables = Exact<{
  data: CreateGalleryInput;
}>;


export type CreateGalleryMutation = { __typename?: 'Mutation', createGallery: { __typename?: 'Gallery', data?: { __typename?: 'GalleryData', id: string, hostelId: number, url: string, caption?: string | null } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type DeleteGalleryMutationVariables = Exact<{
  galleryId: Scalars['Int']['input'];
}>;


export type DeleteGalleryMutation = { __typename?: 'Mutation', deleteGallery: { __typename?: 'Gallery', data?: { __typename?: 'GalleryData', id: string, hostelId: number, url: string, caption?: string | null, createdAt: any, updatedAt: any } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type GetGalleryByHostelIdQueryVariables = Exact<{
  hostelId: Scalars['Int']['input'];
}>;


export type GetGalleryByHostelIdQuery = { __typename?: 'Query', getGalleryByHostelId?: { __typename?: 'GalleryList', data?: Array<{ __typename?: 'GalleryData', id: string, hostelId: number, url: string, type: GalleryType, caption?: string | null, isSelected?: boolean | null, createdAt: any, updatedAt: any }> | null } | null };

export type UpdateGalleryMutationVariables = Exact<{
  galleryId: Scalars['Int']['input'];
  data: UpdateGalleryInput;
}>;


export type UpdateGalleryMutation = { __typename?: 'Mutation', updateGallery: { __typename?: 'Gallery', data?: { __typename?: 'GalleryData', id: string, hostelId: number, url: string, isSelected?: boolean | null, caption?: string | null, createdAt: any, updatedAt: any } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type CreateAddressMutationVariables = Exact<{
  input: CreateAddressInput;
}>;


export type CreateAddressMutation = { __typename?: 'Mutation', createAddress: { __typename?: 'Address', data?: { __typename?: 'AddressData', id: string } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type CreateContactsMutationVariables = Exact<{
  input: CreateContactInput;
}>;


export type CreateContactsMutation = { __typename?: 'Mutation', createContact: { __typename?: 'ContactDetail', data?: { __typename?: 'ContactDetailData', id: string } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type CreateHostelMutationVariables = Exact<{
  input: CreateHostelInput;
}>;


export type CreateHostelMutation = { __typename?: 'Mutation', createHostel: { __typename?: 'Hostel', data?: { __typename?: 'HostelData', id: string, ownerId: number } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type GetAddressByHostelIdQueryVariables = Exact<{
  hostelId: Scalars['Float']['input'];
}>;


export type GetAddressByHostelIdQuery = { __typename?: 'Query', getAddressByHostelId?: { __typename?: 'Address', data?: { __typename?: 'AddressData', id: string, country: string, city: string, subCity?: string | null, street?: string | null, latitude?: number | null, longitude?: number | null } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } | null };

export type GetContactsByHostelIdQueryVariables = Exact<{
  hostelId: Scalars['Float']['input'];
}>;


export type GetContactsByHostelIdQuery = { __typename?: 'Query', getContactByHostelId?: { __typename?: 'ContactDetail', data?: { __typename?: 'ContactDetailData', id: string, email: string, phone: string, altPhone?: string | null } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } | null };

export type GetHostelByTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHostelByTokenQuery = { __typename?: 'Query', getHostelByToken?: { __typename?: 'Hostel', data?: { __typename?: 'HostelData', id: string, name: string, description?: string | null, slug: string, verifiedBySuperAdmin: boolean, verifiedByCommunityOwner: boolean, hasOnboardingComplete: boolean } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } | null };

export type UpdateAddressMutationVariables = Exact<{
  input: UpdateAddressInput;
  addressId: Scalars['Float']['input'];
}>;


export type UpdateAddressMutation = { __typename?: 'Mutation', updateAddress: { __typename?: 'Address', data?: { __typename?: 'AddressData', id: string } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type UpdateContactMutationVariables = Exact<{
  input: UpdateContactInput;
  contactId: Scalars['Float']['input'];
}>;


export type UpdateContactMutation = { __typename?: 'Mutation', updateContact: { __typename?: 'ContactDetail', data?: { __typename?: 'ContactDetailData', id: string } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type UpdateHostelMutationVariables = Exact<{
  input: UpdateHostelInput;
  hostelId: Scalars['Float']['input'];
}>;


export type UpdateHostelMutation = { __typename?: 'Mutation', updateHostel: { __typename?: 'Hostel', data?: { __typename?: 'HostelData', id: string } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type GetAllHostelsQueryVariables = Exact<{
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllHostelsQuery = { __typename?: 'Query', getAllHostels: { __typename?: 'HostelArrayResponse', data: Array<{ __typename?: 'HostelData', id: string, name: string, description?: string | null, slug: string, verifiedByCommunityOwner: boolean, verifiedBySuperAdmin: boolean, ownerId: number, createdAt: any, updatedAt: any, address?: { __typename?: 'AddressData', id: string, country: string, city: string, subCity?: string | null, street?: string | null, latitude?: number | null, longitude?: number | null } | null, contact?: { __typename?: 'ContactDetailData', id: string, phone: string, altPhone?: string | null, email: string } | null, rooms: Array<{ __typename?: 'RoomData', id: string, status: RoomStatus, capacity: RoomCapacity, caption: string, description?: string | null, roomNumber?: string | null, maxOccupancy?: string | null, attachBathroom?: boolean | null, price?: { __typename?: 'PriceData', id: string, baseAmountPerDay?: number | null, baseAmountPerMonth: number, currency: Currency, discountAmount?: number | null, discountType?: DiscountType | null, isDynamicPricing: boolean, isDiscountActive: boolean } | null, image: Array<{ __typename?: 'RoomImageData', id: string, caption?: string | null, url: string }> }>, gallery: Array<{ __typename?: 'GalleryData', id: string, caption?: string | null, url: string }> }>, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type VerifyHostelMutationVariables = Exact<{
  hostelId: Scalars['Int']['input'];
  status: Scalars['Boolean']['input'];
}>;


export type VerifyHostelMutation = { __typename?: 'Mutation', verifyHostel: { __typename?: 'Hostel', data?: { __typename?: 'HostelData', id: string, name: string } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type ChangePasswordMutationVariables = Exact<{
  userId: Scalars['Float']['input'];
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: string };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById?: { __typename?: 'User', data?: { __typename?: 'UserData', id: string, isVerified: boolean, fullName: string, email: string, phoneNumber?: string | null, altPhoneNumber?: string | null, city?: string | null, gender?: Gender | null, dateOfBirth?: any | null, profilePicture?: string | null, hostelId?: number | null } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } | null };

export type MyBookingsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyBookingsQuery = { __typename?: 'Query', myBookings: { __typename?: 'BookingList', data?: Array<{ __typename?: 'BookingData', id: string, roomId: number, bookingKey: string, guestId: number, startDate: any, endDate: any, status: BookingStatus, paymentPlatformName: PaymentPlatformName, createdAt: any, updatedAt: any, room: { __typename?: 'RoomData', id: string, roomNumber?: string | null, capacity: RoomCapacity, caption: string, status: RoomStatus, attachBathroom?: boolean | null, maxOccupancy?: string | null, price?: { __typename?: 'PriceData', currency: Currency, baseAmountPerDay?: number | null, baseAmountPerMonth: number } | null }, guest: { __typename?: 'UserData', id: string, fullName: string, email: string } }> | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', data?: { __typename?: 'UserData', id: string, fullName: string, email: string, phoneNumber?: string | null, altPhoneNumber?: string | null, city?: string | null, gender?: Gender | null, dateOfBirth?: any | null, profilePicture?: string | null } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type CreateRoomAmenityOptionMutationVariables = Exact<{
  createRoomAmenityOptionInput: CreateRoomAmenityOptionInput;
}>;


export type CreateRoomAmenityOptionMutation = { __typename?: 'Mutation', createRoomAmenityOption: { __typename?: 'RoomAmenityOption', data?: { __typename?: 'RoomAmenityOptionData', id: string } | null, error?: { __typename?: 'GraphQLError', message: string } | null } };

export type DeleteRoomAmenityOptionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteRoomAmenityOptionMutation = { __typename?: 'Mutation', deleteRoomAmenityOption: { __typename?: 'RoomAmenityOption', data?: { __typename?: 'RoomAmenityOptionData', id: string } | null, error?: { __typename?: 'GraphQLError', message: string } | null } };

export type AllRoomAmenitiesOptionQueryVariables = Exact<{ [key: string]: never; }>;


export type AllRoomAmenitiesOptionQuery = { __typename?: 'Query', roomAmenityOptions: { __typename?: 'RoomAmenityOptionList', data?: Array<{ __typename?: 'RoomAmenityOptionData', id: string, name: string, description?: string | null, iconUrl?: string | null }> | null, error?: { __typename?: 'GraphQLError', code?: string | null } | null } };

export type UpdateRoomAmenityOptionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  updateRoomAmenityOptionInput: UpdateRoomAmenityOptionInput;
}>;


export type UpdateRoomAmenityOptionMutation = { __typename?: 'Mutation', updateRoomAmenityOption: { __typename?: 'RoomAmenityOption', data?: { __typename?: 'RoomAmenityOptionData', id: string } | null, error?: { __typename?: 'GraphQLError', message: string } | null } };

export type CreatePriceRuleMutationVariables = Exact<{
  createPriceRuleInput: CreateDynamicPriceRuleInput;
}>;


export type CreatePriceRuleMutation = { __typename?: 'Mutation', createPriceRule: { __typename?: 'DynamicPricingRule', data?: { __typename?: 'DynamicPricingRuleData', id: string, name: string, description?: string | null, roomId: number, startDate: any, endDate: any, amount: number, isWeekend: boolean, isActive: boolean, priority: number, createdAt: any, updatedAt: any } | null, error?: { __typename?: 'GraphQLError', message: string } | null } };

export type RemovePriceRuleMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RemovePriceRuleMutation = { __typename?: 'Mutation', removePriceRule: { __typename?: 'DynamicPricingRule', data?: { __typename?: 'DynamicPricingRuleData', id: string, name: string } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type GetPriceRulesByRoomQueryVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type GetPriceRulesByRoomQuery = { __typename?: 'Query', priceRulesByRoom: { __typename?: 'DynamicPricingRuleList', data?: Array<{ __typename?: 'DynamicPricingRuleData', id: string, name: string, description?: string | null, amount: number, startDate: any, endDate: any, isWeekend: boolean, isActive: boolean, priority: number }> | null } };

export type UpdatePriceRuleMutationVariables = Exact<{
  updatePriceInput: UpdateDynamicPriceRuleInput;
}>;


export type UpdatePriceRuleMutation = { __typename?: 'Mutation', updatePriceRule: { __typename?: 'DynamicPricingRule', data?: { __typename?: 'DynamicPricingRuleData', id: string, name: string, description?: string | null, roomId: number, startDate: any, endDate: any, amount: number, isWeekend: boolean, isActive: boolean, priority: number, updatedAt: any } | null } };

export type CreateRoomImageMutationVariables = Exact<{
  data: CreateRoomImageInput;
}>;


export type CreateRoomImageMutation = { __typename?: 'Mutation', createRoomImage: { __typename?: 'RoomImage', data?: { __typename?: 'RoomImageData', id: string, roomId: number, url: string, caption?: string | null } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type DeleteRoomImageMutationVariables = Exact<{
  roomImageId: Scalars['Int']['input'];
}>;


export type DeleteRoomImageMutation = { __typename?: 'Mutation', deleteRoomImage: { __typename?: 'RoomImage', data?: { __typename?: 'RoomImageData', id: string, roomId: number, url: string, caption?: string | null, createdAt: any, updatedAt: any } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type GetRoomImagesByRoomIdQueryVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type GetRoomImagesByRoomIdQuery = { __typename?: 'Query', getRoomImagesByRoomId?: { __typename?: 'RoomImageList', data?: Array<{ __typename?: 'RoomImageData', id: string, roomId: number, url: string, caption?: string | null, createdAt: any, updatedAt: any }> | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } | null };

export type UpdateRoomImageMutationVariables = Exact<{
  roomImageId: Scalars['Int']['input'];
  data: UpdateRoomImageInput;
}>;


export type UpdateRoomImageMutation = { __typename?: 'Mutation', updateRoomImage: { __typename?: 'RoomImage', data?: { __typename?: 'RoomImageData', id: string, roomId: number, url: string, caption?: string | null, createdAt: any, updatedAt: any } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type CreatePriceMutationVariables = Exact<{
  createPriceInput: CreatePriceInput;
}>;


export type CreatePriceMutation = { __typename?: 'Mutation', createPrice: { __typename?: 'Price', data?: { __typename?: 'PriceData', id: string, baseAmountPerDay?: number | null, baseAmountPerMonth: number, currency: Currency, roomId: number, isDynamicPricing: boolean, discountAmount?: number | null, discountType?: DiscountType | null, isDiscountActive: boolean } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type CreateRoomMutationVariables = Exact<{
  createRoomInput: CreateRoomInput;
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createRoom: { __typename?: 'Room', data?: { __typename?: 'RoomData', id: string, status: RoomStatus } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type CreateRoomAmenityMutationVariables = Exact<{
  createAmenityInput: CreateRoomAmenityInput;
}>;


export type CreateRoomAmenityMutation = { __typename?: 'Mutation', createRoomAmenity: { __typename?: 'RoomAmenity', data?: { __typename?: 'RoomAmenityData', id: string, roomId: number, amenity: any } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type DeleteRoomMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteRoomMutation = { __typename?: 'Mutation', removeRoom: { __typename?: 'Room', data?: { __typename?: 'RoomData', id: string, createdAt: any, updatedAt: any } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type FindAllAmenitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllAmenitiesQuery = { __typename?: 'Query', findAllAmenities: Array<{ __typename?: 'RoomAmenity', data?: { __typename?: 'RoomAmenityData', id: string, roomId: number, amenity: any } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null }> };

export type FindAnAmenityByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type FindAnAmenityByIdQuery = { __typename?: 'Query', findAnAmenityById: { __typename?: 'RoomAmenity', data?: { __typename?: 'RoomAmenityData', id: string, roomId: number, amenity: any } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type FindAmenityByRoomIdQueryVariables = Exact<{
  roomId: Scalars['Int']['input'];
}>;


export type FindAmenityByRoomIdQuery = { __typename?: 'Query', findAmenityByRoomId: { __typename?: 'RoomAmenity', data?: { __typename?: 'RoomAmenityData', id: string, roomId: number, amenity: any } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type GetRoomWithPriceAndGalleryQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetRoomWithPriceAndGalleryQuery = { __typename?: 'Query', room: { __typename?: 'Room', data?: { __typename?: 'RoomData', id: string, status: RoomStatus, capacity: RoomCapacity, description?: string | null, caption: string, maxOccupancy?: string | null, roomNumber?: string | null, attachBathroom?: boolean | null, hostelId: number, createdAt: any, updatedAt: any, image: Array<{ __typename?: 'RoomImageData', id: string, caption?: string | null, url: string, roomId: number, createdAt: any, updatedAt: any }>, price?: { __typename?: 'PriceData', id: string, baseAmountPerDay?: number | null, baseAmountPerMonth: number, currency: Currency, discountAmount?: number | null, discountType?: DiscountType | null, isDiscountActive: boolean, isDynamicPricing: boolean, createdAt: any, updatedAt: any } | null } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type GetRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRoomsQuery = { __typename?: 'Query', roomsByHostel: { __typename?: 'RoomList', data?: Array<{ __typename?: 'RoomData', id: string, status: RoomStatus, capacity: RoomCapacity, caption: string, roomNumber?: string | null, attachBathroom?: boolean | null, hostelId: number, createdAt: any, updatedAt: any, image: Array<{ __typename?: 'RoomImageData', id: string, caption?: string | null, url: string, roomId: number, createdAt: any, updatedAt: any }>, price?: { __typename?: 'PriceData', id: string, currency: Currency, baseAmountPerDay?: number | null, baseAmountPerMonth: number, isDynamicPricing: boolean, discountAmount?: number | null, discountType?: DiscountType | null, isDiscountActive: boolean, roomId: number, createdAt: any, updatedAt: any } | null }> | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type RemoveRoomAmenityMutationVariables = Exact<{
  roomAmenityId: Scalars['Int']['input'];
}>;


export type RemoveRoomAmenityMutation = { __typename?: 'Mutation', removeRoomAmenity: { __typename?: 'RoomAmenity', data?: { __typename?: 'RoomAmenityData', id: string, roomId: number, amenity: any } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type UpdatePriceMutationVariables = Exact<{
  updatePriceInput: UpdatePriceInput;
}>;


export type UpdatePriceMutation = { __typename?: 'Mutation', updatePrice: { __typename?: 'Price', data?: { __typename?: 'PriceData', id: string, baseAmountPerDay?: number | null, baseAmountPerMonth: number, currency: Currency, isDynamicPricing: boolean, discountAmount?: number | null, discountType?: DiscountType | null, isDiscountActive: boolean } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type UpdateRoomMutationVariables = Exact<{
  updateRoomInput: UpdateRoomInput;
}>;


export type UpdateRoomMutation = { __typename?: 'Mutation', updateRoom: { __typename?: 'Room', data?: { __typename?: 'RoomData', id: string, status: RoomStatus, capacity: RoomCapacity, caption: string, roomNumber?: string | null, attachBathroom?: boolean | null, hostelId: number, createdAt: any, updatedAt: any } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type UpdateRoomAmenityMutationVariables = Exact<{
  updateAmenityInput: UpdateRoomAmenityInput;
}>;


export type UpdateRoomAmenityMutation = { __typename?: 'Mutation', updateRoomAmenity: { __typename?: 'RoomAmenity', data?: { __typename?: 'RoomAmenityData', id: string, roomId: number, amenity: any } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type CreateRulesMutationVariables = Exact<{
  input: CreateRulesInput;
}>;


export type CreateRulesMutation = { __typename?: 'Mutation', createRules: { __typename?: 'HostelRules', data?: { __typename?: 'HostelRulesData', id: string, rules: any } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type GetRulesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRulesQuery = { __typename?: 'Query', getRulesByHostel: { __typename?: 'HostelRules', data?: { __typename?: 'HostelRulesData', id: string, rules: any } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type UpdateRulesMutationVariables = Exact<{
  input: UpdateRulesInput;
  rulesId: Scalars['Int']['input'];
}>;


export type UpdateRulesMutation = { __typename?: 'Mutation', updateRules: { __typename?: 'HostelRules', data?: { __typename?: 'HostelRulesData', id: string, rules: any } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type CreateServiceOptionMutationVariables = Exact<{
  createServiceOptionInput: CreateServiceOptionInput;
}>;


export type CreateServiceOptionMutation = { __typename?: 'Mutation', createServiceOption: { __typename?: 'ServiceOption', data?: { __typename?: 'ServiceOptionData', id: string } | null, error?: { __typename?: 'GraphQLError', message: string } | null } };

export type DeleteServiceOptionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteServiceOptionMutation = { __typename?: 'Mutation', deleteServiceOption: { __typename?: 'ServiceOption', data?: { __typename?: 'ServiceOptionData', id: string } | null, error?: { __typename?: 'GraphQLError', message: string } | null } };

export type AllServiceOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllServiceOptionsQuery = { __typename?: 'Query', serviceOptions: { __typename?: 'ServiceOptionList', data?: Array<{ __typename?: 'ServiceOptionData', id: string, name: string, description?: string | null, iconUrl?: string | null }> | null, error?: { __typename?: 'GraphQLError', code?: string | null } | null } };

export type UpdateServiceOptionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  updateServiceOptionInput: UpdateServiceOptionInput;
}>;


export type UpdateServiceOptionMutation = { __typename?: 'Mutation', updateServiceOption: { __typename?: 'ServiceOption', data?: { __typename?: 'ServiceOptionData', id: string } | null, error?: { __typename?: 'GraphQLError', message: string } | null } };

export type GetServiceByHostelIdQueryVariables = Exact<{
  hostelId: Scalars['Float']['input'];
}>;


export type GetServiceByHostelIdQuery = { __typename?: 'Query', findServiceByHostelId: { __typename?: 'Service', data?: { __typename?: 'ServiceData', id: string, services: any, hostelId: number } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type CreateServiceMutationVariables = Exact<{
  createServiceInput: CreateServiceDto;
}>;


export type CreateServiceMutation = { __typename?: 'Mutation', createService: { __typename?: 'Service', data?: { __typename?: 'ServiceData', id: string, services: any, hostelId: number } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type RemoveServiceMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type RemoveServiceMutation = { __typename?: 'Mutation', removeService: { __typename?: 'Service', data?: { __typename?: 'ServiceData', id: string, services: any, hostelId: number } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type UpdateServiceMutationVariables = Exact<{
  updateServiceInput: UpdateServiceDto;
}>;


export type UpdateServiceMutation = { __typename?: 'Mutation', updateService: { __typename?: 'Service', data?: { __typename?: 'ServiceData', id: string, services: any, hostelId: number } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type CreateHostelSettingsMutationVariables = Exact<{
  hostelId: Scalars['Float']['input'];
  data: CreateHostelSettingsInput;
}>;


export type CreateHostelSettingsMutation = { __typename?: 'Mutation', createSettings: { __typename?: 'HostelSetting', data?: { __typename?: 'HostelSettingData', id: string } | null, error?: { __typename?: 'GraphQLError', message: string } | null } };

export type GetSettingsQueryVariables = Exact<{
  hostelId: Scalars['Float']['input'];
}>;


export type GetSettingsQuery = { __typename?: 'Query', getSettingsByHostelId?: { __typename?: 'HostelSetting', data?: { __typename?: 'HostelSettingData', id: string, active: boolean, allowBooking: boolean, allowMessages: boolean, allowPrivateFeedbacks: boolean, allowRating: boolean, currency?: string | null, fontSize: number, visibility: VisibilityType, allowComments: boolean } | null, error?: { __typename?: 'GraphQLError', message: string } | null } | null };

export type UpdateHostelSettingsMutationVariables = Exact<{
  Id: Scalars['Float']['input'];
  data: UpdateHostelSettingsInput;
}>;


export type UpdateHostelSettingsMutation = { __typename?: 'Mutation', updateSettings: { __typename?: 'HostelSetting', data?: { __typename?: 'HostelSettingData', id: string } | null, error?: { __typename?: 'GraphQLError', message: string } | null } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ForgotPasswordResponse', id: number } };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'UsersAndToken', email: string, id: string, userType: UserType, token: { __typename?: 'Token', accessToken: string, refreshToken: string } } };

export type ResendVerificationMailMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type ResendVerificationMailMutation = { __typename?: 'Mutation', resendVerificationMail: boolean };

export type VerifyEmailMutationVariables = Exact<{
  token: VerifyEmailInput;
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename?: 'VerifyEmailResponse', id: number } };

export type ConfirmBookingMutationVariables = Exact<{
  bookingKey: Scalars['String']['input'];
}>;


export type ConfirmBookingMutation = { __typename?: 'Mutation', confirmBooking: { __typename?: 'ConfirmBooking', count: string } };

export type GetBookingByKeyQueryVariables = Exact<{
  bookingKey: Scalars['String']['input'];
}>;


export type GetBookingByKeyQuery = { __typename?: 'Query', bookingsWithKey: { __typename?: 'BookingList', data?: Array<{ __typename?: 'BookingData', id: string, roomId: number, bookingKey: string, guestId: number, startDate: any, endDate: any, status: BookingStatus, createdAt: any, updatedAt: any, room: { __typename?: 'RoomData', id: string, status: RoomStatus, capacity: RoomCapacity, caption: string, roomNumber?: string | null, attachBathroom?: boolean | null, hostelId: number, createdAt: any, updatedAt: any, image: Array<{ __typename?: 'RoomImageData', url: string, caption?: string | null }>, price?: { __typename?: 'PriceData', baseAmountPerDay?: number | null, baseAmountPerMonth: number, currency: Currency } | null }, guest: { __typename?: 'UserData', id: string, email: string, fullName: string, phoneNumber?: string | null, isVerified: boolean, userType: UserType, createdAt: any, updatedAt: any } }> | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type CheckValidBookingQueryVariables = Exact<{
  roomIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  startDate: Scalars['DateTime']['input'];
  endDate: Scalars['DateTime']['input'];
}>;


export type CheckValidBookingQuery = { __typename?: 'Query', checkValidBooking: { __typename?: 'ValidInvalidBooking', isValid: boolean, message?: string | null, totalPrice?: number | null, totalDays?: number | null, bookingSummary?: Array<{ __typename?: 'BookingSummary', roomId: number, price?: number | null, totalPriceOfRoom?: number | null, priceType?: string | null }> | null } };

export type FindRoomsByRoomIdsQueryVariables = Exact<{
  roomIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type FindRoomsByRoomIdsQuery = { __typename?: 'Query', findRoomsByRoomIds: { __typename?: 'BookingConfirmationMailData', roomNumbers: Array<number>, name: string } };

export type SendMmailAfterBookingMutationVariables = Exact<{
  email: Scalars['String']['input'];
  data: BookingConfirmationEmailDto;
}>;


export type SendMmailAfterBookingMutation = { __typename?: 'Mutation', sendMailAfterBooking: boolean };

export type GetHostelBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type GetHostelBySlugQuery = { __typename?: 'Query', getHostelBySlug?: { __typename?: 'Hostel', data?: { __typename?: 'HostelData', id: string, name: string, description?: string | null, slug: string, verifiedBySuperAdmin: boolean, verifiedByCommunityOwner: boolean, gallery: Array<{ __typename?: 'GalleryData', url: string, isSelected?: boolean | null }>, address?: { __typename?: 'AddressData', country: string, city: string, subCity?: string | null, street?: string | null, latitude?: number | null, longitude?: number | null } | null, contact?: { __typename?: 'ContactDetailData', phone: string, altPhone?: string | null, email: string } | null, rooms: Array<{ __typename?: 'RoomData', id: string, caption: string, capacity: RoomCapacity, roomNumber?: string | null, description?: string | null, status: RoomStatus, roomAmenity?: { __typename?: 'RoomAmenityData', amenity: any } | null, image: Array<{ __typename?: 'RoomImageData', url: string, id: string, caption?: string | null }>, price?: { __typename?: 'PriceData', baseAmountPerDay?: number | null, baseAmountPerMonth: number, currency: Currency, isDynamicPricing: boolean, discountAmount?: number | null, discountType?: DiscountType | null } | null }> } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } | null };

export type LogInUserMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LogInUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'UsersAndToken', email: string, id: string, userType: UserType, token: { __typename?: 'Token', accessToken: string, refreshToken: string } } };

export type GetSearchQueriesQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type GetSearchQueriesQuery = { __typename?: 'Query', searchQueries: Array<{ __typename?: 'SearchQuery', data?: Array<{ __typename?: 'SearchQueryData', country: string, city: string, subCity?: string | null }> | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null }> };

export type SearchHostelQueryVariables = Exact<{
  input: SearchHostelInput;
}>;


export type SearchHostelQuery = { __typename?: 'Query', getHostelsBySearch: { __typename?: 'HostelList', data?: Array<{ __typename?: 'HostelData', name: string, description?: string | null, slug: string, address?: { __typename?: 'AddressData', city: string, country: string, subCity?: string | null, street?: string | null } | null, contact?: { __typename?: 'ContactDetailData', phone: string, email: string, altPhone?: string | null } | null, gallery: Array<{ __typename?: 'GalleryData', url: string }> }> | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type GetGoogleOauthUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGoogleOauthUrlQuery = { __typename?: 'Query', getGoogleAuthUrl: { __typename?: 'GoogleOauthUrl', url: string } };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutResponse', success: boolean, message: string } };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshTokens: { __typename?: 'UsersHostelIdAndToken', user: { __typename?: 'UserData', email: string, fullName: string, id: string, userType: UserType, hostelId?: number | null }, token: { __typename?: 'Token', refreshToken: string, accessToken: string } } };

export type SignupUserMutationVariables = Exact<{
  input: SignupInput;
}>;


export type SignupUserMutation = { __typename?: 'Mutation', signupUser: { __typename?: 'UsersAndToken', email: string, id: string, userType: UserType, token: { __typename?: 'Token', accessToken: string, refreshToken: string } } };

export type SignUpWithGoogleMutationVariables = Exact<{
  input: SignupWithGoogleInput;
}>;


export type SignUpWithGoogleMutation = { __typename?: 'Mutation', signUpWithGoogle: { __typename?: 'UsersAndToken', id: string, email: string, token: { __typename?: 'Token', accessToken: string, refreshToken: string } } };

export type CompleteOnboardingMutationVariables = Exact<{ [key: string]: never; }>;


export type CompleteOnboardingMutation = { __typename?: 'Mutation', completeOnboarding: { __typename?: 'Hostel', data?: { __typename?: 'HostelData', id: string } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type GetOnboardingDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOnboardingDataQuery = { __typename?: 'Query', getOnboardingData: { __typename?: 'Hostel', data?: { __typename?: 'HostelData', address?: { __typename?: 'AddressData', id: string } | null, contact?: { __typename?: 'ContactDetailData', id: string } | null, amenities?: { __typename?: 'AmenitiesData', id: string } | null, gallery: Array<{ __typename?: 'GalleryData', id: string }>, rooms: Array<{ __typename?: 'RoomData', id: string }> } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type CreateAmenityMutationVariables = Exact<{
  createAmenityInput: CreateAmenityInput;
}>;


export type CreateAmenityMutation = { __typename?: 'Mutation', createAmenity: { __typename?: 'Amenities', data?: { __typename?: 'AmenitiesData', id: string, amenities: any, hostelId: number } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type FindAmenityByHostelIdQueryVariables = Exact<{
  hostelId: Scalars['Int']['input'];
}>;


export type FindAmenityByHostelIdQuery = { __typename?: 'Query', findAmenityByHostelId: { __typename?: 'Amenities', data?: { __typename?: 'AmenitiesData', id: string, amenities: any, hostelId: number } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type RemoveAmenityMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RemoveAmenityMutation = { __typename?: 'Mutation', removeAmenity: { __typename?: 'Amenities', data?: { __typename?: 'AmenitiesData', id: string, amenities: any, hostelId: number } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type UpdateAmenityMutationVariables = Exact<{
  updateAmenityInput: UpdateAmenityInput;
}>;


export type UpdateAmenityMutation = { __typename?: 'Mutation', updateAmenity: { __typename?: 'Amenities', data?: { __typename?: 'AmenitiesData', id: string, amenities: any, hostelId: number } | null, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };

export type GetFeaturedHostelsQueryVariables = Exact<{
  pageSize: Scalars['Int']['input'];
}>;


export type GetFeaturedHostelsQuery = { __typename?: 'Query', getAllHostels: { __typename?: 'HostelArrayResponse', data: Array<{ __typename?: 'HostelData', id: string, name: string, description?: string | null, slug: string, address?: { __typename?: 'AddressData', country: string, city: string, subCity?: string | null, street?: string | null, latitude?: number | null, longitude?: number | null } | null, gallery: Array<{ __typename?: 'GalleryData', url: string, caption?: string | null, isSelected?: boolean | null }>, rooms: Array<{ __typename?: 'RoomData', id: string, caption: string, capacity: RoomCapacity, roomNumber?: string | null, status: RoomStatus, createdAt: any, updatedAt: any, hostelId: number, image: Array<{ __typename?: 'RoomImageData', url: string, id: string, caption?: string | null, createdAt: any, updatedAt: any, roomId: number }>, price?: { __typename?: 'PriceData', baseAmountPerDay?: number | null, baseAmountPerMonth: number, currency: Currency, isDynamicPricing: boolean, discountAmount?: number | null, discountType?: DiscountType | null } | null }>, service?: { __typename?: 'ServiceData', services: any } | null }>, error?: { __typename?: 'GraphQLError', message: string, code?: string | null } | null } };


export const CreateAmenityOptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAmenityOption"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createAmenityOptionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAmenityOptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAmenityOption"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createAmenityOptionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createAmenityOptionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CreateAmenityOptionMutation, CreateAmenityOptionMutationVariables>;
export const DeleteAmenityOptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteAmenityOption"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAmenityOption"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"amenityOptionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteAmenityOptionMutation, DeleteAmenityOptionMutationVariables>;
export const AllAmenitiesOptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllAmenitiesOption"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amenityOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}},{"kind":"Field","name":{"kind":"Name","value":"hostelAmenityType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<AllAmenitiesOptionQuery, AllAmenitiesOptionQueryVariables>;
export const UpdateAmenityOptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateAmenityOption"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateAmenityOptionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAmenityOptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAmenityOption"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"amenityOptionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateAmenityOptionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateAmenityOptionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateAmenityOptionMutation, UpdateAmenityOptionMutationVariables>;
export const BookingsByHostelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BookingsByHostel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookingsByHostel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bookingKey"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"roomNumber"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"attachBathroom"}},{"kind":"Field","name":{"kind":"Name","value":"maxOccupancy"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"baseAmountPerDay"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"isDiscountActive"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"guest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]} as unknown as DocumentNode<BookingsByHostelQuery, BookingsByHostelQueryVariables>;
export const SelectGalleryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"selectGallery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"galleryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"selectGallery"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"galleryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"galleryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"hostelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"isSelected"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<SelectGalleryMutation, SelectGalleryMutationVariables>;
export const GetHostelDetailsBasicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getHostelDetailsBasic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getHostelByToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"verifiedBySuperAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"verifiedByCommunityOwner"}},{"kind":"Field","name":{"kind":"Name","value":"hasOnboardingComplete"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"subCity"}},{"kind":"Field","name":{"kind":"Name","value":"street"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetHostelDetailsBasicQuery, GetHostelDetailsBasicQueryVariables>;
export const CreateGalleryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGallery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGalleryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGallery"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hostelId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<CreateGalleryMutation, CreateGalleryMutationVariables>;
export const DeleteGalleryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteGallery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"galleryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteGallery"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"galleryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"galleryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hostelId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteGalleryMutation, DeleteGalleryMutationVariables>;
export const GetGalleryByHostelIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGalleryByHostelId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGalleryByHostelId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hostelId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"isSelected"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetGalleryByHostelIdQuery, GetGalleryByHostelIdQueryVariables>;
export const UpdateGalleryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGallery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"galleryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGalleryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGallery"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"galleryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"galleryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hostelId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"isSelected"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateGalleryMutation, UpdateGalleryMutationVariables>;
export const CreateAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAddressInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<CreateAddressMutation, CreateAddressMutationVariables>;
export const CreateContactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createContacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateContactInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<CreateContactsMutation, CreateContactsMutationVariables>;
export const CreateHostelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createHostel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateHostelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createHostel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<CreateHostelMutation, CreateHostelMutationVariables>;
export const GetAddressByHostelIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAddressByHostelId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAddressByHostelId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"subCity"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<GetAddressByHostelIdQuery, GetAddressByHostelIdQueryVariables>;
export const GetContactsByHostelIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getContactsByHostelId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getContactByHostelId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"altPhone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<GetContactsByHostelIdQuery, GetContactsByHostelIdQueryVariables>;
export const GetHostelByTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getHostelByToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getHostelByToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"verifiedBySuperAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"verifiedByCommunityOwner"}},{"kind":"Field","name":{"kind":"Name","value":"hasOnboardingComplete"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<GetHostelByTokenQuery, GetHostelByTokenQueryVariables>;
export const UpdateAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAddressInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addressId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"addressId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addressId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateAddressMutation, UpdateAddressMutationVariables>;
export const UpdateContactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateContact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateContactInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contactId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateContact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"contactId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contactId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateContactMutation, UpdateContactMutationVariables>;
export const UpdateHostelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateHostel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateHostelInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateHostel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"hostelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateHostelMutation, UpdateHostelMutationVariables>;
export const GetAllHostelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllHostels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllHostels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"verifiedByCommunityOwner"}},{"kind":"Field","name":{"kind":"Name","value":"verifiedBySuperAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"subCity"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"altPhone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"roomNumber"}},{"kind":"Field","name":{"kind":"Name","value":"maxOccupancy"}},{"kind":"Field","name":{"kind":"Name","value":"attachBathroom"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"baseAmountPerDay"}},{"kind":"Field","name":{"kind":"Name","value":"baseAmountPerMonth"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"isDynamicPricing"}},{"kind":"Field","name":{"kind":"Name","value":"isDiscountActive"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"gallery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllHostelsQuery, GetAllHostelsQueryVariables>;
export const VerifyHostelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyHostel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyHostel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<VerifyHostelMutation, VerifyHostelMutationVariables>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangePasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const GetUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"altPhoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"hostelId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const MyBookingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyBookings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myBookings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"bookingKey"}},{"kind":"Field","name":{"kind":"Name","value":"guestId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"paymentPlatformName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roomNumber"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"attachBathroom"}},{"kind":"Field","name":{"kind":"Name","value":"maxOccupancy"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"baseAmountPerDay"}},{"kind":"Field","name":{"kind":"Name","value":"baseAmountPerMonth"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"guest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<MyBookingsQuery, MyBookingsQueryVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"altPhoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const CreateRoomAmenityOptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createRoomAmenityOption"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createRoomAmenityOptionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRoomAmenityOptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRoomAmenityOption"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createRoomAmenityOptionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createRoomAmenityOptionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CreateRoomAmenityOptionMutation, CreateRoomAmenityOptionMutationVariables>;
export const DeleteRoomAmenityOptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteRoomAmenityOption"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRoomAmenityOption"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomAmenityOptionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteRoomAmenityOptionMutation, DeleteRoomAmenityOptionMutationVariables>;
export const AllRoomAmenitiesOptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllRoomAmenitiesOption"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomAmenityOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<AllRoomAmenitiesOptionQuery, AllRoomAmenitiesOptionQueryVariables>;
export const UpdateRoomAmenityOptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateRoomAmenityOption"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateRoomAmenityOptionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRoomAmenityOptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRoomAmenityOption"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomAmenityOptionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateRoomAmenityOptionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateRoomAmenityOptionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateRoomAmenityOptionMutation, UpdateRoomAmenityOptionMutationVariables>;
export const CreatePriceRuleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePriceRule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createPriceRuleInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateDynamicPriceRuleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPriceRule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createPriceRuleInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createPriceRuleInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"isWeekend"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CreatePriceRuleMutation, CreatePriceRuleMutationVariables>;
export const RemovePriceRuleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemovePriceRule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removePriceRule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<RemovePriceRuleMutation, RemovePriceRuleMutationVariables>;
export const GetPriceRulesByRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPriceRulesByRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"priceRulesByRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"isWeekend"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}}]}}]}}]}}]} as unknown as DocumentNode<GetPriceRulesByRoomQuery, GetPriceRulesByRoomQueryVariables>;
export const UpdatePriceRuleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePriceRule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePriceInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDynamicPriceRuleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePriceRule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updatePriceInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePriceInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"isWeekend"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePriceRuleMutation, UpdatePriceRuleMutationVariables>;
export const CreateRoomImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRoomImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRoomImageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRoomImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<CreateRoomImageMutation, CreateRoomImageMutationVariables>;
export const DeleteRoomImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRoomImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomImageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRoomImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomImageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomImageId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteRoomImageMutation, DeleteRoomImageMutationVariables>;
export const GetRoomImagesByRoomIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRoomImagesByRoomId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRoomImagesByRoomId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<GetRoomImagesByRoomIdQuery, GetRoomImagesByRoomIdQueryVariables>;
export const UpdateRoomImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRoomImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomImageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRoomImageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRoomImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomImageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomImageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateRoomImageMutation, UpdateRoomImageMutationVariables>;
export const CreatePriceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePrice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createPriceInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePriceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPrice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createPriceInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createPriceInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"baseAmountPerDay"}},{"kind":"Field","name":{"kind":"Name","value":"baseAmountPerMonth"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"isDynamicPricing"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"isDiscountActive"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<CreatePriceMutation, CreatePriceMutationVariables>;
export const CreateRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createRoomInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRoomInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createRoomInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createRoomInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<CreateRoomMutation, CreateRoomMutationVariables>;
export const CreateRoomAmenityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRoomAmenity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createAmenityInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRoomAmenityInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRoomAmenity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createAmenityInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createAmenityInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"amenity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<CreateRoomAmenityMutation, CreateRoomAmenityMutationVariables>;
export const DeleteRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteRoomMutation, DeleteRoomMutationVariables>;
export const FindAllAmenitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllAmenities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllAmenities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"amenity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<FindAllAmenitiesQuery, FindAllAmenitiesQueryVariables>;
export const FindAnAmenityByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAnAmenityById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAnAmenityById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"amenity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<FindAnAmenityByIdQuery, FindAnAmenityByIdQueryVariables>;
export const FindAmenityByRoomIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAmenityByRoomId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAmenityByRoomId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"amenity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<FindAmenityByRoomIdQuery, FindAmenityByRoomIdQueryVariables>;
export const GetRoomWithPriceAndGalleryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRoomWithPriceAndGallery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"maxOccupancy"}},{"kind":"Field","name":{"kind":"Name","value":"roomNumber"}},{"kind":"Field","name":{"kind":"Name","value":"attachBathroom"}},{"kind":"Field","name":{"kind":"Name","value":"hostelId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"baseAmountPerDay"}},{"kind":"Field","name":{"kind":"Name","value":"baseAmountPerMonth"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"isDiscountActive"}},{"kind":"Field","name":{"kind":"Name","value":"isDynamicPricing"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<GetRoomWithPriceAndGalleryQuery, GetRoomWithPriceAndGalleryQueryVariables>;
export const GetRoomsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomsByHostel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"roomNumber"}},{"kind":"Field","name":{"kind":"Name","value":"attachBathroom"}},{"kind":"Field","name":{"kind":"Name","value":"hostelId"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"baseAmountPerDay"}},{"kind":"Field","name":{"kind":"Name","value":"baseAmountPerMonth"}},{"kind":"Field","name":{"kind":"Name","value":"isDynamicPricing"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"isDiscountActive"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<GetRoomsQuery, GetRoomsQueryVariables>;
export const RemoveRoomAmenityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveRoomAmenity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomAmenityId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeRoomAmenity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomAmenityId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomAmenityId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"amenity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveRoomAmenityMutation, RemoveRoomAmenityMutationVariables>;
export const UpdatePriceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePrice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePriceInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePriceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePrice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updatePriceInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePriceInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"baseAmountPerDay"}},{"kind":"Field","name":{"kind":"Name","value":"baseAmountPerMonth"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"isDynamicPricing"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}},{"kind":"Field","name":{"kind":"Name","value":"isDiscountActive"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePriceMutation, UpdatePriceMutationVariables>;
export const UpdateRoomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRoom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateRoomInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRoomInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRoom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateRoomInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateRoomInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"roomNumber"}},{"kind":"Field","name":{"kind":"Name","value":"attachBathroom"}},{"kind":"Field","name":{"kind":"Name","value":"hostelId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateRoomMutation, UpdateRoomMutationVariables>;
export const UpdateRoomAmenityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRoomAmenity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateAmenityInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRoomAmenityInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRoomAmenity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateAmenityInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateAmenityInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"amenity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateRoomAmenityMutation, UpdateRoomAmenityMutationVariables>;
export const CreateRulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createRules"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRulesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRules"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createRulesInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rules"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<CreateRulesMutation, CreateRulesMutationVariables>;
export const GetRulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRules"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRulesByHostel"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rules"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<GetRulesQuery, GetRulesQueryVariables>;
export const UpdateRulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateRules"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRulesInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rulesId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRules"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"rulesId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rulesId"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateRulesInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rules"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateRulesMutation, UpdateRulesMutationVariables>;
export const CreateServiceOptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createServiceOption"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createServiceOptionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateServiceOptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createServiceOption"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createServiceOptionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createServiceOptionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CreateServiceOptionMutation, CreateServiceOptionMutationVariables>;
export const DeleteServiceOptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteServiceOption"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteServiceOption"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"serviceOptionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteServiceOptionMutation, DeleteServiceOptionMutationVariables>;
export const AllServiceOptionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllServiceOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"serviceOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"iconUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<AllServiceOptionsQuery, AllServiceOptionsQueryVariables>;
export const UpdateServiceOptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateServiceOption"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateServiceOptionInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateServiceOptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateServiceOption"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"serviceOptionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateServiceOptionInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateServiceOptionInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateServiceOptionMutation, UpdateServiceOptionMutationVariables>;
export const GetServiceByHostelIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetServiceByHostelId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findServiceByHostelId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"services"}},{"kind":"Field","name":{"kind":"Name","value":"hostelId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<GetServiceByHostelIdQuery, GetServiceByHostelIdQueryVariables>;
export const CreateServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createServiceInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateServiceDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createServiceInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createServiceInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"services"}},{"kind":"Field","name":{"kind":"Name","value":"hostelId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<CreateServiceMutation, CreateServiceMutationVariables>;
export const RemoveServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"services"}},{"kind":"Field","name":{"kind":"Name","value":"hostelId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveServiceMutation, RemoveServiceMutationVariables>;
export const UpdateServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateServiceInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateServiceDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateServiceInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateServiceInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"services"}},{"kind":"Field","name":{"kind":"Name","value":"hostelId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateServiceMutation, UpdateServiceMutationVariables>;
export const CreateHostelSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createHostelSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateHostelSettingsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostelId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<CreateHostelSettingsMutation, CreateHostelSettingsMutationVariables>;
export const GetSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSettingsByHostelId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"allowBooking"}},{"kind":"Field","name":{"kind":"Name","value":"allowMessages"}},{"kind":"Field","name":{"kind":"Name","value":"allowPrivateFeedbacks"}},{"kind":"Field","name":{"kind":"Name","value":"allowRating"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"fontSize"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"allowComments"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<GetSettingsQuery, GetSettingsQueryVariables>;
export const UpdateHostelSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateHostelSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"Id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateHostelSettingsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSettings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostelSettingId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"Id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateHostelSettingsMutation, UpdateHostelSettingsMutationVariables>;
export const ForgotPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ForgotPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgotPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const ResendVerificationMailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"resendVerificationMail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resendVerificationMail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<ResendVerificationMailMutation, ResendVerificationMailMutationVariables>;
export const VerifyEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const ConfirmBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConfirmBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookingKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookingKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookingKey"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<ConfirmBookingMutation, ConfirmBookingMutationVariables>;
export const GetBookingByKeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBookingByKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookingKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookingsWithKey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookingKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookingKey"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"bookingKey"}},{"kind":"Field","name":{"kind":"Name","value":"guestId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"room"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"roomNumber"}},{"kind":"Field","name":{"kind":"Name","value":"attachBathroom"}},{"kind":"Field","name":{"kind":"Name","value":"hostelId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"baseAmountPerDay"}},{"kind":"Field","name":{"kind":"Name","value":"baseAmountPerMonth"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"guest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<GetBookingByKeyQuery, GetBookingByKeyQueryVariables>;
export const CheckValidBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckValidBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkValidBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isValid"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}},{"kind":"Field","name":{"kind":"Name","value":"totalDays"}},{"kind":"Field","name":{"kind":"Name","value":"bookingSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomId"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"totalPriceOfRoom"}},{"kind":"Field","name":{"kind":"Name","value":"priceType"}}]}}]}}]}}]} as unknown as DocumentNode<CheckValidBookingQuery, CheckValidBookingQueryVariables>;
export const FindRoomsByRoomIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindRoomsByRoomIds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roomIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findRoomsByRoomIds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roomIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roomIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roomNumbers"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<FindRoomsByRoomIdsQuery, FindRoomsByRoomIdsQueryVariables>;
export const SendMmailAfterBookingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendMmailAfterBooking"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookingConfirmationEmailDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMailAfterBooking"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<SendMmailAfterBookingMutation, SendMmailAfterBookingMutationVariables>;
export const GetHostelBySlugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getHostelBySlug"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getHostelBySlug"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"verifiedBySuperAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"verifiedByCommunityOwner"}},{"kind":"Field","name":{"kind":"Name","value":"gallery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"isSelected"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"subCity"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"altPhone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"roomNumber"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"roomAmenity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amenity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"baseAmountPerDay"}},{"kind":"Field","name":{"kind":"Name","value":"baseAmountPerMonth"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"isDynamicPricing"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<GetHostelBySlugQuery, GetHostelBySlugQueryVariables>;
export const LogInUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logInUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]}}]} as unknown as DocumentNode<LogInUserMutation, LogInUserMutationVariables>;
export const GetSearchQueriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSearchQueries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchQueries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"subCity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<GetSearchQueriesQuery, GetSearchQueriesQueryVariables>;
export const SearchHostelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchHostel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchHostelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getHostelsBySearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"subCity"}},{"kind":"Field","name":{"kind":"Name","value":"street"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"altPhone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"gallery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<SearchHostelQuery, SearchHostelQueryVariables>;
export const GetGoogleOauthUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getGoogleOauthUrl"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGoogleAuthUrl"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<GetGoogleOauthUrlQuery, GetGoogleOauthUrlQueryVariables>;
export const LogOutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<LogOutMutation, LogOutMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"hostelId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const SignupUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signupUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signupUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]}}]} as unknown as DocumentNode<SignupUserMutation, SignupUserMutationVariables>;
export const SignUpWithGoogleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signUpWithGoogle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignupWithGoogleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUpWithGoogle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]}}]} as unknown as DocumentNode<SignUpWithGoogleMutation, SignUpWithGoogleMutationVariables>;
export const CompleteOnboardingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"completeOnboarding"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeOnboarding"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<CompleteOnboardingMutation, CompleteOnboardingMutationVariables>;
export const GetOnboardingDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getOnboardingData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOnboardingData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"amenities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"gallery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<GetOnboardingDataQuery, GetOnboardingDataQueryVariables>;
export const CreateAmenityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAmenity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createAmenityInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAmenityInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAmenity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createAmenityInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createAmenityInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amenities"}},{"kind":"Field","name":{"kind":"Name","value":"hostelId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<CreateAmenityMutation, CreateAmenityMutationVariables>;
export const FindAmenityByHostelIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAmenityByHostelId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hostelId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAmenityByHostelId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"hostelId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hostelId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amenities"}},{"kind":"Field","name":{"kind":"Name","value":"hostelId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<FindAmenityByHostelIdQuery, FindAmenityByHostelIdQueryVariables>;
export const RemoveAmenityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveAmenity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAmenity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amenities"}},{"kind":"Field","name":{"kind":"Name","value":"hostelId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveAmenityMutation, RemoveAmenityMutationVariables>;
export const UpdateAmenityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAmenity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateAmenityInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAmenityInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAmenity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateAmenityInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateAmenityInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amenities"}},{"kind":"Field","name":{"kind":"Name","value":"hostelId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateAmenityMutation, UpdateAmenityMutationVariables>;
export const GetFeaturedHostelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFeaturedHostels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllHostels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"subCity"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"gallery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"isSelected"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rooms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"roomNumber"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"hostelId"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"roomId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"baseAmountPerDay"}},{"kind":"Field","name":{"kind":"Name","value":"baseAmountPerMonth"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"isDynamicPricing"}},{"kind":"Field","name":{"kind":"Name","value":"discountAmount"}},{"kind":"Field","name":{"kind":"Name","value":"discountType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"services"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<GetFeaturedHostelsQuery, GetFeaturedHostelsQueryVariables>;

export const CreateAmenityOption = gql`
    mutation createAmenityOption($createAmenityOptionInput: CreateAmenityOptionInput!) {
  createAmenityOption(createAmenityOptionInput: $createAmenityOptionInput) {
    data {
      id
    }
    error {
      message
    }
  }
}
    `;
export const DeleteAmenityOption = gql`
    mutation deleteAmenityOption($id: Int!) {
  deleteAmenityOption(amenityOptionId: $id) {
    data {
      id
    }
    error {
      message
    }
  }
}
    `;
export const AllAmenitiesOption = gql`
    query AllAmenitiesOption {
  amenityOptions {
    data {
      id
      name
      description
      iconUrl
      hostelAmenityType
    }
    error {
      code
    }
  }
}
    `;
export const UpdateAmenityOption = gql`
    mutation updateAmenityOption($id: Int!, $updateAmenityOptionInput: UpdateAmenityOptionInput!) {
  updateAmenityOption(
    amenityOptionId: $id
    updateAmenityOptionInput: $updateAmenityOptionInput
  ) {
    data {
      id
    }
    error {
      message
    }
  }
}
    `;
export const BookingsByHostel = gql`
    query BookingsByHostel {
  bookingsByHostel {
    data {
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
          baseAmountPerDay
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
    error {
      message
      code
      path
    }
  }
}
    `;
export const SelectGallery = gql`
    mutation selectGallery($galleryId: Int!, $hostelId: Int!) {
  selectGallery(galleryId: $galleryId, hostelId: $hostelId) {
    data {
      id
      caption
      url
      isSelected
    }
    error {
      message
      code
    }
  }
}
    `;
export const GetHostelDetailsBasic = gql`
    query getHostelDetailsBasic {
  getHostelByToken {
    data {
      name
      slug
      verifiedBySuperAdmin
      verifiedByCommunityOwner
      hasOnboardingComplete
      address {
        country
        city
        subCity
        street
      }
    }
  }
}
    `;
export const CreateGallery = gql`
    mutation CreateGallery($data: CreateGalleryInput!) {
  createGallery(data: $data) {
    data {
      id
      hostelId
      url
      caption
    }
    error {
      message
      code
    }
  }
}
    `;
export const DeleteGallery = gql`
    mutation DeleteGallery($galleryId: Int!) {
  deleteGallery(galleryId: $galleryId) {
    data {
      id
      hostelId
      url
      caption
      createdAt
      updatedAt
    }
    error {
      message
      code
    }
  }
}
    `;
export const GetGalleryByHostelId = gql`
    query GetGalleryByHostelId($hostelId: Int!) {
  getGalleryByHostelId(hostelId: $hostelId) {
    data {
      id
      hostelId
      url
      type
      caption
      isSelected
      createdAt
      updatedAt
    }
  }
}
    `;
export const UpdateGallery = gql`
    mutation UpdateGallery($galleryId: Int!, $data: UpdateGalleryInput!) {
  updateGallery(galleryId: $galleryId, data: $data) {
    data {
      id
      hostelId
      url
      isSelected
      caption
      createdAt
      updatedAt
    }
    error {
      message
      code
    }
  }
}
    `;
export const CreateAddress = gql`
    mutation createAddress($input: CreateAddressInput!) {
  createAddress(data: $input) {
    data {
      id
    }
    error {
      message
      code
    }
  }
}
    `;
export const CreateContacts = gql`
    mutation createContacts($input: CreateContactInput!) {
  createContact(data: $input) {
    data {
      id
    }
    error {
      message
      code
    }
  }
}
    `;
export const CreateHostel = gql`
    mutation createHostel($input: CreateHostelInput!) {
  createHostel(data: $input) {
    data {
      id
      ownerId
    }
    error {
      message
      code
    }
  }
}
    `;
export const GetAddressByHostelId = gql`
    query getAddressByHostelId($hostelId: Float!) {
  getAddressByHostelId(hostelId: $hostelId) {
    data {
      id
      country
      city
      subCity
      street
      latitude
      longitude
    }
    error {
      message
      code
    }
  }
}
    `;
export const GetContactsByHostelId = gql`
    query getContactsByHostelId($hostelId: Float!) {
  getContactByHostelId(hostelId: $hostelId) {
    data {
      id
      email
      phone
      altPhone
    }
    error {
      message
      code
    }
  }
}
    `;
export const GetHostelByToken = gql`
    query getHostelByToken {
  getHostelByToken {
    data {
      id
      name
      description
      slug
      verifiedBySuperAdmin
      verifiedByCommunityOwner
      hasOnboardingComplete
    }
    error {
      message
      code
    }
  }
}
    `;
export const UpdateAddress = gql`
    mutation updateAddress($input: UpdateAddressInput!, $addressId: Float!) {
  updateAddress(data: $input, addressId: $addressId) {
    data {
      id
    }
    error {
      message
      code
    }
  }
}
    `;
export const UpdateContact = gql`
    mutation updateContact($input: UpdateContactInput!, $contactId: Float!) {
  updateContact(data: $input, contactId: $contactId) {
    data {
      id
    }
    error {
      message
      code
    }
  }
}
    `;
export const UpdateHostel = gql`
    mutation updateHostel($input: UpdateHostelInput!, $hostelId: Float!) {
  updateHostel(data: $input, hostelId: $hostelId) {
    data {
      id
    }
    error {
      message
      code
    }
  }
}
    `;
export const GetAllHostels = gql`
    query GetAllHostels($pageSize: Int, $pageNumber: Int) {
  getAllHostels(pageSize: $pageSize, pageNumber: $pageNumber) {
    data {
      id
      name
      description
      slug
      verifiedByCommunityOwner
      verifiedBySuperAdmin
      ownerId
      createdAt
      updatedAt
      address {
        id
        country
        city
        subCity
        street
        latitude
        longitude
      }
      contact {
        id
        phone
        altPhone
        email
      }
      rooms {
        id
        status
        capacity
        caption
        description
        roomNumber
        maxOccupancy
        attachBathroom
        price {
          id
          baseAmountPerDay
          baseAmountPerMonth
          currency
          discountAmount
          discountType
          isDynamicPricing
          isDiscountActive
        }
        image {
          id
          caption
          url
        }
      }
      gallery {
        id
        caption
        url
      }
    }
    error {
      message
      code
    }
  }
}
    `;
export const VerifyHostel = gql`
    mutation VerifyHostel($hostelId: Int!, $status: Boolean!) {
  verifyHostel(hostelId: $hostelId, status: $status) {
    data {
      id
      name
    }
    error {
      message
      code
    }
  }
}
    `;
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
      city
      gender
      dateOfBirth
      profilePicture
      hostelId
    }
    error {
      message
      code
    }
  }
}
    `;
export const MyBookings = gql`
    query MyBookings {
  myBookings {
    data {
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
          baseAmountPerDay
          baseAmountPerMonth
        }
      }
      guest {
        id
        fullName
        email
      }
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
      city
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
export const CreateRoomAmenityOption = gql`
    mutation createRoomAmenityOption($createRoomAmenityOptionInput: CreateRoomAmenityOptionInput!) {
  createRoomAmenityOption(
    createRoomAmenityOptionInput: $createRoomAmenityOptionInput
  ) {
    data {
      id
    }
    error {
      message
    }
  }
}
    `;
export const DeleteRoomAmenityOption = gql`
    mutation deleteRoomAmenityOption($id: Int!) {
  deleteRoomAmenityOption(roomAmenityOptionId: $id) {
    data {
      id
    }
    error {
      message
    }
  }
}
    `;
export const AllRoomAmenitiesOption = gql`
    query AllRoomAmenitiesOption {
  roomAmenityOptions {
    data {
      id
      name
      description
      iconUrl
    }
    error {
      code
    }
  }
}
    `;
export const UpdateRoomAmenityOption = gql`
    mutation updateRoomAmenityOption($id: Int!, $updateRoomAmenityOptionInput: UpdateRoomAmenityOptionInput!) {
  updateRoomAmenityOption(
    roomAmenityOptionId: $id
    updateRoomAmenityOptionInput: $updateRoomAmenityOptionInput
  ) {
    data {
      id
    }
    error {
      message
    }
  }
}
    `;
export const CreatePriceRule = gql`
    mutation CreatePriceRule($createPriceRuleInput: CreateDynamicPriceRuleInput!) {
  createPriceRule(createPriceRuleInput: $createPriceRuleInput) {
    data {
      id
      name
      description
      roomId
      startDate
      endDate
      amount
      isWeekend
      isActive
      priority
      createdAt
      updatedAt
    }
    error {
      message
    }
  }
}
    `;
export const RemovePriceRule = gql`
    mutation RemovePriceRule($id: Int!) {
  removePriceRule(id: $id) {
    data {
      id
      name
    }
    error {
      message
      code
    }
  }
}
    `;
export const GetPriceRulesByRoom = gql`
    query GetPriceRulesByRoom($roomId: Int!) {
  priceRulesByRoom(roomId: $roomId) {
    data {
      id
      name
      description
      amount
      startDate
      endDate
      isWeekend
      isActive
      priority
    }
  }
}
    `;
export const UpdatePriceRule = gql`
    mutation UpdatePriceRule($updatePriceInput: UpdateDynamicPriceRuleInput!) {
  updatePriceRule(updatePriceInput: $updatePriceInput) {
    data {
      id
      name
      description
      roomId
      startDate
      endDate
      amount
      isWeekend
      isActive
      priority
      updatedAt
    }
  }
}
    `;
export const CreateRoomImage = gql`
    mutation CreateRoomImage($data: CreateRoomImageInput!) {
  createRoomImage(data: $data) {
    data {
      id
      roomId
      url
      caption
    }
    error {
      message
      code
    }
  }
}
    `;
export const DeleteRoomImage = gql`
    mutation DeleteRoomImage($roomImageId: Int!) {
  deleteRoomImage(roomImageId: $roomImageId) {
    data {
      id
      roomId
      url
      caption
      createdAt
      updatedAt
    }
    error {
      message
      code
    }
  }
}
    `;
export const GetRoomImagesByRoomId = gql`
    query GetRoomImagesByRoomId($roomId: Int!) {
  getRoomImagesByRoomId(roomId: $roomId) {
    data {
      id
      roomId
      url
      caption
      createdAt
      updatedAt
    }
    error {
      message
      code
    }
  }
}
    `;
export const UpdateRoomImage = gql`
    mutation UpdateRoomImage($roomImageId: Int!, $data: UpdateRoomImageInput!) {
  updateRoomImage(roomImageId: $roomImageId, data: $data) {
    data {
      id
      roomId
      url
      caption
      createdAt
      updatedAt
    }
    error {
      message
      code
    }
  }
}
    `;
export const CreatePrice = gql`
    mutation CreatePrice($createPriceInput: CreatePriceInput!) {
  createPrice(createPriceInput: $createPriceInput) {
    data {
      id
      baseAmountPerDay
      baseAmountPerMonth
      currency
      roomId
      isDynamicPricing
      discountAmount
      discountType
      isDiscountActive
    }
    error {
      message
      code
    }
  }
}
    `;
export const CreateRoom = gql`
    mutation CreateRoom($createRoomInput: CreateRoomInput!) {
  createRoom(createRoomInput: $createRoomInput) {
    data {
      id
      status
    }
    error {
      message
      code
    }
  }
}
    `;
export const CreateRoomAmenity = gql`
    mutation CreateRoomAmenity($createAmenityInput: CreateRoomAmenityInput!) {
  createRoomAmenity(createAmenityInput: $createAmenityInput) {
    data {
      id
      roomId
      amenity
    }
    error {
      message
      code
    }
  }
}
    `;
export const DeleteRoom = gql`
    mutation deleteRoom($id: Int!) {
  removeRoom(id: $id) {
    data {
      id
      createdAt
      updatedAt
    }
    error {
      message
      code
    }
  }
}
    `;
export const FindAllAmenities = gql`
    query FindAllAmenities {
  findAllAmenities {
    data {
      id
      roomId
      amenity
    }
    error {
      message
      code
    }
  }
}
    `;
export const FindAnAmenityById = gql`
    query FindAnAmenityById($id: Int!) {
  findAnAmenityById(id: $id) {
    data {
      id
      roomId
      amenity
    }
    error {
      message
      code
    }
  }
}
    `;
export const FindAmenityByRoomId = gql`
    query FindAmenityByRoomId($roomId: Int!) {
  findAmenityByRoomId(roomId: $roomId) {
    data {
      id
      roomId
      amenity
    }
    error {
      message
      code
    }
  }
}
    `;
export const GetRoomWithPriceAndGallery = gql`
    query GetRoomWithPriceAndGallery($id: Int!) {
  room(id: $id) {
    data {
      id
      status
      capacity
      description
      caption
      maxOccupancy
      roomNumber
      attachBathroom
      hostelId
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
        baseAmountPerDay
        baseAmountPerMonth
        currency
        discountAmount
        discountType
        isDiscountActive
        isDynamicPricing
        createdAt
        updatedAt
      }
    }
    error {
      message
      code
    }
  }
}
    `;
export const GetRooms = gql`
    query GetRooms {
  roomsByHostel {
    data {
      id
      status
      capacity
      caption
      roomNumber
      attachBathroom
      hostelId
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
        currency
        baseAmountPerDay
        baseAmountPerMonth
        isDynamicPricing
        discountAmount
        discountType
        isDiscountActive
        roomId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    error {
      message
      code
    }
  }
}
    `;
export const RemoveRoomAmenity = gql`
    mutation RemoveRoomAmenity($roomAmenityId: Int!) {
  removeRoomAmenity(roomAmenityId: $roomAmenityId) {
    data {
      id
      roomId
      amenity
    }
    error {
      message
      code
    }
  }
}
    `;
export const UpdatePrice = gql`
    mutation UpdatePrice($updatePriceInput: UpdatePriceInput!) {
  updatePrice(updatePriceInput: $updatePriceInput) {
    data {
      id
      baseAmountPerDay
      baseAmountPerMonth
      currency
      isDynamicPricing
      discountAmount
      discountType
      isDiscountActive
    }
    error {
      message
      code
    }
  }
}
    `;
export const UpdateRoom = gql`
    mutation UpdateRoom($updateRoomInput: UpdateRoomInput!) {
  updateRoom(updateRoomInput: $updateRoomInput) {
    data {
      id
      status
      capacity
      caption
      roomNumber
      attachBathroom
      hostelId
      createdAt
      updatedAt
    }
    error {
      message
      code
    }
  }
}
    `;
export const UpdateRoomAmenity = gql`
    mutation UpdateRoomAmenity($updateAmenityInput: UpdateRoomAmenityInput!) {
  updateRoomAmenity(updateAmenityInput: $updateAmenityInput) {
    data {
      id
      roomId
      amenity
    }
    error {
      message
      code
    }
  }
}
    `;
export const CreateRules = gql`
    mutation createRules($input: CreateRulesInput!) {
  createRules(createRulesInput: $input) {
    data {
      id
      rules
    }
    error {
      message
      code
    }
  }
}
    `;
export const GetRules = gql`
    query getRules {
  getRulesByHostel {
    data {
      id
      rules
    }
    error {
      message
      code
    }
  }
}
    `;
export const UpdateRules = gql`
    mutation updateRules($input: UpdateRulesInput!, $rulesId: Int!) {
  updateRules(rulesId: $rulesId, updateRulesInput: $input) {
    data {
      id
      rules
    }
    error {
      message
      code
    }
  }
}
    `;
export const CreateServiceOption = gql`
    mutation createServiceOption($createServiceOptionInput: CreateServiceOptionInput!) {
  createServiceOption(createServiceOptionInput: $createServiceOptionInput) {
    data {
      id
    }
    error {
      message
    }
  }
}
    `;
export const DeleteServiceOption = gql`
    mutation deleteServiceOption($id: Int!) {
  deleteServiceOption(serviceOptionId: $id) {
    data {
      id
    }
    error {
      message
    }
  }
}
    `;
export const AllServiceOptions = gql`
    query AllServiceOptions {
  serviceOptions {
    data {
      id
      name
      description
      iconUrl
    }
    error {
      code
    }
  }
}
    `;
export const UpdateServiceOption = gql`
    mutation updateServiceOption($id: Int!, $updateServiceOptionInput: UpdateServiceOptionInput!) {
  updateServiceOption(
    serviceOptionId: $id
    updateServiceOptionInput: $updateServiceOptionInput
  ) {
    data {
      id
    }
    error {
      message
    }
  }
}
    `;
export const GetServiceByHostelId = gql`
    query GetServiceByHostelId($hostelId: Float!) {
  findServiceByHostelId(hostelId: $hostelId) {
    data {
      id
      services
      hostelId
    }
    error {
      message
      code
    }
  }
}
    `;
export const CreateService = gql`
    mutation CreateService($createServiceInput: CreateServiceDto!) {
  createService(createServiceInput: $createServiceInput) {
    data {
      id
      services
      hostelId
    }
    error {
      message
      code
    }
  }
}
    `;
export const RemoveService = gql`
    mutation RemoveService($id: Float!) {
  removeService(id: $id) {
    data {
      id
      services
      hostelId
    }
    error {
      message
      code
    }
  }
}
    `;
export const UpdateService = gql`
    mutation UpdateService($updateServiceInput: UpdateServiceDto!) {
  updateService(updateServiceInput: $updateServiceInput) {
    data {
      id
      services
      hostelId
    }
    error {
      message
      code
    }
  }
}
    `;
export const CreateHostelSettings = gql`
    mutation createHostelSettings($hostelId: Float!, $data: CreateHostelSettingsInput!) {
  createSettings(hostelId: $hostelId, data: $data) {
    data {
      id
    }
    error {
      message
    }
  }
}
    `;
export const GetSettings = gql`
    query getSettings($hostelId: Float!) {
  getSettingsByHostelId(hostelId: $hostelId) {
    data {
      id
      active
      allowBooking
      allowMessages
      allowPrivateFeedbacks
      allowRating
      currency
      fontSize
      visibility
      allowComments
    }
    error {
      message
    }
  }
}
    `;
export const UpdateHostelSettings = gql`
    mutation updateHostelSettings($Id: Float!, $data: UpdateHostelSettingsInput!) {
  updateSettings(hostelSettingId: $Id, data: $data) {
    data {
      id
    }
    error {
      message
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
export const ConfirmBooking = gql`
    mutation ConfirmBooking($bookingKey: String!) {
  confirmBooking(bookingKey: $bookingKey) {
    count
  }
}
    `;
export const GetBookingByKey = gql`
    query GetBookingByKey($bookingKey: String!) {
  bookingsWithKey(bookingKey: $bookingKey) {
    data {
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
        hostelId
        createdAt
        updatedAt
        image {
          url
          caption
        }
        price {
          baseAmountPerDay
          baseAmountPerMonth
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
    error {
      message
      code
    }
  }
}
    `;
export const CheckValidBooking = gql`
    query CheckValidBooking($roomIds: [Int!]!, $startDate: DateTime!, $endDate: DateTime!) {
  checkValidBooking(roomIds: $roomIds, startDate: $startDate, endDate: $endDate) {
    isValid
    message
    totalPrice
    totalDays
    bookingSummary {
      roomId
      price
      totalPriceOfRoom
      priceType
    }
  }
}
    `;
export const FindRoomsByRoomIds = gql`
    query FindRoomsByRoomIds($roomIds: [Int!]!) {
  findRoomsByRoomIds(roomIds: $roomIds) {
    roomNumbers
    name
  }
}
    `;
export const SendMmailAfterBooking = gql`
    mutation SendMmailAfterBooking($email: String!, $data: BookingConfirmationEmailDto!) {
  sendMailAfterBooking(email: $email, data: $data)
}
    `;
export const GetHostelBySlug = gql`
    query getHostelBySlug($slug: String!) {
  getHostelBySlug(slug: $slug) {
    data {
      id
      name
      description
      slug
      verifiedBySuperAdmin
      verifiedByCommunityOwner
      gallery {
        url
        isSelected
      }
      address {
        country
        city
        subCity
        street
        latitude
        longitude
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
        description
        status
        roomAmenity {
          amenity
        }
        image {
          url
          id
          caption
        }
        price {
          baseAmountPerDay
          baseAmountPerMonth
          currency
          isDynamicPricing
          discountAmount
          discountType
        }
      }
    }
    error {
      message
      code
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
    data {
      country
      city
      subCity
    }
    error {
      message
      code
    }
  }
}
    `;
export const SearchHostel = gql`
    query searchHostel($input: SearchHostelInput!) {
  getHostelsBySearch(input: $input) {
    data {
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
      gallery {
        url
      }
      slug
    }
    error {
      message
      code
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
      hostelId
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
export const CompleteOnboarding = gql`
    mutation completeOnboarding {
  completeOnboarding {
    data {
      id
    }
    error {
      message
      code
    }
  }
}
    `;
export const GetOnboardingData = gql`
    query getOnboardingData {
  getOnboardingData {
    data {
      address {
        id
      }
      contact {
        id
      }
      amenities {
        id
      }
      gallery {
        id
      }
      rooms {
        id
      }
    }
    error {
      message
      code
    }
  }
}
    `;
export const CreateAmenity = gql`
    mutation CreateAmenity($createAmenityInput: CreateAmenityInput!) {
  createAmenity(createAmenityInput: $createAmenityInput) {
    data {
      id
      amenities
      hostelId
    }
    error {
      message
      code
    }
  }
}
    `;
export const FindAmenityByHostelId = gql`
    query FindAmenityByHostelId($hostelId: Int!) {
  findAmenityByHostelId(hostelId: $hostelId) {
    data {
      id
      amenities
      hostelId
    }
    error {
      message
      code
    }
  }
}
    `;
export const RemoveAmenity = gql`
    mutation RemoveAmenity($id: Int!) {
  removeAmenity(id: $id) {
    data {
      id
      amenities
      hostelId
    }
    error {
      message
      code
    }
  }
}
    `;
export const UpdateAmenity = gql`
    mutation UpdateAmenity($updateAmenityInput: UpdateAmenityInput!) {
  updateAmenity(updateAmenityInput: $updateAmenityInput) {
    data {
      id
      amenities
      hostelId
    }
    error {
      message
      code
    }
  }
}
    `;
export const GetFeaturedHostels = gql`
    query GetFeaturedHostels($pageSize: Int!) {
  getAllHostels(pageSize: $pageSize) {
    data {
      id
      name
      description
      slug
      address {
        country
        city
        subCity
        street
        latitude
        longitude
      }
      gallery {
        url
        caption
        isSelected
      }
      rooms {
        id
        caption
        capacity
        roomNumber
        status
        createdAt
        updatedAt
        hostelId
        image {
          url
          id
          caption
          createdAt
          updatedAt
          roomId
        }
        price {
          baseAmountPerDay
          baseAmountPerMonth
          currency
          isDynamicPricing
          discountAmount
          discountType
        }
      }
      service {
        services
      }
    }
    error {
      message
      code
    }
  }
}
    `;