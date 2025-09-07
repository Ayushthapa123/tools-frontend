'use client';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import LoginComponent from 'src/app/login/Login';

export default function LoginMOdal({ label }: { label: string }) {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className=" text-primary font-bold "
      >
     {label}
      </button>

      {/* Portal for global modal */}
      {isOpen &&
        createPortal(
          <dialog className="modal modal-open ">
            <div className="modal-box   max-w-5xl p-0">
              <div className="relative w-full" style={{ paddingBottom: '' }}>
              <LoginComponent/>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </button>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button onClick={() => setIsOpen(false)}>close</button>
            </form>
          </dialog>,
          document.body
        )}
    </>
  );
}
