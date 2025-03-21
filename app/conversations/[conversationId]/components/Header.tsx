'use client';

import useOtherUser from '@/app/hooks/useOtherUser';
import { Conversation, User } from '@prisma/client';
import React, { useMemo, useState } from 'react';

import { HiChevronLeft, HiEllipsisHorizontal } from 'react-icons/hi2';
import Avatar from '@/app/components/Avatar';
import Link from 'next/link';
import ChatSettings from './ChatSettings';

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header = ({ conversation }: HeaderProps) => {
  const otherUser = useOtherUser(conversation);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }
    return 'Online';
  }, [conversation]);

  return (
    <>
      <ChatSettings
        data={conversation}
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
          >
            <HiChevronLeft size={32} />
          </Link>
          <Avatar user={otherUser} />
          <div className="flex flex-col">
            <div className="">{conversation.name || otherUser?.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>

        <HiEllipsisHorizontal
          size={32}
          onClick={() => setSettingsOpen(true)}
          className="text-green-500 cursor-pointer hover:text-green-600 transition"
        />
      </div>
    </>
  );
};

export default Header;
