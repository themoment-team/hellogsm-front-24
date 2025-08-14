'use client';

import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { memberQueryKeys, useOAuthLogin } from 'api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { cn } from 'shared/lib/utils';

const CallbackPage = ({ code, provider }: { code: string; provider: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLoginSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: memberQueryKeys.getMyAuthInfo() });

    if (provider === 'admin') {
      const currentOrigin = window.location.origin;
      if (currentOrigin.includes('stage')) {
        router.replace('https://admin.stage.hellogsm.kr');
      } else {
        router.replace('https://admin.hellogsm.kr');
      }
    } else {
      router.replace('/');
    }

    toast.success('로그인에 성공했습니다.');
  };

  const handleLoginError = () => {
    router.replace('/signin');
    toast.error('로그인에 실패했습니다.');
  };

  const { mutate: googleLogin } = useOAuthLogin('google', {
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
  });

  useEffect(() => {
    if (!code || !provider) {
      router.replace('/signin');
      toast.error('로그인에 실패했습니다.');
      return;
    }

    if (provider === 'google' || provider === 'admin') {
      googleLogin(code);
    } else {
      router.replace('/signin');
      toast.error('로그인에 실패했습니다.');
    }
  }, [code, provider, googleLogin, router]);

  return (
    <div className={cn('flex', 'h-[calc(100vh-4.625rem)]', 'items-center', 'justify-center')}>
      <div className={cn('text-lg', 'font-medium')}>로그인 처리 중...</div>
    </div>
  );
};

export default CallbackPage;
