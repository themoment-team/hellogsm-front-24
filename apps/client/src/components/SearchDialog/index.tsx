'use client';

import { useState, useEffect } from 'react';

import { SearchIcon } from 'client/assets';
import { SearchElements } from 'client/components';

import {
  Button,
  Input,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from 'shared/components';
import { useDebounce } from 'shared/hooks';
import { cn } from 'shared/lib/utils';

interface SearchDialogProps {
  setSelectedSchool: React.Dispatch<React.SetStateAction<string>>;
}

interface SchoolType {
  SCHUL_NM: string;
}

const SearchDialog = ({ setSelectedSchool }: SearchDialogProps) => {
  const [schools, setSchools] = useState<SchoolType[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [isSelecting, setIsSelecting] = useState<boolean>(false);

  const debouncedKeyword = useDebounce(keyword, 400);

  const getSchools = async () => {
    if (debouncedKeyword.trim() === '') {
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

    if (debouncedKeyword) {
      // eslint-disable-next-line no-void
      void getSchools();
    }
  }, [debouncedKeyword]);

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
              onChange={handleKeywordChange}
            />
            <SearchElements schools={schools} onSelectSchool={handleSchoolSelect} />
          </div>
          <div className={cn('flex', 'w-full', 'justify-end', 'items-center')}>
            {keyword.length === 0 ? (
              <Button variant="submit">확인</Button>
            ) : (
              <DialogClose asChild>
                <Button onClick={() => setSelectedSchool(keyword)}>확인</Button>
              </DialogClose>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;