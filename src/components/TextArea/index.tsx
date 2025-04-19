'use client';

import React, { ChangeEvent, FocusEvent, InputHTMLAttributes, useState, forwardRef, TextareaHTMLAttributes } from 'react';

interface InputComponentProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helpertext?: string;
  error?: boolean;
  
}

// Add forwardRef to accept refs
const TextArea = forwardRef<HTMLTextAreaElement, InputComponentProps>(
  ({ label, className,rows,  error, helpertext, ...restProps }, ref) => {


    return (
      <div className={`flex flex-col space-y-2 ${className}`}>
        {label && (
          <label htmlFor={restProps.name} className="text-sm font-semibold text-gray-600">
            {label}
            {restProps.required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="relative">
          <textarea
          rows={rows}
            ref={ref} // Forward the ref to the input element
            className=" w-full rounded-md border border-[#B6C2E2] px-3 py-2 focus:border-indigo-500 focus:outline-none"
            {...restProps}
          />
      
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        {helpertext && <p className="text-sm text-gray-500">{helpertext}</p>}
      </div>
    );
  },
);

TextArea.displayName = 'InputField'; // Set a display name for the component

export { TextArea };
