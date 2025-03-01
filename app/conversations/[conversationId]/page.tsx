import React from 'react';
import Header from './components/Header';
import Body from './components/Body';
import MessageForm from './components/MessageForm';
import { getConversationById } from '@/app/actions/getConversationById';
import EmptyState from '@/app/components/EmptyState';
import { getMessages } from '@/app/actions/getMessages';

interface Params {
  conversationId: string;
}

const ConversationPage = async ({
  params: { conversationId },
}: {
  params: Params;
}) => {
  const conversation = await getConversationById(conversationId);
  const message = await getMessages(conversationId);

  console.log(message);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full lg:pl-80">
      <div className="h-full flex flex-col justify-between">
        <Header conversation={conversation} />
        <Body initialMessage={message} />
        <MessageForm />
      </div>
    </div>
  );
};

export default ConversationPage;
