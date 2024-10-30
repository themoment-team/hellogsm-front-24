'use client';

import { useGetMyAuthInfo, useGetMyMemberInfo } from 'api';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from 'shared';

import { Footer, LoginDialog } from 'client/components';

import { cn } from 'shared/lib/utils';

const mainUrl = '/';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const segment = useSelectedLayoutSegment();

  const { data: authInfo } = useGetMyAuthInfo();
  const { data: memberInfo } = useGetMyMemberInfo();

  return (
    <>
      <div
        className={cn(
          'h-[calc(100vh-4.625rem)]',
          'flex',
          'justify-center',
          segment ? 'bg-white' : 'bg-gray-100',
        )}
      >
        {children}
      </div>
      <Footer />

      <AlertDialog open={!authInfo?.authReferrerType || !memberInfo?.name}>
        <AlertDialogContent className="w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              학부모/ 담임교사 합격확인 시, 보안상의 문제로 본인확인을 위해 회원가입 후 학부모/
              담임교사의 본인 로그인이 필요합니다. <br />
              <br /> 빠른 확인을 원하시는 경우, 062-949-6842로 전화주시면 친절히 안내드리겠습니다.{' '}
              <br /> 번거롭게 해드려 죄송합니다.
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <LoginDialog />
            <AlertDialogAction>
              <Link href={mainUrl}>다음에</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Layout;
