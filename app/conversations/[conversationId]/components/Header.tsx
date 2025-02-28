import { Conversation, User } from '@prisma/client';
import React from 'react';

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header = ({ conversation }: HeaderProps) => {
  return <div>Header</div>;
};

export default Header;
