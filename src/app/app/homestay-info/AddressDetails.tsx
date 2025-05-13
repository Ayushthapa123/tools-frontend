'use client';
import React, { FC, useMemo, useState } from 'react';

import Button from 'src/components/Button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import TextInput from 'src/features/react-hook-form/TextField';
import { countries } from '../data/countries';

import { useToastStore } from 'src/store/toastStore';

import {
  CreateAddress,
  CreateAddressMutation,
  CreateAddressMutationVariables,
  GetAddressByHomestayId,
  GetAddressByHomestayIdQuery,
  GetAddressByHomestayIdQueryVariables,
  UpdateAddress,
  UpdateAddressMutation,
  UpdateAddressMutationVariables,
} from 'src/gql/graphql';
import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import LoadingSpinner from 'src/components/Loading';
import { MapComponent } from './MapComponent';

interface Iprops {
  homestayId: number;
}
export const  AddressDetails = (props: Iprops) => {
  const { homestayId } = props;
  const queryAddressData = useGraphqlClientRequest<
    GetAddressByHomestayIdQuery,
    GetAddressByHomestayIdQueryVariables
  >(GetAddressByHomestayId.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryAddressData({ homestayId: homestayId });
    return res.getAddressByHomestayId;
  };

  const { data: homestayData, isLoading } = useQuery({
    queryKey: ['getAddress'],
    queryFn: fetchData,
  });

  return (
    <div className="    w-full">
      {!isLoading ? (
        <HomestayInfoForm
          homestayId={homestayId}
          addressId={homestayData?.id}
          country={homestayData?.country}
          city={homestayData?.city}
          subCity={homestayData?.subCity}
          street={homestayData?.street}
          lat={homestayData?.latitude}
          lng={homestayData?.longitude}
        />
      ) : (
        <div className=" h-[50vh] w-full">
          <LoadingSpinner color='primary' size='lg' />
        </div>
      )}
    </div>
  );
};

interface IProps {
    homestayId: number;
  addressId?: string | null;

  country?: string | null;

  city?: string | null;
  subCity?: string | null;
  street?: string | null;
  lat?: number | null;
  lng?: number | null;
}

const HomestayInfoForm: FC<IProps> = props => {
  const { homestayId, addressId, city, country, street, subCity, lat, lng } = props;

  const [clickedLatLng, setClickedLatLng] = useState<{ lat: number | null; lng: number | null } | null>({ lat: lat ?? null, lng: lng ?? null });

  const handleClickLatLng = (lat: number | null, lng: number | null) => {
    setClickedLatLng({ lat, lng });
  };

  const queryClient = useQueryClient();

  const { setMessage, setRole, setShowToast } = useToastStore();
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

  const mutateCreateHomestayAddress = useGraphqlClientRequest<
    CreateAddressMutation,
    CreateAddressMutationVariables
  >(CreateAddress.loc?.source.body!);

  const { mutateAsync: createAddress, isPending: isCreating } = useMutation({
    mutationFn: mutateCreateHomestayAddress,
  });

  const mutateUpdateAddress = useGraphqlClientRequest<
    UpdateAddressMutation,
    UpdateAddressMutationVariables
  >(UpdateAddress.loc?.source.body!);

  const { mutateAsync: updateAddress, isPending: isUpdating } = useMutation({
    mutationFn: mutateUpdateAddress,
  });

  const handleSubmitForm = (data: IProps) => {
    const country = data.country;
    const city = data.city;
    const subCity = data.subCity;

    const street = data.street;

    if (addressId) {
      //
      updateAddress({
        addressId: Number(addressId),
        input: {
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
        if (res?.updateAddress?.id) {
          setShowToast(true);
          setMessage('Address Updated');
          setRole('success');
        } else {
          setShowToast(true);
          setMessage('Something went wrong!');
          setRole('error');
        }
      });
    } else {
      createAddress({
        input: {
          homestayId: homestayId,
          country: country ?? '',

          city: city,
          subCity,
          street,
          latitude: clickedLatLng?.lat,
          longitude: clickedLatLng?.lng,
        },
      }).then(res => {
        if (res?.createAddress?.id) {
          setShowToast(true);
          setMessage('Address created');
          setRole('success');
          //
          queryClient.invalidateQueries({ queryKey: ['getAddress'] });
          queryClient.invalidateQueries({ queryKey: ['getHomestayByToken'] });
        } else {
          setShowToast(true);
          setMessage('Something Went Wrong!');
          setRole('error');
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
    <form className=" w-full h-auto" onSubmit={handleSubmit(handleSubmitForm)}>
      <div className=" grid w-full gap-5 md:grid-cols-2 h-auto">
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
  
      <div className='mt-5 w-full h-[400px] relative overflow-hidden'>
        <MapComponent  clickedLatLng={clickedLatLng} setClickedLatLng={handleClickLatLng} lat={lat} lng={lng} />
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
