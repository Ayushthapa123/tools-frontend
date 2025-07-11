'use client';
import React, { FC, useEffect, useMemo, useState } from 'react';

import Button from 'src/components/Button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import TextInput from 'src/features/react-hook-form/TextField';
import { countries } from '../data/countries';

import {
  AddressData,
  CreateAddress,
  CreateAddressMutation,
  CreateAddressMutationVariables,
  GetAddressByHostelId,
  GetAddressByHostelIdQuery,
  GetAddressByHostelIdQueryVariables,
  GetHostelByTokenQuery,
  GetHostelByTokenQueryVariables,
  GetHostelByToken,
  UpdateAddress,
  UpdateAddressMutation,
  UpdateAddressMutationVariables,
} from 'src/gql/graphql';
import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import LoadingSpinner from 'src/components/Loading';
import { MapComponent } from './MapComponent';
import { enqueueSnackbar } from 'notistack';
import { useGraphQLQuery } from 'src/hooks/useGraphqlQuery';
import { MapProvider } from 'src/features/MapProvider';

interface Iprops {
  hostelId?: number;
  handleNextStep?: () => void;
}
export const AddressDetails = (props: Iprops) => {
  let { hostelId, handleNextStep } = props;
  const queryHostelData = useGraphqlClientRequest<
    GetHostelByTokenQuery,
    GetHostelByTokenQueryVariables
  >(GetHostelByToken.loc?.source?.body!);

  //initially user is unauthenticated so there will be undefined data/ you should authenticate in _app
  const fetchData = async () => {
    const res = await queryHostelData();
    return res.getHostelByToken;
  };


  const { data: hostelDataByToken } = useQuery({
    queryKey: [ 'getHostelByToken' ],
    queryFn: fetchData,
  });

  if (!hostelId) {
    hostelId = Number(hostelDataByToken?.data?.id);
  }

  const { data: hostelDataFull, isLoading } = useGraphQLQuery<
    GetAddressByHostelIdQuery,
    GetAddressByHostelIdQueryVariables
  >({
    queryKey: [ 'getAddress', hostelId ],
    query: GetAddressByHostelId.loc!.source.body,
    variables: { hostelId },
    enabled: !!hostelId,
  });

  const hostelData = hostelDataFull?.getAddressByHostelId;

  return (
    <div className="w-full">
      {!isLoading ? (
        <HostelInfoForm
          hostelId={hostelId}
          // id={Number(hostelData?.data?.id)}
          country={hostelData?.data?.country ?? ''}
          city={hostelData?.data?.city ?? ''}
          subCity={hostelData?.data?.subCity ?? ''}
          street={hostelData?.data?.street ?? ''}
          latitude={hostelData?.data?.latitude ?? null}
          longitude={hostelData?.data?.longitude ?? null}
          id={hostelData?.data?.id ?? ''}
          createdAt={''}
          updatedAt={''}
          handleNextStep={handleNextStep}
        />
      ) : (
        <div className=" h-[50vh] w-full">
          <LoadingSpinner color="primary" size="lg" />
        </div>
      )}
    </div>
  );
};

interface ReverseGeoDataType {
  geoCity: string | null,
  geoCounty: string | null,
  geoStreet: string | null,
}


const HostelInfoForm: FC<AddressData & { handleNextStep?: () => void }> = props => {
  const { hostelId, id, city, country, street, subCity, latitude, longitude, handleNextStep } = props;

  const [ clickedLatLng, setClickedLatLng ] = useState<{
    lat: number | null;
    lng: number | null;
  } | null>({ lat: latitude ?? null, lng: longitude ?? null });

  const handleClickLatLng = (lat: number | null, lng: number | null) => {
    setClickedLatLng({ lat, lng });
  };
  const [ reverseGeoData, setReverseGeoData ] = useState<ReverseGeoDataType>()
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<AddressData>({
    defaultValues: {
      country,

      city,
      subCity,
      street,
      latitude,
      longitude,
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

  const handleSubmitForm = (data: AddressData) => {
    const country = data.country;
    const city = data.city;
    const subCity = data.subCity;

    const street = data.street;

    if (id) {
      //
      updateHostelAddress({
        addressId: Number(id),
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
          queryClient.invalidateQueries({ queryKey: [ 'getAddress' ] });
          queryClient.invalidateQueries({ queryKey: [ 'getHostelByToken' ] });
          handleNextStep?.();
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

  useEffect(() => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: { lat: Number(clickedLatLng?.lat), lng: Number(clickedLatLng?.lng) } }, (results, status) => {
      if (status === "OK") {
        if (results?.[ 0 ]) {
          const splitedAddress = results[ 0 ].formatted_address.split(",");
          setReverseGeoData({
            geoCity: splitedAddress[ splitedAddress.length - 2 ].split(" ")[ 1 ],
            geoCounty: splitedAddress[ splitedAddress.length - 1 ],
            geoStreet: splitedAddress[ splitedAddress.length - 3 ]
          })
        } else {
        }
      } else {
      }
    });
  }, [ clickedLatLng ])

  // setting default value in fields
  useEffect(() => {
    if (reverseGeoData?.geoCity) {
      setValue("city", reverseGeoData.geoCity);
    }
    if (reverseGeoData?.geoCounty) {
      setValue("country", reverseGeoData.geoCounty);
    }
    if (reverseGeoData?.geoStreet) {
      setValue("street", reverseGeoData.geoStreet);
    }
  }, [reverseGeoData, setValue]);

  return (
    <form className=" h-auto w-full" onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="relative mt-5 h-[300px] md:h-[500px] w-full overflow-hidden">
        <MapProvider>
          <MapComponent
            clickedLatLng={clickedLatLng}
            setClickedLatLng={handleClickLatLng}
            lat={latitude}
            lng={longitude}
          />
        </MapProvider>
      </div>
      <div className=" grid h-auto w-full gap-5 md:grid-cols-2 mt-5">
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

      <div className=" flex w-full justify-end">
        <div className=" mt-10 w-[200px]">
          <Button
            label={`${id ? 'Update Address Info' : 'Create Address'}`}
            type="submit"
            loading={isCreating || isUpdating}
          />
        </div>
      </div>
    </form>
  );
};
