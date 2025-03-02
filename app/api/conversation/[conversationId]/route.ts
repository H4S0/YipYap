import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prismadb';
import { getCurrentUser } from '@/app/actions/getCurrentUser';

interface IParams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse('Invalid ID', { status: 404 });
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
      },
    });

    return NextResponse.json(deletedConversation);
  } catch (err) {
    console.log(err, 'ERROR_CONVERSATION_DELETE');
    return new NextResponse('Internal Error', { status: 500 });
  }
}
