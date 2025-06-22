'use client';

import React, { ChangeEvent, FocusEvent, InputHTMLAttributes, useState, forwardRef } from 'react';

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  helpertext?: string;
  height?: 'lg' | 'sm';
  error?: boolean;
}

// Add forwardRef to accept refs
const Input = forwardRef<HTMLInputElement, InputComponentProps>(
  ({ label, className, height, type, error, helpertext, ...restProps }, ref) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordVisible(prev => !prev);
    };

    return (
      <div className={`flex flex-col space-y-1 ${className}`}>
        {label && (
          <label htmlFor={restProps.name} className="text-base font-semibold text-gray-600">
            {label}
            {restProps.required && <span className="text-error">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref} // Forward the ref to the input element
            className={`${height === 'lg' ? 'h-[4rem]' : 'h-14'} w-full rounded-xl border border-[#959eb4] px-3 py-2 focus:border-[#484beb] focus:outline-none placeholder:text-[16px]`}
            type={type === 'password' && isPasswordVisible ? 'text' : type}
            maxLength={255}
            {...restProps}
          />
          {type === 'password' && (
            <div
              className="absolute inset-y-0 text-2xl right-3 flex cursor-pointer items-center"
              onClick={togglePasswordVisibility}
            >
              {/* This is a placeholder for the eye icon. Replace with your preferred icon component. */}
              {isPasswordVisible ? '👁️' : '🙈'}
            </div>
          )}
        </div>
        {/* {error && <p className="text-red-500 text-sm ">{error}</p>} */}
        {helpertext && <p className="relative text-sm text-error/80 ">{helpertext}</p>}
      </div>
    );
  },
);

Input.displayName = 'InputField'; // Set a display name for the component

export { Input };
