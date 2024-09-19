import { GraduationType } from 'types';

const addParameters = (key: string, value: number | string | undefined) => {
  if (!value) {
    return '';
  }

  return `&${key}=${String(value)}`;
};

export const exampleUrl = {
  getExampleData: () => '/example',
} as const;

export const authUrl = {
  getLogin: (provider: 'google' | 'kakao') => `/auth/v3/oauth2/authorization/${provider}`,
  getLogout: () => '/auth/v3/logout',
} as const;

export const oneseoUrl = {
  postMockScore: (type: GraduationType) => `/oneseo/v3/calculate-mock-score?graduationType=${type}`,
  getMyOneseo: () => '/oneseo/v3/oneseo/me',
  postTempStorage: (step: number) => `/oneseo/v3/temp-storage?step=${step}`,
  postMyOneseo: () => '/oneseo/v3/oneseo/me',
  postImage: () => '/oneseo/v3/image',
  getOneseoByMemberId: (memberId: number) => `/oneseo/v3/oneseo/${memberId}`,
  putOneseoByMemberId: (memberId: number) => `/oneseo/v3/oneseo/${memberId}`,
  getSearchedOneseoList: (
    page: number,
    size: number,
    testResultTag: string,
    screeningTag?: string,
    isSubmitted?: string,
    keyword?: string,
  ) =>
    `/oneseo/v3/oneseo/search?page=${page}&size=${size}&testResultTag=${testResultTag}${addParameters('screeningTag', screeningTag)}${addParameters('isSubmitted', isSubmitted)}${addParameters('keyword', keyword)}`,
  getExcel: () => '/oneseo/v3/excel',
  patchArrivedStatus: (memberId: number) => `/oneseo/v3/arrived-status/${memberId}`,
  patchAgreeDocStatus: (memberId: number) => `/oneseo/v3/entrance-intention/${memberId}`,
  patchAptitudeScore: (memberId: number) => `/oneseo/v3/aptitude-score/${memberId}`,
  patchInterviewScore: (memberId: number) => `/oneseo/v3/interview-score/${memberId}`,
  getAdmissionTickets: () => '/oneseo/v3/admission-tickets',
  getEditability: () => '/oneseo/v3/editability',
} as const;

export const memberUrl = {
  getMyMemberInfo: () => '/member/v3/member/me',
  getMyAuthInfo: () => '/member/v3/auth-info/me',
  getMyTestResult: () => '/member/v3/test-result/me',
  postMemberRegister: () => '/member/v3/member/me',
  postSendCode: () => '/member/v3/member/me/send-code',
  postVerifyCode: () => '/member/v3/member/me/auth-code',
} as const;

export const dateUrl = {
  getDate: () => '/date',
} as const;
