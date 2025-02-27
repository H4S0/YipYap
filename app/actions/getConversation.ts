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
      userId: {
        has: currentUser.id,
      },
    },
    include: {
      user: true,
      message: {
        include: {
          sender: true,
          seen: true,
        },
      },
    },
  });
  return conversations;
};

export default getConversation;
