'use client';

import { ReactNode, useState } from 'react';

interface Iprops {
  open: boolean;
  title?: string;
  children: ReactNode;
  actionLabel?: string;
  onSave?: () => void;
  handleClose: () => void;
}

export const Modal = (props: Iprops) => {
  const { handleClose, open } = props;

  return <div>{open && <ModalContents {...props} onClose={handleClose} open={open} />}</div>;
};

interface IModalContent extends Omit<Iprops, 'label'> {
  open: boolean;
  onClose: () => void;
}
const ModalContents = (props: IModalContent) => {
  const { title, children, actionLabel, onClose, onSave, open } = props;

  const handleSave = async () => {
    onSave?.();

    //close only when onSave gives response
    // onClose();
  };
  return (
    <>
      <div className={`modal ${open ? 'modal-open' : ''}`} role="dialog">
        <div className="modal-box">
          <div>{title && <h3>{title}</h3>}</div>
          <div className=" ">{children}</div>

          <div className="modal-action">
            <div>
              <label className="btn" onClick={() => onClose()}>
                Close!
              </label>
            </div>
            <div>
              <label className="btn btn-primary" onClick={() => handleSave()}>
                {actionLabel ?? 'Save'}
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
