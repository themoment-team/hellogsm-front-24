import { cookies } from 'next/headers';
import { MyTestResultType } from 'types';

import { memberUrl } from 'api/libs';

export const getMyTestResult = async (): Promise<MyTestResultType | undefined> => {
  const session = cookies().get('SESSION')?.value;

  try {
    const response = await fetch(
      new URL(memberUrl.getMyTestResult(), process.env.NEXT_PUBLIC_API_BASE_URL),
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `SESSION=${session}`,
        },
      },
    );

    const memberInfo = await response.json();

    return memberInfo.data;
  } catch {
    return undefined;
  }
};
