import { redirect } from 'next/navigation';

import type { MyMemberInfoType } from 'client/types';

import { memberUrl } from 'api/libs';

/**
 * 나의 인증 정보를 가져옵니다.
 *
 * @returns 나의 인증 정보를 반환합니다. 없다면 -> TODO 서버 문서 업데이트 중입니다.
 */
export const getMyAuthInfo = async (redirectUrl: string): Promise<MyMemberInfoType | null> => {
  const response = await fetch(new URL(`/api${memberUrl.getMyAuthInfo()}`, process.env.BASE_URL), {
    method: 'GET',
  });

  const authInfo = await response.json();
  const isUnauthorized = response.status === 401;
  const isNotFound = response.status === 404;

  if (isNotFound || isUnauthorized) {
    return null;
  }

  if (!response.ok) {
    return redirect(redirectUrl);
  }

  return authInfo;
};
