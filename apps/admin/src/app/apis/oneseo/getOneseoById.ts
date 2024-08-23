import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { GetMyOneseoType } from 'types';

import { oneseoUrl } from 'api/libs';
export const getOneseoById = async (id: number): Promise<GetMyOneseoType> => {
  const session = cookies().get('SESSION')?.value;

  const response = await fetch(
    new URL(`${oneseoUrl.getOneseoById(id)}`, process.env.NEXT_PUBLIC_API_BASE_URL),
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `SESSION=${session}`,
      },
    },
  );

  const oneseo = await response.json();

  const isNotFound = response.status === 404;

  if (isNotFound || oneseo.data === undefined) {
    return redirect('/');
  }

  return oneseo.data;
};
