import { ScoreFormType } from "client/types";
import { FreeSemesterType } from "types";

export interface MiddleSchoolAchievementType extends ScoreFormType {
  achievement1_1: string[] | null;
  achievement1_2: string[] | null;
  achievement2_1: string[] | null;
  achievement2_2: string[] | null;
  achievement3_1: string[] | null;
  newSubjects: string[] | null;
  artsPhysicalAchievement: string[];
  absentDays: string[];
  attendanceDays: string[];
  volunteerTime: string[];
  liberalSystem: "자유학년제" | "자유학기제";
  freeSemester: FreeSemesterType;
}

export interface GEDAchievementType {
  gedTotalScore: number;
}
