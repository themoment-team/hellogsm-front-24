import { SexType, YesNo } from "types";

export type RoleType = "UNAUTHENTICATED" | "APPLICANT" | "ADMIN" | "ROOT";
export type AuthReferrerType = "KAKAO" | "GOOGLE";
export type Majors = "AI" | "SW" | "IOT";

interface MemberInfoType {
  name: string;
  phoneNumber: string;
  birth: string;
  sex: SexType;
}

export interface MyMemberInfoType extends MemberInfoType {
  memberId: number;
}

export interface MyAuthInfoType {
  memberId: number;
  email: string;
  authReferrerType: AuthReferrerType;
  role: RoleType;
}

export interface MemberRegisterType extends MemberInfoType {
  code: string;
}

export interface SendCodeType {
  phoneNumber: string;
}

export interface MyTestResultType {
  firstTestPassYn: YesNo | null;
  secondTestPassYn: YesNo | null;
  decideMajor: Majors | null;
}

export interface DuplicateType {
  duplicateMemberYn: YesNo | null;
}
