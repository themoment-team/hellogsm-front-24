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

/**
 * 원서 제출이 실패한 뒤 작성 내용을 되살리는 임시저장까지 실패했을 때의 안내 문구를 만든다.
 *
 * 제출 직전 인적사항 PATCH가 서버의 임시저장을 지우므로, 복구가 실패하면 원서도 임시저장도 남지
 * 않아 새로고침하면 작성 내용이 사라진다. 제출과 같은 이유(요청 검증 등)로 복구도 실패할 수 있어
 * 제출 실패 안내와 별개로 알린다. 마감 후 403은 제출 실패 안내(접수 기간이 아님)와 원인이 같아
 * 겹치지 않도록 null을 돌려준다.
 */
export const getRestoreTempStorageErrorMessage = (error: unknown) => {
  if (isAxiosError(error) && error.response?.status === 403) return null;

  const message =
    '작성 중인 내용이 임시 저장되지 않았습니다. 새로고침하거나 페이지를 나가면 입력한 내용이 사라질 수 있습니다.';

  const reason =
    isAxiosError<{ message?: string }>(error) && error.response?.status === 400
      ? parseValidationErrorMessage(error.response.data?.message)
      : undefined;

  return reason ? `${message} ${reason}` : message;
};
