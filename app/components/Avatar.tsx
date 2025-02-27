'use client';

import { User } from '@prisma/client';
import React from 'react';
import DefaultImageUser from '../../public/download.png';
import Image from 'next/image';

interface AvatarProps {
  user?: User;
}

const Avatar = ({ user }: AvatarProps) => {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        <Image src={user?.image || DefaultImageUser} alt="avatar" fill />
      </div>
    </div>
  );
};

export default Avatar;
