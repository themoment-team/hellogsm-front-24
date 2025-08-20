'use client';

import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from 'shared';

import { LoginDialog } from '..';

interface AlertLoginDialogProps {
  open: boolean;
}

const AlertLoginDialog = ({ open }: AlertLoginDialogProps) => {
  const { back } = useRouter();
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <strong>로그인을 먼저 진행해주세요</strong>
            <br />
            <br />
            학부모/담임교사 합격 확인 시, 보안상의 문제로 <br />
            본인 확인을 위해 회원가입 후 학부모/담임교사의 <br />
            본인 로그인이 필요합니다. <br />
            <br /> 빠른 확인을 원하시는 경우, 062-949-6842로 전화 주시면 친절히 안내해 드리겠습니다.{' '}
            <br /> 번거롭게 해드려 죄송합니다.
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <LoginDialog />
          <AlertDialogAction>
            <div onClick={() => back()}>다음에</div>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertLoginDialog;
