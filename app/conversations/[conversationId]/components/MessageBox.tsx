import { FullMessageType } from '@/app/types';
import React from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import clsx from 'clsx';
import Avatar from '@/app/components/Avatar';
import { format } from 'date-fns';

interface MessageBoxPops {
  lastMessage: boolean;
  data: FullMessageType;
}

const MessageBox = ({ lastMessage, data }: MessageBoxPops) => {
  const session = useSession();

  const isOwn = session.data?.user?.email === data.sender.email;

  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender.email)
    .map((user) => user.name)
    .join(', ');
  const container = clsx('flex gap-2 p-4', isOwn && 'justify-end');

  const avatar = clsx(isOwn && 'order-2');

  const body = clsx('flex flex-col gap-2', isOwn && 'items-end');

  const message = clsx(
    'text-sm w-fit overflow-hidden',
    isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
    data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data?.sender?.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>

        <div className={message}>
          {data.image ? (
            <Image
              alt="Image"
              src={data.image}
              height="288"
              width="288"
              className="object-cover cursor-pointer hover:scale-110 transition translate"
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {lastMessage && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500">
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
