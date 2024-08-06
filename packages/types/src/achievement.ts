import { FreeSemesterType } from "types";

export interface MiddleSchoolAchievementType {
  achievement1_1: number[] | null;
  achievement1_2: number[] | null;
  achievement2_1: number[] | null;
  achievement2_2: number[] | null;
  achievement3_1: number[] | null;
  newSubjects: string[] | null;
  artsPhysicalAchievement: number[];
  absentDays: number[];
  attendanceDays: number[];
  volunteerTime: number[];
  liberalSystem: "자유학년제" | "자유학기제";
  freeSemester: FreeSemesterType;
}

export interface GEDAchievementType {
  gedTotalScore: number;
}
