import {
  GEDAchievementType,
  ScreeningType,
  GraduationType,
  MajorType,
  MiddleSchoolAchievementType,
} from "types";

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
  desiredMajors: {
    firstDesiredMajor: MajorType;
    secondDesiredMajor: MajorType;
    thirdDesiredMajor: MajorType;
  };
  privacyDetail: {
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
  };
  middleSchoolAchievement: MiddleSchoolAchievementType &
    GEDAchievementType & {
      artsPhysicalSubjects: string[];
    };
  step: number | null;
}
