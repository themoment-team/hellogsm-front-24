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
            <AlertDialogTitle>로그인을 먼저 진행해주세요</AlertDialogTitle>
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
