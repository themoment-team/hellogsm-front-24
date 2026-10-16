import { isAxiosError } from 'axios';

/**
 * 원서 최종 제출(또는 원서 수정)에 실패했을 때 사용자에게 보여줄 안내 문구를 만든다.
 *
 * 마감 후 403의 응답 message는 요청 경로와 서버 시각이 들어간 원문이라 그대로 노출하지 않고
 * 상태 코드별 문구를 쓴다. 400은 "이미 원서가 존재합니다."처럼 사용자용으로 작성된 문구라
 * 서버 message를 우선한다.
 */
export const getSubmitErrorMessage = (error: unknown, action: '제출' | '수정') => {
  const fallback = `원서 ${action}에 실패했습니다. 잠시 후 다시 시도해주세요.`;

  if (!isAxiosError<{ message?: string }>(error)) return fallback;

  if (!error.response) {
    return `네트워크 연결이 불안정해 원서 ${action}에 실패했습니다. 연결 상태를 확인한 후 다시 시도해주세요.`;
  }

  switch (error.response.status) {
    case 400:
      return error.response.data?.message ?? fallback;
    case 401:
      return `로그인이 만료되었습니다. 다시 로그인한 후 ${action}해주세요.`;
    case 403:
      return `원서 접수 기간이 아니어서 ${action}할 수 없습니다.`;
    default:
      return fallback;
  }
};
