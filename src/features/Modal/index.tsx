//@ts-nocheck
'use client';

import { ReactElement } from 'react';

interface Iprops {
  title?: string;
  children?: ReactElement;
  onSubmit?: () => void;
  buttonText: string;
}

export const Modal = () => {
  return (
    <div>
      <button className="btn" onClick={() => document?.getElementById('my_modal_5')?.showModal()}>
        open modal
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">Press ESC key or click the button below to close</p>

          <div className="modal-action">
            <form method="dialog" className=" flex gap-5">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={}>
                Close
              </button>
              <button className="btn btn-primary" onClick={}>
                Create New Project
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
