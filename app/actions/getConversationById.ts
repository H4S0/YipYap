import { getCurrentUser } from './getCurrentUser';
import prisma from '../../lib/prismadb';

export async function getConversationById(conversationId: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser?.email) return null;

  const conversation = await prisma.conversation.findUnique({
    where: {
      id: conversationId,
    },
    include: {
      users: true,
    },
  });
  return conversation;
}
