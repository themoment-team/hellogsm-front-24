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
  postTempStorage: () => '/oneseo/v3/temp-storage',
  postMyOneseo: () => '/oneseo/v3/oneseo/me',
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
} as const;

export const memberUrl = {
  getMyMemberInfo: () => '/member/v3/member/me',
  getMyAuthInfo: () => '/member/v3/auth-info/me',
  postMemberRegister: () => '/member/v3/member/me',
};
