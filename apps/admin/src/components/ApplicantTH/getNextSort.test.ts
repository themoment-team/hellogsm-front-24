import assert from 'node:assert/strict';
import { test } from 'node:test';

import { getNextSort } from './getNextSort';

test('정렬하지 않은 상태에서 누르면 오름차순으로 정렬한다', () => {
  assert.deepEqual(getNextSort(null, 'NAME'), { sortBy: 'NAME', sortDirection: 'ASC' });
});

test('같은 컬럼을 누르면 오름차순 → 내림차순 → 정렬 해제 순으로 바뀐다', () => {
  const asc = getNextSort(null, 'NAME');
  const desc = getNextSort(asc, 'NAME');
  const cleared = getNextSort(desc, 'NAME');

  assert.deepEqual(desc, { sortBy: 'NAME', sortDirection: 'DESC' });
  assert.equal(cleared, null);
  assert.deepEqual(getNextSort(cleared, 'NAME'), asc);
});

test('다른 컬럼을 누르면 이전 정렬을 해제하고 새 컬럼을 오름차순으로 정렬한다', () => {
  assert.deepEqual(getNextSort({ sortBy: 'NAME', sortDirection: 'ASC' }, 'SCHOOL_NAME'), {
    sortBy: 'SCHOOL_NAME',
    sortDirection: 'ASC',
  });
  assert.deepEqual(getNextSort({ sortBy: 'NAME', sortDirection: 'DESC' }, 'SCHOOL_NAME'), {
    sortBy: 'SCHOOL_NAME',
    sortDirection: 'ASC',
  });
});
