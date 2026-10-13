import {
  artPhysicalCandidateFreeGradeIndexArray,
  artPhysicalCandidateFreeSemesterArray,
  artPhysicalCandidateFreeSemesterIndexArray,
  artPhysicalCandidateFreeYearArray,
  artPhysicalGraduateFreeSemesterArray,
  artPhysicalGraduateFreeSemesterIndexArray,
  artPhysicalGraduationArray,
  artPhysicalGraduationIndexArray,
} from './artPhysical';
import { ARTS_PHYSICAL_SUBJECTS } from './subject';

type GraduationType = 'CANDIDATE' | 'GRADUATE' | 'GED';
type LiberalSystemType = '자유학년제' | '자유학기제';

interface GetArtPhysicalArraysParams {
  graduationType: GraduationType;
  isFreeSemester: boolean;
  isFreeGrade: boolean;
}

interface GetArtsPhysicalAchievementLengthParams {
  graduationType: GraduationType;
  liberalSystem: LiberalSystemType | null;
}

export function getArtPhysicalArray({
  graduationType,
  isFreeSemester,
  isFreeGrade,
}: GetArtPhysicalArraysParams) {
  if (graduationType === 'CANDIDATE') {
    if (isFreeSemester) return artPhysicalCandidateFreeSemesterArray;
    if (isFreeGrade) return artPhysicalCandidateFreeYearArray;
  }
  if (isFreeSemester) return artPhysicalGraduateFreeSemesterArray;
  return artPhysicalGraduationArray;
}

export function getArtPhysicalIndexArray({
  graduationType,
  isFreeSemester,
  isFreeGrade,
}: GetArtPhysicalArraysParams) {
  if (graduationType === 'CANDIDATE') {
    if (isFreeSemester) return artPhysicalCandidateFreeSemesterIndexArray;
    if (isFreeGrade) return artPhysicalCandidateFreeGradeIndexArray;
  }
  if (isFreeSemester) return artPhysicalGraduateFreeSemesterIndexArray;
  return artPhysicalGraduationIndexArray;
}

/**
 * 이번 전형에서 채워야 하는 예체능 성적(artsPhysicalAchievement)의 길이. 입력 폼
 * (ArtPhysicalForm)이 그리는 학기 수 × 예체능 과목 수이며, 배열은 학기순번 × 3 + 과목순번
 * 순서로 채워진다.
 *
 * - 졸업예정 + 자유학년제: 2-1 ~ 3-1 → 9
 * - 졸업자 + 자유학년제: 2-1 ~ 3-2 → 12
 * - 졸업예정 + 자유학기제: 1-1 ~ 3-1 → 15
 * - 졸업자 + 자유학기제: 1-1 ~ 3-2 → 18
 *
 * 검정고시이거나 전형이 아직 정해지지 않았으면(null) 예체능 성적을 받지 않으므로 null이다.
 */
export function getArtsPhysicalAchievementLength({
  graduationType,
  liberalSystem,
}: GetArtsPhysicalAchievementLengthParams) {
  if (graduationType === 'GED' || liberalSystem === null) return null;

  const semesters = getArtPhysicalArray({
    graduationType,
    isFreeSemester: liberalSystem === '자유학기제',
    isFreeGrade: liberalSystem === '자유학년제',
  });

  return semesters.length * ARTS_PHYSICAL_SUBJECTS.length;
}
