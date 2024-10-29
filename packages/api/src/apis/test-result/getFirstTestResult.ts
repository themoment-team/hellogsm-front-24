/**
 * 1차 합격 여부를 조회합니다
 *
 * @returns 1차 합격 여부를 반환합니다
 */

import { FirstTestResultType } from 'types';

import { get, testResultUrl } from 'api/libs';

export const getFirstTestResult = async (
  phoneNumber: string,
  code: string,
  submitCode: string,
): Promise<FirstTestResultType | undefined> => {
  try {
    const finalTestResult = await get<FirstTestResultType>(
      testResultUrl.getFirstTestResult(phoneNumber, code, submitCode),
    );

    return finalTestResult;
  } catch {
    return undefined;
  }
};
