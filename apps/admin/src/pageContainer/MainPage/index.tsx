'use client';

import { keepPreviousData } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { useGetEditability, useGetOneseoList } from '@repo/api/hooks';
import { OneseoListType } from '@repo/types';
import { Table, TableBody, TableHeader } from '@repo/ui/shadcn';
import { cn } from '@repo/utils';

import { ApplicantPagination, ApplicantTH, ApplicantTR, FilterBar, SideMenu } from '@/components';
import { SideBarType } from '@/schemas';

import {
  OneseoListQuery,
  parseOneseoListQuery,
  toOneseoListRequestParams,
  toOneseoListSearchString,
} from './oneseoListQuery';

interface MainPageProps {
  initialData: OneseoListType | undefined;
  /** 서버가 initialData를 조회한 조건 */
  initialQuery: OneseoListQuery;
  isAfterFirstResults: boolean;
  isAfterSecondResults: boolean;
  is역량검사처리기간: boolean;
  is심층면접처리기간: boolean;
}

const flexColStyle = ['flex', 'flex-col'] as const;

const KEYWORD_DEBOUNCE_MS = 1000;

const testResultTypeConvertor: { [key: string]: string } = {
  ALL: '전체 지원자 관리',
  REQUEST: '원서 수정 요청 관리',
  FIRST_PASS: '1차 전형 합격자 관리',
  FINAL_PASS: '최종 합격자 관리',
  FALL: '불합격자 관리',
};

/**
 * 현재 URL의 목록 조건에 patch를 합친 URL을 만듭니다.
 */
const getOneseoListUrl = (patch: Partial<OneseoListQuery>) => {
  const current = parseOneseoListQuery(
    Object.fromEntries(new URLSearchParams(window.location.search)),
  );
  const search = toOneseoListSearchString({ ...current, ...patch });

  return `${window.location.pathname}${search ? `?${search}` : ''}`;
};

/**
 * 현재 URL의 목록 조건에 patch를 합쳐 URL을 교체합니다.
 * router.replace는 서버 컴포넌트를 다시 렌더링해 조건을 바꿀 때마다 서버 왕복을 기다리게 되므로
 * Next.js Router와 연동되는 history.replaceState를 사용합니다.
 * 조건 변경이 방문 기록에 쌓이지 않도록 push가 아닌 replace로 처리합니다.
 */
const replaceOneseoListQuery = (patch: Partial<OneseoListQuery>) => {
  window.history.replaceState(null, '', getOneseoListUrl(patch));
};

const MainPage = ({
  initialData,
  initialQuery,
  isAfterFirstResults,
  isAfterSecondResults,
  is역량검사처리기간,
  is심층면접처리기간,
}: MainPageProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = parseOneseoListQuery(Object.fromEntries(searchParams));
  const { testResultTag, screeningTag, isSubmitted, status: requested, page } = query;

  // 입력창은 바로 반영하고, 디바운스된 검색어만 URL에 반영합니다.
  const [keywordInput, setKeywordInput] = useState<string>(query.keyword);
  const keywordTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // 화면을 떠난 뒤 남은 타이머가 다른 페이지의 URL을 바꾸지 않도록 정리합니다.
  useEffect(() => () => clearTimeout(keywordTimerRef.current), []);

  const isInitialQuery = toOneseoListSearchString(query) === toOneseoListSearchString(initialQuery);

  const {
    data,
    isPlaceholderData,
    refetch: oneseoRefetch,
  } = useGetOneseoList(toOneseoListRequestParams(query), {
    // initialData는 쿼리 키와 관계없이 새로 만들어지는 모든 쿼리에 들어가므로 서버가 조회한 조건일 때만 넘깁니다.
    initialData: isInitialQuery ? initialData : undefined,
    placeholderData: keepPreviousData,
    // 원서 수정 후 돌아오거나 조건을 바꿀 때마다 최신 목록을 다시 조회합니다.
    staleTime: 0,
  });

  const { data: editableData, refetch: editableRefetch } = useGetEditability();

  const totalPages = data?.info.totalPages;

  // URL의 page가 전체 페이지 수를 넘으면 마지막 페이지로 보정합니다.
  // 첫 마운트 effect는 Next.js가 history.replaceState를 연동하기 전에 실행되어 URL만 바뀌고
  // useSearchParams에는 반영되지 않으므로 router.replace를 사용합니다.
  useEffect(() => {
    if (totalPages === undefined || isPlaceholderData) return;

    const lastPage = Math.max(totalPages - 1, 0);
    if (page > lastPage) router.replace(getOneseoListUrl({ page: lastPage }), { scroll: false });
  }, [isPlaceholderData, page, router, totalPages]);

  // 조건이 바뀌면 1페이지부터 다시 봅니다.
  const handleTestResultTagChange = (value: SideBarType) => {
    replaceOneseoListQuery({ testResultTag: value, page: 0 });
  };

  const handleScreeningTagChange = (value: OneseoListQuery['screeningTag']) => {
    replaceOneseoListQuery({ screeningTag: value, page: 0 });
  };

  const handleSubmittedChange = (value: OneseoListQuery['isSubmitted']) => {
    replaceOneseoListQuery({ isSubmitted: value, page: 0 });
  };

  const handleRequestedChange = (value: OneseoListQuery['status']) => {
    replaceOneseoListQuery({ status: value, page: 0 });
  };

  const handleKeywordChange = (value: string) => {
    setKeywordInput(value);
    clearTimeout(keywordTimerRef.current);
    keywordTimerRef.current = setTimeout(() => {
      replaceOneseoListQuery({ keyword: value, page: 0 });
    }, KEYWORD_DEBOUNCE_MS);
  };

  const handleResetFilter = () => {
    clearTimeout(keywordTimerRef.current);
    setKeywordInput('');
    replaceOneseoListQuery({
      screeningTag: '',
      isSubmitted: '',
      status: 'ANY_EDIT',
      keyword: '',
      page: 0,
    });
  };

  const handlePageChange = (nextPage: number) => {
    replaceOneseoListQuery({ page: nextPage });
    tableContainerRef.current?.scrollTo({ top: 0 });
  };

  const getPageHref = (targetPage: number) => {
    const search = toOneseoListSearchString({ ...query, page: targetPage });
    return `${pathname}${search ? `?${search}` : ''}`;
  };

  return (
    <main
      className={cn([
        isOpen && 'ml-60',
        isOpen ? 'px-10' : 'pl-20 pr-10',
        'pt-[60px]',
        'pb-8',
        'bg-white',
      ])}
    >
      <SideMenu
        testResultTag={testResultTag}
        setTestResultTag={handleTestResultTagChange}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className={cn([...flexColStyle, 'gap-8'])}>
        <h1 className={cn('text-gray-900', 'text-3xl', 'font-semibold')}>
          {testResultTypeConvertor[testResultTag]}
        </h1>
        <div className={cn([...flexColStyle, 'gap-5'])}>
          <FilterBar
            screeningTag={screeningTag}
            setScreeningTag={handleScreeningTagChange}
            keyword={keywordInput}
            setKeyword={handleKeywordChange}
            isSubmitted={isSubmitted}
            setIsSubmitted={handleSubmittedChange}
            requested={requested}
            setRequested={handleRequestedChange}
            resetFilter={handleResetFilter}
            testResultTag={testResultTag}
            isAfterFirstResults={isAfterFirstResults}
            isAfterSecondResults={isAfterSecondResults}
          />
          <div
            ref={tableContainerRef}
            className={cn(
              'border',
              'border-solid',
              'border-zinc-200',
              'w-full',
              'rounded-t-md',
              'overflow-hidden',
              'max-h-[calc(100vh-280px)]',
              'overflow-scroll',
            )}
          >
            <Table>
              <TableHeader>
                <ApplicantTH />
              </TableHeader>
              <TableBody>
                {data?.oneseos &&
                  data.oneseos.map((oneseo) => (
                    <ApplicantTR
                      {...oneseo}
                      key={oneseo.memberId}
                      editableData={editableData}
                      oneseoRefetch={oneseoRefetch}
                      editableRefetch={editableRefetch}
                      is역량검사처리기간={is역량검사처리기간}
                      is심층면접처리기간={is심층면접처리기간}
                      testResultTag={testResultTag}
                    />
                  ))}
              </TableBody>
            </Table>
          </div>

          {totalPages ? (
            <ApplicantPagination
              page={page}
              totalPages={totalPages}
              totalElements={data.info.totalElements}
              getPageHref={getPageHref}
              onPageChange={handlePageChange}
            />
          ) : (
            <span className={cn('text-red-500')}>조회된 지원자 데이터가 없습니다.</span>
          )}
        </div>
      </div>
    </main>
  );
};

export default MainPage;
