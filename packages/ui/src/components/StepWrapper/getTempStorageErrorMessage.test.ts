import assert from 'node:assert/strict';
import test from 'node:test';

import { AxiosError, AxiosHeaders, AxiosResponse } from 'axios';

import {
  getRestoreTempStorageErrorMessage,
  getTempStorageErrorMessage,
} from './getTempStorageErrorMessage';

const axiosError = (status?: number, message?: string) => {
  const config = { headers: new AxiosHeaders() };
  const response: AxiosResponse | undefined =
    status === undefined
      ? undefined
      : { status, statusText: '', headers: {}, config, data: { message } };

  return new AxiosError('Request failed', undefined, config, undefined, response);
};

test('봉사시간 음수로 400이면 검증 메시지를 덧붙인다', () => {
  assert.equal(
    getTempStorageErrorMessage(
      axiosError(
        400,
        "{'fieldErrors':{'middleSchoolAchievement.volunteerTime[2]':'봉사시간은 0 이상이어야 합니다.'}}",
      ),
    ),
    '임시 저장을 실패하였습니다. 봉사시간은 0 이상이어야 합니다.',
  );
});

test('과목명 중복으로 400이면 검증 메시지를 덧붙인다', () => {
  assert.equal(
    getTempStorageErrorMessage(
      axiosError(
        400,
        "{'fieldErrors':{'middleSchoolAchievement':'중복된 이름의 과목이 입력되었습니다.'}}",
      ),
    ),
    '임시 저장을 실패하였습니다. 중복된 이름의 과목이 입력되었습니다.',
  );
});

test('400인데 꺼낼 메시지가 없으면 공통 문구만 보여준다', () => {
  assert.equal(getTempStorageErrorMessage(axiosError(400)), '임시 저장을 실패하였습니다.');
  assert.equal(
    getTempStorageErrorMessage(axiosError(400, "{'fieldErrors':{}}")),
    '임시 저장을 실패하였습니다.',
  );
});

test('400이 아니거나 axios 에러가 아니면 공통 문구만 보여준다', () => {
  assert.equal(
    getTempStorageErrorMessage(
      axiosError(403, 'POST /oneseo/v3/temp-storage 요청이 거부되었습니다.'),
    ),
    '임시 저장을 실패하였습니다.',
  );
  assert.equal(getTempStorageErrorMessage(axiosError()), '임시 저장을 실패하였습니다.');
  assert.equal(getTempStorageErrorMessage(new Error('unknown')), '임시 저장을 실패하였습니다.');
});

test('400이어도 검증 실패 형식이 아닌 개발자용 원문은 덧붙이지 않는다', () => {
  assert.equal(
    getTempStorageErrorMessage(
      axiosError(
        400,
        'JSON parse error: Cannot deserialize value of type `FreeSemester` from String ""',
      ),
    ),
    '임시 저장을 실패하였습니다.',
  );
});

const RESTORE_FAILED =
  '작성 중인 내용이 임시 저장되지 않았습니다. 새로고침하거나 페이지를 나가면 입력한 내용이 사라질 수 있습니다.';

test('복구 저장이 검증 실패로 400이면 작성 내용 유실 안내에 원인을 덧붙인다', () => {
  assert.equal(
    getRestoreTempStorageErrorMessage(
      axiosError(
        400,
        "{'fieldErrors':{'middleSchoolAchievement.volunteerTime[1]':'봉사시간은 0 이상이어야 합니다.'}}",
      ),
    ),
    `${RESTORE_FAILED} 봉사시간은 0 이상이어야 합니다.`,
  );
});

test('복구 저장이 403이 아닌 이유로 실패하면 작성 내용 유실 안내만 보여준다', () => {
  assert.equal(
    getRestoreTempStorageErrorMessage(axiosError(400, 'JSON parse error')),
    RESTORE_FAILED,
  );
  assert.equal(getRestoreTempStorageErrorMessage(axiosError(500)), RESTORE_FAILED);
  assert.equal(getRestoreTempStorageErrorMessage(axiosError()), RESTORE_FAILED);
  assert.equal(getRestoreTempStorageErrorMessage(new Error('unknown')), RESTORE_FAILED);
});

test('마감 후 403이면 제출 실패 안내와 겹치지 않도록 안내하지 않는다', () => {
  assert.equal(getRestoreTempStorageErrorMessage(axiosError(403)), null);
});
