import { GraduationType } from 'types';

export const exampleQueryKeys = {
  getExampleData: () => ['example'],
} as const;

export const oneseoQueryKeys = {
  postTempStorage: () => ['post', 'temp', 'oneseo', 'storage'],
  postMyOneseo: () => ['post', 'my', 'oneseo'],
  postMockScore: (type: GraduationType) => ['mock', 'oneseo', 'score', type],
  putOneseoByMemberId: (memberId: number) => ['put', 'oneseo', memberId],
  getSearchedOneseoList: (
    page: number,
    size: number,
    testResultTag: string,
    screeningTag?: string,
    isSubmitted?: string,
    keyword?: string,
  ) => ['oneseo', 'list', page, size, testResultTag, screeningTag, isSubmitted, keyword],
  getAdmissionTickets: () => ['tickets'],
  getMyOneseo: () => ['ge', 'my', 'oneseo'],
} as const;

export const memberQueryKeys = {
  getMyMemberInfo: () => ['member', 'my'],
  getMyAuthInfo: () => ['member', 'my', 'auth'],
};
