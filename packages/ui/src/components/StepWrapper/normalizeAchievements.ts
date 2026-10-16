import {
  AchievementFieldType,
  clearFreeSemesterArtsPhysical,
  getArtsPhysicalAchievementLength,
  getUsedAchievementFields,
} from '@repo/constants';
import { GraduationTypeValueEnum, Step4FormType } from '@repo/types';

/**
 * 이번 전형에서 쓰지 않는 학기에 값이 남아 있으면 서버로 나가기 직전에 null로 지운다.
 *
 * 학기 열을 비우는 초기화는 입력 폼(FreeGradeForm/FreeSemesterForm)의 mount 시 한 번만
 * 돌기 때문에, 그 뒤에 값을 집어넣는 경로(생기부 OCR 자동입력)를 막지 못한다. 실제로
 * 자유학년제 졸업자가 OCR을 쓰면 1-1·1-2가 0('없음')으로 채워진 채 제출돼 성적 계산이
 * 틀어졌다. 입력 경로마다 막는 것과 별개로, 페이로드를 만드는 이 마지막 지점에서 한 번
 * 더 거른다.
 *
 * 아직 입력이 시작되지 않은 학기(undefined)는 undefined 그대로 둔다 — step 1~3 임시저장은
 * step 4 값이 전부 비어 있는 채로 나가는데, 이걸 null로 바꾸면 그동안 서버가 받아 오던
 * payload 모양이 달라진다.
 */
export const normalizeAchievements = (
  values: Step4FormType,
  graduationType: GraduationTypeValueEnum,
): Record<AchievementFieldType, number[] | null | undefined> => {
  const usedFields = getUsedAchievementFields({
    liberalSystem: values.liberalSystem,
    graduationType,
    freeSemester: values.freeSemester,
  });

  const normalize = (field: AchievementFieldType) => {
    // 스키마상 number[] | null이지만, 아직 기본값이 채워지지 않은 학기는 런타임에 undefined다
    const value = values[field] as number[] | null | undefined;
    if (value === undefined || usedFields.includes(field)) return value;
    return null;
  };

  return {
    achievement1_1: normalize('achievement1_1'),
    achievement1_2: normalize('achievement1_2'),
    achievement2_1: normalize('achievement2_1'),
    achievement2_2: normalize('achievement2_2'),
    achievement3_1: normalize('achievement3_1'),
    achievement3_2: normalize('achievement3_2'),
  };
};

/**
 * 화면에 없는 예체능 칸에 남은 값을 서버로 나가기 직전에 정리한다.
 *
 * 1. 이번 전형에서 쓰지 않는 학기의 예체능 성적이 뒤에 남아 있으면 잘라낸다.
 *
 * 졸업자로 예체능을 채운 뒤 step 2에서 졸업예정으로 바꾸면, 화면에서는 3학년 2학기 열이
 * 사라지지만 값은 배열 끝에 그대로 남는다. 서버는 들어온 칸을 전부 평균에 넣으므로 보이지
 * 않는 성적이 점수에 섞인다. 같은 전형 안에서는 졸업예정의 배치가 졸업자 배치의 앞부분과
 * 같아서 기대 길이만큼만 남기면 된다.
 *
 * 모자란 경우는 건드리지 않는다 — 덜 채운 값은 createStep4Schema가 제출 전에 막고, 임시저장은
 * 작성 중인 값을 그대로 보내야 한다.
 *
 * 2. 자유학기제의 자유학기 칸(과목 3개)은 0으로 맞춘다.
 *
 * 이 칸은 화면에 '자유학기제'로만 표시되어 고칠 수 없고 출력물에서도 빗금 처리되는데, 0으로
 * 맞추는 effect(ArtPhysicalForm)는 자유학기를 지정할 때만 돈다. 그래서 자유학기를 먼저 정한
 * 뒤 생기부 OCR을 적용하면 OCR 값이 이 칸에 그대로 남았고, 점수 계산은 freeSemester를 보지
 * 않고 0이 아닌 칸을 모두 평균에 넣어 보이지 않는 성적이 점수에 섞였다.
 */
export const normalizeArtsPhysicalAchievement = (
  values: Step4FormType,
  graduationType: GraduationTypeValueEnum,
): number[] | null | undefined => {
  // 스키마상 number[] | null이지만, 아직 아무 칸도 선택하지 않았으면 런타임에 undefined다
  const value = values.artsPhysicalAchievement as number[] | null | undefined;
  if (!value || !graduationType) return value;

  const expectedLength = getArtsPhysicalAchievementLength({
    graduationType,
    liberalSystem: values.liberalSystem,
  });

  const trimmed =
    expectedLength === null || value.length <= expectedLength
      ? value
      : value.slice(0, expectedLength);

  return clearFreeSemesterArtsPhysical({
    artsPhysicalAchievement: trimmed,
    liberalSystem: values.liberalSystem,
    freeSemester: values.freeSemester,
  });
};
