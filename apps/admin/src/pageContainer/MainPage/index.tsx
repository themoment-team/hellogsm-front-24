'use client';

import { useEffect, useState } from 'react';

import { SideMenu, FilterBar, ApplicantTH, ApplicantTR } from 'admin/components';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from 'shared/components';
import { useDebounce } from 'shared/hooks';
import { cn } from 'shared/lib/utils';

import { useGetOneseoList } from 'api/hooks';

import { OneseoListType } from 'types/oneseo';
import { YesNo, ScreeningType, TestResultType } from 'types/oneseo';

interface MainPageProps {
  initialData: OneseoListType | undefined;
}

const flexColStyle = ['flex', 'flex-col'] as const;

const PER_PAGE = 10;
const DEFAULT_TEST_RESULT_TAG = 'ALL';

const MainPage = ({ initialData }: MainPageProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const [keyword, setKeyword] = useState<string>('');
  const [testResultTag, setTestResultTag] = useState<TestResultType>(DEFAULT_TEST_RESULT_TAG);
  const [isSubmitted, setIsSubmitted] = useState<YesNo | undefined>(undefined);
  const [screeningTag, setScreeningTag] = useState<ScreeningType | undefined>(undefined);
  const [page, setPage] = useState<number>(0);

  const debouncedKeyword = useDebounce(keyword, 1000);

  const { data, refetch } = useGetOneseoList(
    {
      page: page,
      size: PER_PAGE,
      testResultTag: testResultTag,
      screeningTag: screeningTag,
      isSubmitted: isSubmitted,
      keyword: keyword,
    },
    {
      initialData: initialData,
    },
  );

  const totalPages = data?.info.totalPages;

  const startPage = totalPages ? Math.max(0, Math.min(page, data.info.totalPages - 3)) : 0;

  const pageNumbers = totalPages
    ? Array.from(
        { length: Math.min(3, data.info.totalPages - startPage) },
        (_, i) => startPage + i + 1,
      )
    : [];

  useEffect(() => {
    // 테스트 로그입니다.
    // eslint-disable-next-line no-console
    console.log(data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [debouncedKeyword, page, testResultTag, isSubmitted, screeningTag]);

  return (
    <main className={cn(isOpen && 'ml-60', isOpen ? 'px-10' : 'pl-20 pr-10', 'pt-[60px]', 'pb-8')}>
      <SideMenu
        testResultTag={testResultTag}
        setTestResultTag={setTestResultTag}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className={cn(...flexColStyle, 'gap-8')}>
        <h1 className={cn('text-gray-900', 'text-3xl', 'font-semibold')}>전체 지원자 관리</h1>
        <div className={cn(...flexColStyle, 'gap-5')}>
          <FilterBar
            screeningTag={screeningTag}
            setScreeningTag={setScreeningTag}
            keyword={keyword}
            setKeyword={setKeyword}
            isSubmitted={isSubmitted}
            setIsSubmitted={setIsSubmitted}
          />
          <div
            className={cn(
              'border',
              'border-solid',
              'border-zinc-200',
              'w-full',
              'rounded-t-md',
              'overflow-hidden',
            )}
          >
            <ApplicantTH />
            <div className={cn('bg-zinc-200', 'w-full', 'h-[1px]')} />
            {data?.oneseos &&
              data.oneseos.map((oneseo) => (
                <ApplicantTR {...oneseo} key={oneseo.memberId} refetch={refetch} />
              ))}
          </div>

          {totalPages ? (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((prev) => (prev > 0 ? prev - 1 : 0))}
                  />
                </PaginationItem>
                {pageNumbers.map((pageNumber: number) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      isActive={pageNumber - 1 === page}
                      onClick={() => setPage(pageNumber - 1)}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setPage((prev) =>
                        prev < data.info.totalPages - 1 ? prev + 1 : data.info.totalPages - 1,
                      )
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          ) : (
            <span className={cn('text-red-500')}>조회된 지원자 데이터가 없습니다.</span>
          )}
        </div>
      </div>
    </main>
  );
};

export default MainPage;
