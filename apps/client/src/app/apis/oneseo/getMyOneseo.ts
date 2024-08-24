import { cookies } from 'next/headers';
import { GetMyOneseoType } from 'types';

import { oneseoUrl } from 'api/libs';

export const getMyOneseo = async (): Promise<GetMyOneseoType | undefined> => {
  const session = cookies().get('SESSION')?.value;

  const response = await fetch(
    new URL(`${oneseoUrl.getMyOneseo()}}`, process.env.NEXT_PUBLIC_API_BASE_URL),
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `SESSION=${session}`,
      },
    },
  );
  const myOneseo = await response.json();

  if (response.status === 404) return undefined;

  return myOneseo.data;
};
