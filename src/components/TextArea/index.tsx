'use client';

import React, {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  useState,
  forwardRef,
  TextareaHTMLAttributes,
} from 'react';

interface InputComponentProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helpertext?: string;
  error?: boolean;
}

// Add forwardRef to accept refs
const TextArea = forwardRef<HTMLTextAreaElement, InputComponentProps>(
  ({ label, className, rows, error, helpertext, ...restProps }, ref) => {
    return (
      <div className={`flex flex-col space-y-1 ${className}`}>
        {label && (
          <label htmlFor={restProps.name} className="text-base font-semibold text-gray-600">
            {label}
            {restProps.required && <span className="text-error">*</span>}
          </label>
        )}
        <div className="relative">
          <textarea
            rows={rows}
            ref={ref} // Forward the ref to the input element
            className=" w-full rounded-xl border border-[#959eb4] px-3 py-2 focus:border-[#484beb] focus:outline-none min-h-14 placeholder:text-[16px]"
            {...restProps}
          />
        </div>
        {error && <p className="text-error mt-1 text-sm">{error}</p>}
        {helpertext && <p className="text-sm text-gray-500">{helpertext}</p>}
      </div>
    );
  },
);

TextArea.displayName = 'InputField'; // Set a display name for the component

export { TextArea };
