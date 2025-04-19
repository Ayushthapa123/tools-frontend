'use client';

import { useEffect } from 'react';
import { GrClose } from 'react-icons/gr';

import { IoAlertCircleOutline } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa';
import { MdErrorOutline } from 'react-icons/md';
import { useToastStore } from 'src/store/toastStore';

const GlobalToast = () => {
  const { message, setMessage, setShowToast, showToast, role, setRole } = useToastStore();

  const handleClose = () => {
    setShowToast(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
      setMessage('');
      setRole('alert')
    }, 3000);

    return () => clearTimeout(timer);
  }, [setMessage, setRole, setShowToast, showToast]);

  const toastIcons = {
    alert: <IoAlertCircleOutline />,
    success: <FaCheck />,
    error: <MdErrorOutline />,
  };

  return (
    <>
      {showToast && message && (
        <div
          className={`min-w-[300px]  ${role == 'alert' ? 'bg-accent' : role == 'error' ? 'bg-error' : 'bg-primary'} fixed right-10 top-10 z-[99999] rounded-xl text-sm text-white shadow-lg`}
          role="alert">
          <div className="flex gap-3 p-[0.7rem] ">
            <div className=" relative  text-lg">
              {role == 'alert'
                ? toastIcons.alert
                : role == 'error'
                  ? toastIcons.error
                  : toastIcons.success}
            </div>
            <div className=" flex-grow ">{message}</div>
            <div className="  flex h-full ">
              <button
                type="button"
                className=" mx-2 flex size-5 relative  flex-shrink-0 bg-transparent items-center justify-center rounded-lg text-white opacity-50 hover:text-white hover:opacity-100 focus:opacity-100 focus:outline-none"
                onClick={handleClose}>
                <GrClose className=' text-white h-4 w-4 absolute right-3' size='md'  />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalToast;
