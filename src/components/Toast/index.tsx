import { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';

import { IoAlertCircleOutline } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa';
import { MdErrorOutline } from 'react-icons/md';

interface Iprops {
  message?: string;
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
          className={`min-w-[300px]  ${role=='alert'?"bg-accent":role=='error'?'bg-error':'bg-primary'} text-sm text-white rounded-xl shadow-lg fixed top-10 right-10`}
          role="alert">
          <div className="flex p-4 gap-3">
            <div className=' relative  text-lg'>
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
                className=" flex mx-2 flex-shrink-0 justify-center items-center size-5 rounded-lg text-white hover:text-white opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100"
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
