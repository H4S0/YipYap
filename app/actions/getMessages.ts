import prisma from '../../lib/prismadb';

export async function getMessages(conversationId: string) {
  const messages = await prisma.message.findMany({
    where: {
      id: conversationId,
    },
    include: {
      seenByUsers: true,
      sender: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return messages;
}
