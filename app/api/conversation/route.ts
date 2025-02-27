import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prismadb';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const body = await request.json();

  const { userId, isGroup, members, name } = body;

  if (!currentUser?.id || !currentUser?.email) {
    return new NextResponse('Unauthorized');
  }

  if (isGroup && (!members || members.length < 2 || !name)) {
    return new NextResponse('Invalid data');
  }

  if (isGroup) {
    const newConversation = await prisma.conversation.create({
      data: {
        name,
        isGroup,
        user: {
          connect: [
            ...members.map((member: { value: string }) => ({
              id: member.value,
            })),
            {
              id: currentUser.id,
            },
          ],
        },
      },
      include: {
        user: true,
      },
    });
    return NextResponse.json(newConversation);
  }

  const existingConversation = await prisma.conversation.findMany({
    where: {
      OR: [
        {
          userId: {
            equals: [currentUser.id, userId],
          },
        },
        {
          userId: {
            equals: [userId, currentUser.id],
          },
        },
      ],
    },
  });

  const singleConversation = existingConversation[0];

  if (singleConversation) {
    return NextResponse.json(singleConversation);
  }

  const newConversation = await prisma.conversation.create({
    data: {
      user: {
        connect: [
          {
            id: currentUser.id,
          },
          {
            id: userId,
          },
        ],
      },
    },
    include: {
      user: true,
    },
  });

  return NextResponse.json(newConversation);
}
