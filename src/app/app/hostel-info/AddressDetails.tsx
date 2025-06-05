'use client';
import React, { FC, useMemo, useState } from 'react';

import Button from 'src/components/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import TextInput from 'src/features/react-hook-form/TextField';
import { countries } from '../data/countries';

import {
  CreateAddress,
  CreateAddressMutation,
  CreateAddressMutationVariables,
  GetAddressByHostelId,
  GetAddressByHostelIdQuery,
  GetAddressByHostelIdQueryVariables,
  UpdateAddress,
  UpdateAddressMutation,
  UpdateAddressMutationVariables,
} from 'src/gql/graphql';
import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import LoadingSpinner from 'src/components/Loading';
import { MapComponent } from './MapComponent';
import { enqueueSnackbar } from 'notistack';
import { useGraphQLQuery } from 'src/hooks/useGraphqlQuery';

interface Iprops {
  hostelId: number;
}
export const AddressDetails = (props: Iprops) => {
  const { hostelId } = props;

  const { data: hostelDataFull, isLoading } = useGraphQLQuery<
    GetAddressByHostelIdQuery,
    GetAddressByHostelIdQueryVariables
  >({
    queryKey: ['getAddress', hostelId],
    query: GetAddressByHostelId.loc!.source.body,
    variables: { hostelId },
    enabled: !!hostelId,
  });

  const hostelData = hostelDataFull?.getAddressByHostelId;

  return (
    <div className="    w-full">
      {!isLoading ? (
        <HostelInfoForm
          hostelId={hostelId}
          addressId={hostelData?.data?.id}
          country={hostelData?.data?.country}
          city={hostelData?.data?.city}
          subCity={hostelData?.data?.subCity}
          street={hostelData?.data?.street}
          lat={hostelData?.data?.latitude}
          lng={hostelData?.data?.longitude}
        />
      ) : (
        <div className=" h-[50vh] w-full">
          <LoadingSpinner color="primary" size="lg" />
        </div>
      )}
    </div>
  );
};

interface IProps {
  hostelId: number;
  addressId?: string | null;

  country?: string | null;

  city?: string | null;
  subCity?: string | null;
  street?: string | null;
  lat?: number | null;
  lng?: number | null;
}

const HostelInfoForm: FC<IProps> = props => {
  const { hostelId, addressId, city, country, street, subCity, lat, lng } = props;

  const [clickedLatLng, setClickedLatLng] = useState<{
    lat: number | null;
    lng: number | null;
  } | null>({ lat: lat ?? null, lng: lng ?? null });

  const handleClickLatLng = (lat: number | null, lng: number | null) => {
    setClickedLatLng({ lat, lng });
  };

  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IProps>({
    defaultValues: {
      country,

      city,
      subCity,
      street,
      lat,
      lng,
    },
  });

  const mutateCreateHostelAddress = useGraphqlClientRequest<
    CreateAddressMutation,
    CreateAddressMutationVariables
  >(CreateAddress.loc?.source.body!);

  const { mutateAsync: createAddress, isPending: isCreating } = useMutation({
    mutationFn: mutateCreateHostelAddress,
  });

  const mutateUpdateHostelAddress = useGraphqlClientRequest<
    UpdateAddressMutation,
    UpdateAddressMutationVariables
  >(UpdateAddress.loc?.source.body!);

  const { mutateAsync: updateHostelAddress, isPending: isUpdating } = useMutation({
    mutationFn: mutateUpdateHostelAddress,
  });

  const handleSubmitForm = (data: IProps) => {
    const country = data.country;
    const city = data.city;
    const subCity = data.subCity;

    const street = data.street;

    if (addressId) {
      //
      updateHostelAddress({
        addressId: Number(addressId),
        input: {
          id: Number(addressId),
          ...(country && {
            country,
          }),

          ...(city && {
            city,
          }),
          ...(subCity && {
            subCity,
          }),
          ...(street && {
            street,
          }),
          ...(clickedLatLng?.lat && {
            latitude: clickedLatLng?.lat,
          }),
          ...(clickedLatLng?.lng && {
            longitude: clickedLatLng?.lng,
          }),
        },
      }).then(res => {
        if (res?.updateAddress?.data?.id) {
          enqueueSnackbar('Address updated.', { variant: 'success' });
        } else {
          enqueueSnackbar('Something went wrong.', { variant: 'error' });
        }
      });
    } else {
      createAddress({
        input: {
          hostelId: hostelId,
          country: country ?? '',

          city: city,
          subCity,
          street,
          latitude: clickedLatLng?.lat,
          longitude: clickedLatLng?.lng,
        },
      }).then(res => {
        if (res?.createAddress?.data?.id) {
          enqueueSnackbar('Address Created', { variant: 'success' });
          queryClient.invalidateQueries({ queryKey: ['getAddress'] });
          queryClient.invalidateQueries({ queryKey: ['getHostelByToken'] });
        } else {
          enqueueSnackbar('Something went wrong', { variant: 'error' });
        }
      });
    }
  };

  const countryOptions = useMemo(() => {
    return countries.map(country => ({
      label: country.name,
      value: country.name,
    }));
  }, []);

  return (
    <form className=" h-auto w-full" onSubmit={handleSubmit(handleSubmitForm)}>
      <div className=" grid h-auto w-full gap-5 md:grid-cols-2">
        <div>
          <ReactSelect
            name="country"
            placeholder="Country"
            control={control}
            options={countryOptions}
            label="Country"
            required
            helperText={errors.country?.type === 'required' ? 'Country Is Required' : ''}
            error={!!errors.country}
          />
        </div>

        <div>
          <TextInput
            name="city"
            type="text"
            placeholder="City"
            control={control}
            label="City"
            required
            helpertext={errors.city?.type === 'required' ? 'City Is Required' : ''}
            error={!!errors.city}
          />
        </div>
        <div>
          <TextInput
            name="subCity"
            type="text"
            placeholder="Tole"
            control={control}
            label="Tole"
            error={!!errors.subCity}
          />
        </div>
        <div>
          <TextInput
            name="street"
            type="text"
            placeholder="Street"
            control={control}
            label="Street"
            error={!!errors.street}
          />
        </div>
      </div>

      <div className="relative mt-5 h-[400px] w-full overflow-hidden">
        <MapComponent
          clickedLatLng={clickedLatLng}
          setClickedLatLng={handleClickLatLng}
          lat={lat}
          lng={lng}
        />
      </div>

      <div className=" flex w-full justify-end">
        <div className=" mt-10 w-[200px]">
          <Button
            label={`${addressId ? 'Update Address Info' : 'Create Address'}`}
            type="submit"
            loading={isCreating || isUpdating}
          />
        </div>
      </div>
    </form>
  );
};
