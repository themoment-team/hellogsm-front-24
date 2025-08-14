'use client';

import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { memberQueryKeys, useOAuthLogin } from 'api'; // userQueryKey를 함께 import
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { cn } from 'shared/lib/utils';

const CallbackPage = ({ code, provider }: { code: string; provider: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLoginSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: memberQueryKeys.getMyAuthInfo() });
    router.replace('/');
    toast.success('로그인에 성공했습니다.');
  };

  const handleLoginError = () => {
    router.replace('/');
    toast.error('로그인에 실패했습니다.');
  };

  const { mutate: googleLogin } = useOAuthLogin('google', {
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
  });

  const { mutate: kakaoLogin } = useOAuthLogin('kakao', {
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
  });

  useEffect(() => {
    if (!code || !provider) {
      router.replace('/');
      toast.error('로그인에 실패했습니다.');
      return;
    }

    if (provider === 'google') {
      googleLogin(code);
    } else if (provider === 'kakao') {
      kakaoLogin(code);
    } else {
      router.replace('/');
      toast.error('로그인에 실패했습니다.');
    }
  }, [code, provider, googleLogin, kakaoLogin, router]);

  return (
    <div className={cn('flex', 'h-[calc(100vh-4.625rem)]', 'items-center', 'justify-center')}>
      <div className={cn('text-lg', 'font-medium')}>로그인 처리 중...</div>
    </div>
  );
};

export default CallbackPage;
