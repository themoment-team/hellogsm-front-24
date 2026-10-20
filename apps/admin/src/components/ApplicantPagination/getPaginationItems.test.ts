import assert from 'node:assert/strict';
import { test } from 'node:test';

import { getPaginationItems } from './getPaginationItems';

test('전체 1페이지면 1만 표시한다', () => {
  assert.deepEqual(getPaginationItems(1, 1), [1]);
});

test('전체 9페이지 이하면 말줄임 없이 모두 표시한다', () => {
  assert.deepEqual(getPaginationItems(5, 9), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test('앞쪽 페이지에서는 앞 7개와 마지막 페이지를 표시한다', () => {
  for (const current of [1, 3, 5]) {
    assert.deepEqual(getPaginationItems(current, 23), [1, 2, 3, 4, 5, 6, 7, 'ellipsis', 23]);
  }
});

test('가운데 페이지에서는 현재 페이지 앞뒤 2개와 첫·끝 페이지를 표시한다', () => {
  assert.deepEqual(getPaginationItems(6, 23), [1, 'ellipsis', 4, 5, 6, 7, 8, 'ellipsis', 23]);
  assert.deepEqual(getPaginationItems(18, 23), [1, 'ellipsis', 16, 17, 18, 19, 20, 'ellipsis', 23]);
});

test('뒤쪽 페이지에서는 첫 페이지와 뒤 7개를 표시한다', () => {
  for (const current of [19, 21, 23]) {
    assert.deepEqual(getPaginationItems(current, 23), [1, 'ellipsis', 17, 18, 19, 20, 21, 22, 23]);
  }
});

test('말줄임표가 페이지 하나만 가리지 않는다', () => {
  for (let total = 10; total <= 30; total++) {
    for (let current = 1; current <= total; current++) {
      const items = getPaginationItems(current, total);

      items.forEach((item, index) => {
        if (item !== 'ellipsis') return;
        const prev = items[index - 1] as number;
        const next = items[index + 1] as number;
        assert.ok(next - prev > 2, `current=${current}, total=${total}: ${items.join(' ')}`);
      });
      assert.equal(items.length, 9, `current=${current}, total=${total}`);
      assert.ok(items.includes(current), `current=${current}, total=${total}`);
    }
  }
});

test('범위를 벗어난 현재 페이지는 첫·끝 페이지로 맞춘다', () => {
  assert.deepEqual(getPaginationItems(0, 23), getPaginationItems(1, 23));
  assert.deepEqual(getPaginationItems(99, 23), getPaginationItems(23, 23));
});
