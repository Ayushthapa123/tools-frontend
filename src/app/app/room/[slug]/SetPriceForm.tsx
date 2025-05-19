import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useGraphqlClientRequest } from "src/client/useGraphqlClientRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TextInput from "src/features/react-hook-form/TextField";
import { Price, CreatePriceInput, CreatePriceMutation, CreatePriceMutationVariables, UpdatePriceMutation, UpdatePriceMutationVariables, CreatePrice, UpdatePrice, Currency, DiscountType } from "src/gql/graphql";
import Button from "src/components/Button";
import ReactSelect from "src/features/react-hook-form/ReactSelect";
import DynamicPriceContainer from "./dynamic-price-rules/DynamicPriceContainer";
import { Toggle } from "src/features/react-hook-form/Toggle";
import { useToastStore } from "src/store/toastStore";
import { enqueueSnackbar } from "notistack";

export const SetPriceForm = ({ price, roomId , onNext, handleBack}: { price: Price | undefined, roomId: number , onNext: () => void , handleBack: () => void,}) => {
   
    const router = useRouter();
    const queryClient = useQueryClient();

    const isEdit = price?.id !== undefined;

    const {
      handleSubmit,
      control,
      formState: { errors },
      watch
    } = useForm<CreatePriceInput>({
      defaultValues: {
        baseAmount: price?.baseAmount,
        currency: price?.currency ?? Currency.Npr,
        isDynamicPricing: price?.isDynamicPricing ?? false,
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
              baseAmount: Number(data.baseAmount), 
              currency: data.currency, 
              isDynamicPricing: data.isDynamicPricing,
              // dynamicAmount: data.dynamicAmount ? Number(data.dynamicAmount) : undefined,
              // dynamicPriceStart: data.dynamicPriceStart,
              // dynamicPriceEnd: data.dynamicPriceEnd,
              // isWeekend: data.isWeekend,
              discountAmount: data.discountAmount ? Number(data.discountAmount) : undefined,
              discountType: data.discountType,
              isDiscountActive: data.isDiscountActive
            } 
          });  
          if (result?.createPrice?.id) {
            enqueueSnackbar("Price created.",{variant:"success"})
            queryClient.invalidateQueries({ queryKey: ['getRoom'] });
            // onNext();
          } else {
            enqueueSnackbar("Something went wrong.",{variant:'error'})
          }
        } else {
          mutateUpdatePriceAsync({ 
            updatePriceInput: { 
              id: Number(price?.id),
              baseAmount: Number(data.baseAmount),
              currency: data.currency,
              isDynamicPricing: data.isDynamicPricing,
              // dynamicAmount: data.dynamicAmount ? Number(data.dynamicAmount) : undefined,
              // dynamicPriceStart: data.dynamicPriceStart,
              // dynamicPriceEnd: data.dynamicPriceEnd,
              // isWeekend: data.isWeekend,
              discountAmount: data.discountAmount ? Number(data.discountAmount) : undefined,
              discountType: data.discountType,
              isDiscountActive: data.isDiscountActive
            } 
          }).then(res => {
            if (res?.updatePrice?.id) {
             enqueueSnackbar("Price updated.",{variant:'success'})
              queryClient.invalidateQueries({ queryKey: ['getRoom'] });
              // onNext();
            }
          });
        }
      } catch (error) {
        enqueueSnackbar("Something went wrong.",{variant:'error'})
      }
    };
    const currencyOptions = [
      { label: "NPR", value: "NPR" },

      { label: "USD", value: "USD" },
  
    ];

    const discountTypeOptions = [
      { label: "Percentage", value: "PERCENTAGE" },
      { label: "Fixed", value: "FIXED" },
    ];

    return (
      <div className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 min-h-fit">
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
                name="baseAmount"
                placeholder="Price Amount"
                control={control}
                label="Base Price"
                required
                type="number"
                helpertext={errors.baseAmount?.type === 'required' ? 'Amount is Required' : ''}
                error={!!errors.baseAmount} 
                  customType='price'
                  min={0}
              />
            </div>
            </div>

            <div className="">
              <Toggle
                name="isDynamicPricing"
                control={control}
                label="Enable Dynamic Pricing"
              />
            </div>

         { watch("isDynamicPricing")&&<div className="flex flex-col card ">
       
            <div className="mb-4"> 
              <DynamicPriceContainer roomId={roomId} />
            </div>

            </div>}
  
          </div>
          <div className="flex justify-between ">
            <div className="flex">
            <Button
              type="button"
              className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              label="Back"
              onClick={handleBack}
            />
            </div>
            <div className="justify-end flex-1 w-full flex-grow"></div>
            <div className="flex gap-2">
              <Button label="Next" onClick={onNext} className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 " />
            <Button
              type="submit"
              className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              label={isEdit ? 'Update Price' : 'Create Price'}
            />
            </div>
          </div>
        </form>
      </div>
    );
  };

export default SetPriceForm;