'use client';

import { useEffect, useRef, useState } from 'react';

import axios from 'axios';

import useConversation from '@/app/hooks/useConversation';
import { FullMessageType } from '@/app/types';

import MessageBox from './MessageBox';

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body = ({ initialMessages }: BodyProps) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, idx) => (
        <MessageBox
          isLast={idx === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
