import { redirect } from 'next/navigation';

import { memberUrl } from 'api/libs';

import type { MyMemberInfoType } from 'types';

/**
 * 나의 멤버 정보를 가져옵니다.
 *
 * @returns 나의 멤버 정보를 반환합니다. 없다면 -> TODO 서버 문서 업데이트 중입니다.
 */
export const getMyMemberInfo = async (
  redirectUrl: string,
): Promise<MyMemberInfoType | undefined> => {
  const response = await fetch(new URL(`${memberUrl.getMyMemberInfo()}`, process.env.BASE_URL), {
    method: 'GET',
  });

  const memberInfo = await response.json();
  const isUnauthorized = response.status === 401;
  const isNotFound = response.status === 404;

  if (isNotFound || isUnauthorized) {
    return undefined;
  }

  if (!response.ok) {
    return redirect(redirectUrl);
  }

  return memberInfo;
};
