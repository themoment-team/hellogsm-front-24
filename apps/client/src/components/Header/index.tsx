'use client';

import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { memberQueryKeys, useLogout } from 'api';
import Link from 'next/link';

import * as I from 'client/assets';
import { ActiveLink, LoginDialog } from 'client/components';
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

const activeTextStyle = ['relative', 'text-[0.875rem]/[1.5rem]', 'md:text-[1.125rem]/[1.75rem]'];

const loginLinkStyle = [
  'flex',
  'gap-x-1',
  'text-gray-600',
  'font-[600]',
  'text-lg',
  'items-center',
];

const modalBtnStyle = [
  'flex',
  'py-2',
  'pl-[0.75rem]',
  'justify-center',
  'items-center',
  'gap-2',
  'text-slate-700',
  ...activeTextStyle,
];

const Header = () => {
  const { data: authInfo } = useGetMyAuthInfo();
  const { data: memberInfo } = useGetMyMemberInfo();

  const queryClient = useQueryClient();

  const logout = useLogout('client');

  const handleLogout = () => {
    logout();
    queryClient.removeQueries({ queryKey: memberQueryKeys.getMyAuthInfo() });
    queryClient.removeQueries({ queryKey: memberQueryKeys.getMyMemberInfo() });
  };

  const [isLogoutClicked, setIsLogoutClicked] = useState(false);
  const [isBarClicked, setIsBarClicked] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navLinks = [
    { href: '/', label: '홈', icon: I.HomeIcon },
    { href: '/guide', label: '원서접수', icon: I.OneseoIcon },
    { href: '/faq', label: '자주 묻는 질문', icon: I.FaqIcon },
    { href: '/mypage', label: '내 정보 페이지', icon: I.HeaderProfileIcon },
    { href: '/oneseo/calculate', label: '모의 성적 계산', icon: I.CalculateIcon },
    {
      href: '/introduce',
      label: '더모먼트팀',
      icon: I.SparkleIcon,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 750) {
        setIsBarClicked(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isBarClicked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isBarClicked]);

  return (
    <>
      <header
        className={cn(
          'h-[4.625rem]',
          'px-[1.75rem]',
          'md:px-[3.75rem]',
          'lg:px-[6.25rem]',
          'xl:px-[15.25rem]',
          'fhd:px-[20rem]',
          'flex',
          'justify-between',
          'items-center',
          'text-gray-900',
          'sticky',
          'top-0',
          'w-full',
          'bg-white',
          'z-20',
          'border-t-solid',
          'border-b-[0.0625rem]',
          'border-gray-100',
          'gap-8',
        )}
      >
        <Link href="/">
          <I.HelloGSMLogo />
        </Link>
        <nav
          className={cn(
            'w-[35.5rem]',
            'hidden',
            'smxm:flex',
            'justify-between',
            'text-lg',
            'font-[600]',
            'text-gray-500',
          )}
        >
          <ActiveLink
            href="/"
            className={cn(...activeTextStyle)}
            activeClassName={cn(...activeStyle)}
          >
            홈
          </ActiveLink>
          <ActiveLink
            href="/guide"
            className={cn(...activeTextStyle)}
            activeClassName={cn(...activeStyle)}
          >
            원서접수
          </ActiveLink>
          <ActiveLink
            href="/faq"
            className={cn(...activeTextStyle)}
            activeClassName={cn(...activeStyle)}
          >
            자주 묻는 질문
          </ActiveLink>
          <ActiveLink
            href="/oneseo/calculate"
            className={cn(...activeTextStyle)}
            activeClassName={cn(...activeStyle)}
          >
            모의 성적 계산
          </ActiveLink>
          <ActiveLink
            href="/check-result"
            className={cn(...activeTextStyle)}
            activeClassName={cn(...activeStyle)}
          >
            합격자 조회
          </ActiveLink>
          <ActiveLink
            href="/introduce"
            className={cn(...activeTextStyle)}
            activeClassName={cn(...activeStyle)}
          >
            더모먼트팀
          </ActiveLink>
        </nav>
        {authInfo?.authReferrerType && memberInfo?.name ? (
          <>
            <div className={cn('relative', 'hidden', 'smxm:flex', 'w-[10rem]')}>
              <button
                className={cn(...loginLinkStyle, 'gap-2', 'relative')}
                onClick={() => setIsLogoutClicked(!isLogoutClicked)}
              >
                <div className={cn('flex', 'items-center', 'gap-[0.125rem]', ...activeTextStyle)}>
                  <I.HeaderProfileIcon size="1.5rem" color="#2563EB" />
                  <span className={cn('text-blue-600')}>{memberInfo.name}</span> 님
                </div>
                <I.ChevronIcon />
              </button>
              {isLogoutClicked === true && (
                <div
                  className={cn(
                    'absolute',
                    'top-full',
                    'left-[-17.5%]',
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
                    href="/mypage"
                    className={cn(...modalBtnStyle)}
                    onClick={() => setIsLogoutClicked(!isLogoutClicked)}
                  >
                    <I.HomeIcon size="1.5rem" color="#475569" /> 내 정보 페이지
                  </Link>
                  <Link
                    href="/"
                    className={cn(...modalBtnStyle, 'text-red-600')}
                    onClick={() => {
                      handleLogout();
                      setIsLogoutClicked(!isLogoutClicked);
                    }}
                  >
                    <I.LogoutIcon /> 로그아웃
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsBarClicked(!isBarClicked)}
              className={cn('flex', 'smxm:hidden')}
            >
              {isBarClicked ? <I.XIcon /> : <I.HamburgerIcon />}
            </button>
          </>
        ) : authInfo?.authReferrerType && !memberInfo?.name ? (
          '회원가입을 진행해주세요'
        ) : (
          <LoginDialog />
        )}
      </header>
      {isBarClicked && (
        <div
          className={cn(
            'flex',
            'fixed',
            'top-[4.625rem]',
            'left-0',
            'w-full',
            'h-[calc(100vh-4.625rem)]',
            'pl-[3rem]',
            'pt-[1.5rem]',
            'pb-[3.75rem]',
            'flex-col',
            'items-start',
            'justify-between',
            'bg-white',
            'z-20',
            'overflow-y-auto',
          )}
        >
          <div className={cn('flex', 'flex-col', 'items-start', 'gap-[2.25rem]')}>
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsBarClicked(!isBarClicked)}
                  className={cn(
                    'flex',
                    'items-center',
                    'gap-4',
                    'text-slate-300',
                    'text-[1.5rem]',
                    'leading-normal',
                    'font-bold',
                    'hover:text-slate-500',
                    'duration-150',
                  )}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <IconComponent
                    size="1.75rem"
                    color={hoveredLink === link.href ? '#64748B' : '#CBD5E1'}
                  />
                  {link.label}
                </Link>
              );
            })}
          </div>
          <button
            className={cn(
              'flex',
              'items-center',
              'gap-4',
              'text-red-600',
              'text-[1.5rem]',
              'leading-normal',
              'font-bold',
            )}
            onClick={() => {
              handleLogout();
              setIsBarClicked(!isBarClicked);
            }}
          >
            <I.LogoutIcon /> 로그아웃
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
