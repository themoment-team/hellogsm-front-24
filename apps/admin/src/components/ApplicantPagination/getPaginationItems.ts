export type PaginationItemType = number | 'ellipsis';

/** 현재 페이지 앞뒤로 표시할 페이지 수 */
const SIBLING_COUNT = 2;

/** 첫·끝 페이지, 현재 페이지와 앞뒤 페이지, 말줄임표 2개를 합친 최대 항목 수 */
const MAX_ITEM_COUNT = SIBLING_COUNT * 2 + 5;

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

/**
 * 페이지네이션에 표시할 페이지 번호(1부터 시작)와 말줄임표 목록을 만듭니다.
 *
 * 첫·끝 페이지는 항상 표시하고 현재 페이지 앞뒤로 2개씩 표시합니다.
 * 말줄임표가 페이지 하나만 가리게 되면 그 페이지 번호를 대신 표시해 항목 수를 일정하게 유지합니다.
 */
export const getPaginationItems = (
  currentPage: number,
  totalPages: number,
): PaginationItemType[] => {
  if (totalPages <= MAX_ITEM_COUNT) return range(1, totalPages);

  // 말줄임표 없이 이어서 보여줄 앞·뒤 구간의 길이 (첫 또는 끝 페이지 포함)
  const edgeLength = MAX_ITEM_COUNT - 2;
  const current = Math.min(Math.max(currentPage, 1), totalPages);

  if (current <= edgeLength - SIBLING_COUNT) {
    return [...range(1, edgeLength), 'ellipsis', totalPages];
  }

  if (current > totalPages - (edgeLength - SIBLING_COUNT)) {
    return [1, 'ellipsis', ...range(totalPages - edgeLength + 1, totalPages)];
  }

  return [
    1,
    'ellipsis',
    ...range(current - SIBLING_COUNT, current + SIBLING_COUNT),
    'ellipsis',
    totalPages,
  ];
};
