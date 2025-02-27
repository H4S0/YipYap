import React from 'react';
import { IconType } from 'react-icons/lib';
import Link from 'next/link';
import clsx from 'clsx';

interface MobileItemProps {
  label: string;
  icon: IconType;
  href: string;
  onClick: () => void;
  active?: boolean;
}

const MobileItem = ({
  href,
  label,
  icon: Icon,
  onClick,
  active,
}: MobileItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        'group flex gap-x-3 text-sm leading-6 font-semibold justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100',
        active && 'bg-gray-100 text-black'
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;
