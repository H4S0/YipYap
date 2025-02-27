'use client';

import { User } from '@prisma/client';
import React, { useCallback, useState } from 'react';
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
      className="flex items-center gap-x-3 cursor-pointer p-2 hover:bg-gray-100 hover:rounded-xl transition"
      onClick={handleSubmit}
    >
      <Avatar user={user} />
      <p className="text-xl font-medium text-neutral-700">{user.name}</p>
    </div>
  );
};

export default UserBox;
