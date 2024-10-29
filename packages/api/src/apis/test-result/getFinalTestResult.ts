/**
 * 최종 합격 여부를 조회합니다
 *
 * @returns 최종 합격 여부를 반환합니다
 */

import { FinalTestResultType } from 'types';

import { get, testResultUrl } from 'api/libs';

export const getFinalTestResult = async (
  phoneNumber: string,
  code: string,
  examinationNumber: string,
): Promise<FinalTestResultType | undefined> => {
  try {
    const finalTestResult = await get<FinalTestResultType>(
      testResultUrl.getFinalTestResult(phoneNumber, code, examinationNumber),
    );

    return finalTestResult;
  } catch {
    return undefined;
  }
};
