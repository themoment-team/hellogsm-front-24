// 서버 GlobalExceptionHandler는 HashMap을 직렬화하므로 fieldErrors/globalErrors의 순서가 보장되지 않는다
const VALIDATION_ERROR_PATTERN = /^\{'(fieldErrors|globalErrors)'/;

interface ValidationErrorBody {
  fieldErrors?: Record<string, string>;
  globalErrors?: Record<string, string>;
}

/**
 * 서버가 message를 직접 지정한 제약("유효한 전화번호가 아닙니다.")은 문장이 '.'으로 끝나지만,
 * message 없이 쓴 제약은 Hibernate 기본 메시지("\"^\\d{4}-...$\"와 일치해야 합니다",
 * "공백일 수 없습니다")가 와서 '.'으로 끝나지 않는다. 정규식이 드러나거나 어느 칸인지 알 수 없는
 * 문구라 사용자에게 보여주지 않는다.
 */
const isUserFacingMessage = (message: string) => message.trim().endsWith('.');

/**
 * 요청 DTO 검증(MethodArgumentNotValidException)에 실패한 400 응답의 message에서 사용자에게
 * 보여줄 문구만 꺼낸다.
 *
 * 서버는 필드별 메시지를 JSON으로 만든 뒤 큰따옴표를 '로 바꾼 문자열을 message에 담는다.
 *   {'fieldErrors':{'middleSchoolAchievement.volunteerTime[2]':'봉사시간은 0 이상이어야 합니다.'}}
 * 이 형식이 아니거나, 파싱할 수 없거나, 보여줄 문구가 남지 않으면 undefined를 돌려준다.
 */
export const parseValidationErrorMessage = (message?: string) => {
  if (!message || !VALIDATION_ERROR_PATTERN.test(message)) return undefined;

  try {
    const { fieldErrors, globalErrors } = JSON.parse(
      message.replace(/'/g, '"'),
    ) as ValidationErrorBody;

    // 봉사시간 여러 칸이 음수면 같은 메시지가 칸마다 오므로 한 번만 보여준다
    const messages = [
      ...new Set([...Object.values(fieldErrors ?? {}), ...Object.values(globalErrors ?? {})]),
    ].filter(isUserFacingMessage);

    return messages.length > 0 ? messages.join(' ') : undefined;
  } catch {
    return undefined;
  }
};

/**
 * 서버 400 응답의 message를 사용자에게 보여줄 문구로 바꾼다.
 *
 * 요청 검증 실패 원문은 parseValidationErrorMessage로 사용자용 문구만 꺼내고(없으면 undefined),
 * 그 외 message는 "이미 원서가 존재합니다."처럼 사용자용으로 작성된 문구로 보고 그대로 돌려준다.
 */
export const parseServerErrorMessage = (message?: string) => {
  if (!message) return undefined;

  return VALIDATION_ERROR_PATTERN.test(message) ? parseValidationErrorMessage(message) : message;
};
