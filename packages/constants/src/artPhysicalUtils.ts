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

type FreeSemesterType = '1-1' | '1-2' | '2-1' | '2-2' | '3-1' | '3-2';

/**
 * 자유학기제에서 자유학기로 지정한 학기의 예체능 성적 인덱스(과목 3개). 이 칸은 입력 폼
 * (ArtPhysicalForm)에서 '자유학기제'로만 표시되고 원서 출력물에서도 빗금 처리되므로 항상
 * 0이어야 한다.
 *
 * 자유학기제 표는 졸업예정·졸업자 모두 1학년 1학기부터 시작하므로 학기순번 × 3부터 3칸이다.
 */
export function getFreeSemesterArtsPhysicalIndices(freeSemester: FreeSemesterType | null) {
  if (!freeSemester) return [];
  const semesterParts = freeSemester.split('-');
  const grade = Number(semesterParts[0]);
  const semester = Number(semesterParts[1]);
  if (!Number.isFinite(grade) || !Number.isFinite(semester)) return [];

  const semesterNumber = (grade - 1) * 2 + (semester - 1);
  if (semesterNumber < 0) return [];

  return ARTS_PHYSICAL_SUBJECTS.map((_, subjectIndex) => semesterNumber * 3 + subjectIndex);
}
