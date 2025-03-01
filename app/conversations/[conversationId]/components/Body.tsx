'use client';

import useConversation from '@/app/hooks/useConversation';
import { FullMessageType } from '@/app/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MessageBox from './MessageBox';

interface BodyProps {
  initialMessage: FullMessageType[];
}

const Body = ({ initialMessage }: BodyProps) => {
  const { conversationId } = useConversation();
  const [messages, setMessages] = useState(initialMessage);

  useEffect(() => {
    axios.post(`/api/conversation/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          lastMessage={i === message?.length - 1}
          key={message.id}
          data={message}
        />
      ))}
    </div>
  );
};

export default Body;
