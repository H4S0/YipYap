import prisma from '../../lib/prismadb';

const getMessages = async (conversationId: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId,
      },
      include: {
        sender: true,
        seenByUsers: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return messages;
  } catch (err) {
    return [];
  }
};

export default getMessages;
