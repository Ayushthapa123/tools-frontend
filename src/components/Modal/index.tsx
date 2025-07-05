'use client';

import React, { ReactNode, useState } from 'react';

interface Iprops {
  open: boolean;
  title?: string;
  children: ReactNode;
  actionLabel?: string;
  onSave?: () => void;
  handleClose: () => void;
  className?: string;
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
  const { title, children, actionLabel, onClose, onSave, open, className } = props;

  const handleSave = async () => {
    onSave?.();

    //close only when onSave gives response
    // onClose();
  };

  const handleOverlayClick = () => {
    onClose();
  }

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  }
  return (
    <>
      <div className={`modal ${open ? 'modal-open' : ''} `} role="dialog">
        <div className="modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center" onClick={handleOverlayClick}>
          <div className={`modal-box ${className}`} onClick={stopPropagation}>
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
      </div>
    </>
  );
};
