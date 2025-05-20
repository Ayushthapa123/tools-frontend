'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGraphqlClientRequest } from 'src/client/useGraphqlClientRequest';
import IconButton from 'src/components/IconButton';
import { Modal } from 'src/components/Modal';
import TextArea from 'src/features/react-hook-form/TextArea';
import TextInput from 'src/features/react-hook-form/TextField';
import DatePicker from 'src/features/react-hook-form/DatePicker';
import Toggle from 'src/features/react-hook-form/Toggle';
import {
  CreatePriceRule,
  CreatePriceRuleMutation,
  CreatePriceRuleMutationVariables,
  UpdatePriceRule,
  UpdatePriceRuleMutation,
  UpdatePriceRuleMutationVariables,
  DynamicPricingRuleData,
} from 'src/gql/graphql';
import { useToastStore } from 'src/store/toastStore';
import { enqueueSnackbar } from 'notistack';

export const AddDynamicRule = ({
  roomId,
  rules
}: {
  roomId: number | string;
  rules: DynamicPricingRuleData | undefined;
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <div className='rounded-lg mx-4 mt-1 hover:bg-slate-300  bg-slate-100'>
      <IconButton onClick={() => setOpen(true)} className='text-black'>
        {rules?.id ? 'Edit Rule' : 'Add New Rule'}
      </IconButton>
      </div>
      {open && (
        <RuleForm
          open
          handleClose={handleClose}
          roomId={roomId}
          rules={rules}
        />
      )}
    </div>
  );
};

export const RuleForm = ({
  handleClose,
  open,
  roomId,
  rules,
}: {
  handleClose: () => void;
  open: boolean;
  roomId: number | string;
  rules: DynamicPricingRuleData | undefined;
}) => {
  const queryClient = useQueryClient();
  const isEdit = Boolean(rules?.id);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DynamicPricingRuleData>({
    defaultValues: {
      name: rules?.name ?? '',
      description: rules?.description ?? '',
      amount: rules?.amount ?? 0,
      startDate: rules?.startDate ?? new Date(),
      endDate: rules?.endDate ?? new Date(),
      isWeekend: rules?.isWeekend ?? false,
      isActive: rules?.isActive ?? true,
      priority: rules?.priority ?? 0,
      roomId: Number(roomId),
    },
  });

  const mutateCreateRule = useGraphqlClientRequest<
    CreatePriceRuleMutation,
    CreatePriceRuleMutationVariables
  >(CreatePriceRule.loc?.source.body!);

  const mutateUpdateRule = useGraphqlClientRequest<
    UpdatePriceRuleMutation,
    UpdatePriceRuleMutationVariables
  >(UpdatePriceRule.loc?.source.body!);

  const { mutateAsync: createRule } = useMutation({ mutationFn: mutateCreateRule });
  const { mutateAsync: updateRule } = useMutation({ mutationFn: mutateUpdateRule });

  const onSubmit = async (data: DynamicPricingRuleData) => {
    try {
      if (isEdit) {
        const result = await updateRule({
          updatePriceInput: {
            id: Number(rules?.id),
            name: data.name,
            description: data.description,
            amount: Number(data.amount),
            startDate: data.startDate,
            endDate: data.endDate,
            isWeekend: data.isWeekend,
            isActive: data.isActive,
            priority: Number(data.priority),
            roomId: Number(roomId),
          },
        });
        if (result?.updatePriceRule?.data?.id) {
          enqueueSnackbar("Rules updated",{variant:'success'})
          queryClient.invalidateQueries({ queryKey: ['getPriceRulesByRoom'] });
          handleClose();
        }
      } else {
        const result = await createRule({
          createPriceRuleInput: {
            name: data.name,
            description: data.description,
            amount: Number(data.amount),
            startDate: data.startDate,
            endDate: data.endDate,
            isWeekend: data.isWeekend,
            isActive: data.isActive,
            priority: Number(data.priority),
            roomId: Number(roomId),
          },
        });
        if (result?.createPriceRule?.data?.id) {
          enqueueSnackbar('Rules created',{variant:'success'})
          queryClient.invalidateQueries({ queryKey: ['getPriceRulesByRoom'] });
          handleClose();
        }else {
          enqueueSnackbar("Something went wrong.",{variant:'error'})
        }
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong.",{variant:'error'})
    }
  };

  return (
    <div>
      <Modal
        open={open}
        handleClose={handleClose}
        onSave={handleSubmit(onSubmit)}
        title={isEdit ? 'Update Rule' : 'Add New Rule'}
        actionLabel={isEdit ? 'Update' : 'Create'}>
        <div className="bg-base-100">
          <form className="bg-base-100 text-left space-y-4 p-4">
            <div className="mb-3">
              <TextInput
                name="name"
                placeholder="Rule Name"
                control={control}
                label="Rule Name"
                required
                error={!!errors.name}
                helpertext={errors.name?.message}
                customType='name'
                type="text"
              />
            </div>

            <div className="mb-3">
              <TextArea
                name="description"
                placeholder="Description"
                control={control}
                label="Description"
                rows={2}
                error={!!errors.description}
                helpertext={errors.description?.message}
              />
            </div>

            <div className="mb-3">
              <TextInput
                name="amount"
                placeholder="Amount"
                control={control}
                label="Amount"
                type="number"
                required
                error={!!errors.amount}
                helpertext={errors.amount?.message}
                customType='price'
                
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mb-3">
                <DatePicker
                  name="startDate"
                  control={control}
                  label="Start Date"
                />
              </div>

              <div className="mb-3">
                <DatePicker
                  name="endDate"
                  control={control}
                  label="End Date"
                />
              </div>
            </div>

            <div className="mb-3">
              <TextInput
                name="priority"
                placeholder="Priority"
                control={control}
                label="Priority"
                type="number"
                error={!!errors.priority}
                helpertext={errors.priority?.message}
                customType='number'
              />
            </div>

            <div className="flex gap-4">
              <div className="mb-3">
                <Toggle
                  name="isWeekend"
                  control={control}
                  label="Weekend Only"
                />
              </div>

              <div className="mb-3">
                <Toggle
                  name="isActive"
                  control={control}
                  label="Active"
                />
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
