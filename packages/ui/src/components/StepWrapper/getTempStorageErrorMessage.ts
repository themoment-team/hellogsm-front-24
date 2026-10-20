import { isAxiosError } from 'axios';

import { parseServerErrorMessage } from './parseServerErrorMessage';

/**
 * 원서 임시저장에 실패했을 때 사용자에게 보여줄 안내 문구를 만든다.
 *
 * 임시저장도 요청 검증(봉사시간 음수, 과목명 중복)에 걸리면 400을 받는데, 공통 실패 문구만 띄우면
 * 지원자가 무엇을 고쳐야 할지 알 수 없어 400이면 서버가 알려준 원인을 덧붙인다.
 */
export const getTempStorageErrorMessage = (error: unknown) => {
  const fallback = '임시 저장을 실패하였습니다.';

  if (!isAxiosError<{ message?: string }>(error) || error.response?.status !== 400) {
    return fallback;
  }

  const reason = parseServerErrorMessage(error.response.data?.message);

  return reason ? `${fallback} ${reason}` : fallback;
};
