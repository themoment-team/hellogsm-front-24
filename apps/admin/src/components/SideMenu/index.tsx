'use client';

import { useState } from 'react';
import { PropsWithChildren } from 'react';

import { ChevronsLeft, Puzzle, Exit } from 'admin/assets';

import { cn } from 'shared/lib/utils';

const Item = ({ children }: PropsWithChildren) => (
  <div
    className={cn(
      'flex',
      'gap-2',
      'py-2',
      'px-3',
      'items-center',
      'text-sm',
      'font-semibold',
      'leading-5',
    )}
  >
    {children}
  </div>
);

interface SubItemProps extends PropsWithChildren {
  isSelected: boolean;
  circleClassName: string;
  onClick: () => void;
}

const SubItem = ({ children, onClick, isSelected, circleClassName }: SubItemProps) => (
  <div
    onClick={onClick}
    className={cn('flex', 'gap-2', 'py-2', 'px-3', 'items-center', 'pl-10', 'cursor-pointer')}
  >
    <div
      className={cn('w-2', 'h-2', 'rounded-full', 'border-solid', 'border-2', circleClassName)}
    />
    <span
      className={cn(
        'font-normal',
        'text-sm',
        'leading-5',
        'text-gray-400',
        isSelected && 'text-blue-900',
      )}
    >
      {children}
    </span>
  </div>
);

const ManageTypeArray = [
  {
    borderStyle: 'border-blue-600',
    type: '전체 지원자 관리',
  },
  {
    borderStyle: 'border-amber-300',
    type: '1차 전형 합격자 관리',
  },
  {
    borderStyle: 'border-green-500',
    type: '최종 합격자 관리',
  },
  {
    borderStyle: 'border-rose-500',
    type: '불합격자 관리',
  },
] as const;

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <aside
      className={cn(
        'w-60',
        'h-dvh',
        'py-8',
        'px-4',
        'bg-white',
        'flex',
        'flex-col',
        'justify-between',
        'absolute',
        !isOpen && 'translate-x-[-200px]',
        'ease-in-out',
        'duration-150',
        'transition-all',
      )}
    >
      <div className={cn('flex', 'flex-col', 'gap-10')}>
        <div className={cn('flex', 'w-full', 'justify-between')}>
          <span className={cn('text-gray-80', 'text-base', 'font-semibold')}>
            HELLO <span className={cn('text-[#2563EB]')}>ADMIN!</span>
          </span>
          <div
            className={cn('cursor-pointer', !isOpen && 'scale-x-[-1]')}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <ChevronsLeft />
          </div>
        </div>

        <div className={cn('flex', 'flex-col', 'gap-2')}>
          <Item>
            <Puzzle />
            지원자관리
          </Item>
          <div>
            {ManageTypeArray.map(({ borderStyle, type }, index) => (
              <SubItem
                key={type}
                isSelected={index === selectedIndex}
                onClick={() => setSelectedIndex(index)}
                circleClassName={borderStyle}
              >
                {type}
              </SubItem>
            ))}
          </div>
        </div>
      </div>
      <Item>
        <Exit />
        로그아웃
      </Item>
    </aside>
  );
};

export default SideMenu;
