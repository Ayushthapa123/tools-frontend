import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useGraphqlClientRequest } from "src/client/useGraphqlClientRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TextInput from "src/features/react-hook-form/TextField";
import { Price, CreatePriceInput, CreatePriceMutation, CreatePriceMutationVariables, UpdatePriceMutation, UpdatePriceMutationVariables, CreatePrice, UpdatePrice, Currency } from "src/gql/graphql";
import Button from "src/components/Button";
import ReactSelect from "src/features/react-hook-form/ReactSelect";

export const SetPriceForm = ({ price, roomId , onNext, handleBack}: { price: Price | undefined, roomId: number , onNext: () => void , handleBack: () => void,}) => {
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState("");
    const [role, setRole] = useState<"success" | "error">("success");
    const router = useRouter();
    const queryClient = useQueryClient();

    const isEdit = price?.id !== undefined;

    const {
      handleSubmit,
      control,
      formState: { errors },
    } = useForm<CreatePriceInput>({
      defaultValues: {
        amount: price?.amount,
        currency: price?.currency??Currency.Npr ,
        dynamicPrice: price?.dynamicPrice ?? false,
        discountAmount: price?.discountAmount,
        discountType: price?.discountType,
        isDiscountActive: price?.isDiscountActive ?? false,
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
          const result = await mutateAsync({ createPriceInput: { roomId: roomId ,amount: Number(data.amount), currency: data.currency, discountAmount: Number(data.discountAmount)    , discountType: data.discountType, isDiscountActive: data.isDiscountActive } });  
          if (result?.createPrice?.id) {
            setShowToast(true);
            setMessage('Price Created!');
            setRole('success');
            queryClient.invalidateQueries({ queryKey: ['getRoom'] });
            onNext();
          } else {
            setShowToast(true);
            setMessage('Something went wrong!');
            setRole('error');
          }
        } else {
          mutateUpdatePriceAsync({ 
            updatePriceInput: { 
              id: Number(price?.id),
              amount: Number(data.amount),
              currency: data.currency,
              discountAmount: Number(data.discountAmount),
              discountType: data.discountType,
              isDiscountActive: data.isDiscountActive
            } 
          }).then(res => {
            if (res?.updatePrice?.id) {

              setShowToast(true);
              setMessage('Price Updated!');
              setRole('success');
              queryClient.invalidateQueries({ queryKey: ['getRoom'] });
              onNext();
            }
          });
       
        }
      } catch (error) {
        setShowToast(true);
        setMessage('An error occurred!');
        setRole('error');
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
          <div className="space-y-4 min-h-[400px]">

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
                name="amount"
                placeholder="Price Amount"
                control={control}
                label="Base Price "
                required
                type="number"
                helpertext={errors.amount?.type === 'required' ? 'Amount is Required' : ''}
                error={!!errors.amount}
              />
            </div>
         
            {/* <div className="mb-3">
              <TextInput
                name="discountAmount"
                placeholder="Discount Amount"
                control={control}
                label="Discount Amount"
                type="number"
                helpertext={errors.discountAmount?.message}
                error={!!errors.discountAmount}
              />
            </div>
            <div className="mb-3">
              <ReactSelect
                name="discountType"
                options={discountTypeOptions}
                control={control}
                label="Discount Type"
                // required
              />
            </div> */}
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