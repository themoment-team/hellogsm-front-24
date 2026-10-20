'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@repo/ui/shadcn';
import { cn } from '@repo/utils';

import { getPaginationItems } from './getPaginationItems';

interface ApplicantPaginationProps {
  /** 0부터 시작하는 현재 페이지 */
  page: number;
  totalPages: number;
  totalElements: number;
  /** 0부터 시작하는 페이지의 목록 URL */
  getPageHref: (page: number) => string;
  /** 0부터 시작하는 페이지로 이동 */
  onPageChange: (page: number) => void;
}

const disabledStyle = ['pointer-events-none', 'opacity-50'] as const;

const ApplicantPagination = ({
  page,
  totalPages,
  totalElements,
  getPageHref,
  onPageChange,
}: ApplicantPaginationProps) => {
  const lastPage = totalPages - 1;
  const isFirstPage = page <= 0;
  const isLastPage = page >= lastPage;

  // href를 두어 키보드로 이동·선택하고 새 탭으로 열 수 있게 하되, 일반 클릭은 전체 새로고침 없이 처리합니다.
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, nextPage: number) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0)
      return;

    event.preventDefault();
    onPageChange(nextPage);
  };

  return (
    <div className={cn('flex', 'flex-col', 'items-center', 'gap-2')}>
      <span className={cn('text-sm', 'text-gray-500')}>총 {totalElements.toLocaleString()}명</span>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={isFirstPage ? undefined : getPageHref(page - 1)}
              aria-disabled={isFirstPage}
              onClick={(event) => !isFirstPage && handleLinkClick(event, page - 1)}
              className={cn(isFirstPage && disabledStyle)}
            />
          </PaginationItem>
          {getPaginationItems(page + 1, totalPages).map((item, index) =>
            item === 'ellipsis' ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis className={cn('cursor-default')} />
              </PaginationItem>
            ) : (
              <PaginationItem key={item}>
                <PaginationLink
                  href={getPageHref(item - 1)}
                  isActive={item - 1 === page}
                  onClick={(event) => handleLinkClick(event, item - 1)}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
          <PaginationItem>
            <PaginationNext
              href={isLastPage ? undefined : getPageHref(page + 1)}
              aria-disabled={isLastPage}
              onClick={(event) => !isLastPage && handleLinkClick(event, page + 1)}
              className={cn(isLastPage && disabledStyle)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ApplicantPagination;
