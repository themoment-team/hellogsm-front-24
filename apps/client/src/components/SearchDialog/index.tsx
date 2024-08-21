'use client';

import { useState, useEffect } from 'react';

import { SearchIcon } from 'client/assets';
import { SearchElements } from 'client/components';

import { Button, Input } from 'shared/components';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose } from 'shared/components';
import { cn } from 'shared/lib/utils';

interface SearchDialogProps {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

interface SchoolType {
  SCHUL_NM: string;
}

const SearchDialog = ({ keyword, setKeyword }: Props) => {
  const [schools, setSchools] = useState<SchoolType[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);

  const getSchools = async () => {
    if (keyword.trim() === '') {
      setSchools([]);
      return;
    }

    const response = await fetch(
      new URL(
        `https://open.neis.go.kr/hub/schoolInfo?KEY=${process.env.NEXT_PUBLIC_NEIS_API_KEY}&Type=json&SCHUL_NM=${keyword}&SCHUL_KND_SC_NM='중학교'`,
      ),
      {
        method: 'GET',
      },
    );

    const data = await response.json();

    const rows = data?.schoolInfo?.[1]?.row || [];

    setSchools(rows);
  };

  useEffect(() => {
    if (isSelecting) {
      setIsSelecting(false);
      return;
    }

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      // eslint-disable-next-line no-void
      void getSchools();
    }, 400);

    setDebounceTimeout(timeout);

    return () => {
      clearTimeout(timeout);
    };
  }, [keyword]);

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSchoolSelect = (school: SchoolType) => {
    setKeyword(school.SCHUL_NM);
    setSchools([]);
    setIsSelecting(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>학교 찾기</Button>
      </DialogTrigger>
      <DialogContent className={cn('w-fit', 'p-0', 'rounded-lg')} showCloseIcon={false}>
        <DialogTitle className="sr-only">학교 찾기</DialogTitle>
        <div
          className={cn(
            'w-[29.5rem]',
            'flex',
            'p-6',
            'flex-col',
            'items-start',
            'gap-6',
            'shadow-lg',
          )}
        >
          <div className={cn('flex', 'w-full', 'flex-col', 'items-start', 'gap-4', 'relative')}>
            <p className={cn('text-zinc-950', 'text-[1.125rem]/[1.75rem]', 'font-semibold')}>
              내 중학교 찾기
            </p>
            <Input
              width="full"
              placeholder="학교명 검색"
              icon={<SearchIcon />}
              value={keyword}
              onChange={handleInputChange}
            />
            <SearchElements schools={schools} onSelectSchool={handleSelectSchool} />
          </div>
          <div className={cn('flex', 'w-full', 'justify-end', 'items-center')}>
            {keyword.length === 0 ? (
              <Button variant="submit">확인</Button>
            ) : (
              <DialogClose asChild>
                <Button onClick={() => setKeyword(keyword)}>확인</Button>
              </DialogClose>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
