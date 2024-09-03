'use client';

import { authUrl } from 'api';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        new URL(authUrl.getLogout(), process.env.NEXT_PUBLIC_API_BASE_URL),
        {
          method: 'GET',
          credentials: 'include',
        },
      );

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      router.push('/');
    }
  };

  return handleLogout;
};
