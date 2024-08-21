export type ScreeningType = "GENERAL" | "SPECIAL" | "EXTRA_VETERANS" | "EXTRA_ADMISSION";

export type MajorType = "SW" | "AI" | "IOT";

export type GraduationType = "CANDIDATE" | "GRADUATE" | "GED";

export type FreeSemesterType = "1-1" | "1-2" | "2-1" | "2-2" | "3-1" | null;

export type LiberalSystemType = "자유학년제" | "자유학기제";

export type SexType = "MALE" | "FEMALE";

export type YesNo = "YES" | "NO";

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
  liberalSystem: LiberalSystemType;
  freeSemester: FreeSemesterType;
}

export interface GEDAchievementType {
  gedTotalScore: number;
}

export interface DesireMajorsType {
  firstDesiredMajor: MajorType;
  secondDesiredMajor: MajorType;
  thirdDesiredMajor: MajorType;
}

export interface PrivacyDetailType {
  name: string;
  sex: string;
  birth: string;
  phoneNumber: string;
  graduationType: GraduationType;
  address: string;
  detailAddress: string;
  guardianName: string;
  guardianPhoneNumber: string;
  relationshipWithGuardian: string;
  schoolName: string;
  schoolAddress: string;
  schoolTeacherName: string;
  schoolTeacherPhoneNumber: string;
  profileImg: string;
}

export interface PostOneseoType {
  guardianName: string;
  guardianPhoneNumber: string;
  relationshipWithGuardian: string;
  profileImg: string;
  address: string;
  detailAddress: string;
  graduationType: GraduationType;
  schoolTeacherName: string;
  schoolTeacherPhoneNumber: string;
  firstDesiredMajor: MajorType;
  secondDesiredMajor: MajorType;
  thirdDesiredMajor: MajorType;
  middleSchoolAchievement: MiddleSchoolAchievementType &
    GEDAchievementType & { artsPhysicalSubjects: string[] };
  schoolName: string;
  schoolAddress: string;
  screening: ScreeningType;
}

export interface GetMyOneseoType {
  oneseoId: number;
  submitCode: string;
  wantedScreening: ScreeningType;
  desiredMajors: DesireMajorsType;
  privacyDetail: PrivacyDetailType;
  middleSchoolAchievement: MiddleSchoolAchievementType &
    GEDAchievementType & {
      artsPhysicalSubjects: string[];
      generalSubjects: string[];
    };
  step: number | null;
}

export interface OneseoType {
  memberId: number;
  submitCode: string;
  realOneseoArrivedYn: YesNo;
  name: string;
  screening: ScreeningType;
  schoolName: string;
  phoneNumber: string;
  guardianPhoneNumber: string;
  schoolTeacherPhoneNumber: string;
  firstTestPassYn: YesNo;
  aptitudeEvaluationScore: number;
  interviewScore: number;
  secondTestPassYn: YesNo;
}

export interface OneseoListType {
  info: { totalPages: number; totalElements: number };
  oneseos: OneseoType[];
}
