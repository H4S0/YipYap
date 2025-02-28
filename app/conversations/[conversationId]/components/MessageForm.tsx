'use client';

import useConversation from '@/app/hooks/useConversation';
import axios from 'axios';
import React from 'react';

const MessageForm = () => {
  const { conversationId } = useConversation();

  const handleSubmit = async (data) => {
    axios.post('/api/messages', {
      ...data,
      conversationId,
    });
  };
  return <div>MessageForm</div>;
};

export default MessageForm;
