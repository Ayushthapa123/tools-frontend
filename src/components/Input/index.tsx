'use client';

import React, { ChangeEvent, FocusEvent, InputHTMLAttributes, useState, forwardRef } from 'react';

interface InputComponentProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  helpertext?: string;
  height?:'lg' | 'sm'
  error?: boolean;
}

// Add forwardRef to accept refs
const Input = forwardRef<HTMLInputElement, InputComponentProps>(
  ({ label, className,height, type, error, helpertext, ...restProps }, ref) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordVisible(prev => !prev);
    };

    return (
      <div className={`flex flex-col space-y-1 ${className}`}>
        {label && (
          <label htmlFor={restProps.name} className="text-sm font-semibold text-gray-600">
            {label}
            {restProps.required && <span className="text-error">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref} // Forward the ref to the input element
            className={`${height==='lg'?'h-[3rem]':'h-[2.7rem]'} w-full rounded-md border border-[#B6C2E2] px-3 py-2 focus:border-indigo-500 focus:outline-none`}
            type={type === 'password' && isPasswordVisible ? 'text' : type}
            {...restProps}
          />
          {type === 'password' && (
            <div
              className="absolute inset-y-0 right-3 flex cursor-pointer items-center"
              onClick={togglePasswordVisibility}>
              {/* This is a placeholder for the eye icon. Replace with your preferred icon component. */}
              {isPasswordVisible ? '👁️' : '🙈'}
            </div>
          )}
        </div>
        {/* {error && <p className="text-red-500 text-sm ">{error}</p>} */}
        {helpertext && <p className="relative text-sm text-gray-500 ">{helpertext}</p>}
      </div>
    );
  },
);

Input.displayName = 'InputField'; // Set a display name for the component

export { Input };
