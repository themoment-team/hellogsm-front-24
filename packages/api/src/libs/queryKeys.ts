import { GraduationType } from 'types';

export const exampleQueryKeys = {
  getExampleData: () => ['example'],
} as const;

export const oneseoQueryKeys = {
  postTempStorage: () => ['post', 'temp', 'oneseo', 'storage'],
  postMyOneseo: () => ['post', 'my', 'oneseo'],
  postMockScore: (type: GraduationType) => ['mock', 'oneseo', 'score', type],
  putOneseoByMemberId: (memberId: number) => ['put', 'oneseo', memberId],
  postImage: () => ['post', 'certification', 'image'],
  getSearchedOneseoList: (
    page: number,
    size: number,
    testResultTag: string,
    screeningTag?: string,
    isSubmitted?: string,
    keyword?: string,
  ) => ['oneseo', 'list', page, size, testResultTag, screeningTag, isSubmitted, keyword],
  patchArrivedStatus: (memberId: number) => ['patch', 'arrivedStatus', memberId],
  patchAgreeDocStatus: (memberId: number) => ['patch', 'agreeDocStatus', memberId],
  patchAptitudeScore: (memberId: number) => ['patch', 'aptitudeScore', memberId],
  patchInterviewScore: (memberId: number) => ['patch', 'interviewScore', memberId],
  getAdmissionTickets: () => ['tickets'],
  getMyOneseo: () => ['get', 'my', 'oneseo'],
  getEditability: () => ['get', 'my', 'editability'],
} as const;

export const memberQueryKeys = {
  getMyMemberInfo: () => ['member', 'my'],
  getMyAuthInfo: () => ['member', 'my', 'auth'],
  getMyFirstTestResultInfo: () => ['member', 'first', 'result'],
  getMySecondTestResultInfo: () => ['member', 'second', 'result'],
  getCheckDuplicate: (phoneNumber: string) => ['member', 'duplicate', 'check', phoneNumber],
};

export const operationQueryKeys = {
  getOperation: () => ['operation', 'status'],
  postFirstResult: () => ['operation', 'first', 'result'],
  postSecondResult: () => ['operation', 'second', 'result'],
};

export const testResultQueryKeys = {
  getFirstTestResult: (name: string, birth: string, phoneNumber: string) => [
    'test',
    'result',
    'first',
    name,
    birth,
    phoneNumber,
  ],
  getFinalTestResult: (name: string, birth: string, phoneNumber: string) => [
    'test',
    'result',
    'final',
    name,
    birth,
    phoneNumber,
  ],
};
