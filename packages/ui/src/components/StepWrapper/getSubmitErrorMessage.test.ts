import assert from 'node:assert/strict';
import test from 'node:test';

import { AxiosError, AxiosHeaders, AxiosResponse } from 'axios';

import { getSubmitErrorMessage } from './getSubmitErrorMessage';

const axiosError = (status?: number, message?: string) => {
  const config = { headers: new AxiosHeaders() };
  const response: AxiosResponse | undefined =
    status === undefined
      ? undefined
      : { status, statusText: '', headers: {}, config, data: { message } };

  return new AxiosError('Request failed', undefined, config, undefined, response);
};

test('응답이 없으면 네트워크 연결 안내를 보여준다', () => {
  assert.equal(
    getSubmitErrorMessage(axiosError(), '제출'),
    '네트워크 연결이 불안정해 원서 제출에 실패했습니다. 연결 상태를 확인한 후 다시 시도해주세요.',
  );
});

test('400이면 서버 message를 그대로 보여준다', () => {
  assert.equal(
    getSubmitErrorMessage(axiosError(400, '이미 원서가 존재합니다.'), '제출'),
    '이미 원서가 존재합니다.',
  );
});

test('400인데 서버 message가 없으면 기본 실패 문구를 보여준다', () => {
  assert.equal(
    getSubmitErrorMessage(axiosError(400), '제출'),
    '원서 제출에 실패했습니다. 잠시 후 다시 시도해주세요.',
  );
});

test('401이면 로그인 만료 안내를 보여준다', () => {
  assert.equal(
    getSubmitErrorMessage(axiosError(401), '수정'),
    '로그인이 만료되었습니다. 다시 로그인한 후 수정해주세요.',
  );
});

test('403이면 서버 원문 대신 접수 기간 안내를 보여준다', () => {
  const serverMessage =
    'POST /oneseo/v3/oneseo/me 요청이 거부되었습니다. 현재 시간: 2026-10-22T17:00:01, 해당 요청은 ... 이내에만 처리 가능합니다.';

  assert.equal(
    getSubmitErrorMessage(axiosError(403, serverMessage), '제출'),
    '원서 접수 기간이 아니어서 제출할 수 없습니다.',
  );
});

test('5xx나 axios 에러가 아니면 기본 실패 문구를 보여준다', () => {
  assert.equal(
    getSubmitErrorMessage(axiosError(500, 'Internal Server Error'), '수정'),
    '원서 수정에 실패했습니다. 잠시 후 다시 시도해주세요.',
  );
  assert.equal(
    getSubmitErrorMessage(new Error('unknown'), '제출'),
    '원서 제출에 실패했습니다. 잠시 후 다시 시도해주세요.',
  );
});
