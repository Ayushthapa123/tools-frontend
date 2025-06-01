import React from 'react';
import { Controller, Control, FieldValues, FieldPath } from 'react-hook-form';
import { TextArea as FormInput } from 'src/components/TextArea';
import { InputHTMLAttributes } from 'react';

interface IProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: object;
  label?: string;
  helpertext?: string;
  error: boolean;
  rows: number;
}

type TextFieldProps<T extends FieldValues> = IProps<T> & InputHTMLAttributes<HTMLTextAreaElement>;

const TextArea = <T extends FieldValues>(props: TextFieldProps<T>) => {
  const { control, label, name, rules, helpertext, error, required, rows, ...otherProps } = props;

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
          rows={rows}
          label={label}
          helpertext={helpertext}
          error={Boolean(error)}

          // ref={ref} // Forward the ref here, ensuring it is the last one set for the input
        />
      )}
    />
  );
};

TextArea.displayName = 'TextInput'; // Set a display name for the component

export default TextArea;
