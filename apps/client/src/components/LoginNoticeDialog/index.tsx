import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
} from 'shared';
import { MyAuthInfoType, MyMemberInfoType } from 'types';

import { LoginDialog } from 'client/components';

interface NoticeDialogProps {
  isClicked: boolean;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  authInfo: MyAuthInfoType | undefined;
  memberInfo: MyMemberInfoType | undefined;
}

const LoginNoticeDialog = ({
  isClicked,
  setIsClicked,
  authInfo,
  memberInfo,
}: NoticeDialogProps) => {
  const showNoticeDialog = process.env.NEXT_PUBLIC_SHOW_LOGIN_MODAL_FF === 'true';

  if (!showNoticeDialog) return null;

  return (
    <AlertDialog open={!isClicked && (!authInfo?.authReferrerType || !memberInfo?.name)}>
      <AlertDialogContent className="w-[400px]">
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
          <Button onClick={() => setIsClicked(true)}>다음에</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoginNoticeDialog;
