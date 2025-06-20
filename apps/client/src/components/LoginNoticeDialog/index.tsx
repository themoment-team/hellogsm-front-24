'use client';

import { useEffect, useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from 'shared';

import { LoginDialog } from 'client/components';

import { useGetMyAuthInfo } from 'api/hooks';
import { cn } from 'shared/lib/utils';

interface LoginNoticeDialogProps {
  userName: string | undefined;
}

const LoginNoticeDialog = ({ userName }: LoginNoticeDialogProps) => {
  const { data: authInfo, isLoading } = useGetMyAuthInfo();
  const [isDialog, setIsDialog] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (
      process.env.NEXT_PUBLIC_SHOW_LOGIN_MODAL_FF === 'true' &&
      (!authInfo?.authReferrerType || !userName)
    ) {
      setIsDialog(true);
    }
  }, [isLoading]);

  return (
    <AlertDialog open={isDialog} onOpenChange={setIsDialog}>
      <AlertDialogContent className={cn('w-[400px]')}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <strong>로그인을 먼저 진행해주세요</strong>
            <br />
            <br />
            학부모/ 담임교사 합격확인 시, 보안상의 문제로 본인확인을 위해 회원가입 후 학부모/
            담임교사의 본인 로그인이 필요합니다. <br />
            <br /> 빠른 확인을 원하시는 경우, 062-949-6842로 전화주시면 친절히 안내드리겠습니다.{' '}
            <br /> 번거롭게 해드려 죄송합니다.
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <LoginDialog />
          <AlertDialogAction>다음에</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoginNoticeDialog;
