import type { OneseoEditStatusTag, OneseoSortBy, SortDirection, YesNo } from '@repo/types';

import type { SideBarType } from '@/schemas';

/**
 * 어드민 지원자 목록의 탭·필터·검색어·정렬·페이지 상태를 URL 쿼리스트링과 주고받습니다.
 * 서버(`app/page.tsx`)와 클라이언트(`MainPage`)가 같은 조건으로 목록을 조회하도록 함께 사용합니다.
 */

export type ScreeningTagFilter = 'GENERAL' | 'SPECIAL' | 'EXTRA';

export interface OneseoListSort {
  sortBy: OneseoSortBy;
  sortDirection: SortDirection;
}

export interface OneseoListQuery {
  testResultTag: SideBarType;
  /** 빈 문자열은 필터 없음 */
  screeningTag: ScreeningTagFilter | '';
  /** 빈 문자열은 필터 없음 */
  isSubmitted: YesNo | '';
  /** REQUEST 탭에서만 요청에 사용 */
  status: OneseoEditStatusTag;
  keyword: string;
  /** null은 기본 순서(접수번호 내림차순) */
  sort: OneseoListSort | null;
  /** 0부터 시작 (URL에는 1부터 시작하는 값으로 저장) */
  page: number;
}

export type SearchParamsRecord = Record<string, string | string[] | undefined>;

export const ONESEO_LIST_PAGE_SIZE = 10;

export const DEFAULT_ONESEO_LIST_QUERY: OneseoListQuery = {
  testResultTag: 'ALL',
  screeningTag: '',
  isSubmitted: '',
  status: 'ANY_EDIT',
  keyword: '',
  sort: null,
  page: 0,
};

const TEST_RESULT_TAGS: readonly SideBarType[] = [
  'ALL',
  'REQUEST',
  'FIRST_PASS',
  'FINAL_PASS',
  'FALL',
];
const SCREENING_TAGS: readonly ScreeningTagFilter[] = ['GENERAL', 'SPECIAL', 'EXTRA'];
const YES_NO: readonly YesNo[] = ['YES', 'NO'];
const EDIT_STATUS_TAGS: readonly OneseoEditStatusTag[] = ['ANY_EDIT', 'REQUESTED', 'APPROVED'];
const SORT_BY_LIST: readonly OneseoSortBy[] = [
  'SUBMIT_CODE',
  'NAME',
  'SCHOOL_NAME',
  'SCREENING',
  'COMPETENCY_SCORE',
  'INTERVIEW_SCORE',
  'REAL_ONESEO_ARRIVED',
  'FIRST_TEST_PASS',
  'SECOND_TEST_PASS',
  'ENTRANCE_INTENTION',
];

const getFirst = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const pickOneOf = <T extends string>(
  allowed: readonly T[],
  value: string | undefined,
  fallback: T,
): T => (allowed.includes(value as T) ? (value as T) : fallback);

const parsePage = (value: string | undefined) => {
  if (value === undefined || !/^\d+$/.test(value)) return DEFAULT_ONESEO_LIST_QUERY.page;

  const page = Number(value);
  return Number.isSafeInteger(page) && page >= 1 ? page - 1 : DEFAULT_ONESEO_LIST_QUERY.page;
};

/**
 * `sort`가 잘못되면 정렬하지 않고, `order`가 없거나 잘못되면 오름차순으로 봅니다.
 */
const parseSort = (sort: string | undefined, order: string | undefined): OneseoListSort | null => {
  if (!SORT_BY_LIST.includes(sort as OneseoSortBy)) return null;

  return {
    sortBy: sort as OneseoSortBy,
    sortDirection: order?.toLowerCase() === 'desc' ? 'DESC' : 'ASC',
  };
};

/**
 * URL 쿼리를 목록 조건으로 바꿉니다. 잘못된 값은 기본값으로 대체합니다.
 */
export const parseOneseoListQuery = (searchParams: SearchParamsRecord): OneseoListQuery => ({
  testResultTag: pickOneOf(
    TEST_RESULT_TAGS,
    getFirst(searchParams.tab),
    DEFAULT_ONESEO_LIST_QUERY.testResultTag,
  ),
  screeningTag: pickOneOf<ScreeningTagFilter | ''>(
    SCREENING_TAGS,
    getFirst(searchParams.screening),
    '',
  ),
  isSubmitted: pickOneOf<YesNo | ''>(YES_NO, getFirst(searchParams.submitted), ''),
  status: pickOneOf(
    EDIT_STATUS_TAGS,
    getFirst(searchParams.status),
    DEFAULT_ONESEO_LIST_QUERY.status,
  ),
  keyword: getFirst(searchParams.q) ?? DEFAULT_ONESEO_LIST_QUERY.keyword,
  sort: parseSort(getFirst(searchParams.sort), getFirst(searchParams.order)),
  page: parsePage(getFirst(searchParams.page)),
});

/**
 * 목록 조건을 URL 쿼리스트링으로 바꿉니다. 기본값인 항목은 생략합니다.
 */
export const toOneseoListSearchString = (query: OneseoListQuery) => {
  const searchParams = new URLSearchParams();

  if (query.testResultTag !== DEFAULT_ONESEO_LIST_QUERY.testResultTag)
    searchParams.set('tab', query.testResultTag);
  if (query.screeningTag) searchParams.set('screening', query.screeningTag);
  if (query.isSubmitted) searchParams.set('submitted', query.isSubmitted);
  if (query.status !== DEFAULT_ONESEO_LIST_QUERY.status) searchParams.set('status', query.status);
  if (query.keyword) searchParams.set('q', query.keyword);
  if (query.sort) {
    searchParams.set('sort', query.sort.sortBy);
    searchParams.set('order', query.sort.sortDirection.toLowerCase());
  }
  if (query.page !== DEFAULT_ONESEO_LIST_QUERY.page)
    searchParams.set('page', String(query.page + 1));

  return searchParams.toString();
};

/**
 * 목록 조건을 원서 검색 API 파라미터로 바꿉니다.
 * REQUEST 탭은 전체 지원자 중 수정 상태로만 거르므로 서류 제출 여부 필터를 보내지 않습니다.
 */
export const toOneseoListRequestParams = (query: OneseoListQuery) => {
  const isRequestTab = query.testResultTag === 'REQUEST';

  return {
    page: query.page,
    size: ONESEO_LIST_PAGE_SIZE,
    testResultTag: isRequestTab ? 'ALL' : query.testResultTag,
    screeningTag: query.screeningTag,
    isSubmitted: isRequestTab ? '' : query.isSubmitted,
    keyword: query.keyword,
    status: isRequestTab ? query.status : undefined,
    sortBy: query.sort?.sortBy,
    sortDirection: query.sort?.sortDirection,
  };
};
