'use client';

import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import { currencyes } from '../data/currencies';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  CreateHostelSettings,
  CreateHostelSettingsMutation,
  CreateHostelSettingsMutationVariables,
  GetSettings,
  GetSettingsQuery,
  GetSettingsQueryVariables,
  UpdateHostelSettings,
  UpdateHostelSettingsMutation,
  UpdateHostelSettingsMutationVariables,
} from 'src/gql/graphql';
import { useToastStore } from 'src/store/toastStore';
import { useUserStore } from 'src/store/userStore';
import Button from 'src/components/Button';

type SettingData = {
  currency: string;
  fontSize: number;
  active: boolean;
  allowBooking: boolean;
  allowComments: boolean;
  allowPrivateFeedbacks: boolean;
  allowMessages: boolean;
  allowRating: boolean;
};

const SettingsPage: React.FC = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<SettingData>({
    defaultValues: {},
  });
  const { user } = useUserStore();

  const { setMessage, setRole, setShowToast } = useToastStore();

  const currencyList = useMemo(
    () =>
      currencyes.map(c => ({
        label: `${c.currencyCode}(${c.currencySymbol})`,
        value: c.currencyCode,
      })),
    [],
  );

  const fontSizeOptions = [
    { label: 12, value: 12 },
    { label: 13, value: 13 },
    { label: 14, value: 14 },
    { label: 15, value: 15 },
    { label: 16, value: 16 },
    { label: 17, value: 17 },
    { label: 18, value: 18 },
  ];

  const booleanOptions = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ];

  const fetchSettingsQuery = useGraphqlClientRequest<GetSettingsQuery, GetSettingsQueryVariables>(
    GetSettings.loc?.source?.body!,
  );
  const fetchSettingData = async () => {
    const res = await fetchSettingsQuery({ hostelId: Number(user.hostelId) });
    return res.getSettingsByHostelId;
  };

  const { data: settings } = useQuery({
    queryKey: ['getSettings'],
    queryFn: fetchSettingData,
  });

  useEffect(() => {
    if (settings) {
      setValue('currency', settings.data?.currency ?? '');
      setValue('fontSize', settings.data?.fontSize ?? 12);
      setValue('active', settings.data?.active ?? false);
      setValue('allowBooking', settings.data?.allowBooking ?? false);
      setValue('allowComments', settings.data?.allowComments ?? false);
      setValue('allowPrivateFeedbacks', settings.data?.allowPrivateFeedbacks ?? false);
      setValue('allowMessages', settings.data?.allowMessages ?? false);
      setValue('allowRating', settings.data?.allowRating ?? false);
    }
  }, [settings, setValue]);

  const mutateCreateSettings = useGraphqlClientRequest<
    CreateHostelSettingsMutation,
    CreateHostelSettingsMutationVariables
  >(CreateHostelSettings.loc?.source?.body!);

  const { mutateAsync: createSettings, isPending: isCreating } = useMutation({
    mutationFn: mutateCreateSettings,
  });

  const mutateUpdateSettings = useGraphqlClientRequest<
    UpdateHostelSettingsMutation,
    UpdateHostelSettingsMutationVariables
  >(UpdateHostelSettings.loc?.source?.body!);

  const { mutateAsync: updateSettings, isPending: isUpdating } = useMutation({
    mutationFn: mutateUpdateSettings,
  });

  const onSubmit = async (data: SettingData) => {
    if (settings?.data?.id) {
      const response = await updateSettings({
        Id: Number(settings.data?.id),
        data: { ...data, hostelSettingId: Number(settings.data?.id) },
      });

      if (response.updateSettings) {
        setShowToast(true);
        setRole('success');
        setMessage('Settings updated successfully');
      } else {
        setShowToast(true);
        setRole('error');
        setMessage('Failed to update settings');
      }
    } else {
      const response = await createSettings({ hostelId: Number(user.hostelId), data: data });

      if (response.createSettings) {
        setShowToast(true);
        setRole('success');
        setMessage('Settings created successfully');
      } else {
        setShowToast(true);
        setRole('error');
        setMessage('Failed to create settings');
      }
    }
  };

  return (
    <div className="grid w-full gap-[1rem]">
      <h2>Settings</h2>
      <div className="card card-body card-bordered bg-white">
        <h2>Basic Settings</h2>
        <hr className="divider" />
        <div className="flex w-full">
          <div className="flex flex-grow flex-col justify-center">
            <h5>Select Currency</h5>
          </div>
          <div className="min-w-[150px] md:min-w-[230px]">
            <ReactSelect
              name="currency"
              placeholder="Select Currency"
              options={currencyList}
              control={control}
              label="Select Your Currency"
              helperText={errors.currency?.type === 'required' ? 'Currency Is Required' : ''}
              error={!!errors.currency}
            />
          </div>
        </div>
        <div className="flex w-full">
          <div className="flex flex-grow flex-col justify-center">
            <h5>Base Font Size</h5>
          </div>
          <div className="min-w-[150px] md:min-w-[230px]">
            <ReactSelect
              name="fontSize"
              placeholder="Base Font Size"
              options={fontSizeOptions}
              control={control}
              label="Select Font Size"
              helperText={errors.fontSize?.type === 'required' ? 'Font Size Is Required' : ''}
              error={!!errors.fontSize}
            />
          </div>
        </div>
        <div className="flex w-full">
          <div className="flex flex-grow flex-col justify-center">
            <h5>Active Status</h5>
          </div>
          <div className="min-w-[150px] md:min-w-[230px]">
            <ReactSelect
              name="active"
              placeholder="Visibility Status"
              options={booleanOptions}
              control={control}
              label="Select Visibility"
            />
          </div>
        </div>
      </div>

      <div className="card card-body card-bordered bg-white">
        <h2>Functionality Settings</h2>
        <hr className="divider" />
        <div className="flex w-full">
          <div className="flex flex-grow flex-col justify-center">
            <h5>Allow Booking</h5>
          </div>
          <div className="min-w-[150px] md:min-w-[230px]">
            <ReactSelect
              name="allowBooking"
              placeholder="Allow Booking"
              options={booleanOptions}
              control={control}
              label="Allow Booking"
            />
          </div>
        </div>
        <div className="flex w-full">
          <div className="flex flex-grow flex-col justify-center">
            <h5>Allow Comments</h5>
          </div>
          <div className="min-w-[150px] md:min-w-[230px]">
            <ReactSelect
              name="allowComments"
              placeholder="Allow Comments"
              options={booleanOptions}
              control={control}
              label="Allow Comments"
            />
          </div>
        </div>
        <div className="flex w-full">
          <div className="flex flex-grow flex-col justify-center">
            <h5>Allow Private Feedbacks</h5>
          </div>
          <div className="min-w-[150px] md:min-w-[230px]">
            <ReactSelect
              name="allowPrivateFeedbacks"
              placeholder="Allow Private Feedbacks"
              options={booleanOptions}
              control={control}
              label="Allow Private Feedbacks"
            />
          </div>
        </div>
        <div className="flex w-full">
          <div className="flex flex-grow flex-col justify-center">
            <h5>Allow Messages</h5>
          </div>
          <div className="min-w-[150px] md:min-w-[230px]">
            <ReactSelect
              name="allowMessages"
              placeholder="Allow Messages"
              options={booleanOptions}
              control={control}
              label="Allow Messages"
            />
          </div>
        </div>
        <div className="flex w-full">
          <div className="flex flex-grow flex-col justify-center">
            <h5>Allow Ratings</h5>
          </div>
          <div className="min-w-[150px] md:min-w-[230px]">
            <ReactSelect
              name="allowRating"
              placeholder="Allow Ratings"
              options={booleanOptions}
              control={control}
              label="Allow Ratings"
            />
          </div>
        </div>
      </div>
      <Button
        label={settings?.data?.id ? 'Update Setting' : 'Create Setting'}
        loading={isCreating || isUpdating}
        onClick={handleSubmit(onSubmit)}
        className=" w-min"
      />
    </div>
  );
};

export default SettingsPage;
