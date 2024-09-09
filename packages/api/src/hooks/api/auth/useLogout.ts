'use client';

import { useRouter } from 'next/navigation';

import { authUrl, get } from 'api/libs';

const OK = 'OK';

export const useLogout = (
  firstRefetch: () => void,
  secondRefetch: () => void,
  type: 'client' | 'admin',
) => {
  const { push } = useRouter();

  const handleLogout = async () => {
    try {
      const response = await get(authUrl.getLogout());

      if (response === OK) {
        firstRefetch();
        secondRefetch();
      }
    } catch (error) {}

    return type === 'client' ? push('/') : push('/signin');
  };

  return handleLogout;
};
