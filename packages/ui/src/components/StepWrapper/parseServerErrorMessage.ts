// 서버 GlobalExceptionHandler는 HashMap을 직렬화하므로 fieldErrors/globalErrors의 순서가 보장되지 않는다
const VALIDATION_ERROR_PATTERN = /^\{'(fieldErrors|globalErrors)'/;

interface ValidationErrorBody {
  fieldErrors?: Record<string, string>;
  globalErrors?: Record<string, string>;
}

/**
 * 서버 400 응답의 message를 사용자에게 보여줄 문구로 바꾼다.
 *
 * 요청 DTO 검증(MethodArgumentNotValidException)에 걸리면 서버는 필드별 메시지를 JSON으로 만든 뒤
 * 큰따옴표를 '로 바꾼 문자열을 message에 담는다.
 *   {'fieldErrors':{'middleSchoolAchievement.volunteerTime[2]':'봉사시간은 0 이상이어야 합니다.'}}
 * 그대로 띄우면 이 원문이 사용자에게 노출되므로 필드별 메시지만 꺼낸다. 꺼낼 수 없으면 undefined를
 * 돌려 호출부의 기본 문구를 쓰게 한다. 이 형식이 아닌 message는 사용자용 문구이므로 그대로 돌려준다.
 */
export const parseServerErrorMessage = (message?: string) => {
  if (!message) return undefined;

  if (!VALIDATION_ERROR_PATTERN.test(message)) return message;

  try {
    const { fieldErrors, globalErrors } = JSON.parse(
      message.replace(/'/g, '"'),
    ) as ValidationErrorBody;

    // 봉사시간 여러 칸이 음수면 같은 메시지가 칸마다 오므로 한 번만 보여준다
    const messages = [
      ...new Set([...Object.values(fieldErrors ?? {}), ...Object.values(globalErrors ?? {})]),
    ];

    return messages.length > 0 ? messages.join(' ') : undefined;
  } catch {
    return undefined;
  }
};
