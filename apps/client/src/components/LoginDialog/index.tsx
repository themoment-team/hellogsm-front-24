import { LoginButton } from 'shared/components';
import { cn } from 'shared/lib/utils';

interface LoginDialogProps {
  forwardRef: React.RefObject<HTMLDialogElement>;
}

const LoginDialog = ({ forwardRef }: LoginDialogProps) => {
  return (
    <dialog ref={forwardRef} className={cn()}>
      <div className={cn()}>
        <span className={cn('text-2xl', 'font-semibold', 'text-gray-900')}>로그인</span>
        <LoginButton variant="kakao">카카오로 시작하기</LoginButton>
        <LoginButton variant="google">Google 계정으로 시작하기</LoginButton>
      </div>
    </dialog>
  );
};

export default LoginDialog;
