import React from 'react';
import {
  Controller,
  Control,
  FieldValues,
  FieldPath,
  RegisterOptions,
  FieldErrors,
} from 'react-hook-form';
import { Input as FormInput } from 'src/components/Input';
import { InputHTMLAttributes } from 'react';
import { regex } from 'src/utils/regex';

// Define custom input types
type CustomInputType =
  | 'email'
  | 'tel'
  | 'password'
  | 'number'
  | 'text'
  | 'price'
  | 'date'
  | 'name'
  | 'currency';

interface IProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  rules?: RegisterOptions<T>;
  label?: string;
  helpertext?: string;
  size?: 'lg' | 'sm';
  error?: boolean;
  errors?: FieldErrors<T>;
  multiline?: boolean;
  rows?: number;
  customType?: CustomInputType;
  customErrorMessage?: string;
  min?: number | string;
  max?: number | string;
  currency?: string;
}

type TextFieldProps<T extends FieldValues> = Omit<IProps<T>, 'type'> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    type?: CustomInputType | InputHTMLAttributes<HTMLInputElement>['type'];
  };

const getValidationPattern = (
  type: CustomInputType | undefined,
  name: string,
  customErrorMessage?: string,
): { pattern: { value: RegExp; message: string } } | undefined => {
  if (!type) return undefined;

  const patterns: Record<CustomInputType, { regex: RegExp; message: string }> = {
    email: {
      regex: regex.email,
      message: customErrorMessage || 'Please enter a valid email address',
    },
    tel: {
      regex: regex.phone,
      message: customErrorMessage || 'Please enter a valid 10-digit phone number',
    },
    password: {
      regex: regex.password,
      message:
        customErrorMessage ||
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
    },
    number: {
      regex: regex.number,
      message: customErrorMessage || 'Please enter a valid number',
    },
    price: {
      regex: regex.price,
      message: customErrorMessage || 'Please enter a valid price',
    },
    date: {
      regex: regex.date,
      message: customErrorMessage || 'Please enter a valid date (YYYY-MM-DD)',
    },
    name: {
      regex: regex.name,
      message: customErrorMessage || 'Please enter a valid name (letters and spaces only)',
    },
    currency: {
      regex: regex.price,
      message: customErrorMessage || 'Please enter a valid amount',
    },
    text: {
      regex: /.*/,
      message: '',
    },
  };

  const pattern = patterns[type];
  return pattern ? { pattern: { value: pattern.regex, message: pattern.message } } : undefined;
};

const TextInput = <T extends FieldValues>(props: TextFieldProps<T>) => {
  const {
    control,
    label,
    name,
    rules = {},
    helpertext,
    error,
    errors,
    required,
    size,
    multiline,
    rows,
    type,
    customType,
    customErrorMessage,
    min,
    max,
    currency,
    ...otherProps
  } = props;

  const getValidationRules = (): RegisterOptions<T> => {
    const baseRules: RegisterOptions<T> = { ...rules };

    if (required) {
      baseRules.required = customErrorMessage || 'This field is required';
    }

    // Apply min/max validation for numbers and prices
    if (
      (type === 'number' ||
        type === 'price' ||
        customType === 'price' ||
        customType === 'currency') &&
      (min !== undefined || max !== undefined)
    ) {
      baseRules.min =
        min !== undefined
          ? {
              value: min,
              message: customErrorMessage || `Value must be at least ${min}`,
            }
          : undefined;
      baseRules.max =
        max !== undefined
          ? {
              value: max,
              message: customErrorMessage || `Value must be at most ${max}`,
            }
          : undefined;
    }

    // Apply regex validation based on type or customType
    const validationType = customType || type;
    const pattern = getValidationPattern(
      validationType as CustomInputType,
      name,
      customErrorMessage,
    );
    if (pattern) {
      baseRules.pattern = pattern.pattern;
    }

    return baseRules;
  };

  const getErrorMessage = (fieldError: any): string | undefined => {
    // First check for field-level errors from react-hook-form
    if (fieldError) {
      return fieldError.message;
    }

    // Then check for form-level errors
    if (errors && errors[name]) {
      const error = errors[name];
      if (error?.message) {
        return error.message as string;
      }
      if (error?.type === 'required') {
        return customErrorMessage || 'This field is required';
      }
      if (error?.type === 'pattern') {
        return customErrorMessage || 'Invalid format';
      }
      if (error?.type === 'min') {
        return customErrorMessage || `Value must be at least ${min}`;
      }
      if (error?.type === 'max') {
        return customErrorMessage || `Value must be at most ${max}`;
      }
    }

    // If no errors, return the helper text
    return helpertext;
  };

  const getInputType = (): string => {
    if (customType === 'currency' || customType === 'price') return 'number';
    if (customType === 'date') return 'date';
    return type || 'text';
  };

  const formatLabel = (): string => {
    if (!label) return '';
    if (currency) return `${label} (${currency})`;
    return label;
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={getValidationRules()}
      render={({ field, fieldState: { error: fieldError } }) => (
        <FormInput
          {...field}
          {...otherProps}
          placeholder={props.placeholder}
          required={required}
          label={formatLabel()}
          helpertext={getErrorMessage(fieldError)}
          error={Boolean(fieldError || error)}
          height={size}
          type={getInputType()}
          {...(multiline ? { rows: rows || 3 } : {})}
          inputMode={type === 'number' || type === 'price' ? 'numeric' : undefined}
        />
      )}
    />
  );
};

TextInput.displayName = 'TextInput';

export default TextInput;
