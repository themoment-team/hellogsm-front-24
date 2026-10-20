import assert from 'node:assert/strict';
import test from 'node:test';

import { parseServerErrorMessage, parseValidationErrorMessage } from './parseServerErrorMessage';

test('message가 없으면 undefined를 돌려준다', () => {
  assert.equal(parseServerErrorMessage(undefined), undefined);
  assert.equal(parseServerErrorMessage(''), undefined);
});

test('검증 실패 형식이 아닌 message는 그대로 돌려준다', () => {
  assert.equal(parseServerErrorMessage('이미 원서가 존재합니다.'), '이미 원서가 존재합니다.');
});

test('fieldErrors 형식이면 필드별 메시지만 꺼낸다', () => {
  assert.equal(
    parseServerErrorMessage(
      "{'fieldErrors':{'middleSchoolAchievement.volunteerTime[2]':'봉사시간은 0 이상이어야 합니다.'}}",
    ),
    '봉사시간은 0 이상이어야 합니다.',
  );
});

test('과목명 중복 검증 메시지를 꺼낸다', () => {
  assert.equal(
    parseServerErrorMessage(
      "{'fieldErrors':{'middleSchoolAchievement':'중복된 이름의 과목이 입력되었습니다.'}}",
    ),
    '중복된 이름의 과목이 입력되었습니다.',
  );
});

test('같은 메시지는 한 번만 보여주고 서로 다른 메시지는 이어 붙인다', () => {
  assert.equal(
    parseServerErrorMessage(
      "{'fieldErrors':{'middleSchoolAchievement.volunteerTime[0]':'봉사시간은 0 이상이어야 합니다.','middleSchoolAchievement.volunteerTime[2]':'봉사시간은 0 이상이어야 합니다.','middleSchoolAchievement':'중복된 이름의 과목이 입력되었습니다.'}}",
    ),
    '봉사시간은 0 이상이어야 합니다. 중복된 이름의 과목이 입력되었습니다.',
  );
});

test('globalErrors가 먼저 와도 메시지를 꺼낸다', () => {
  assert.equal(
    parseServerErrorMessage(
      "{'globalErrors':{'oneseoReqDto':'지망 학과가 중복되었습니다.'},'fieldErrors':{}}",
    ),
    '지망 학과가 중복되었습니다.',
  );
});

test('검증 실패 형식인데 파싱할 수 없거나 메시지가 없으면 undefined를 돌려준다', () => {
  assert.equal(parseServerErrorMessage("{'fieldErrors':{'a':'it's broken'}}"), undefined);
  assert.equal(parseServerErrorMessage("{'fieldErrors':{}}"), undefined);
});

// 서버는 직렬화한 JSON 전체의 " 를 ' 로 바꾸므로 정규식 안의 이스케이프된 따옴표(\")도 \' 로 온다
test('message 없이 쓴 제약의 Hibernate 기본 메시지는 걸러낸다', () => {
  assert.equal(
    parseServerErrorMessage(
      "{'fieldErrors':{'graduationDate':'\\'^\\\\d{4}-(0[1-9]|1[0-2])$\\'와 일치해야 합니다','guardianName':'공백일 수 없습니다'}}",
    ),
    undefined,
  );
  assert.equal(
    parseServerErrorMessage(
      "{'fieldErrors':{'graduationDate':'must match \\'^\\\\d{4}$\\'','guardianPhoneNumber':'유효한 전화번호가 아닙니다.'}}",
    ),
    '유효한 전화번호가 아닙니다.',
  );
});

test('parseValidationErrorMessage는 검증 실패 형식이 아닌 message를 버린다', () => {
  assert.equal(
    parseValidationErrorMessage(
      'JSON parse error: Cannot deserialize value of type `FreeSemester`',
    ),
    undefined,
  );
  assert.equal(parseValidationErrorMessage(undefined), undefined);
  assert.equal(
    parseValidationErrorMessage(
      "{'fieldErrors':{'middleSchoolAchievement':'중복된 이름의 과목이 입력되었습니다.'}}",
    ),
    '중복된 이름의 과목이 입력되었습니다.',
  );
});
