import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaCamera, FaEdit } from 'react-icons/fa';
import LogoutIcon from 'src/components/icons/LogOut';
import { useUserStore } from 'src/store/userStore';

export const OwnProfile = (props: { userType: string }) => {
  const { user } = useUserStore();
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('refreshToken');
    router.push('/login');
  };
  return (
    <div>
      <div className=" w-full mt-[100px] min-h-[calc(100vh-400px)]">
        <div className=" mb-4 flex gap-5 flex-col lg:flex-row">
          <div className='flex items-center justify-center'>
          <div className="avatar placeholder relative h-[80px] w-[80px] lg:h-[130px] lg:w-[130px]">
            <div className="w-full h-full rounded-full bg-neutral text-neutral-content">
              <span className="text-[50px]">{user.userName.charAt(0)}</span>
            </div>
            {/* <Image className=" rounded-full border-3" src={'/profile.png'} alt="user avatar" fill /> */}
            <button
              className="absolute bottom-1 right-0 rounded-full p-1 text-[21px] text-secondary lg:bottom-[5px] lg:right-[14px]"
              onClick={() => {
                /* handle avatar edit */
              }}>
              <FaCamera />
            </button>
          </div>
          </div>
          <div className="flex-grow ">
            <div className="relative top-[10px] lg:top-[30px]">
              <h2 className=" font-bold text-[25px] ">{user.userName}<span className='text-xs md:text-base text-secondary'> ({user.userType})</span></h2>{' '}
              <h2 className="  font-medium text-[20px] text-secondary">{user.userEmail}</h2>
            </div>
          </div>
          <div className=" relative">
            <div className=" relative top-[30px] flex gap-5 text-[21px] text-primary lg:top-[50px] lg:text-[30px]">
              <div className=" cursor-pointer">
                <FaEdit />
              </div>
              {/* <div className=" cursor-pointer">
                <FaShareAltSquare />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div>
        {props.userType === 'GUEST' && (
          <div className=" cursor-pointer w-min" onClick={handleLogout}>
            <span className=" relative text-[25px] text-primary ">
              <LogoutIcon />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
