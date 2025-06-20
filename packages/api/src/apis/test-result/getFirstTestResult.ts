/**
 * 1차 합격 여부를 조회합니다
 *
 * @returns 1차 합격 여부를 반환합니다
 */

import { FirstTestResultType } from 'types';

import { get, testResultUrl } from 'api/libs';

export const getFirstTestResult = async (
  name: string,
  birth: string,
  phoneNumber: string,
): Promise<FirstTestResultType | undefined> => {
  try {
    const finalTestResult = await get<FirstTestResultType>(
      testResultUrl.getFirstTestResult(name, birth, phoneNumber),
    );

    return finalTestResult;
  } catch {
    return undefined;
  }
};
