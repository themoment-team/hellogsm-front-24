'use client';

import { useState } from 'react';

import { ChevronsLeft } from 'admin/assets';

import { cn } from 'shared/lib/utils';

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <>
      {isOpen && (
        <nav
          className={cn(
            'w-w-60',
            'h-dvh',
            'py-8',
            'pl-4',
            'bg-white',
            'flex-col',
            'justify-between',
          )}
        >
          <ChevronsLeft />
        </nav>
      )}
    </>
  );
};

export default SideMenu;
