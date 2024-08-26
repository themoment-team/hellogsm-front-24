'use client';

import { useRouter } from 'next/navigation';

import { SearchIcon, PrintIcon, FileIcon } from 'admin/assets';

import {
  Input,
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
  Button,
  SelectLabel,
  SelectGroup,
} from 'shared/components';
import { cn } from 'shared/lib/utils';

import { oneseoUrl } from 'api/libs';

import { YesNo, ScreeningType } from 'types/oneseo';

interface FilterBarProps {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  isSubmitted: YesNo | undefined;
  setIsSubmitted: React.Dispatch<React.SetStateAction<YesNo | undefined>>;
  screeningTag: ScreeningType | undefined;
  setScreeningTag: React.Dispatch<React.SetStateAction<ScreeningType | undefined>>;
}

const FilterBar = ({
  setKeyword,
  keyword,
  isSubmitted,
  setIsSubmitted,
  setScreeningTag,
  screeningTag,
}: FilterBarProps) => {
  const { push } = useRouter();

  const handleSubmittedChange = (value: string) => {
    if (value === 'YES' || value === 'NO') {
      setIsSubmitted(value);
      return;
    }
  };

  const handleScreeningTagChange = (value: string) => {
    if (value === 'GENERAL' || value === 'SPECIAL') {
      setScreeningTag(value);
    }
  };

  const resetFilterData = () => {
    setIsSubmitted(undefined);
    setScreeningTag(undefined);
    setKeyword('');
  };

  const printExcel = () => {
    window.open(`/api${oneseoUrl.getExcel()}`);
  };
    
  const handlePrintButtonClick = () => {
    push('/print');
  };

  return (
    <div className={cn('flex', 'items-center', 'justify-between', 'w-full')}>
      <div className={cn('flex', 'items-center')}>
        <Input
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          icon={<SearchIcon />}
          width="large"
          placeholder="지원자  명, 중학교 명, 지원자 연락처 검색"
        />

        <div className={cn('w-px', 'h-6', 'bg-slate-200', 'mx-5')} />

        <div className={cn('flex', 'gap-2')}>
          <Select value={screeningTag} onValueChange={handleScreeningTagChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="전형 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>전형선택</SelectLabel>
                <SelectItem value="GENERAL">일반전형</SelectItem>
                <SelectItem value="SPECIAL">특별전형</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={isSubmitted} onValueChange={handleSubmittedChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="서류 제출 여부" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>서류 제출 여부</SelectLabel>
                <SelectItem value="NO">제출 전</SelectItem>
                <SelectItem value="YES">제출 완료</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button onClick={resetFilterData} variant="ghost" className={cn('text-slate-400')}>
            필터 초기화
          </Button>
        </div>
      </div>

      <div className={cn('flex', 'gap-2')}>
        <Button
          onClick={handlePrintButtonClick}
          className={cn('gap-2', 'bg-slate-900', 'hover:bg-slate-700')}
        >
          <PrintIcon />
          수험표 출력
        </Button>
        <Button
          onClick={printExcel}
          variant="outline"
          className={cn('border-slate-900', 'gap-2', 'hover:bg-slate-200')}
        >
          <FileIcon />
          Excel 다운
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
