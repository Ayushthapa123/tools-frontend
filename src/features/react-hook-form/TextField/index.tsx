import React from 'react';
import { Controller, Control, FieldValues, FieldPath } from 'react-hook-form';
import { Input as FormInput } from 'src/components/Input';
import { InputHTMLAttributes } from 'react';

interface IProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: object;
  label?: string;
  helpertext?: string;
  size?: 'lg' | 'sm'
  error: boolean;
  multiline?: boolean;
  rows?: number;
}

type TextFieldProps<T extends FieldValues> = IProps<T> &
  InputHTMLAttributes<HTMLInputElement>;

const TextInput = <T extends FieldValues>(props: TextFieldProps<T>) => {
  const {
    control,
    label,
    name,
    rules,
    helpertext,
    error,
    required,
    size,
    multiline,
    rows,
    ...otherProps
  } = props;

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: required, ...rules }}
      render={({ field }) => (
        <FormInput
          {...field}
          {...otherProps}
          placeholder={props.placeholder}
          required={required}
          label={label}
          helpertext={helpertext}
          error={Boolean(error)}
          height={size} 
         
          // ref={ref} // Forward the ref here, ensuring it is the last one set for the input
        />
      )}
    />
  );
};

TextInput.displayName = 'TextInput'; // Set a display name for the component

export default TextInput;
