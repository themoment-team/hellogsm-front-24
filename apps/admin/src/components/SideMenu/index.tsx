'use client';

import { useState } from 'react';

import { ButtonProps } from 'shared';

import { ChevronsLeft } from 'admin/assets';

import { cn } from 'shared/lib/utils';

interface ItemProps {
  children: React.ReactNode;
}

const Item: React.FC<ItemProps> = ({ children }) => (
  <div className={cn('flex', 'gap-2', 'py-2', 'px-3')}>{children}</div>
);

const ItemColors = {
  blue: '#2563EB',
  amber: '#FCD34D',
  green: '#22C55E',
  rose: '#F43F5E',
} as const;

interface SubItemProps extends ButtonProps {
  color: keyof typeof ItemColors;
}

const SubItem: React.FC<SubItemProps> = ({ children, onClick, color }) => (
  <div onClick={onClick} className={cn('flex', 'gap-2', 'py-2', 'px-3', 'items-center')}>
    <div
      className={cn('w-2', 'h-2', 'rounded-full')}
      style={{
        border: `solid 2px ${ItemColors[color]}`,
      }}
    />
    {children}
  </div>
);

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <>
      {isOpen && (
        <nav
          className={cn('w-60', 'h-dvh', 'py-8', 'px-4', 'bg-white', 'flex-col', 'justify-between')}
        >
          <div className={cn('flex', 'flex-col', 'gap-10')}>
            <div className={cn('flex', 'w-full', 'justify-between')}>
              <span className={cn('text-gray-80', 'text-base', 'font-semibold', 'leading-6')}>
                HELLO <span className={cn('text-[#2563EB]')}>ADMIN!</span>
              </span>
              <ChevronsLeft />
            </div>

            <div className={cn('flex', 'flex-col', 'gap-2')}>
              <Item>지원자관리</Item>
              <div>
                <SubItem color="blue">전체 지원자 관리</SubItem>
                <SubItem color="amber">전체 지원자 관리</SubItem>
                <SubItem color="green">전체 지원자 관리</SubItem>
                <SubItem color="rose">전체 지원자 관리</SubItem>
              </div>
            </div>
          </div>
          <Item>로그아웃</Item>
        </nav>
      )}
    </>
  );
};

export default SideMenu;
