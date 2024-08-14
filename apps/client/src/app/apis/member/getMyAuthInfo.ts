import { redirect } from 'next/navigation';

import { memberUrl } from 'api/libs';

import type { MyAuthInfoType } from 'types';

/**
 * 나의 인증 정보를 가져옵니다.
 *
 * @returns 나의 인증 정보를 반환합니다. 없다면 -> TODO 서버 문서 업데이트 중입니다.
 */
export const getMyAuthInfo = async (redirectUrl: string): Promise<MyAuthInfoType | undefined> => {
  const response = await fetch(new URL(`/api${memberUrl.getMyAuthInfo()}`, process.env.BASE_URL), {
    method: 'GET',
  });

  const authInfo = await response.json();
  const isUnauthorized = response.status === 401;
  const isNotFound = response.status === 404;

  if (isNotFound || isUnauthorized) {
    return undefined;
  }

  if (!response.ok) {
    return redirect(redirectUrl);
  }

  return authInfo;
};
