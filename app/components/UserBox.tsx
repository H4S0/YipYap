'use client';

import { User } from '@prisma/client';
import React, { useCallback, useState } from 'react';
import DefaultImageUser from '../../public/download.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Avatar from './Avatar';

interface UserBoxProps {
  user: User;
}

const UserBox = ({ user }: UserBoxProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>();

  const handleSubmit = useCallback(() => {
    setIsLoading(true);

    axios
      .post('/api/conversation', {
        userId: user.id,
      })
      .then((data) => {
        router.push(`/conversation/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [router, user.id]);

  return (
    <div
      key={user.id}
      className="flex items-center gap-x-3 cursor-pointer"
      onClick={handleSubmit}
    >
      <div className="relative">
        <Avatar />
        <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:w-3 md:h-3" />
      </div>
      <p className="text-xl font-medium text-neutral-700">{user.name}</p>
    </div>
  );
};

export default UserBox;
