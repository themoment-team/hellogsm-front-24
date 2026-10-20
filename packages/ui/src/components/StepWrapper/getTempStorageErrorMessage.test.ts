import assert from 'node:assert/strict';
import test from 'node:test';

import { AxiosError, AxiosHeaders, AxiosResponse } from 'axios';

import { getTempStorageErrorMessage } from './getTempStorageErrorMessage';

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
