import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TextInput from 'src/features/react-hook-form/TextField';
import {
  Price,
  CreatePriceInput,
  CreatePriceMutation,
  CreatePriceMutationVariables,
  UpdatePriceMutation,
  UpdatePriceMutationVariables,
  CreatePrice,
  UpdatePrice,
  Currency,
  DiscountType,
  PriceData,
} from 'src/gql/graphql';
import Button from 'src/components/Button';
import ReactSelect from 'src/features/react-hook-form/ReactSelect';
import DynamicPriceContainer from './dynamic-price-rules/DynamicPriceContainer';
import { Toggle } from 'src/features/react-hook-form/Toggle';
import { useToastStore } from 'src/store/toastStore';
import { enqueueSnackbar } from 'notistack';

export const SetPriceForm = ({
  price,
  roomId,
  onNext,
  handleBack,
}: {
  price: PriceData | undefined;
  roomId: number;
  onNext: () => void;
  handleBack: () => void;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const isEdit = price?.id !== undefined;

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<CreatePriceInput>({
    defaultValues: {
      baseAmountPerMonth: price?.baseAmountPerMonth,
      baseAmountPerDay: price?.baseAmountPerDay,
      currency: price?.currency ?? Currency.Npr,
      // isDynamicPricing: price?.isDynamicPricing ?? false,
      // dynamicAmount: price?.dynamicAmount,
      // dynamicPriceStart: price?.dynamicPriceStart,
      // dynamicPriceEnd: price?.dynamicPriceEnd,
      // isWeekend: price?.isWeekend ?? false,

      roomId: roomId,
    },
  });

  const mutateCreatePrice = useGraphqlClientRequest<
    CreatePriceMutation,
    CreatePriceMutationVariables
  >(CreatePrice.loc?.source.body!);

  const { mutateAsync } = useMutation({ mutationFn: mutateCreatePrice });

  const mutateUpdatePrice = useGraphqlClientRequest<
    UpdatePriceMutation,
    UpdatePriceMutationVariables
  >(UpdatePrice.loc?.source.body!);

  const { mutateAsync: mutateUpdatePriceAsync } = useMutation({ mutationFn: mutateUpdatePrice });

  const onSubmit = async (data: CreatePriceInput) => {
    try {
      if (!isEdit) {
        const result = await mutateAsync({
          createPriceInput: {
            roomId: roomId,
            baseAmountPerDay: Number(data.baseAmountPerDay),
            baseAmountPerMonth: Number(data.baseAmountPerMonth),
            currency: data.currency,
            isDynamicPricing: data.isDynamicPricing,
            // dynamicAmount: data.dynamicAmount ? Number(data.dynamicAmount) : undefined,
            // dynamicPriceStart: data.dynamicPriceStart,
            // dynamicPriceEnd: data.dynamicPriceEnd,
            // isWeekend: data.isWeekend,
            discountAmount: data.discountAmount ? Number(data.discountAmount) : undefined,
            discountType: data.discountType,
            isDiscountActive: data.isDiscountActive,
          },
        });
        if (result?.createPrice?.data?.id) {
          enqueueSnackbar('Price created.', { variant: 'success' });
          queryClient.invalidateQueries({ queryKey: ['getRoom'] });
          // onNext();
        } else {
          enqueueSnackbar('Something went wrong.', { variant: 'error' });
        }
      } else {
        mutateUpdatePriceAsync({
          updatePriceInput: {
            id: Number(price?.id),
            baseAmountPerMonth: Number(data.baseAmountPerMonth),
            currency: data.currency,
            isDynamicPricing: data.isDynamicPricing,
            // dynamicAmount: data.dynamicAmount ? Number(data.dynamicAmount) : undefined,
            // dynamicPriceStart: data.dynamicPriceStart,
            // dynamicPriceEnd: data.dynamicPriceEnd,
            // isWeekend: data.isWeekend,
            discountAmount: data.discountAmount ? Number(data.discountAmount) : undefined,
            discountType: data.discountType,
            isDiscountActive: data.isDiscountActive,
          },
        }).then(res => {
          if (res?.updatePrice?.data?.id) {
            enqueueSnackbar('Price updated.', { variant: 'success' });
            queryClient.invalidateQueries({ queryKey: ['getRoom'] });
            // onNext();
          }
        });
      }
    } catch (error) {
      enqueueSnackbar('Something went wrong.', { variant: 'error' });
    }
  };
  const currencyOptions = [
    { label: 'NPR', value: 'NPR' },

    { label: 'USD', value: 'USD' },
  ];

  const discountTypeOptions = [
    { label: 'Percentage', value: 'PERCENTAGE' },
    { label: 'Fixed', value: 'FIXED' },
  ];

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="min-h-fit space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-3">
              <ReactSelect
                name="currency"
                options={currencyOptions}
                control={control}
                label="Currency"
                defaultValue={currencyOptions[0]}
                required
                isdisabled={true}
                error={!!errors.currency}
                helperText={errors.currency?.type === 'required' ? 'Currency is Required' : ''}
              />
            </div>
            <div className="mb-3">
              <TextInput
                name="baseAmountPerMonth"
                placeholder="Price Amount"
                control={control}
                label="Amount Per Month"
                required
                type="number"
                helpertext={
                  errors.baseAmountPerMonth?.type === 'required' ? 'Amount is Required' : ''
                }
                error={!!errors.baseAmountPerMonth}
                customType="price"
                min={0}
              />
            </div>
            <div className="mb-3">
              <TextInput
                name="baseAmountPerDay"
                placeholder="Price Amount"
                control={control}
                label="Amount Per Day"
                required
                type="number"
                helpertext={
                  errors.baseAmountPerDay?.type === 'required' ? 'Amount is Required' : ''
                }
                error={!!errors.baseAmountPerDay}
                customType="price"
                min={0}
              />
            </div>
          </div>

          <div className="">
            {/* <Toggle
                name="isDynamicPricing"
                control={control}
                label="Enable Dynamic Pricing"
              /> */}
          </div>

          {watch('isDynamicPricing') && (
            <div className="card flex flex-col ">
              <div className="mb-4">
                <DynamicPriceContainer roomId={roomId} />
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between ">
          <div className="flex">
            <Button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 mt-4 w-full rounded-md px-4 py-2 text-white"
              label="Back"
              onClick={handleBack}
            />
          </div>
          <div className="w-full flex-1 flex-grow justify-end"></div>
          <div className="flex gap-2">
            <Button
              label="Next"
              onClick={onNext}
              className="bg-blue-600 hover:bg-blue-700 mt-4 w-full rounded-md px-4 py-2 text-white "
            />
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 mt-4 w-full rounded-md px-4 py-2 text-white"
              label={isEdit ? 'Update Price' : 'Create Price'}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SetPriceForm;
