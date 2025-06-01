import React from 'react';
import { Controller, Control, FieldValues, FieldPath } from 'react-hook-form';
import { Select as FormSelect } from 'src/components/Select';
import { SelectHTMLAttributes } from 'react';

interface IProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  options: { label: string; value: string }[];
  rules?: object;
  label?: string;
  helpertext?: string;
  error: boolean;
}

type SelectFieldProps<T extends FieldValues> = IProps<T> & SelectHTMLAttributes<HTMLSelectElement>;

const SelectInput = <T extends FieldValues>(props: SelectFieldProps<T>) => {
  const {
    control,
    name,
    options,
    label,

    rules,
    required,
    ...otherProps
  } = props;

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required, ...rules }}
      render={({ field }) => (
        <FormSelect
          {...field}
          {...otherProps}
          options={options}
          required={required}
          label={label ?? ''}
          // helpertext={helpertext}
          // error={Boolean(error)}
          // ref={ref} // Forward the ref here, if needed
        />
      )}
    />
  );
};

SelectInput.displayName = 'SelectInput'; // Set a display name for the component

export default SelectInput;
