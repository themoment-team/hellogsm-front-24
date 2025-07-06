import { FreeSemesterValueEnum } from './value';

export type SemesterIdType =
  | "achievement1_1"
  | "achievement1_2"
  | "achievement2_1"
  | "achievement2_2"
  | "achievement3_1"
  | "achievement3_2";

export type SemesterTitleType =
  | "1학년 1학기"
  | "1학년 2학기"
  | "2학년 1학기"
  | "2학년 2학기"
  | "3학년 1학기"
  | "3학년 2학기";

export interface AchievementType {
  title: SemesterTitleType;
  field: SemesterIdType;
  value?: FreeSemesterValueEnum;
}
