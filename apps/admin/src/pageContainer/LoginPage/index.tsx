import { LoginButton } from 'shared/components';
import { cn } from 'shared/lib/utils';

const LoginPage = () => (
  <main className={cn('flex', 'content-center')}>
    <LoginButton variant="google">Google 계정으로 로그인</LoginButton>
  </main>
);

export default LoginPage;
