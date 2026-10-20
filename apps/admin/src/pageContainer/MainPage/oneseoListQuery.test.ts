import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  DEFAULT_ONESEO_LIST_QUERY,
  parseOneseoListQuery,
  toOneseoListRequestParams,
  toOneseoListSearchString,
} from './oneseoListQuery';

test('쿼리가 없으면 기본 조건을 반환한다', () => {
  assert.deepEqual(parseOneseoListQuery({}), DEFAULT_ONESEO_LIST_QUERY);
});

test('URL 쿼리를 목록 조건으로 바꾸고 page는 0부터 시작하는 값으로 바꾼다', () => {
  assert.deepEqual(
    parseOneseoListQuery({
      tab: 'REQUEST',
      screening: 'EXTRA',
      submitted: 'NO',
      status: 'APPROVED',
      q: '김',
      page: '3',
    }),
    {
      testResultTag: 'REQUEST',
      screeningTag: 'EXTRA',
      isSubmitted: 'NO',
      status: 'APPROVED',
      keyword: '김',
      page: 2,
    },
  );
});

test('잘못된 값은 기본값으로 대체한다', () => {
  assert.deepEqual(
    parseOneseoListQuery({
      tab: 'FOO',
      screening: 'EXTRA_VETERANS',
      submitted: 'yes',
      status: 'NONE',
    }),
    DEFAULT_ONESEO_LIST_QUERY,
  );
});

test('page가 1 이상의 정수가 아니면 첫 페이지로 대체한다', () => {
  for (const page of ['abc', '0', '-1', '1.5', '', ' 2', '1e3', '99999999999999999999']) {
    assert.equal(parseOneseoListQuery({ page }).page, 0, `page=${page}`);
  }
});

test('같은 키가 여러 번 오면 첫 번째 값을 사용한다', () => {
  assert.equal(parseOneseoListQuery({ tab: ['FALL', 'ALL'] }).testResultTag, 'FALL');
});

test('기본 조건은 빈 쿼리스트링이 된다', () => {
  assert.equal(toOneseoListSearchString(DEFAULT_ONESEO_LIST_QUERY), '');
});

test('기본값이 아닌 항목만 쿼리스트링에 넣고 page는 1부터 시작하는 값으로 넣는다', () => {
  assert.equal(
    toOneseoListSearchString({
      ...DEFAULT_ONESEO_LIST_QUERY,
      testResultTag: 'FIRST_PASS',
      screeningTag: 'GENERAL',
      keyword: '김',
      page: 2,
    }),
    'tab=FIRST_PASS&screening=GENERAL&q=%EA%B9%80&page=3',
  );
});

test('쿼리스트링으로 바꾼 뒤 다시 읽으면 같은 조건이 된다', () => {
  const query = {
    testResultTag: 'REQUEST',
    screeningTag: 'SPECIAL',
    isSubmitted: 'YES',
    status: 'REQUESTED',
    keyword: '광주 & 중학교',
    page: 4,
  } as const;

  const searchParams = new URLSearchParams(toOneseoListSearchString(query));

  assert.deepEqual(parseOneseoListQuery(Object.fromEntries(searchParams)), query);
});

test('REQUEST 탭은 전체 지원자를 수정 상태로 조회하고 서류 제출 여부는 보내지 않는다', () => {
  const params = toOneseoListRequestParams({
    ...DEFAULT_ONESEO_LIST_QUERY,
    testResultTag: 'REQUEST',
    isSubmitted: 'YES',
    status: 'REQUESTED',
  });

  assert.equal(params.testResultTag, 'ALL');
  assert.equal(params.isSubmitted, '');
  assert.equal(params.status, 'REQUESTED');
});

test('REQUEST 탭이 아니면 수정 상태는 보내지 않는다', () => {
  const params = toOneseoListRequestParams({
    ...DEFAULT_ONESEO_LIST_QUERY,
    testResultTag: 'FALL',
    isSubmitted: 'NO',
    status: 'APPROVED',
    page: 1,
  });

  assert.deepEqual(params, {
    page: 1,
    size: 10,
    testResultTag: 'FALL',
    screeningTag: '',
    isSubmitted: 'NO',
    keyword: '',
    status: undefined,
  });
});
