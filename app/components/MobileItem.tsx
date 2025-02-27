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
  icon,
  onClick,
  active,
}: MobileItemProps) => {
  return <div>MobileItem</div>;
};

export default MobileItem;
