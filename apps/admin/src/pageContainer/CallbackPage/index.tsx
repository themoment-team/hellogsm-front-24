'use client';

import { useEffect } from 'react';

import { useOAuthLogin } from 'api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { cn } from 'shared/lib/utils';

const CallbackPage = ({ code, provider }: { code: string; provider: string }) => {
  const router = useRouter();

  const { mutate: googleLogin } = useOAuthLogin('google', {
    onSuccess: () => {
      router.replace('/');
      toast.success('로그인에 성공했습니다.');
    },
    onError: () => {
      router.replace('/signin');
      toast.error('로그인에 실패했습니다.');
    },
  });

  useEffect(() => {
    if (!code) {
      router.replace('/signin');
      toast.error('로그인에 실패했습니다.');
      return;
    }

    if (!provider) {
      router.replace('/signin');
      toast.error('로그인에 실패했습니다.');
      return;
    }

    if (provider === 'google') {
      googleLogin(code);
    } else {
      router.replace('/signin');
      toast.error('로그인에 실패했습니다.');
      return;
    }
  }, [code, provider, googleLogin, router]);

  return (
    <div className={cn('flex', 'h-[calc(100vh-4.625rem)]', 'items-center', 'justify-center')}>
      <div className={cn('text-lg', 'font-medium')}>로그인 처리 중...</div>
    </div>
  );
};

export default CallbackPage;
