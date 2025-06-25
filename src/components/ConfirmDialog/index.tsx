'use client';

import React, { ReactNode, useState } from 'react';
import Button from '../Button';
import { IoWarningOutline } from 'react-icons/io5';
import { MdOutlineCancel, MdOutlineQuestionMark } from 'react-icons/md';
import { FaInfo } from 'react-icons/fa';

interface Iprops {
  open: boolean;
  title?: string;
  children: ReactNode;
  actionLabel?: string;
  onSave?: () => void;
  handleClose: () => void;
  type?: "delete"|"default"|"info"|"warning";
}

export const ConfirmDialog = (props: Iprops) => {
  const { handleClose, open } = props;

  return <div>{open && <ModalContents {...props} onClose={handleClose} open={open} />}</div>;
};

interface IModalContent extends Omit<Iprops, 'label'> {
  open: boolean;
  onClose: () => void;
}

interface DialogAction {
  type: string;
  icon: JSX.Element;
  classes: string;
  buttonVariant: 'primary' | 'secondary' | 'danger' | 'outlined' | 'teal';
  buttonClasses: string;

}[]

const ModalContents = (props: IModalContent) => {
  const { title, children, actionLabel, onClose, onSave, open, type="normal" } = props;

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
  

  const typeIcons:DialogAction[] = [
    {
      type: "delete",
      icon: <IoWarningOutline className="text-red text-2xl" />,
      classes: "bg-error/20 p-4 rounded-md",
      buttonVariant: "danger",
      buttonClasses:"",
    },
    {
      type: "default",
      icon: <MdOutlineQuestionMark className="text-primary text-2xl" />,
      classes: "bg-primary/20 p-4 rounded-md",
      buttonVariant: "primary",
      buttonClasses:"",
    },
    {
      type: "info",
      icon: <FaInfo className="text-blue  text-2xl" />,
      classes: "bg-blue/20 p-4 rounded-md",
      buttonVariant: "primary",
      buttonClasses:"bg-blue/90 hover:bg-blue",
    },
    {
      type: "warning",
      icon: <IoWarningOutline className="text-yellow-600 text-2xl" />,
      classes: "bg-yellow-200 p-4 rounded-md",
      buttonVariant: "primary",
      buttonClasses:"bg-yellow-600 hover:bg-yellow-700",
    },
  ]
  const selectedIcon = typeIcons.find((item) => item.type == type);

  return (
    <>
      <div className={`modal  ${open ? 'modal-open' : ''} bg-white `} role="dialog">
        <div className="modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center" onClick={handleOverlayClick}>
          <div className="modal-box" onClick={stopPropagation}>
            <div className='w-full flex items-center justify-center mb-3'>
              {selectedIcon && (
                <span className={selectedIcon.classes}>{ selectedIcon.icon}</span>
                )}
            </div>
            <div className='text-center'>{title && <h3 className='font-bold text-3xl'>{title}</h3>}</div>
            <div className="text-gray-500 text-center">{children}</div>

            <div className="mt-[2.5rem] w-full flex items-center justify-end gap-2">
              <div className='w-full border border-primary rounded-xl'>
                <Button variant='outlined' label="Cancel" onClick={() => onClose()}/>
              </div>  
              <div className='w-full'>
                <Button variant={selectedIcon?.buttonVariant ?? "primary"} label={actionLabel ?? 'Continue'} onClick={() => handleSave()} className={ selectedIcon?.buttonClasses } />
              </div>
            </div>
            <div className='fixed right-4 top-3  p-1 group cursor-pointer' onClick={()=>onClose()}>
               <MdOutlineCancel className='text-3xl text-gray-500 group-hover:font-bold group-hover:text-gray-700' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
