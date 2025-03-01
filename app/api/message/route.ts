import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prismadb';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const body = await request.json();
  const { message, image, conversationId } = body;

  if (!currentUser?.id || !currentUser?.email) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const newMessage = await prisma.message.create({
    data: {
      body: message,
      image,
      conversation: {
        connect: {
          id: conversationId,
        },
      },
      sender: {
        connect: {
          id: currentUser.id,
        },
      },
      seenByUsers: {
        connect: {
          id: currentUser.id,
        },
      },
    },
    include: {
      seenByUsers: true,
      sender: true,
    },
  });

  return NextResponse.json(newMessage);
}
