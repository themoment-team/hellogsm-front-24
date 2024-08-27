import { SexType } from "types";

export type RoleType = "UNAUTHENTICATED" | "APPLICANT" | "ADMIN" | "ROOT";
export type AuthReferrerType = "KAKAO" | "GOOGLE";

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

export interface CodeRegisterType {
  phoneNumber: string;
}
