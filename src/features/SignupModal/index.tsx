'use client';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import SignupComponent from 'src/app/signup/SignUp';

export default function SignupModal({
  label,
  children,
}: {
  label?: string;
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger button */}
      {label && (
        <button onClick={() => setIsOpen(true)} className=" font-bold text-primary ">
          {label}
        </button>
      )}
      {children && <div onClick={() => setIsOpen(true)}>{children}</div>}

      {/* Portal for global modal */}
      {isOpen &&
        createPortal(
          <dialog className="modal modal-open ">
            <div className="modal-box   max-w-7xl p-0">
              <div className="relative w-full" style={{ paddingBottom: '' }}>
                <SignupComponent />
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-circle btn-sm absolute right-2 top-2">
                ✕
              </button>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button onClick={() => setIsOpen(false)}>close</button>
            </form>
          </dialog>,
          document.body,
        )}
    </>
  );
}
