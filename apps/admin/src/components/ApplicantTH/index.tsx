'use client';

import { useState } from 'react';

import { QuestionMark } from 'admin/assets';

import { Table, TableBody, TableCell, TableRow } from 'shared/components';
import { cn } from 'shared/lib/utils';

const ApplicantTH = () => {
  const defaultStyle = cn('font-semibold', 'text-zinc-500');

  const [isDocOver, setIsDocOver] = useState<boolean>(false);
  const [isAgreeOver, setisAgreeOver] = useState<boolean>(false);

  return (
    <>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={cn(defaultStyle, 'w-[100px]')}>접수 번호</TableCell>
            <TableCell className={cn(defaultStyle, 'w-[130px]')}>
              <div className={cn('flex', 'gap-1', 'items-center')}>
                서류 제출 여부
                <div
                  onMouseOver={() => setIsDocOver(true)}
                  onMouseLeave={() => setIsDocOver(false)}
                  className={cn('cursor-pointer', 'relative')}
                >
                  <QuestionMark />
                  {isDocOver && (
                    <div
                      className={cn(
                        'px-3',
                        'py-4',
                        'rounded-lg',
                        'bg-slate-900',
                        'text-xs',
                        'font-semibold',
                        'fixed',
                        'z-[5]',
                        'text-white',
                      )}
                    >
                      지원자가 실물 서류를 제출했다면 클릭하여 상태를 변경해주세요!
                    </div>
                  )}
                </div>
              </div>
            </TableCell>
            <TableCell className={cn(defaultStyle, 'w-[154px]')}>지원자 정보</TableCell>
            <TableCell className={cn(defaultStyle, 'w-[154px]')}>출신 중학교</TableCell>
            <TableCell className={cn(defaultStyle, 'max-w-full')}>전형</TableCell>
            <TableCell className={cn(defaultStyle, 'w-[85px]')}>1차 결과</TableCell>
            <TableCell className={cn(defaultStyle, 'w-[186px]')}>직무적성 점수</TableCell>
            <TableCell className={cn(defaultStyle, 'w-[186px]')}>심층면접 점수</TableCell>
            <TableCell className={cn(defaultStyle, 'w-[90px]')}>2차 결과</TableCell>
            <TableCell className={cn(defaultStyle, 'max-w-full')}>
              <div className={cn('flex', 'gap-1', 'items-center')}>
                입학 동의서 제출 여부
                <div
                  onMouseOver={() => setisAgreeOver(true)}
                  onMouseLeave={() => setisAgreeOver(false)}
                  className={cn('cursor-pointer', 'relative')}
                >
                  <QuestionMark />
                  {isAgreeOver && (
                    <div
                      className={cn(
                        'px-3',
                        'py-4',
                        'rounded-lg',
                        'bg-slate-900',
                        'text-xs',
                        'font-semibold',
                        'fixed',
                        'z-[5]',
                        'text-white',
                      )}
                    >
                      지원자가 입학 동의서 서류를 제출했다면 클릭하여 상태를 변경해주세요!
                    </div>
                  )}
                </div>
              </div>
            </TableCell>
            {/* <TableCell className={'w-[100px]'} /> */}
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default ApplicantTH;
