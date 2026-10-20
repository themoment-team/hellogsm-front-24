import { isAxiosError } from 'axios';

import { parseValidationErrorMessage } from './parseServerErrorMessage';

/**
 * 원서 임시저장에 실패했을 때 사용자에게 보여줄 안내 문구를 만든다.
 *
 * 임시저장도 요청 검증(봉사시간 음수, 과목명 중복)에 걸리면 400을 받는데, 공통 실패 문구만 띄우면
 * 지원자가 무엇을 고쳐야 할지 알 수 없어 검증 실패 원인을 덧붙인다. 같은 400이라도
 * HttpMessageNotReadableException 등은 "JSON parse error: ..." 같은 개발자용 원문이 message로
 * 오므로, 검증 실패 형식에서 사용자용 문구를 꺼냈을 때만 덧붙인다.
 */
export const getTempStorageErrorMessage = (error: unknown) => {
  const fallback = '임시 저장을 실패하였습니다.';

  if (!isAxiosError<{ message?: string }>(error) || error.response?.status !== 400) {
    return fallback;
  }

  const reason = parseValidationErrorMessage(error.response.data?.message);

  return reason ? `${fallback} ${reason}` : fallback;
};
