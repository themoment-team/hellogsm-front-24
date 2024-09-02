'use client';

import { useState } from 'react';

import Link from 'next/link';

import * as I from 'client/assets';
import { ActiveLink, LoginDialog } from 'client/components';
import { useLogout } from 'client/hooks';
import { cn } from 'client/lib/utils';

import { useGetMyAuthInfo, useGetMyMemberInfo } from 'api/hooks';

const activeStyle = [
  'text-gray-900',
  'after:w-6',
  'after:bg-sky-300',
  'after:content-[""]',
  'after:absolute',
  'after:bottom-[-4px]',
  'after:w-5',
  'after:h-1',
  'after:left-1/2',
  'after:translate-x-[-50%]',
  'after:rounded-lg',
];

const loginLinkStyle = [
  'flex',
  'gap-x-1',
  'text-gray-600',
  'font-[600]',
  'text-lg',
  'items-center',
];

const Header = () => {
  const { data: authInfo } = useGetMyAuthInfo();
  const { data: memberInfo } = useGetMyMemberInfo();
  const handleLogout = useLogout();

  const [isClicked, setIsClicked] = useState(false);

  return (
    <header
      className={cn(
        'h-[4.625rem]',
        'px-[20rem]',
        'flex',
        'justify-between',
        'items-center',
        'text-gray-900',
        'sticky',
        'top-0',
        'w-full',
        'bg-white',
        'z-10',
        'border-t-solid',
        'border-b-[0.0625rem]',
        'border-gray-100',
      )}
    >
      <div className={cn('text-2xl', 'font-bold')}>Hello, GSM </div>
      <nav
        className={cn(
          'w-[18.75rem]',
          'flex',
          'justify-between',
          'text-lg',
          'font-[600]',
          'text-gray-500',
        )}
      >
        <ActiveLink href="/" className={cn('relative')} activeClassName={cn(...activeStyle)}>
          홈
        </ActiveLink>
        <ActiveLink href="/guide" className={cn('relative')} activeClassName={cn(...activeStyle)}>
          원서접수
        </ActiveLink>
        <ActiveLink href="/faq" className={cn('relative')} activeClassName={cn(...activeStyle)}>
          자주 묻는 질문
        </ActiveLink>
      </nav>

      {authInfo?.authReferrerType && memberInfo?.name ? (
        <div className={cn('relative')}>
          <button
            className={cn(...loginLinkStyle, 'gap-2', 'relative')}
            onClick={() => setIsClicked(!isClicked)}
          >
            <div className={cn('flex', 'items-center', 'gap-[0.125rem]')}>
              <I.HeaderProfileIcon /> {memberInfo.name} 님
            </div>
            <I.ChevronIcon />
          </button>
          {isClicked === true && (
            <div
              className={cn(
                'absolute',
                'top-full',
                'left-[-15%]',
                'mt-2',
                'flex',
                'w-[10rem]',
                'flex-col',
                'items-start',
                'shadow-sm',
                'rounded-md',
                'bg-white',
              )}
            >
              <Link
                href="mypage"
                className={cn(
                  'flex',
                  'py-2',
                  'pl-[0.75rem]',
                  'justify-center',
                  'items-center',
                  'gap-2',
                  'text-slate-700',
                  'text-[1rem]/[1.75rem]',
                  'font-normal',
                )}
                onClick={() => setIsClicked(!isClicked)}
              >
                <I.HomeIcon /> 내 정보 페이지
              </Link>
              <button
                className={cn(
                  'flex',
                  'py-2',
                  'pl-[0.75rem]',
                  'pr-[1.8125rem]',
                  'justify-center',
                  'items-center',
                  'gap-2',
                  'text-red-600',
                  'text-[1rem]/[1.75rem]',
                  'font-normal',
                )}
                onClick={handleLogout}
              >
                <I.LogoutIcon /> 로그아웃
              </button>
            </div>
          )}
        </div>
      ) : authInfo?.authReferrerType && !memberInfo?.name ? (
        '회원가입을 진행해주세요'
      ) : (
        <LoginDialog />
      )}
    </header>
  );
};

export default Header;
