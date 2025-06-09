'use client';

import { useState } from 'react';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { FaqElement, Footer } from 'client/components';

import { SearchIcon } from 'shared/assets';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from 'shared/components';
import { cn } from 'shared/lib/utils';

import exampleElement from './exampleElement.json';

const ITEMS_PER_PAGE = 10;

const FaqPage = ({ openIndex }: { openIndex?: number }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>('');
  const [faqStates, setFaqStates] = useState<{ [key: number]: boolean }>(
    openIndex !== undefined ? { [openIndex]: true } : {},
  );
  const [isPageChanging, setIsPageChanging] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const totalItems = exampleElement.filter((item) => item.title.toLowerCase().includes(keyword));
  const totalPages = Math.ceil(totalItems.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    const newPageNumber = Math.max(1, Math.min(pageNumber, totalPages));
    setIsPageChanging(true);
    setCurrentPage(newPageNumber);
    setFaqStates({});
    setTimeout(() => setIsPageChanging(false), 0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    setCurrentPage(1);
    setFaqStates({});
  };

  const currentItems = totalItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const toggleFaqContent = (index: number) => {
    setFaqStates((prevStates) => {
      const isOpen = !prevStates[index];
      const newFaqStates = { [index]: isOpen };

      const newSearchParams = new URLSearchParams(searchParams.toString());
      if (isOpen) {
        newSearchParams.set('openIndex', String(index));
      } else {
        newSearchParams.delete('openIndex');
      }
      router.replace(`${pathname}?${newSearchParams.toString()}`);
      return newFaqStates;
    });
  };

  return (
    <div className={cn('flex', 'flex-col', 'h-[100vh]', 'justify-between', 'bg-white')}>
      <div
        className={cn(
          'flex',
          'justify-center',
          'items-center',
          'h-fit',
          'w-full',
          'bg-white',
          'pb-20',
        )}
      >
        <div
          className={cn(
            'flex',
            'w-[38.75rem]',
            'h-full',
            'flex-col',
            'items-center',
            'gap-10',
            'pt-20',
            'px-4',
          )}
        >
          <p
            className={cn(
              'text-slate-800',
              'text-center',
              'text-[1.875rem]/[2.25rem]',
              'font-semibold',
            )}
          >
            자주 묻는 질문
          </p>
          <div className={cn('w-full', 'justify-center', 'items-center')}>
            <div className={cn('w-full', 'flex', 'flex-col', 'justify-center', 'relative')}>
              <input
                type="text"
                value={keyword}
                onChange={handleSearchChange}
                className={cn('w-full', 'h-12', 'pl-8', 'outline-none')}
                placeholder="검색하실 질문을 입력해주세요"
              />
              <div
                className={cn('items-center', 'pointer-events-none', 'absolute', 'left-0', 'flex')}
              >
                <SearchIcon />
              </div>
            </div>
            <div className={cn('w-full', 'h-[0.0625rem]', 'bg-slate-300')} />
            <div className={cn('flex', 'flex-col', 'gap-4', 'pt-8')}>
              {currentItems.map((faq, index) => (
                <FaqElement
                  key={index}
                  title={faq.title}
                  content={faq.content}
                  keyword={keyword}
                  showContent={!!faqStates[index]}
                  onToggle={() => toggleFaqContent(index)}
                  isPageChanging={isPageChanging}
                />
              ))}
            </div>
          </div>
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={currentPage === index + 1}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FaqPage;
