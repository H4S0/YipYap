import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { FullConversationType } from '../types';
import { User } from '@prisma/client';

const useOtherUser = (
  conversation: FullConversationType | { users: User[] }
) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUser = session?.data?.user?.email;

    const otherUser = conversation?.users?.filter(
      (user: User) => user?.email !== currentUser
    );

    return otherUser?.length > 0 ? otherUser[0] : undefined;
  }, [conversation.users, session?.data?.user?.email]);

  return otherUser;
};

export default useOtherUser;
