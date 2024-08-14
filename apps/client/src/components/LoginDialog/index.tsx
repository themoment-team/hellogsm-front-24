import { LoginButton } from 'shared/components';
import { cn } from 'shared/lib/utils';

interface LoginDialogProps {
  forwardRef: React.RefObject<HTMLDialogElement>;
}

const LoginDialog = ({ forwardRef }: LoginDialogProps) => {
  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
    const dialogElement = forwardRef.current;
    if (dialogElement && e.target === dialogElement) {
      dialogElement.close();
    }
  };

  return (
    <dialog onClick={handleDialogClick} ref={forwardRef} className={cn('rounded-[20px]')}>
      <div className={cn('flex', 'pt-8', 'px-12', 'pb-10', 'flex-col', 'items-center', 'gap-8')}>
        <span className={cn('text-2xl', 'font-semibold', 'text-gray-900')}>로그인</span>
        <div className={cn('flex', 'flex-col', 'gap-3')}>
          <LoginButton variant="kakao">카카오로 시작하기</LoginButton>
          <LoginButton variant="google">Google 계정으로 시작하기</LoginButton>
        </div>
      </div>
    </dialog>
  );
};

export default LoginDialog;
