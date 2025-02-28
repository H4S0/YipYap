'use client';

import useOtherUser from '@/app/hooks/useOtherUser';
import { Conversation, User } from '@prisma/client';
import React, { useEffect, useMemo } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { format } from 'date-fns';
import Avatar from '@/app/components/Avatar';

interface ProfileSettingsProps {
  onClose: () => void;
  isOpen?: boolean;
  data: Conversation & {
    users: User[];
  };
}

const ChatSettings = ({ data, isOpen, onClose }: ProfileSettingsProps) => {
  const otherUser = useOtherUser(data);

  const title = useMemo(() => {
    return data.name || otherUser?.name;
  }, [data, otherUser]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }
  }, [data]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-slate-200 shadow-lg transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } sm:w-[80%] md:w-[50%] lg:w-[25%] w-full z-50`}
    >
      <div className="flex flex-col h-full p-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-lg font-medium text-gray-800">Chat Settings</h2>
          <IoIosCloseCircle
            size={30}
            onClick={onClose}
            className="hover:text-green-500 transition cursor-pointer"
          />
        </div>

        <div className="mt-5">
          <button className="w-full bg-red-500 text-white py-2 rounded-lg text-center font-medium hover:bg-red-600 transition">
            Delete Conversation
          </button>
          <div className="flex items-center gap-x-3 bg-white hover:bg-slate-100 mt-2 p-2 w-full rounded-lg transition">
            <Avatar user={otherUser} />
            <p>{otherUser?.name}</p>
          </div>
          {data.isGroup && otherUser?.email}
        </div>
      </div>
    </div>
  );
};

export default ChatSettings;
