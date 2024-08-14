import Link from 'next/link';

import * as I from 'client/assets';
import { ActiveLink } from 'client/components';
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
        <ActiveLink href="/" className={cn('relative')} activeClassName={cn(...activeStyle)}>
          원서접수
        </ActiveLink>
        <ActiveLink href="/faq" className={cn('relative')} activeClassName={cn(...activeStyle)}>
          자주 묻는 질문
        </ActiveLink>
      </nav>

      {authInfo && memberInfo ? (
        <Link href="/" className={cn(...loginLinkStyle)}>
          <I.HeaderProfileIcon /> {memberInfo.name} 님
        </Link>
      ) : (
        <Link href="/" className={cn(...loginLinkStyle)}>
          <I.HeaderProfileIcon /> 로그인
        </Link>
      )}
    </header>
  );
};

export default Header;
