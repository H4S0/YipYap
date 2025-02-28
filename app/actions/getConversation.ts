import prisma from '../../lib/prismadb';
import { getCurrentUser } from './getCurrentUser';

const getConversation = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  const conversations = await prisma.conversation.findMany({
    orderBy: {
      lastMessageAt: 'desc',
    },
    where: {
      users: {
        some: {
          id: currentUser.id,
        },
      },
    },
    include: {
      users: true,
      messages: {
        include: {
          sender: true,
          seenByUsers: true,
        },
      },
    },
  });
  return conversations;
};

export default getConversation;
