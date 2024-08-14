import { SexType } from "types";

export type RoleType = "UNAUTHENTICATED" | "APPLICANT" | "ADMIN" | "ROOT";

export type AuthReferrerType = "KAKAO" | "GOOGLE";

export interface MyMemberInfoType {
  memberId: number;
  name: string;
  phoneNumber: string;
  birth: string;
  sex: SexType;
}

export interface MyAuthInfoType {
  memberId: number;
  email: string;
  authReferrerType: AuthReferrerType;
  role: RoleType;
}
