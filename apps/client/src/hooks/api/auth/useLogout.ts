'use client';

import { authUrl } from 'api';
import { useRouter } from 'next/navigation';

export const useLogout = (firstRefetch: () => void, secondRefetch: () => void) => {
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
        firstRefetch();
        secondRefetch();
        router.push('/');
      }
    } catch (error) {
      router.push('/');
    }
  };

  return handleLogout;
};
