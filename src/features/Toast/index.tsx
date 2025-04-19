import { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';

import { IoAlertCircleOutline } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa';
import { MdErrorOutline } from 'react-icons/md';

interface Iprops {
  message: string;
  role?: 'alert' | 'error' | 'success';
}
const Toast = (props: Iprops) => {
  const { message, role } = props;
  const [showToast, setShowToast] = useState(true);

  const handleClose = () => {
    setShowToast(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toastIcons = {
    alert: <IoAlertCircleOutline />,
    success: <FaCheck />,
    error: <MdErrorOutline />,
  };
  return (
    <>
      {showToast && (
        <div
          className={`min-w-[300px]  ${role == 'alert' ? 'bg-accent' : role == 'error' ? 'bg-error' : 'bg-primary'} fixed right-10 top-10 rounded-xl text-sm text-white shadow-lg`}
          role="alert">
          <div className="flex gap-3 p-4">
            <div className=" relative  text-lg">
              {role == 'alert'
                ? toastIcons.alert
                : role == 'error'
                  ? toastIcons.error
                  : toastIcons.success}
            </div>
            <div className=" flex-grow">{message}</div>
            <div className="  flex">
              <button
                type="button"
                className=" mx-2 flex size-5 flex-shrink-0 items-center justify-center rounded-lg text-white opacity-50 hover:text-white hover:opacity-100 focus:opacity-100 focus:outline-none"
                onClick={handleClose}>
                <GrClose />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
