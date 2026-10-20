import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { oneseoUrl } from '@repo/api/lib';
import { OneseoListType } from '@repo/types';

import {
  OneseoListQuery,
  toOneseoListRequestParams,
} from '@/pageContainer/MainPage/oneseoListQuery';

interface GetOneseoListParams {
  redirectUrl: string;
  query: OneseoListQuery;
}

/**
 * 초기 원서 리스트를 가져옵니다.
 *
 * @returns 초기 리스트를 반환합니다. 리스트가 없다면 로그인 페이지로 리다이렉트 합니다.
 */
export const getOneseoList = async ({
  redirectUrl,
  query,
}: GetOneseoListParams): Promise<OneseoListType | undefined> => {
  const session = (await cookies()).get('SESSION')?.value;
  const {
    page,
    size,
    testResultTag,
    screeningTag,
    isSubmitted,
    keyword,
    status,
    sortBy,
    sortDirection,
  } = toOneseoListRequestParams(query);

  const response = await fetch(
    new URL(
      `${oneseoUrl.getSearchedOneseoList(page, size, testResultTag, screeningTag, isSubmitted, keyword, status, sortBy, sortDirection)}`,
      process.env.NEXT_PUBLIC_API_BASE_URL,
    ),
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `SESSION=${session}`,
      },
    },
  );

  if (response.status === 404) {
    return undefined;
  }

  if (!response.ok) {
    return redirect(redirectUrl);
  }

  const oneseoList = await response.json();

  return oneseoList.data;
};
