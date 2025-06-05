import { useQuery } from '@tanstack/react-query';
import { GetUserById, GetUserByIdQuery, GetUserByIdQueryVariables } from 'src/gql/graphql';
import Link from 'next/link';
import { useGraphqlClientRequest } from 'src/hooks/useGraphqlClientRequest';

import { useUserStore } from 'src/store/userStore';
import Image from 'next/image';

export const UserProfile = () => {
  const { user } = useUserStore();
  // Fetch user profile by userId
  const queryUser = useGraphqlClientRequest<GetUserByIdQuery, GetUserByIdQueryVariables>(
    GetUserById.loc?.source.body!,
  );
  const fetchUser = async () => {
    const res = await queryUser({ id: Number(user.userId) });
    return res.getUserById;
  };
  const { data: userData } = useQuery({
    queryKey: ['getUser'],
    queryFn: fetchUser,
    enabled: !!user.userId && user.userId !== null,
  });

  return (
    <>
      <Link href={'/app/my-profile'}>
        <div
          className="  tooltip tooltip-bottom box-border flex h-auto w-full cursor-pointer   hover:tooltip-open"
          data-tip={user.userEmail}
        >
          <div className=" relative max-h-11 min-h-11 min-w-11 max-w-11 ">
            <div className="avatar placeholder h-full w-full">
              <div className="h-full w-full rounded-full bg-primary text-neutral-content">
                {userData?.data?.profilePicture ? (
                  <Image
                    src={userData?.data?.profilePicture}
                    alt="user avatar"
                    fill
                    className="rounded-full"
                  />
                ) : (
                  <span className="text-3xl text-white">{user.userName.charAt(0)}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
