import Link from 'next/link';

import { useUserStore } from 'src/store/userStore';

export const UserProfile = () => {
  const { user } = useUserStore();

  return (
    <>
      <Link href={'/app/my-profile'}>
        <div
          className="  tooltip tooltip-bottom box-border flex h-auto w-full cursor-pointer   hover:tooltip-open"
          data-tip={user.userEmail}>
          <div className=" relative max-h-11 min-h-11 min-w-11 max-w-11 ">
          <div className="avatar placeholder h-full w-full">
            <div className="h-full w-full rounded-full bg-neutral text-neutral-content">
              <span className="text-3xl">{user.userName.charAt(0)}</span>
            </div>
            </div>
          </div>
      
        </div>
        </Link>
    </>
  );
};
