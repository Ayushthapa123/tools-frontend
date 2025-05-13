'use client';

import { ReactNode, useState } from 'react';
import Button from '../../../components/Button';
interface Iprops {
  open: boolean;
  title?: string;
  children: ReactNode;
  actionLabel?: string;
  onSave?: () => void;
  handleClose: () => void;
}

export const RoomDetailView = (props: Iprops) => {
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
        <div className="modal-box max-w-screen-lg">
          <div>{title && <h3>{title}</h3>}</div>
          <div className=" ">{children}</div>

          <div className="modal-action">
            <div>
              <Button label="Close" onClick={() => onClose()} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
