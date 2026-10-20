import type { OneseoSortBy } from '@repo/types';

import type { OneseoListSort } from '@/pageContainer/MainPage/oneseoListQuery';

/**
 * 컬럼 헤더를 눌렀을 때의 다음 정렬 상태를 반환합니다.
 *
 * 정렬하지 않은 컬럼은 오름차순 → 내림차순 → 정렬 해제 순으로 바뀝니다.
 * 다른 컬럼을 누르면 이전 정렬은 해제되고 새 컬럼을 오름차순으로 정렬합니다.
 */
export const getNextSort = (
  current: OneseoListSort | null,
  sortBy: OneseoSortBy,
): OneseoListSort | null => {
  if (current?.sortBy !== sortBy) return { sortBy, sortDirection: 'ASC' };

  return current.sortDirection === 'ASC' ? { sortBy, sortDirection: 'DESC' } : null;
};
