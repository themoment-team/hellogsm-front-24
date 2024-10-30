'use client';

import { useState } from 'react';

import { useGetOperation, usePostFirstResult, usePostSecondResult } from 'api';

import { SearchIcon, FileIcon, CloverIcon, MedalIcon } from 'admin/assets';

import { PrintIcon } from 'shared/assets';
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
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from 'shared/components';
import { cn } from 'shared/lib/utils';

import { oneseoUrl } from 'api/libs';

import { YesNo, ScreeningType } from 'types/oneseo';

interface FilterBarProps {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  isSubmitted: YesNo | string;
  setIsSubmitted: React.Dispatch<React.SetStateAction<YesNo | string>>;
  screeningTag: ScreeningType | string;
  setScreeningTag: React.Dispatch<React.SetStateAction<ScreeningType | string>>;
  isBeforeFirstResults: boolean;
  isBeforeSecondResults: boolean;
}

const FilterBar = ({
  setKeyword,
  keyword,
  isSubmitted,
  setIsSubmitted,
  setScreeningTag,
  screeningTag,
  isBeforeFirstResults,
  isBeforeSecondResults,
}: FilterBarProps) => {
  const [showFirstModal, setShowFirstModal] = useState<boolean>(false);
  const [showSecondModal, setShowSecondModal] = useState<boolean>(false);

  const { data: operationData, refetch: operationRefetch } = useGetOperation();

  const { mutate: postFirstResult } = usePostFirstResult({
    onSuccess: () => {
      operationRefetch();
    },
    onError: () => {},
  });

  const { mutate: postSecondResult } = usePostSecondResult({
    onSuccess: () => {
      operationRefetch();
    },
    onError: () => {},
  });

  const handleSubmittedChange = (value: string) => {
    if (value === 'YES' || value === 'NO') {
      setIsSubmitted(value);
      return;
    }
  };

  const handleScreeningTagChange = (value: string) => {
    if (value === 'GENERAL' || value === 'SPECIAL' || value === 'EXTRA') {
      setScreeningTag(value);
    }
  };

  const resetFilterData = () => {
    setIsSubmitted('');
    setScreeningTag('');
    setKeyword('');
  };

  const printExcel = () => {
    window.open(`/api${oneseoUrl.getExcel()}`);
  };

  const handlePrintButtonClick = () => {
    window.open('/print');
  };

  return (
    <>
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
                  <SelectItem value="EXTRA">정원 외 특별전형</SelectItem>
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
            variant="outline"
            className={cn('border-slate-900', 'gap-2', 'hover:bg-slate-200')}
            disabled={
              operationData?.firstTestResultAnnouncementYn === 'YES' || isBeforeFirstResults
            }
            onClick={() => setShowFirstModal(true)}
          >
            <CloverIcon />
            1차 결과 발표
          </Button>
          <Button
            variant="outline"
            className={cn('border-slate-900', 'gap-2', 'hover:bg-slate-200')}
            // disabled={
            //   operationData?.secondTestResultAnnouncementYn === 'YES' || isBeforeSecondResults
            // }
            onClick={() => setShowSecondModal(true)}
          >
            <MedalIcon />
            2차 결과 발표
          </Button>
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
      <AlertDialog open={showFirstModal}>
        <AlertDialogContent className="w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              확인 버튼 클릭시 전체 지원자들에게 합격, 불합격 여부가 공개됩니다.
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowFirstModal(false);
              }}
            >
              취소
            </Button>
            <Button
              onClick={() => {
                setShowFirstModal(false);
                postFirstResult();
              }}
            >
              확인
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showSecondModal}>
        <AlertDialogContent className="w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              확인 버튼 클릭시 전체 지원자들에게 합격, 불합격 여부가 공개됩니다.
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowSecondModal(false);
              }}
            >
              취소
            </Button>
            <Button
              onClick={() => {
                setShowSecondModal(false);
                postSecondResult();
              }}
            >
              확인
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FilterBar;
